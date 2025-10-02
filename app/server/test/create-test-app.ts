import { createExpressApp } from "../";
import request from "supertest";

export default function createTestApp() {
  const app = createExpressApp();
  return {
    app,
    httpClient: request(app),
  };
}
