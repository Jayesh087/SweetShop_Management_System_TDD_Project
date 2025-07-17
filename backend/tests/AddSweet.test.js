const supertest = require("supertest");
const app = require("../../server");
const SweetService = require("../services/sweetService");
jest.mock("../services/sweetService");

describe("🍬 Add Sweet API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // RED PHASE - INVALID CASES
  test("should fail when name is missing", async () => {
    const sweet = {
      category: "Candy",
      price: 10,
      quantity: 20,
    };

    const res = await supertest(app)
      .post("/api/sweets")
      .send(sweet);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Validation Error");
  });

  test("should fail when price is negative", async () => {
    const sweet = {
      name: "Jalebi",
      category: "Candy",
      price: -5,
      quantity: 20,
    };

    const res = await supertest(app).post("/api/sweets").send(sweet);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Validation Error");
  });

  //  GREEN PHASE - VALID CASE
  test("should add sweet with valid data", async () => {
    const newSweet = {
      name: "Jalebi",
      category: "Candy",
      price: 15,
      quantity: 20,
    };

    jest.spyOn(SweetService, "createSweet").mockResolvedValue({
      _id: "abc123",
      ...newSweet,
    });

    const res = await supertest(app)
      .post("/api/sweets")
      .send(newSweet);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.newSweet.name).toBe("Jalebi");
  });

  //  EXTRA: Should not allow duplicate sweet name
  test("should fail if sweet already exists", async () => {
    const duplicateSweet = {
      name: "Jalebi",
      category: "Candy",
      price: 15,
      quantity: 10,
    };

    jest.spyOn(SweetService, "createSweet").mockImplementation(() => {
      throw new Error("Sweet already exists");
    });

    const res = await supertest(app)
      .post("/api/sweets")
      .send(duplicateSweet);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Sweet already exists");
  });

  //  PERFORMANCE CHECK
  test("should respond within 1 second", async () => {
    const sweet = {
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 25,
    };

    jest.spyOn(SweetService, "createSweet").mockResolvedValue({
      _id: "xyz456",
      ...sweet,
    });

    const start = Date.now();
    const res = await supertest(app).post("/api/sweets").send(sweet);
    const duration = Date.now() - start;

    expect(res.statusCode).toBe(201);
    expect(duration).toBeLessThan(1000);
  });
});
