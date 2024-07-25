// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");
const historyroutes = require("./routes/history.js");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 27017;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const Mongo = process.env.MONGO_URL;
mongoose.connect(Mongo);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/history", historyroutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
