const { db } = require("../config/db");

/**
 *  rows:
 * user_id
 * instagram_token
 * instagram_user_id,
 * instagram_name
 */

const __checkDbResponse = (response) => {
  return response.ok
    ? response
    : Promise.reject(`Database respond with an error.\nCode ${response}`);
};

const __addInstData = async ({
  user_id,
  instagram_token,
  instagram_user_id,
  instagram_name,
}) => {
  return db("instagram_tokens").insert({
    user_id,
    instagram_token,
    instagram_user_id,
    instagram_name,
  });
};

const __removeInstagramData = (id) => {
  return db("instagram_tokens").select("*").where({ user_id: id }).del();
};

const __getInstUserData = async (user_id) => {
  return db("instagram_tokens")
    .select("*")
    .where({ user_id })
    .then((data) => data[0])
    .then((user) => ({
      instUserId: user["instagram_user_id"],
      instToken: user["instagram_token"],
      instUserName: user["instagram_name"],
    }));
};

const __getInstPosts = async (user_id) => {
  return db("instagram_tokens")
    .select("*")
    .where({ user_id })
    .then(__checkDbResponse)
    .then((data) => data[0])
    .then((user) => {
      return {
        posts: user["instagram_posts"],
      };
    });
};

module.exports = {
  __getInstUserData,
  __addInstData,
  __getInstPosts,
  __removeInstagramData,
};
