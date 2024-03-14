const {
  getInstagramData,
  addInstagramData,
  getPostInsight,
  getUserInsight,
  getDetailedUserInsights,
  getReelsInsights,
  getFollowUnfollow,
} = require("../controller/instagram.controller");
const { auth } = require("../middleware/auth");
const instagram = require("express").Router();

instagram.post("/instagram/short_token", auth, addInstagramData);

instagram.get("/instagram/posts", auth, getInstagramData);
instagram.get("/instagram/posts/:mediaId", auth, getPostInsight);
instagram.get("/instagram/insites", auth, getUserInsight);
instagram.get("/instagram/insites/detailed", auth, getDetailedUserInsights);
instagram.get("/instagram/reels/:mediaId", auth, getReelsInsights);
instagram.get("/instagram/follow-unfollow", auth, getFollowUnfollow);

module.exports = instagram;
