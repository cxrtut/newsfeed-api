const express = require("express");
const router = express.Router();
const News = require("../models/News");

// Get News Count
router.get("/count", async (req, res) => {
    try {
        const count = await News.countDocuments();
        res.status(200).json({ 
            success: true,
            count 
        });
    } catch (error) {
        console.error('Error fetching news count:', error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Get All News
router.get("/", async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.status(200).json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Get Single News
router.get("/:id", async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        res.status(200).json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Error fetching single news:', error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Add a News Post
router.post("/", async (req, res) => {
    try {
        const { heading, story } = req.body;
        if (!heading || !story) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required." 
            });
        }
        const news = new News({ heading, story });
        await news.save();
        res.status(201).json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Update News
router.put("/:id", async (req, res) => {
    try {
        const { heading, story } = req.body;
        if (!heading || !story) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required." 
            });
        }

        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            { heading, story },
            { new: true, runValidators: true }
        );

        if (!updatedNews) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedNews
        });
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Delete News
router.delete("/:id", async (req, res) => {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id);
        if (!deletedNews) {
            return res.status(404).json({
                success: false,
                message: "News not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "News deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

module.exports = router;
