// routes/sweetRoutes.js
import express from 'express';
import { addSweet } from '../controllers/sweetController.js';
const router = express.Router();

// Route: POST /api/sweets
router.post('/', addSweet);

export default router;
