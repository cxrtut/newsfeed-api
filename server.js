const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoutes"); // Path to your sign-in router



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/news", require("./routes/newsRoutes"));
// Use the sign-in router
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
