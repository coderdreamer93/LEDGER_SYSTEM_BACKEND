const Report = require("../models/reportModal");

// ✅ Create Report
exports.createReport = async (req, res) => {
    try {
        const { province, reportType, comments } = req.body;

        if ( !province || !reportType || !comments) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const report = new Report({ userId: req.user.id, province, reportType, comments });
        await report.save();
        
        res.status(201).json({ message: "Report created successfully", report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const userId = req.user.id; // Extract userId from authenticated request

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const report = await Report.find({ userId }); // Fetch only user's ledger entries
        res.json({ report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ✅ Update Report
exports.updateReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { province, reportType, comments } = req.body;

        const report = await Report.findByIdAndUpdate(
            reportId,
            { province, reportType, comments },
            { new: true }
        );

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.json({ message: "Report updated successfully", report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete Report
exports.deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const report = await Report.findByIdAndDelete(reportId);

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.json({ message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
