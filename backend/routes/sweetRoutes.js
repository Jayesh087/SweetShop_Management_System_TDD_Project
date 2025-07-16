const express = require('express');
const {
  addSweet,
  deleteSweet,
  searchSweets,
  purchaseSweet // ✅ import added
} = require('../controllers/sweetController');

const router = express.Router();

// ✅ Add new sweet
router.post('/', addSweet);

// ✅ Delete a sweet by ID
router.delete('/:id', deleteSweet);

// ✅ Search sweets by filters (name, category, price range)
router.get('/search', searchSweets);

// ✅ Purchase sweet by ID
router.post('/:id/purchase', purchaseSweet); // ✅ NEW route added

module.exports = router;
