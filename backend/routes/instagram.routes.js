const {
  addInstagramData,
  getInstagramData,
} = require("../controller/instagram.controller");
const {
  addInstagramData2,
  getUserPosts,
} = require("../controller/instagram.controller copy");
const { auth } = require("../middleware/auth");
const instagram = require("express").Router();

// instagram.post("/api/user/me/instagram", auth, addInstagramData);
// instagram.get("/api/user/me/instagram", auth, getInstagramData);

instagram.post("/api/user/me/instagram/2", auth, addInstagramData2);

instagram.get("/api/user/me/instagram/posts", auth, getUserPosts);

module.exports = instagram;
