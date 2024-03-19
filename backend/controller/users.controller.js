const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  __createNewUser,
  __getUserData,
  __getHash,
  __updatePassword,
  __updateName,
} = require("../models/users.models");
const ValidationError = require("../utils/validationError");
const AuthorizationError = require("../utils/authorizationError");
const ConflictError = require("../utils/conflictError");

const { JWT_SECRET, NODE_ENV } = process.env;

const createToken = (userID) => {
  return jwt.sign(
    { id: userID },
    NODE_ENV === "poduction" ? JWT_SECRET : "dev-secret",
    { expiresIn: "7d" }
  );
};

const createUser = async (req, res, next) => {
  const { password, email } = req.body;
  email.toLowerCase();
  if (!password) {
    next(new ValidationError("Missing password field"));
  }
  bcrypt.hash(password, 10).then((hash) => {
    __createNewUser({
      hash,
      email,
    })
      .then((user) => {
        const tempUserName = email.split("@")[0];
        __updateName(tempUserName, user.id);
        user["name"] = tempUserName;
        user["token"] = createToken(user.id);
        res.status(200).json(user);
      })
      .catch((err) => {
        if (err.code === "23505")
          next(new ConflictError("This email is alredy registered"));
      });
  });
};

const getUser = async (req, res, next) => {
  const { id } = req.user;
  const user = await __getUserData(id).catch((err) => console.log(err));

  res.status(200).json(user);
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  email.toLowerCase();

  await __getHash(email)
    .then(async (user) => {
      const match = await bcrypt.compare(password, user.hash);

      if (!match) next(new AuthorizationError("Incorrect password or email"));

      const token = createToken(user.id);
      res.status(200).json({ token });
    })
    .catch((err) => {
      console.log(err);
      next(new AuthorizationError("Incorrect password or email"));
    });
};

const tokenCheck = async (req, res, next) => {
  res.status(200).send();
};

const updatePassword = async (req, res, next) => {
  const { id } = req.user;
  const { password } = req.body;

  if (!password) next(new ValidationError("Missing password field"));
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
