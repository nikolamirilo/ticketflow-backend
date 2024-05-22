const express = require("express");
const {
  deleteEvent,
  getAllEvents,
  updateEvent,
  getSingleEvent,
  createEvent,
  getCategoryEvents,
  refreshEventData,
  getFilterEvents,
} = require("../controllers/event.controllers.js");

const eventRoutes = express.Router();

eventRoutes.get("/events", getAllEvents);
eventRoutes.get("/events/category/:category", getCategoryEvents);
eventRoutes.get("/events/:id", getSingleEvent);
eventRoutes.post("/events", createEvent);
eventRoutes.patch("/events/:id", updateEvent);
eventRoutes.delete("/events/:id", deleteEvent);
eventRoutes.get("/refresh-data", refreshEventData);
eventRoutes.post("/events/search", getFilterEvents);

module.exports = eventRoutes;
