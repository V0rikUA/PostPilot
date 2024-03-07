const {
  getInstagramData,
  addInstagramData,
  getPostInsight,
  getUserInsight,
  getDetailedUserInsights,
} = require("../controller/instagram.controller");
const { auth } = require("../middleware/auth");
const instagram = require("express").Router();

// instagram.post("/api/user/me/instagram", auth, addInstagramData);
// instagram.get("/api/user/me/instagram", auth, getInstagramData);

instagram.post("/api/user/me/instagram/2", auth, addInstagramData);

instagram.get("/api/user/me/instagram/posts", auth, getInstagramData);
instagram.get("/api/user/me/instagram/posts/:mediaId", auth, getPostInsight);
instagram.get("/api/user/me/instagram/insites", auth, getUserInsight);
instagram.get(
  "/api/user/me/instagram/insites/detailed",
  auth,
  getDetailedUserInsights
);

module.exports = instagram;
