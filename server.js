require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')

const bookOfficeRoutes = require('./OfficeBooking/officebooking.route')
const eventsRoutes = require('./Events/events.route')

const app = express()
const http = require('http').createServer(app);

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))

app.use('/bookingOffice', bookOfficeRoutes)
app.use('/events', eventsRoutes)


// database initialization
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to a database');
});

http.listen(process.env.PORT, () =>
  console.log(`Magic is on port ${process.env.PORT}!`)
)
