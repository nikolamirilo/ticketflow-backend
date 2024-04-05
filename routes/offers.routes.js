import express from "express";
import {
  deleteOffer,
  getAllOffers,
  updateOffer,
  getSingleOffer,
  createOffer,
} from "../controllers/offers.controllers.js";
import { pythonScript } from "../controllers/test.controller.js";

const offerRoutes = express.Router();

offerRoutes.get("/offers", getAllOffers);
offerRoutes.get("/offers/:id", getSingleOffer);
offerRoutes.post("/offers", createOffer);
offerRoutes.patch("/offers/:id", updateOffer);
offerRoutes.delete("/offers/:id", deleteOffer);
offerRoutes.get("/test", pythonScript);

export default offerRoutes;
