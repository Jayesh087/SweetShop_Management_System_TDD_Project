const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server"); // Adjust if needed
const Sweet = require("../models/Sweet");
const connectDB = require("../config/db");

describe("POST /api/sweets/:id/restock", () => {
  let server;
  let sweet;

  beforeAll(async () => {
    await connectDB();
    server = app.listen(5001); // Use a separate port for testing if needed
  });

  beforeEach(async () => {
    await Sweet.deleteMany();
    sweet = await Sweet.create({
      name: "Ladoo",
      category: "Milk-Based",
      price: 20,
      quantity: 10
    });
  });

  afterAll(async () => {
    await Sweet.deleteMany();
    await mongoose.connection.close();
    server.close();
  });

  it("should return 400 for invalid quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .send({ quantity: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid quantity");
  });

  it("should return 404 if sweet not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .post(`/api/sweets/${fakeId}/restock`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Sweet not found");
  });

  it("should restock sweet successfully", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Restock successful");
    expect(res.body.updatedSweet.quantity).toBe(15); // 10 + 5
  });
});
