const express = require('express');
const { addSweet, deleteSweet, searchSweets } = require('../controllers/sweetController');

const router = express.Router();

// ✅ Add new sweet
router.post('/', addSweet);

// ✅ Delete a sweet by ID
router.delete('/:id', deleteSweet);

// ✅ Search sweets by filters (name, category, price range)
router.get('/search', searchSweets);

module.exports = router;
