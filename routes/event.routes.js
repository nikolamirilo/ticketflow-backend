import express from "express";
import {
  deleteEvent,
  getAllEvents,
  updateEvent,
  getSingleEvent,
  createEvent,
  getCategoryEvents,
  refreshEventData,
  getFilterEvents,
} from "../controllers/event.controllers.js";

const eventRoutes = express.Router();

eventRoutes.get("/events", getAllEvents);
eventRoutes.get("/events/category/:category", getCategoryEvents);
eventRoutes.get("/events/:id", getSingleEvent);
eventRoutes.post("/events", createEvent);
eventRoutes.patch("/events/:id", updateEvent);
eventRoutes.delete("/events/:id", deleteEvent);
eventRoutes.get("/refresh-data", refreshEventData);
eventRoutes.post("/events/search", getFilterEvents);

export default eventRoutes;
