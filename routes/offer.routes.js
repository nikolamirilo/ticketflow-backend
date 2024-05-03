import express from "express";
import {
  deleteOffer,
  getAllOffers,
  updateOffer,
  getSingleOffer,
  createOffer,
  getEventsOffer,
} from "../controllers/offer.controllers.js";

const offerRoutes = express.Router();

offerRoutes.get("/offers", getAllOffers);
offerRoutes.get("/offers/:id", getSingleOffer);
offerRoutes.get("/offers/events/:id", getEventsOffer);
offerRoutes.post("/offers", createOffer);
offerRoutes.patch("/offers/:id", updateOffer);
offerRoutes.delete("/offers/:id", deleteOffer);

export default offerRoutes;
