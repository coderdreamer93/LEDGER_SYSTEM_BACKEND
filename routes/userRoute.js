const express = require("express");
const { createUser, getUsers } = require("../controller/userController");

const router = express.Router();

// ✅ Create New User Route
router.post("/create-user", createUser);

router.get("/users", getUsers)

module.exports = router;
