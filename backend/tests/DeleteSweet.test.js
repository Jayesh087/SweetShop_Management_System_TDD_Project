const supertest = require('supertest');
const app = require('../../server');
const SweetService = require('../services/sweetService');
jest.mock('../services/sweetService');


describe('Delete Sweet API', () => {
  beforeEach(() => jest.clearAllMocks());

  //  Red Phase: Sweet not found
  test('should return 404 if sweet does not exist', async () => {
    SweetService.findById.mockResolvedValue(null);

    const res = await supertest(app)
      .delete('/api/sweets/invalid-id')
      .set('Authorization', `Bearer valid-token`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Sweet not found');
  });

  // Green Phase: Successfully delete sweet
  test('should successfully delete a sweet', async () => {
    SweetService.findById.mockResolvedValue({ _id: 'abc123', name: 'Jalebi' });
    SweetService.deleteById.mockResolvedValue(true);

    const res = await supertest(app)
      .delete('/api/sweets/abc123')
      .set('Authorization', `Bearer valid-token`);

    expect(res.statusCode).toBe(204);
  });

  // Red Phase: Invalid ID format
  test('should handle invalid ID format', async () => {
    SweetService.findById.mockImplementation(() => {
      throw new Error('Cast to ObjectId failed');
    });

    const res = await supertest(app)
      .delete('/api/sweets/invalid!')
      .set('Authorization', `Bearer valid-token`);

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
  });
});