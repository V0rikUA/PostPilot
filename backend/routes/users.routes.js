const {
  createUser,
  getUser,
  signIn,
} = require("../controller/users.controller");
const { auth } = require("../middleware/auth");
const { createUserSchema, signInSchema } = require("./validation/scemas");

const user = require("express").Router();

user.post("/api/signup", createUserSchema, createUser);
user.post("/api/signin", signInSchema, signIn);
user.get("/api/user/me", auth, getUser);

module.exports = user;
