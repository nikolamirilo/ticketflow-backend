const express = require("express");
const {
  deleteUser,
  getAllUsers,
  updateUser,
  getSingleUser,
  createUser,
} = require("../controllers/users");

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getSingleUser);
userRoutes.post("/users", createUser);
userRoutes.patch("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);

module.exports = userRoutes;
