// services/sweetService.js
import Sweet from '../models/Sweet.js';

const createSweet = async ({ name, category, price, quantity }) => {
  const existing = await Sweet.findOne({ name });
  if (existing) throw new Error('Sweet already exists');

  const sweet = new Sweet({ name, category, price, quantity });
  return await sweet.save();
};

const SweetService = { createSweet };
export default SweetService;
