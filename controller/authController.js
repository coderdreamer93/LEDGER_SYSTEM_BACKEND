const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("Registering user:", name, email); // Debugging ke liye

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error); // Yeh error terminal mein print hoga
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// const registerController = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ success: true, message: "User registered successfully" });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ success: false, message: "Error in Register API", error });
//   }
// };
// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // ✅ Agar email exist nahi karti to "User not found" bhejo
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",  // ✅ Success message bhejna
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
    // res.status(200).json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Current User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



/**
 * Assign permissions to a user.
 * Only users with `can_edit` permission can assign permissions.
 */
exports.assignPermission = async (req, res) => {
  try {
      const { userId, permission } = req.body;

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // ✅ Admin ke liye permission update na ho
      if (user.role === "admin") {
          return res.status(400).json({ message: "Admin users cannot have permissions assigned" });
      }

      console.log("Before update:", user.permissions); // Debugging

      // Ensure the update operation
      user.permissions.can_update = permission.can_update;
      user.permissions.can_delete = permission.can_delete;

      await user.save();

      console.log("After update:", user.permissions); // Debugging

      res.status(200).json({ message: "Permissions updated successfully", user });
  } catch (error) {
      console.error("Error in assignPermission:", error);
      res.status(500).json({ message: error.message });
  }
};


