const bcrypt = require("bcrypt");
const { __createNewUser } = require("../models/users.models");
const ValidationError = require("../utils/validationError");

const createUser = (req, res, next) => {
  const { name, password, email } = req.body;
  if (!password) throw new ValidationError("Missing password field");
  bcrypt.hash(password, 10).then((hash) => {
    __createNewUser({
      name,
      hash,
      email,
    })
      .then((user) => res.send(user))
      .catch((err) => console.log(err));
  });
};

module.exports = { createUser };
