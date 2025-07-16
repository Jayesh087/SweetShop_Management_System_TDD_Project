const request = require('supertest');
const app = require('../../server');

describe('Add Sweet API', () => {
  test('should fail when name is missing', async () => {
    const res = await request(app).post('/api/v1/sweets/add').send({ price: 10 });
    expect(res.statusCode).toBe(400);
  });
});
