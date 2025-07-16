const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/v1/sweets/add', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  res.status(201).json({ message: 'Sweet added' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => console.log('Server started on 5000'));
}

module.exports = app;
