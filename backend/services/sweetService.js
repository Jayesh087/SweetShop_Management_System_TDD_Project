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

// Search sweets by filters (name, category, price range)
const searchSweets = async (query) => {
  const searchQuery = {};

  if (query.name) {
    searchQuery.name = new RegExp(query.name, 'i'); // case-insensitive partial match
  }
  if (query.category) {
    searchQuery.category = query.category;
  }
  if (query.minPrice || query.maxPrice) {
    searchQuery.price = {};
    if (query.minPrice) searchQuery.price.$gte = Number(query.minPrice);
    if (query.maxPrice) searchQuery.price.$lte = Number(query.maxPrice);
  }

  return await Sweet.find(searchQuery);
};

const SweetService = {
  createSweet,
  findById,
  deleteById,
  searchSweets // ✅ Added for search functionality
};

module.exports = SweetService;
