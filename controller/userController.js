    const User = require("../models/User");
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");

    // ✅ Create New User
    const createUser = async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            // 🔹 Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // 🔹 Hash the password
            // const hashedPassword = await bcrypt.hash(password, 10);

            // 🔹 Save new user
            const newUser = new User({ name, email, password, role });
            await newUser.save();

            res.status(201).json({ message: "User created successfully", user: newUser, role });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Server Error" });
        }
    };


    // ✅ Get All Users
    const getUsers = async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Server Error" });
        }
    };

    module.exports = { createUser, getUsers };
