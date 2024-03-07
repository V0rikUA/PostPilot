const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  __createNewUser,
  __getUserData,
  __getHash,
  __updatePassword,
} = require("../models/users.models");
const ValidationError = require("../utils/validationError");
const AuthorizationError = require("../utils/authorizationError");
const ConflictError = require("../utils/conflictError");
const {
  default: instBasicDisplayApi,
} = require("../utils/instagramBasicDisplay");

const { JWT_SECRET, NODE_ENV } = process.env;

const createUser = async (req, res, next) => {
  const { password, email } = req.body;
  if (!password) throw new ValidationError("Missing password field");
  bcrypt.hash(password, 10).then((hash) => {
    __createNewUser({
      hash,
      email,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.code === "23505")
          throw new ConflictError("This email is alredy registered");
      });
  });
};

const getUser = async (req, res, next) => {
  console.log(req.user);

  const { id } = req.user;
  const user = await __getUserData(id).catch((err) => console.log(err));

  res.status(200).json(user);
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await __getHash(email).catch((err) => {
    console.log(err);
    throw new AuthorizationError("Incorrect password or email");
  });

  const match = await bcrypt.compare(password, user.hash);

  if (!match) throw new AuthorizationError("Incorrect password or email");

  const token = jwt.sign(
    { id: user.id },
    NODE_ENV === "poduction" ? JWT_SECRET : "dev-secret",
    { expiresIn: "7d" }
  );

  res.status(200).json({ token });
};

const tokenCheck = async (req, res, next) => {
  console.log("token check");
  res.status(200).send();
};

const updatePassword = async (req, res, next) => {
  const { id } = req.user;
  const { password } = req.body;

  if (!password) throw new ValidationError("Missing password field");
  bcrypt.hash(password, 10).then((hash) => {
    __updatePassword({
      hash,
      id,
    })
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        console.error(err);
      });
  });
};
module.exports = { createUser, getUser, signIn, tokenCheck, updatePassword };
