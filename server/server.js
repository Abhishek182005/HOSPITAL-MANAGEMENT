const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

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

// Import routers
const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");
const historyRouter = require("./routes/history"); // Import history router

// Use routers
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/", historyRouter); // Register history router

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
