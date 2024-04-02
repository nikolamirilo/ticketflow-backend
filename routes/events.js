const express = require("express");
const {
  deleteEvent,
  getAllEvents,
  updateEvent,
  getSingleEvent,
  createEvent,
} = require("../controllers/events");

const eventRoutes = express.Router();

eventRoutes.get("/", getAllEvents);
eventRoutes.get("/:id", getSingleEvent);
eventRoutes.post("/", createEvent);
eventRoutes.patch("/:id", updateEvent);
eventRoutes.delete("/:id", deleteEvent);

module.exports = eventRoutes;
