const express = require("express");
const router = express.Router();
const History = require("../models/History.js");

// Get appointment history
router.get("/history", async (req, res) => {
  try {
    const appointments = await History.find()
      .populate("patientId", "name")
      .populate("doctorId", "name")
      .exec();

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
