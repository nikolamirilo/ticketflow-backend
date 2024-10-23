const express = require("express");
const {
  deleteOffer,
  getAllOffers,
  updateOffer,
  getSingleOffer,
  createOffer,
  getEventOffers,
  getRecommendedOffers,
} = require("../controllers/offer.controllers.js");

const offerRoutes = express.Router();

offerRoutes.get("/offers", getAllOffers);
offerRoutes.get("/offers/recommended", getRecommendedOffers);
offerRoutes.get("/offers/:id", getSingleOffer);
offerRoutes.get("/offers/events/:eventId", getEventOffers);
offerRoutes.post("/offers", createOffer);
offerRoutes.patch("/offers/:id", updateOffer);
offerRoutes.delete("/offers/:id", deleteOffer);

module.exports = offerRoutes;
