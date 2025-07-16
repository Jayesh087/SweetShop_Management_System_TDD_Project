const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sweetRoutes = require("./backend/routes/sweetRoutes");
const {
  errorHandler,
  notFound,
} = require("./backend/middleware/errorMiddleware");

dotenv.config();

const app = express();

// 🔐 Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// 👋 Root route
app.get("/", (req, res) => {
  res.send("🍬 Sweet Shop API is running...");
});

// 📦 Sweet APIs
app.use("/api/sweets", sweetRoutes);

// ❌ Handle 404s
app.use(notFound);

// 💥 Error handler
app.use(errorHandler);

// 🧪 Export app for tests
module.exports = app;

// 🚀 Start server if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
