const instBasicDisplayApi = require("../utils/instagramBasicDisplay");
const {
  __getInstUserData,
  __addInstData,
  __getInstPosts,
} = require("../models/instagram.modesl");
const instagramApi = require("../utils/apiGraphInstagram");
const { errors } = require("celebrate");

const addInstagramData = async (req, res, next) => {
  const { id } = req.user;
  const { token } = req.body;
  console.log(id);

  const longTermToken = await instagramApi
    .getLongTermToken(token)
    .catch((errors) => console.log(errors));

  try {
    const instagramData = {
      user_id: id,
      ...(await instagramApi.fetchInstagramData(longTermToken)),
    };

    await __addInstData(instagramData);

    res.status(200).json({
      userName: instagramData.instagram_name,
    });
  } catch (error) {
    console.log(error);
  }

  //  instagram_user_id: any;
  //  instagram_name: any;
  //  instagram_token: any;
  //  user_id: any;
};

const getUserPosts = async (req, res, next) => {
  const { id } = req.user;

  try {
    const { instUserId, instToken } = await __getInstUserData(id);
    const posts = await instagramApi.getPosts(instUserId, instToken);

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const addScheduledPost = async (req, res, next) => {
  const { id } = req.user;
  const { pictureUrl, text, date } = req.body;
};

module.exports = { addInstagramData2: addInstagramData, getUserPosts };
