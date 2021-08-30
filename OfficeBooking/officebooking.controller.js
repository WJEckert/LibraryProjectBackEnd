const OfficeBooking = require('./officebooking.model')
const {
  sendServerError,
  sendCreatedResponse,
  sendOkWithErrorsResponse,
  sendOkResponse
} = require('../core/responses');

async function getNowEmailsDb() {
  const d = new Date()
  const hour = d.getHours()
  let start = new Date()
  let end = new Date()

  if (hour < 8 || hour >= 19) {
    return 'NOT_TIME_TO_BOOK'
  }

  //morning (8:00 - 12:59:999)
  if (hour >= 8 && hour < 13) {
    start.setHours(8, 0, 0, 0)
    end.setHours(12, 59, 59, 999)
  }

  //evening (13:00 - 19:00)
  if (hour >= 13 && hour < 19) {
    start.setHours(13, 0, 0, 0)
    end.setHours(18, 59, 59, 999)
  }

  const emails = await OfficeBooking.find({createdAt: {$gte: start, $lt: end}})
  return emails
}

exports.createOfficeBooking = async (req, res) => {
  try {
    const {name, email} = req.body

    const d = new Date()
    let start = new Date()
    let end = new Date()
    const hour = d.getHours()

    if (hour < 8 || hour >= 19) {
      sendOkWithErrorsResponse(res, 'NOT_TIME_TO_BOOK')
      return
    }

    //Morning (8:00 - 12:59:999)
    if (hour >= 8 && hour < 13) {
      start.setHours(8, 0, 0, 0)
      end.setHours(12, 59, 59, 999)
    }

    //Evening (13:00 - 19:00)
    if (hour >= 13 && hour < 19) {
      start.setHours(13, 0, 0, 0)
      end.setHours(18, 59, 59, 999)
    }

    const emailFound = await OfficeBooking.findOne({email, createdAt: {$gte: start, $lt: end}})
    if (emailFound) {
      sendOkWithErrorsResponse(res, 'EMAIL_USED')
      return
    }

    const emails = await OfficeBooking.find({createdAt: {$gte: start, $lt: end}})
    if (emails.length >= process.env.PEOPLE) {
      sendOkWithErrorsResponse(res, 'CAPACITY')
      return
    }

    const newOfficeBooking = new OfficeBooking()
    newOfficeBooking.name = name
    newOfficeBooking.email = email
    const createdOfficeBooking = await newOfficeBooking.save()
    //TODO mandar email validación
    sendCreatedResponse(res, createdOfficeBooking);
  } catch (e) {
    sendServerError(res, e)
  }
}

exports.getSeatsLeft = async function (req, res) {
  try {
    const emails = await getNowEmailsDb()
    if (emails === "NOT_TIME_TO_BOOK") {
      sendOkWithErrorsResponse(res, 'NOT_TIME_TO_BOOK')
      return
    }

    sendOkResponse(res, process.env.PEOPLE - emails.length)
  } catch (e) {
    console.log(e)
    sendServerError(res, e)
  }
}

exports.getNowEmails = async function (req, res) {
  try {
    const emails = await getNowEmailsDb()
    if (emails === "NOT_TIME_TO_BOOK") {
      sendOkWithErrorsResponse(res, 'NOT_TIME_TO_BOOK')
      return
    }
    sendOkResponse(res, emails)
  } catch (e) {
    sendServerError(res, e)
  }
}

exports.getTopUsers = async function (req, res) {
  try {
    const topUsers = await OfficeBooking.aggregate([
      {
        $group: {
          "_id": "$email",
          "name": { "$first": "$name" },
          "count": {$sum: 1}
        }
      },
      {$sort: {"count": -1}},
      {$limit: 10}
    ])
    console.log(topUsers)
    sendOkResponse(res, topUsers)
  } catch (e) {
    console.log("ERROR")
    console.log(e)
    sendServerError(res, e)
  }
}
