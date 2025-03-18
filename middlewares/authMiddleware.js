
// const jwt = require("jsonwebtoken");

// const authMiddleware = (roles = []) => {
//   return (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; 

//       // Role verification
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
//       }

//       next();
//     } catch (error) {
//       return res.status(401).json({ message: "Invalid Token" });
//     }
//   };
// };

// module.exports = authMiddleware;
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const token = req.header("Authorization");

//     if (!token) {
//         return res.status(401).json({ message: "Access Denied! No token provided." });
//     }

//     try {
//         const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Invalid Token" });
//     }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "No token, authorization denied" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) return res.status(404).json({ message: "User not found" });

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};



// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     try {
//         const token = req.header("Authorization")?.replace("Bearer ", "");
//         if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ error: "Invalid token" });
//     }
// };
