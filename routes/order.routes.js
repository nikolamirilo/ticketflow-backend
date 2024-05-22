const express = require("express");
const { createOrder } = require("../controllers/order.controllers.js");

const orderRoutes = express.Router();

orderRoutes.post("/order", createOrder);

module.exports = orderRoutes;
