// backend/tests/restockSweet.test.js
const supertest = require('supertest');
const app = require('../../server');
const SweetService = require('../services/sweetService');
jest.mock('../services/sweetService');

describe('Restock Sweet API', () => {
  beforeEach(() => jest.clearAllMocks());

  // 🔴 Red: Sweet not found
  test('should return 404 if sweet does not exist', async () => {
    SweetService.findById.mockResolvedValue(null);

    const res = await supertest(app)
      .post('/api/sweets/restock')
      .send({ id: 'nonexistent-id', quantity: 5 });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Sweet not found');
  });

  // 🔴 Red: Invalid restock quantity
  test('should return 400 if quantity is not a positive number', async () => {
    const res = await supertest(app)
      .post('/api/sweets/restock')
      .send({ id: 'abc123', quantity: -3 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Invalid quantity');
  });

  // 🟢 Green: Successfully restock
  test('should successfully increase stock quantity', async () => {
    SweetService.findById.mockResolvedValue({ _id: 'abc123', name: 'Kaju Katli', quantity: 10 });
    SweetService.updateById.mockResolvedValue({ _id: 'abc123', name: 'Kaju Katli', quantity: 15 });

    const res = await supertest(app)
      .post('/api/sweets/restock')
      .send({ id: 'abc123', quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.updatedSweet.quantity).toBe(15);
    expect(res.body.message).toBe('Restock successful');
  });
});
