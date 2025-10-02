import { http, HttpResponse } from "msw";
import { beforeAll, describe, expect, test } from "vitest";
import createTestApp from "~/server/utils/create-test-app";
import { server } from "~/server/utils/mocks";

const EXAMPLE_REPO = "example/repo";
const STARS = 999;

describe("get-stars", () => {
  const app = createTestApp();

  test("gets the number of stars from the example repo", async () => {
    server.use(
      http.get("https://api.github.com/repos/" + EXAMPLE_REPO, () => {
        return HttpResponse.json({
          stargazers_count: STARS,
        });
      }),
    );

    const response = await app.request
      .get("/api/stars?repo=" + EXAMPLE_REPO)
      .set("Accept", "application/json");

    expect(response.body).toEqual({ stars: STARS });
  });

  test("returns 400 if repo is not provided", async () => {
    const response = await app.request.get("/api/stars");
    expect(response.status).toEqual(400);
  });

  test("returns 500 if failed to retrieve repo", async () => {
    server.use(
      http.get("https://api.github.com/repos/not/found", () => {
        return new HttpResponse(null, { status: 404 });
      }),
    );

    const response = await app.request.get("/api/stars?repo=not/found");
    expect(response.status).toEqual(500);
  });
});
