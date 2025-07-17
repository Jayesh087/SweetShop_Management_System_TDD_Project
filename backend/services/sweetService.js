const Sweet = require('../models/Sweet');

const createSweet = async ({ name, category, price, quantity }) => {
  const existing = await Sweet.findOne({ name });
  if (existing) throw new Error('Sweet already exists');

  const sweet = new Sweet({ name, category, price, quantity });
  return await sweet.save();
};

const findById = async (id) => {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) return null; // handle invalid ObjectId
  return await Sweet.findById(id);
};

const updateById = async (id, updateData) => {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) return null;
  return await Sweet.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

const deleteById = async (id) => {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) return null;
  return await Sweet.findByIdAndDelete(id);
};

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
  updateById,
  deleteById,
  searchSweets
};

module.exports = SweetService;
