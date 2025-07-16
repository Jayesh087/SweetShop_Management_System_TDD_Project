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

const deleteSweet = async (req, res) => {
  try {
    const sweet = await SweetService.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ success: false, message: 'Sweet not found' });
    }

    await SweetService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchSweets = async (req, res) => {
  try {
    const results = await SweetService.searchSweets(req.query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const purchaseSweet = async (req, res) => {
  try {
    const sweet = await SweetService.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ success: false, message: "Sweet not found" });
    }

    const { quantity } = req.body;

    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Invalid quantity" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }

    sweet.quantity -= quantity;

    const updatedSweet = await SweetService.updateById(req.params.id, sweet);

    res.status(200).json({
      success: true,
      message: "Purchase successful",
      updatedSweet
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  addSweet,
  deleteSweet,
  searchSweets,
  purchaseSweet // ✅ Exported new controller
};
