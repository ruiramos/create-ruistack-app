import { Router } from "express";
import getStars from "~/server/handlers/get-stars";

const starsApi = Router();

starsApi.get("/", getStars);

export default starsApi;
