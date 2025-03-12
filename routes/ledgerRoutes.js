const express = require("express");
const router = express.Router();
const ledgerController = require("../controller/ledgerController");
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure user is authenticated

// Ledger Routes
router.post("/ledger", authMiddleware, ledgerController.addLedger);
router.get("/ledger", authMiddleware, ledgerController.getLedger);
router.get("/ledger/:id", authMiddleware, ledgerController.getLedgerById);
router.put("/ledger/:id", authMiddleware, ledgerController.updateLedger);
router.delete("/ledger/:id", authMiddleware, ledgerController.deleteLedger);

module.exports = router;
