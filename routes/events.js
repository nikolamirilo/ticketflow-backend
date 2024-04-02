const express = require("express");
// const getSingleEvent = require("../middleware/event.middleware");
const {
  addEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} = require("../controllers/events");

const eventRoutes = express.Router();

eventRoutes.get("/", getAllEvents);
// eventRoutes.post("/", addEvent);
// eventRoutes.patch("/:id", getSingleEvent, updateEvent);
// eventRoutes.delete("/:id", getSingleEvent, deleteEvent);

module.exports = eventRoutes;
