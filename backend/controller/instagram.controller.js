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
const { __updateConnectedSM } = require("../models/users.models");

const addInstagramData = async (req, res, next) => {
  const { id } = req.user;
  const { access_token } = req.query;

  const longTermToken = await instagramApi
    .getLongTermToken(access_token)
    .catch((errors) => console.log(errors));

  try {
    const instagramData = {
      user_id: id,
      ...(await instagramApi.fetchInstagramData(longTermToken)),
    };

    await __addInstData(instagramData);
    try {
      await __updateConnectedSM("instagram", id);
    } catch (error) {
      console.error(error);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    next(error);
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
    res.status(200).json({ posts, userName: instUserName, ...userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const getPostInsight = async (req, res, next) => {
  const { id } = req.user;
  const { mediaId } = req.params;
  try {
    const { instToken } = await __getInstUserData(id);
    const postInsight = await instagramApi.getPostInsight(mediaId, instToken);
    res.status(200).json(postInsight);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getReelsInsights = async (req, res, next) => {
  const { id } = req.user;
  const { mediaId } = req.params;
  try {
    const { instToken } = await __getInstUserData(id);
    const reelsInsights = await instagramApi.getReelsInsights(
      mediaId,
      instToken
    );
    res.status(200).json(reelsInsights);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getUserInsight = async (req, res, next) => {
  const { id } = req.user;
  const { period } = req.query;

  const { since, until } =
    period === "prevMonth"
      ? getPreviousMonthTimeStamps()
      : getTimeStamps(period);
  const { instToken, instUserId } = await __getInstUserData(id);
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
        res.status(200).json(responce);
      }
      index++;
    }
  } catch (error) {
    res.status(500).send();
  }
};

const getFollowUnfollow = async (req, res, next) => {
  const { id } = req.user;
  const { instToken, instUserId } = await __getInstUserData(id);
  const period = "2days";

  const timeStampsArray = getTimeStampsArrayForMonth(period);

  console.log(timeStampsArray.length);
  try {
    let index = 0;
    const responce = { date: [], gained: [], lost: [] };
    for await (const timeDistance of timeStampsArray) {
      const { since, until } = timeDistance;
      console.log("before api");
      await instagramApi
        .getUserFollowUnfollow({
          instToken,
          instUserId,
          since,
          until,
        })
        .then((data) => {
          responce.date.push(data.date);
          responce.gained.push(data.gained);
          responce.lost.push(data.lost * -1);
        });
      if (index === timeStampsArray.length - 2) {
        res.status(200).json(responce);
      }

      index++;
    }
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  addInstagramData,
  getInstagramData,
  getPostInsight,
  getUserInsight,
  getDetailedUserInsights,
  getReelsInsights,
  getFollowUnfollow,
};
