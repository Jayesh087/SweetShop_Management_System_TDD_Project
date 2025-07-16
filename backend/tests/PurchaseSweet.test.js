const request = require("supertest");
const app = require("../../server"); // Or "../app" if app and server are split
const SweetService = require("../services/sweetService");

jest.mock("../services/sweetService");

describe("POST /api/sweets/:id/purchase", () => {
  const sweetId = "64a8a2b3f2764c001234abcd"; // mock ObjectId
  const existingSweet = {
    _id: sweetId,
    name: "Kaju Katli",
    category: "Traditional",
    price: 300,
    quantity: 10
  };

  it("should return 404 if sweet not found", async () => {
    SweetService.findById.mockResolvedValue(null);

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Sweet not found");
  });

  it("should return 400 if not enough stock", async () => {
    SweetService.findById.mockResolvedValue({ ...existingSweet });

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .send({ quantity: 20 }); // greater than available

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Insufficient stock");
  });

  it("should purchase sweet successfully", async () => {
    SweetService.findById.mockResolvedValue({ ...existingSweet });
    SweetService.updateById.mockResolvedValue({
      ...existingSweet,
      quantity: 5 // After purchase
    });

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Purchase successful");
    expect(res.body.updatedSweet.quantity).toBe(5);
  });
});
