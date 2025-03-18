// const User = require("../models/User"); // Ensure correct path

// const checkPermissions = (permission) => async (req, res, next) => {
//     try {
//         if (!req.user || !req.user.userId) {
//             return res.status(401).json({ message: "Unauthorized! Please log in." });
//         }

//         // Fetch user from database
//         const user = await User.findById(req.user.userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // Check if user has the required permission
//         if (!user.permissions || user.permissions[permission] !== true) {
//             return res.status(403).json({ message: `Access Denied! Missing permission: ${permission}` });
//         }

//         next(); // User has permission, proceed
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };

// module.exports = { checkPermissions };
exports.checkPermission = (permission) => {
    return (req, res, next) => {
        console.log("User Permissions:", req.user?.permissions);

        if (!req.user || !req.user.permissions || !req.user.permissions[permission]) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};
