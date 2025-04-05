const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    province: { type: String, required: true },
    reportType: { type: String, required: true },
    comments: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Report", ReportSchema);
