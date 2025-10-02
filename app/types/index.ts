import z from "zod";

export const starsResponse = z.object({
  stars: z.number().min(0),
});

export type StarsResponse = z.infer<typeof starsResponse>;
