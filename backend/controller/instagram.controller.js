const instBasicDisplayApi = require("../utils/instagramBasicDisplay");
const {
  __getInstUserData,
  __addInstData,
} = require("../models/instagram.modesl");

const { INSTAGRAM_KEY, INSTAGRAM_SECRET, BASE_URL } = process.env;

const getInstagramData = async (req, res, next) => {
  const { id } = req.user;
  const instUserAuthData = await __getInstUserData(id);
  const instUser = await instBasicDisplayApi.getInstagramUser(
    instUserAuthData.instToken,
    instUserAuthData.instUserId
  );

  return instUser;
};

const addInstagramData = async (req, res, next) => {
  const { id } = req.user;
  const { code } = req.body;
  const params = {
    clientId: INSTAGRAM_KEY,
    clientSecret: INSTAGRAM_SECRET,
    redirectUri: BASE_URL,
    code,
  };

  const user = {
    id,
    ...(await instBasicDisplayApi.getUserToken(params)),
    name: "",
    posts: {},
  };

  user.name = await instBasicDisplayApi.getInstagramUser(
    user.token,
    user.instId
  );

  //Geting user posts from facebook API
  user.posts = await getAllPosts(user.instId, user.token);

  //Adding user data from instagram to DB
  await __addInstData(user.id, user.token, user.instId, user.name, user.posts);

  //removing token from user object to send as response back to frontend
  delete user["token"];

  res.status(200).json(user);
};

module.exports = { addInstagramData, getInstagramData };
