const supertest = require('supertest');
const app = require('../../server');
const SweetService = require('../services/sweetService');
jest.mock('../services/sweetService');

describe('Purchase Sweet API', () => {
  beforeEach(() => jest.clearAllMocks());

  // Red: Sweet not found
  test('should return 404 if sweet does not exist', async () => {
    SweetService.findById.mockResolvedValue(null);

    const res = await supertest(app)
      .post('/api/sweets/abc123/purchase') // ✅ FIXED ROUTE
      .send({ quantity: 3 });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Sweet not found');
  });

  // Red: Insufficient stock
  test('should return 400 if stock is insufficient', async () => {
    SweetService.findById.mockResolvedValue({ _id: 'abc123', name: 'Barfi', quantity: 2 });

    const res = await supertest(app)
      .post('/api/sweets/abc123/purchase')
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Insufficient stock'); // ✅ MATCH CONTROLLER
  });

  //  Green: Purchase successful
  test('should successfully purchase sweet and reduce stock', async () => {
    const sweetBefore = { _id: 'abc123', name: 'Barfi', quantity: 10 };
    const sweetAfter = { ...sweetBefore, quantity: 7 };

    SweetService.findById.mockResolvedValue(sweetBefore);
    SweetService.updateById.mockResolvedValue(sweetAfter); // ✅ FIXED METHOD

    const res = await supertest(app)
      .post('/api/sweets/abc123/purchase')
      .send({ quantity: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.updatedSweet.quantity).toBe(7);
    expect(res.body.message).toBe('Purchase successful');
  });

  // Red: Invalid quantity
  test('should return 400 if quantity is not a positive number', async () => {
    const res = await supertest(app)
      .post('/api/sweets/abc123/purchase')
      .send({ quantity: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Invalid quantity');
  });
});
