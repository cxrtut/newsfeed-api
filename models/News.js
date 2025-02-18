const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    date: { type: Date, default: Date.now },
    story: { type: String, required: true }
});

module.exports = mongoose.model("News", NewsSchema);
