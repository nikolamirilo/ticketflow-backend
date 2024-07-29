const userRoutes = require("./user.routes.js");
const eventRoutes = require("./event.routes.js");
const offerRoutes = require("./offer.routes.js");
const orderRoutes = require("./order.routes.js");
const express = require("express");
const cartRoutes = require("./cart.routes.js");

const indexRoutes = express.Router();

indexRoutes.get("/", function (req, res) {
  res.send({
    message:
      "Ticket Flow backend. For more info about available routes go to /swagger",
  });
});
indexRoutes.get("/test", function (req, res) {
  res.send({
    message: "Route used for testing",
  });
});

const allRoutes = [
  indexRoutes,
  eventRoutes,
  userRoutes,
  offerRoutes,
  orderRoutes,
  cartRoutes
];

module.exports = allRoutes;
