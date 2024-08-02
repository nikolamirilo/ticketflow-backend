const express = require("express");
const { getUserCartItems, addNewCartItem } = require("../controllers/cart.controllers.js");

const cartRoutes = express.Router();

cartRoutes.get("/cart/:uid", getUserCartItems);
cartRoutes.post("/cart", addNewCartItem);

module.exports = cartRoutes;
