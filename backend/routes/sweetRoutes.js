const express = require('express');
const {
  addSweet,
  deleteSweet,
  searchSweets,
  purchaseSweet,
  restockSweet
} = require('../controllers/sweetController');

const router = express.Router();

router.post('/', addSweet);

router.delete('/:id', deleteSweet);

router.get('/search', searchSweets);

router.post('/:id/purchase', purchaseSweet);

router.post('/:id/restock', restockSweet);

module.exports = router;
