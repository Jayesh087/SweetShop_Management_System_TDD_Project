const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'Chocolate',
          'Candy',
          'Pastry',
          'Nut-Based',
          'Milk-Based',
          'Vegetable-Based'
        ],
        message: '{VALUE} is not a valid sweet category'
      }
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be 0 or more']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be 0 or more']
    }
  },
  {
    timestamps: true
  }
);


const Sweet = mongoose.model('Sweet', sweetSchema);
module.exports = Sweet;
