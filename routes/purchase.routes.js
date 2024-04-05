import express from "express";
import { sendEmail } from "../controllers/purchase.controllers.js";

const purchaseRoutes = express.Router();

purchaseRoutes.post("/purchase", sendEmail);

export default purchaseRoutes;
