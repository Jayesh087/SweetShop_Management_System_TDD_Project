import request from 'supertest';
import app from '../server.js';

describe('Add Sweet API', () => {
  test('should return 400 if name is missing', async () => {
    const res = await request(app).post('/api/sweets').send({ price: 10 });
    expect(res.statusCode).toBe(400);
  });
});



