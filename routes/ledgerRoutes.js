// const express = require("express");
// const router = express.Router();
// const ledgerController = require("../controller/ledgerController");
// const authMiddleware = require("../middlewares/authMiddleware");
// const { checkPermissions } = require("../middlewares/checkPermission");

// // ✅ Add Ledger (Only if `can_add` permission is granted)
// router.post("/add", authMiddleware.verifyToken, checkPermissions("can_add"), ledgerController.addLedger);

// // ✅ Get All Ledgers (Only if `can_view` permission is granted)
// router.get("/all", authMiddleware.verifyToken, checkPermissions("can_view"), ledgerController.getAllLedgers);

// // ✅ Get Ledger by ID (Only if `can_view` permission is granted)
// router.get("/:id", authMiddleware.verifyToken, checkPermissions("can_view"), ledgerController.getLedgerById);

// // ✅ Update Ledger (Only if `can_edit` permission is granted)
// router.put("/update/:id", authMiddleware.verifyToken, checkPermissions("can_edit"), ledgerController.updateLedger);

// // ✅ Delete Ledger (Only if `can_delete` permission is granted)
// router.delete("/delete/:id", authMiddleware.verifyToken, checkPermissions("can_delete"), ledgerController.deleteLedger);

// module.exports = router;
const express = require("express");
const ledgerController = require("../controller/ledgerController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { checkPermission } = require("../middlewares/checkPermission");

const router = express.Router();

router.post("/", authMiddleware, ledgerController.addLedger);
router.put("/:id", authMiddleware, checkPermission("can_update"), ledgerController.updateLedger);
router.delete("/:id", authMiddleware, checkPermission("can_delete"), ledgerController.deleteLedger);

module.exports = router;
