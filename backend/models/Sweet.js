const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Chocolate', 'Candy', 'Pastry', 'Nut-Based', 'Milk-Based', 'Vegetable-Based']
  },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const Sweet = mongoose.model('Sweet', sweetSchema);

module.exports = Sweet;
