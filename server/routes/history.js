const express = require("express");
const router = express.Router();
const History = require("../models/History.js");

// Get all history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update status in history
router.post("/history/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await History.findByIdAndUpdate(req.params.id, { status });
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating status" });
  }
});

module.exports = router;
