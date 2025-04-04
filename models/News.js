const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    heading: { 
        type: String, 
        required: true,
        trim: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    story: { 
        type: String, 
        required: true,
        trim: true
    },
    User: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("News", NewsSchema);

