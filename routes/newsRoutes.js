const express = require("express");
const router = express.Router();
const News = require("../models/News");

// Add a News Post
router.post("/", async (req, res) => {
    try {
        const { heading, story } = req.body;
        if (!heading || !story) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const news = new News({ heading, story });
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All News
router.get("/", async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a News Post by ID
router.delete("/:id", async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
