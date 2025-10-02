import { Router } from "express";
import starsRouter from "./stars";

const api = Router();

api.use("/stars", starsRouter);
api.use((_, res) => {
  res.sendStatus(404);
});

export default api;
