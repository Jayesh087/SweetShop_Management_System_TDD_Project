// backend/tests/SearchSweet.test.js
const supertest = require('supertest');
const app = require('../../server');
const SweetService = require('../services/sweetService');
jest.mock('../services/sweetService');

describe('Search Sweet API', () => {
  beforeEach(() => jest.clearAllMocks());

  const sweets = [
    { name: 'Kaju Katli', category: 'Nut-Based', price: 50 },
    { name: 'Gulab Jamun', category: 'Milk-Based', price: 20 },
    { name: 'Ladoo', category: 'Nut-Based', price: 30 }
  ];

  // 🟢 Search by name
  test('should return sweets matching partial name', async () => {
    SweetService.searchSweets.mockResolvedValue([sweets[1]]);

    const res = await supertest(app)
      .get('/api/sweets/search?name=jamun');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name.toLowerCase()).toContain('jamun');
  });

  // 🟢 Search by category
  test('should return sweets by category match', async () => {
    SweetService.searchSweets.mockResolvedValue([sweets[0], sweets[2]]);

    const res = await supertest(app)
      .get('/api/sweets/search?category=Nut-Based');

    expect(res.statusCode).toBe(200);
    expect(res.body.every(item => item.category === 'Nut-Based')).toBe(true);
  });

  // 🟢 Search by price range
  test('should return sweets within price range', async () => {
    SweetService.searchSweets.mockResolvedValue([sweets[1], sweets[2]]);

    const res = await supertest(app)
      .get('/api/sweets/search?minPrice=10&maxPrice=35');

    expect(res.statusCode).toBe(200);
    expect(res.body.every(s => s.price >= 10 && s.price <= 35)).toBe(true);
  });

  // 🟢 Search by combined filters
  test('should return sweets by name, category, and price', async () => {
    SweetService.searchSweets.mockResolvedValue([sweets[0]]);

    const res = await supertest(app)
      .get('/api/sweets/search?name=katli&category=Nut-Based&minPrice=10&maxPrice=60');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name.toLowerCase()).toContain('katli');
    expect(res.body[0].category).toBe('Nut-Based');
  });

  // 🔴 No matches found
  test('should return empty array for unmatched query', async () => {
    SweetService.searchSweets.mockResolvedValue([]);

    const res = await supertest(app)
      .get('/api/sweets/search?name=notfound');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // 🔴 Handle service error
  test('should handle internal server error', async () => {
    SweetService.searchSweets.mockImplementation(() => {
      throw new Error('Unexpected failure');
    });

    const res = await supertest(app)
      .get('/api/sweets/search?name=katli');

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Unexpected failure');
  });
});
