const instBasicDisplayApi = require("../utils/instagramBasicDisplay");
const {
  __getInstUserData,
  __addInstData,
  __getInstPosts,
} = require("../models/instagram.modesl");
const instagramApi = require("../utils/apiGraphInstagram");
const { errors } = require("celebrate");
const {
  getTimeStamps,
  getTimeStampsArrayForMonth,
  getPreviousMonthTimeStamps,
} = require("../utils/getTimeStamps");

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

const getInstagramData = async (req, res, next) => {
  const { id } = req.user;
  try {
    const { instUserId, instToken, instUserName } = await __getInstUserData(id);
    const posts = await instagramApi.getPosts(instUserId, instToken);
    const userInfo = await instagramApi.getUserInfo(instUserId, instToken);
    res.status(200).json({ posts, ...userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const getPostInsight = async (req, res, next) => {
  const { id } = req.user;
  const { mediaId } = req.params;
  console.log(mediaId);
  try {
    const { instToken } = await __getInstUserData(id);
    const postInsight = await instagramApi.getPostInsight(mediaId, instToken);
    res.status(200).json(postInsight);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const getUserInsight = async (req, res, next) => {
  const { id } = req.user;
  const { period } = req.query;

  console.log(period);

  const { since, until } =
    period === "prevMonth"
      ? getPreviousMonthTimeStamps()
      : getTimeStamps(period);
  const { instToken, instUserId } = await __getInstUserData(id);
  console.log({ since, until });
  try {
    const userInsite = await instagramApi.getUserInsight({
      since,
      until,
      instToken,
      instUserId,
    });
    res.status(200).json(userInsite);
  } catch (error) {}
};

const getDetailedUserInsights = async (req, res, next) => {
  const { id } = req.user;
  const { period } = req.query;
  const { instToken, instUserId } = await __getInstUserData(id);

  console.log(period);

  const timeStampsArray = getTimeStampsArrayForMonth(period);
  try {
    let index = 0;
    let responce = {};
    for await (const timeDistance of timeStampsArray) {
      const { since, until } = timeDistance;
      responce = {
        ...responce,
        [`${index}`]: await instagramApi.getUserInsight({
          instToken,
          instUserId,
          since,
          until,
        }),
      };
      if (index === timeStampsArray.length - 1) {
        console.log("res send");
        res.status(200).json(responce);
      }
      index++;
    }
  } catch (error) {
    res.status(500).send();
  }
};

const addScheduledPost = async (req, res, next) => {
  const { id } = req.user;
  const { pictureUrl, text, date } = req.body;
};

module.exports = {
  addInstagramData,
  getInstagramData,
  getPostInsight,
  getUserInsight,
  getDetailedUserInsights,
};
