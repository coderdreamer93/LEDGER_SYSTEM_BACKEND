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

// ✅ Ensure admin users don't have permissions field
// ✅ Set permissions based on role before saving
userSchema.pre("save", function (next) {
  if (this.role === "admin") {
    this.permissions = { can_update: true, can_delete: true };  // ✅ Admin permissions always true
  } else {

    // ✅ Set default values as boolean
    this.permissions.can_update = Boolean(this.permissions.can_update);
    this.permissions.can_delete = Boolean(this.permissions.can_delete);

  }
  next();
});

module.exports = mongoose.model("User", userSchema);
