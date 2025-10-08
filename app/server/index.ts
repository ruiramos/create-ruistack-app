import express from "express";
import ViteExpress from "vite-express";
import env from "./lib/env";
import apiRouter from "./routes";

export const createExpressApp = () => {
  const app = express();
  app.use("/api", apiRouter);
  app.use(express.static("public"));

  return app;
};

const app = createExpressApp();
const { PORT } = env;

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}`),
);
