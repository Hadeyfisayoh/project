const request = require("supertest");
const app = require("../../app");
describe("Test GET /launches", () => {
  test("it should  respond with 200 sucess", async () => {
    await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "Uss wy",
    rocket: "tyz",
    target: "Kepler-186",
    launchDate: "January 18, 2040",
  };

  const launchDataWithoutDate = {
    mission: "Uss wy",
    rocket: "tyz",
    target: "Kepler-186",
  };

  const launchDataWithInvalidDate = {
    mission: "Uss wy",
    rocket: "tyz",
    target: "Kepler-186",
    launchDate: "ken",
  };
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Mssing required launch property",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
