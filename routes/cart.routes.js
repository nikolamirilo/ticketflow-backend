const express = require("express");
const { getUserCartItems, addNewCartItem, deleteAllCartItems } = require("../controllers/cart.controllers.js");

const cartRoutes = express.Router();

cartRoutes.get("/cart/:uid", getUserCartItems);
cartRoutes.post("/cart", addNewCartItem);
cartRoutes.delete("/cart", deleteAllCartItems);

module.exports = cartRoutes;
