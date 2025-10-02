import z from "zod";
import { getRepoStars } from "~/server/services/github";
import { createRouteHandler } from "~/server/utils/create-route-handler";

const getStars = createRouteHandler()
  .withQueryParams(z.object({ repo: z.string() }))
  .handle(async (_req, res, { query }) => {
    const { repo } = query;
    try {
      const stars = await getRepoStars(repo);
      res.json({ stars });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

export default getStars;
