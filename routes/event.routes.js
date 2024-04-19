import express from "express";
import {
  deleteEvent,
  getAllEvents,
  updateEvent,
  getSingleEvent,
  createEvent,
  searchEvents,
  getCategoryEvents,
  refreshEventData,
} from "../controllers/event.controllers.js";

const eventRoutes = express.Router();

eventRoutes.get("/events", getAllEvents);
eventRoutes.get("/events/category/:category", getCategoryEvents);
eventRoutes.get("/events/:id", getSingleEvent);
eventRoutes.get("/events/search/:title", searchEvents);
eventRoutes.post("/events", createEvent);
eventRoutes.patch("/events/:id", updateEvent);
eventRoutes.delete("/events/:id", deleteEvent);
eventRoutes.get("/refresh-data", refreshEventData);

export default eventRoutes;
