const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'admin' },
  permissions: {
    can_update: { type: Boolean, default: false },
    can_delete: { type: Boolean, default: false }
}
}, { timestamps: true, strict: false });  // 👈 Fix Added

module.exports = mongoose.model("User", userSchema);
