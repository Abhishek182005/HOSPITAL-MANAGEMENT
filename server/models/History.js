    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

    const historySchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor" },
    appointmentDate: Date,
    // other fields if needed
    });

    module.exports = mongoose.model("History", historySchema);
