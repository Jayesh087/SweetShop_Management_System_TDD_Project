const express = require('express');
const { addSweet } = require('../controllers/sweetController');

const router = express.Router();

// Route: POST /api/sweets
router.post('/', addSweet);

module.exports = router;
