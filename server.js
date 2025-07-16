import express from 'express';
const app = express();
app.use(express.json());

app.post('/api/sweets', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  res.status(201).json({ message: 'Sweet added' });
});

export default app;

// Run only if not testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => console.log('Server running'));
}
