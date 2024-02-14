const { db } = require("../config/db");

/**
 * Creates a new user in the database and logs the created user data.
 *
 * @param {Object} user - An object containing the user's information.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.hash - The hashed password of the user.
 * @returns {Promise} A promise that resolves when the user is successfully inserted into the database.
 */
const __createNewUser = ({ name, email, hash }) => {
  return db("users")
    .insert({ user_name: name, user_password: hash, user_email: email })
    .returning("*")
    .where({ user_email: email })
    .then((data) => console.log(data));
};

module.exports = { __createNewUser };
