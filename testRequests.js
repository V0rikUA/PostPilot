const axios = require("axios");

const mediaRequest = async (token) => {
  const mediaEndpoint = "https://graph.instagram.com/me/media";

  // Define parameters for the request
  const mediaParams = {
    fields: "id,media_type,media_url,thumbnail_url,caption,timestamp",
    access_token: token, // Replace with your user token
  };

  // Make a GET request to fetch user's media
  axios
    .get(mediaEndpoint, { params: mediaParams })
    .then((mediaResponse) => {
      // Handle media response
      console.log("User media:", mediaResponse.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching user media:", error.response.data);
    });
};

const getBaseInfro = async (token) => {
  const endpoint = "https://graph.instagram.com/me";

  // Define the parameters for the request
  const params = {
    fields: "id,username,account_type,media_count",
    access_token: token, // Replace with your user token
  };

  // Make a GET request to the Instagram Basic Display API
  axios
    .get(endpoint, { params })
    .then((response) => {
      // Handle the response
      console.log("User information:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching user information:", error.response.data);
    });
};

module.exports = { mediaRequest, getBaseInfro };
