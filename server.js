// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sweetRoutes from './routes/sweetRoutes.js'; // ⬅️ Route file
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ⬅️ Important for req.body parsing

// Routes
app.use('/api/sweets', sweetRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Export app for Supertest (don't start server directly)
export default app;


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
