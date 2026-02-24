require("dotenv").config();

const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");
const limiter = require("./middlewares/rateLimiter");

require("./db");

const app = express();

// ✅ THIS MUST BE BEFORE ROUTES
app.use(cors());
app.use(express.json());  // 🔥 VERY IMPORTANT
app.use(limiter);
app.get("/", (req, res) => {
  res.send("AI Support Assistant Backend Running 🚀");
});

// Routes
app.use("/api", chatRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});