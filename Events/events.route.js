const express = require('express')
const cors = require('cors')

const router = express.Router()
router.options('/', cors())

const controller = require('./events.controller')

router.post('/', controller.createEvent)
router.get('/', controller.getEvents)

module.exports = router
