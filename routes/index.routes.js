import userRoutes from "./user.routes.js";
import eventRoutes from "./event.routes.js";
import offerRoutes from "./offer.routes.js";
import orderRoutes from "./order.routes.js";
import express from "express";

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
];

export default allRoutes;
