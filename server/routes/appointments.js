// routes/appointments.js

const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment.js");
const History = require("../models/History.js"); // Assuming you have a History model

// Get all appointments
router.route("/").get((req, res) => {
  Appointment.find()
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add new appointment
router.route("/add").post((req, res) => {
  const { patientName, doctorName, date } = req.body;
  const newAppointment = new Appointment({ patientName, doctorName, date });

  newAppointment
    .save()
    .then((savedAppointment) => res.json(savedAppointment))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update an appointment
router.post("/update/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).send("Appointment not found.");

    // Update status and new date if necessary
    appointment.status = req.body.status;
    if (req.body.status === "Postponed") {
      appointment.newDate = req.body.newDate;
    } else {
      appointment.newDate = undefined;
    }

    Object.assign(appointment, req.body);
    await appointment.save();
    res.send(appointment);
  } catch (error) {
    res.status(500).send("Error updating appointment: " + error.message);
  }
});

// Delete appointment
router.delete("/delete/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).send("Appointment not found.");

    await History.create(appointment.toObject()); // Save to history database
    await Appointment.findByIdAndDelete(req.params.id); // Delete from appointments
    res.status(200).json({ message: "Appointment moved to history" });
  } catch (error) {
    res.status(500).json({ error: "Error moving appointment to history" });
  }
});


module.exports = router;
