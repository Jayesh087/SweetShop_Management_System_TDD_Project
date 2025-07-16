const express = require('express');
const {
  addSweet,
  deleteSweet,
  searchSweets,
  purchaseSweet,
  restockSweet // ✅ import added
} = require('../controllers/sweetController');

const router = express.Router();

// ✅ Add new sweet
router.post('/', addSweet);

// ✅ Delete a sweet by ID
router.delete('/:id', deleteSweet);

// ✅ Search sweets by filters (name, category, price range)
router.get('/search', searchSweets);

// ✅ Purchase sweet
router.post('/:id/purchase', purchaseSweet);
// ✅ Restock sweet
router.post('/restock', restockSweet);


module.exports = router;
