const express = require('express');
const { addSweet, deleteSweet } = require('../controllers/sweetController');

const router = express.Router();

// ✅ Route: Add sweet
router.post('/', addSweet);

// ✅ Route: Delete sweet by ID
router.delete('/:id', deleteSweet);

module.exports = router;
