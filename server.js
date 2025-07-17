// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sweetRoutes = require("./backend/routes/sweetRoutes");
const { errorHandler, notFound } = require("./backend/middleware/errorMiddleware");
const connectDB = require("./backend/config/db");

dotenv.config();            // ✅ Load .env variables
connectDB();                // ✅ Connect to MongoDB

const app = express();

// ✅ Core Middlewares
app.use(cors());
app.use(express.json());    // for parsing JSON request bodies

// ✅ Root API Health Check
app.get("/", (req, res) => {
  res.send("🍬 Sweet Shop API is running...");
});

// ✅ API Routes
app.use("/api/sweets", sweetRoutes); // All sweet routes (add, delete, purchase, restock, search)

// ✅ 404 & Error Handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Export app for testing
module.exports = app;

// ✅ Start server only if NOT in test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
