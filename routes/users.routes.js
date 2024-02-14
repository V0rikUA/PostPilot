const { createUser } = require("../controller/users.controller");
const { createUserSchema } = require("./validation/scemas");

const user = require("express").Router();

user.post("/api/signup", createUserSchema, createUser);

module.exports = user;
