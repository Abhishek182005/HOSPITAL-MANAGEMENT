// backend/models/History.js

const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  date: Date,
  status: String,
});

module.exports = mongoose.model("History", historySchema);
