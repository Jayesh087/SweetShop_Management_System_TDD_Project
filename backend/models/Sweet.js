// models/Sweet.js

const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sweet name is required"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ['Chocolate', 'Candy', 'Pastry', 'Nut-Based', 'Milk-Based', 'Vegetable-Based'],
        message: '{VALUE} is not a valid sweet category'
      }
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be non-negative"]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity must be non-negative"]
    }
  },
  { timestamps: true } // adds createdAt and updatedAt
);

const Sweet = mongoose.model('Sweet', sweetSchema);

module.exports = Sweet;
