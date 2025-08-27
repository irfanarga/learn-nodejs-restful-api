import supertest from "supertest";
import { web } from "../src/application/web.js";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContact,
  removeTestUser,
} from "./test-util";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can create contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@mail.com",
        phone: "08090000000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
    expect(result.body.data.phone).toBe("08090000000");
    expect(result.body.data.id).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "test",
        email: "test@mail.com",
        phone: "0809000000034343434343434343434343434343434343434",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@mail.com");
    expect(result.body.data.phone).toBe("08090000000");
    expect(result.body.data.id).toBe(testContact.id);
  });

  it("should return 404 if contact id not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "Irfan",
        last_name: "Arga",
        email: "irfan@mail.com",
        phone: "08090000001",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("Irfan");
    expect(result.body.data.last_name).toBe("Arga");
    expect(result.body.data.email).toBe("irfan@mail.com");
    expect(result.body.data.phone).toBe("08090000001");
    expect(result.body.data.id).toBe(testContact.id);
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "irfan",
        phone: "",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
  });

  it("should reject if contact id not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test")
      .send({
        first_name: "Irfan",
        last_name: "Arga",
        email: "irfan@mail.com",
        phone: "08090000001",
      });

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
