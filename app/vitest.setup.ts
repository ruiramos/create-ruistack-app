// vitest.setup.ts
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server/test/mock-service-worker/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
