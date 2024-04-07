import express from "express";
import { createOrder } from "../controllers/order.controllers.js";

const orderRoutes = express.Router();

orderRoutes.post("/order", createOrder);

export default orderRoutes;
