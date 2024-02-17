const { URLSearchParams } = require("url");

const getQueryUrl = (baseUrl, clientId, clientSecret, redirectUri, code) => {
  const query = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_url: redirectUri,
    code: code,
  });

  return `${baseUrl}?${query}`;
};

module.exports = getQueryUrl;
