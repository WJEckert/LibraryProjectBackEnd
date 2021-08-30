const mongoose = require('mongoose');
const validator = require('validator');

const officeBookingSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'El nombre es obligatorio']},
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    validate: [validator.isEmail, 'Email inválido']
  },
}, {timestamps: true});

module.exports = mongoose.model('Reservations', officeBookingSchema);
