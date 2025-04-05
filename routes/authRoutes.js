const express = require("express");
const { registerUser, loginUser, assignPermission, getUser } = require("../controller/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { checkPermissions } = require("../middlewares/checkPermission");
const { filterAdminPermissions } = require("../middlewares/filterAdminPermissions"); // ✅ Import middleware

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/current-user", authMiddleware, getUser);

// ✅ Assign permissions (Only if user has `can_edit` permission)
// router.post("/assign-permissions", authMiddleware.verifyToken, checkPermissions, assignPermissions);
router.post("/assign-permission", authMiddleware, assignPermission);


module.exports = router;