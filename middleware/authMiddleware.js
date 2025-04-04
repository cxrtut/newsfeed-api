const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify authentication
const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // Exclude password
        if (!req.user) return res.status(401).json({ message: "User not found" });
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Middleware to check if the user is an admin
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    next();
};

module.exports = { authenticateUser, authorizeAdmin };