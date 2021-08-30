const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  image: String,
  date: Date,
  link: String
}, {timestamps: true})

module.exports = mongoose.model('Events', eventSchema)
