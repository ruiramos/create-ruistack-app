import { z, ZodError } from "zod";
import type { RequestHandler, Request, Response } from "express";

type ParsedData<Q, B> = {
  query: Q extends z.ZodTypeAny ? z.infer<Q> : undefined;
  body: B extends z.ZodTypeAny ? z.infer<B> : undefined;
};

type RouteHandler<Q, B> = (
  req: Request,
  res: Response,
  data: ParsedData<Q, B>,
) => void | Promise<void>;

interface RouteBuilder<Q, B> {
  withQueryParams<NewQ extends z.ZodTypeAny>(
    schema: NewQ,
  ): RouteBuilder<NewQ, B>;
  withBody<NewB extends z.ZodTypeAny>(schema: NewB): RouteBuilder<Q, NewB>;
  handle(handler: RouteHandler<Q, B>): RequestHandler;
}

export function createRouteHandler<
  Q extends z.ZodTypeAny | undefined = undefined,
  B extends z.ZodTypeAny | undefined = undefined,
>(querySchema?: Q, bodySchema?: B): RouteBuilder<Q, B> {
  return {
    withQueryParams<NewQ extends z.ZodTypeAny>(schema: NewQ) {
      return createRouteHandler(schema, bodySchema);
    },

    withBody<NewB extends z.ZodTypeAny>(schema: NewB) {
      return createRouteHandler(querySchema, schema);
    },

    handle(handler: RouteHandler<Q, B>): RequestHandler {
      return async (req: Request, res: Response) => {
        let query: any = undefined;
        let body: any = undefined;

        // Parse query parameters
        if (querySchema) {
          try {
            query = querySchema.parse(req.query);
          } catch (error) {
            if (error instanceof ZodError) {
              res.status(400).json({
                error: { field: "query", details: error.issues },
              });
              return;
            }
            res.status(500).json({ error: "Invalid query parameters" });
            return;
          }
        }

        // Parse request body
        if (bodySchema) {
          try {
            body = bodySchema.parse(req.body);
          } catch (error) {
            if (error instanceof ZodError) {
              res.status(400).json({
                error: { field: "body", details: error.issues },
              });
              return;
            }
            res.status(500).json({ error: "Invalid request body" });
            return;
          }
        }

        const data: ParsedData<Q, B> = { query, body };
        return handler(req, res, data);
      };
    },
  };
}
