exports.filterAdminPermissions = (req, res, next) => {
    if (req.body.role === "admin") {
      delete req.body.permissions; // ✅ Admin ke liye permissions object hata do
    }
    next();
  };
  