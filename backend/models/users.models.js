const { db } = require("../config/db");
const NotFoundError = require("../utils/notfounderror");

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
    .insert({
      user_password: hash,
      user_email: email,
      connected_sm: JSON.stringify({
        instagram: false,
        x: false,
        facebook: false,
        youtube: false,
        tiktok: false,
      }),
    })
    .returning("*")
    .where({ user_email: email })
    .then((user) => user[0])
    .then((user) => {
      return {
        email: user["user_email"],
        connectedSM: user["connected_sm"],
        id: user["user_id"],
      };
    });
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
        connectedSM: user["connected_sm"],
      };
    });
};

const __getHash = (email) => {
  return db("users")
    .select("*")
    .where({ user_email: email })
    .then((data) => {
      if (data[0]) return data[0];
      else throw new NotFoundError();
    })
    .then((user) => {
      return {
        id: user["user_id"],
        hash: user["user_password"],
      };
    });
};
/**
 *
 * @param {*} id
 * @param {String} socialMedia can be choosen one of: Instagram, TikTok, Facebook, X, YouTube
 * @returns
 */
const __addSocialMedia = (id, socialMedia) => {
  return !["instagram", "tiktok", "facebook", "x", "youtube"].includes(
    socialMedia.toLowerCase()
  )
    ? new Error(
        "Social media was not found. check if you provided correct name"
      )
    : db("users")
        .select("*")
        .where({ user_id: id })
        .update({ conected_sm: { [`${socialMedia.toLowerCase()}`]: true } });
};

const __updatePassword = ({ hash, id }) => {
  return db("users")
    .select("*")
    .where({ user_id: id })
    .update({ user_password: hash })
    .returning("*")
    .where({ user_id: id })
    .then((user) => {
      return { hash: user["user_password"] };
    });
};

const __updateName = (userName, id) => {
  return db("users")
    .select("*")
    .where({ user_id: id })
    .update({ user_name: userName });
};

const __updateConnectedSM = (socialMedia, id, isConected) => {
  return db("users")
    .select("*")
    .where({ user_id: id })
    .update({
      connected_sm: db.raw("jsonb_set(connected_sm, ?::text[], ?::jsonb)", [
        `{${socialMedia}}`,
        `{${isConected}}`,
      ]),
    })
    .catch((error) => console.error(error));
};

module.exports = {
  __createNewUser,
  __getUserData,
  __getHash,
  __addSocialMedia,
  __updatePassword,
  __updateName,
  __updateConnectedSM,
};
