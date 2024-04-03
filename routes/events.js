const express = require("express");
const {
  deleteEvent,
  getAllEvents,
  updateEvent,
  getSingleEvent,
  createEvent,
} = require("../controllers/events");

const eventRoutes = express.Router();

eventRoutes.get("/events", getAllEvents);
eventRoutes.get("/events/:id", getSingleEvent);
eventRoutes.post("/events", createEvent);
eventRoutes.patch("/events/:id", updateEvent);
eventRoutes.delete("/events/:id", deleteEvent);

module.exports = eventRoutes;
