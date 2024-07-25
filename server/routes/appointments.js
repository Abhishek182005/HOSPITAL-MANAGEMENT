// models/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Visited', 'Not Visited', 'Cancelled', 'Postponed'], default: 'Not Visited' },
  newDate: { type: Date }, // For postponed appointments
  patientName: { type: String },
  doctorName: { type: String }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
