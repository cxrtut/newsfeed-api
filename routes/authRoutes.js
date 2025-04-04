const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware to verify authentication
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const user = await User.findOne({ username });
        console.log({user})
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/login", async (req, res) => {
    res.json({testData: "sucssess"})
})

module.exports = router;