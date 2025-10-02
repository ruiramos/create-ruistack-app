import { Router } from "express";
import getStars from "./get-stars";

const starsApi = Router();

starsApi.get("/", getStars);

export default starsApi;
