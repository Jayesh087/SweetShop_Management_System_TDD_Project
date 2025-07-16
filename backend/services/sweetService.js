const Sweet = require('../models/Sweet');

// Add Sweet
const createSweet = async ({ name, category, price, quantity }) => {
  const existing = await Sweet.findOne({ name });
  if (existing) throw new Error('Sweet already exists');

  const sweet = new Sweet({ name, category, price, quantity });
  return await sweet.save();
};

// Find Sweet by ID
const findById = async (id) => {
  return await Sweet.findById(id);
};

// Delete Sweet by ID
const deleteById = async (id) => {
  return await Sweet.findByIdAndDelete(id);
};

const SweetService = {
  createSweet,
  findById,
  deleteById
};

module.exports = SweetService;
