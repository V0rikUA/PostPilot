const {
  createUser,
  getUser,
  signIn,
  tokenCheck,
  updatePassword,
} = require("../controller/users.controller");
const { auth } = require("../middleware/auth");
const { createUserSchema, signInSchema } = require("./validation/scemas");

const user = require("express").Router();

user.post("/api/signup", createUserSchema, createUser);
user.post("/api/signin", signInSchema, signIn);
user.get("/api/user/me", auth, getUser);
user.post("/api/checkToken", auth, tokenCheck);
user.post("/api/new-password", auth, updatePassword);

module.exports = user;
