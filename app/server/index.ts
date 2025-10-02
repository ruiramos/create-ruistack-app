import express from "express";
import ViteExpress from "vite-express";
import apiRouter from "./routes";

const PORT = 3000;

export const createExpressApp = () => {
  const app = express();
  app.use("/api", apiRouter);
  app.use(express.static("public"));

  return app;
};

const app = createExpressApp();
ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}`),
);
