const express = require("express");
const { getUserCartItems, addNewCartItem } = require("../controllers/cart.controllers.js");

const cartRoutes = express.Router();

cartRoutes.get("/carts/:id", getUserCartItems);
cartRoutes.post("/carts", addNewCartItem);

module.exports = cartRoutes;
