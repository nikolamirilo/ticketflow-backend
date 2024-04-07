import express from "express";
import {
  deleteEvent,
  getAllEvents,
  updateEvent,
  getSingleEvent,
  createEvent,
  searchEvents,
} from "../controllers/events.controllers.js";

const eventRoutes = express.Router();

eventRoutes.get("/events", getAllEvents);
eventRoutes.get("/events/:id", getSingleEvent);
eventRoutes.get("/events/search/:title", searchEvents);
eventRoutes.post("/events", createEvent);
eventRoutes.patch("/events/:id", updateEvent);
eventRoutes.delete("/events/:id", deleteEvent);

export default eventRoutes;
