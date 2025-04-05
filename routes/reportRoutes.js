const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// ✅ Create Report (Protected)
router.post("/", authMiddleware, reportController.createReport);

// ✅ Update Report
router.put("/:reportId", authMiddleware, reportController.updateReport);

// ✅ Delete Report
router.delete("/:reportId", authMiddleware, reportController.deleteReport);

router.get("/all", authMiddleware, reportController.getAllReports);

module.exports = router;
