const Event = require('./events.model')
const {
  sendServerError,
  sendCreatedResponse,
  sendOkWithErrorsResponse,
  sendOkResponse
} = require('../core/responses');

exports.createEvent = async (req, res) => {
  try {
    const {title, description, image, link, date} = req.body

    const newEvent = new Event()
    newEvent.title = title
    newEvent.description = description
    newEvent.image = image
    newEvent.link = link
    newEvent.date = date

    const createdEvent = await newEvent.save()
    sendCreatedResponse(res, createdEvent)
  } catch (e) {
    sendServerError(res, e)
  }
}

exports.getEvents = async (req, res) => {
  try {
    const d = new Date()
    const events = await Event.find()
    sendOkResponse(res, events)
  } catch(e) {
    sendServerError(res, e)
  }
}
