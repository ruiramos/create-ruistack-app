import z from "zod";
import { Response } from "express";
import { getRepoStars } from "~/server/services/github";
import { createRouteHandler } from "~/server/lib/create-route-handler";
import { StarsResponse } from "types";

const getStars = createRouteHandler()
  .withQueryParams(z.object({ repo: z.string() }))
  .handle(
    async (
      _req,
      res: Response<StarsResponse | { error: string }>,
      { query },
    ) => {
      const { repo } = query;
      try {
        const stars = await getRepoStars(repo);
        res.json({ stars: stars });
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    },
  );

export default getStars;
