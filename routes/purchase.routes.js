import express from "express";
import { purchaseOffer } from "../controllers/purchase.controllers.js";

const purchaseRoutes = express.Router();

purchaseRoutes.post("/purchase", purchaseOffer);

export default purchaseRoutes;
