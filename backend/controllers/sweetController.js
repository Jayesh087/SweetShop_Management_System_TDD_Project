const SweetService = require('../services/sweetService');

const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (
      !name ||
      !category ||
      typeof price !== 'number' ||
      typeof quantity !== 'number' ||
      price < 0 ||
      quantity < 0
    ) {
      return res.status(400).json({ success: false, message: 'Validation Error' });
    }

    const sweet = await SweetService.createSweet({ name, category, price, quantity });
    res.status(201).json({ success: true, newSweet: sweet, message: 'Sweet added successfully' });
  } catch (error) {
    if (error.message === 'Sweet already exists') {
      return res.status(409).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { addSweet };
