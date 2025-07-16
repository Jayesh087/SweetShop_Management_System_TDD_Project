const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sweetRoutes = require('./backend/routes/sweetRoutes');
const { errorHandler, notFound } = require('./backend/middleware/errorMiddleware');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sweets', sweetRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
