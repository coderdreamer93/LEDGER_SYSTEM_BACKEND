const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  assignPermissions
} = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authMiddleware, getUser);
router.post("/assign-permissions", assignPermissions);


module.exports = router;