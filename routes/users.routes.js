import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  getSingleUser,
  createUser,
} from "../controllers/users.controllers.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getSingleUser);
userRoutes.post("/users", createUser);
userRoutes.patch("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);

export default userRoutes;
