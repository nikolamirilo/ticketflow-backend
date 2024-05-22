const express = require("express");
const {
  deleteOffer,
  getAllOffers,
  updateOffer,
  getSingleOffer,
  createOffer,
  getEventsOffer,
} = require("../controllers/offer.controllers.js");

const offerRoutes = express.Router();

offerRoutes.get("/offers", getAllOffers);
offerRoutes.get("/offers/:id", getSingleOffer);
offerRoutes.get("/offers/events/:id", getEventsOffer);
offerRoutes.post("/offers", createOffer);
offerRoutes.patch("/offers/:id", updateOffer);
offerRoutes.delete("/offers/:id", deleteOffer);

module.exports = offerRoutes;
