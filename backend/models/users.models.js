const { db } = require("../config/db");

/**
 * Creates a new user in the database.
 *
 * @param {Object} user - An object containing the user's information.
 * @param {string} user.email - The email of the user.
 * @param {string} user.hash - The hashed password of the user.
 * @returns {Promise} A promise that resolves when the user is successfully inserted into the database.
 */
const __createNewUser = async ({ email, hash }) => {
  return db("users")
    .insert({ user_password: hash, user_email: email })
    .returning("*")
    .where({ user_email: email });
};

const __getUserData = async (id) => {
  return db("users")
    .select("*")
    .where({ user_id: id })
    .then((data) => data[0])
    .then((user) => {
      return {
        id: user["user_id"],
        name: user["user_name"],
        email: user["user_email"],
        connectedSM: {
          instagram: user["instagram"],
        },
      };
    });
};

const __getHash = (email) => {
  return db("users")
    .select("*")
    .where({ user_email: email })
    .then((data) => data[0])
    .then((user) => {
      return {
        id: user["user_id"],
        hash: user["user_password"],
      };
    });
};

module.exports = { __createNewUser, __getUserData, __getHash };
