// vitest.setup.ts
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server/utils/mocks";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
