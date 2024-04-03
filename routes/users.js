const express = require("express");
// const {
//   deleteUser,
//   getAllUsers,
//   updateUser,
//   getSingleUser,
//   createUser,
// } = require("../controllers/users");

const userRoutes = express.Router();

userRoutes.get("/users", (req, res) => {
  // #swagger.tags = ['Users']
  res.send({ message: "Hello" });
});
// userRoutes.get("/users/:id", getSingleUser);
// userRoutes.post("/users", createUser);
// userRoutes.patch("/users/:id", updateUser);
// userRoutes.delete("/users/:id", deleteUser);

module.exports = userRoutes;
