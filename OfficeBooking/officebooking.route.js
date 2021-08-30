const express = require('express')
const cors = require('cors')

const router = express.Router()

router.options('/', cors())

const controller = require('./officebooking.controller')

router.post('/', controller.createOfficeBooking)
router.get('/getSeatsLeft', controller.getSeatsLeft)
router.get('/getNowEmails', controller.getNowEmails)
router.get('/topUsers', controller.getTopUsers)

module.exports = router
