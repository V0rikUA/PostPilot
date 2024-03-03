class ApiGraphInstagram {
  constructor() {}

  _checkResponce = (res) =>
    res.ok ? res.json() : Promise.reject(res.statusText);

  _fetch = ({ path, options, method }) => {
    return fetch(`https://graph.facebook.com/v19.0/${path}?${options}`, {
      method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(this._checkResponce);
  };

  getLongTermToken = async (shortToken) => {
    const request = {
      method: "GET",
      path: "oauth/access_token",
      options: `grant_type=fb_exchange_token&          
    client_id=${APP_ID_GRAPH}&
    client_secret=${APP_SECRET_GRAPH}&
    fb_exchange_token=${shortToken}`,
    };

    const userTokenResponce = await this._fetch(request);

    return userTokenResponce.access_token;
  };

  fetchInstagramData = async (token) => {
    const request = {
      method: "GET",
      path: "me/accounts",
      options: `fields=instagram_business_account{id,name,username,profile_picture_url}&
    access_token=${token}`,
    };

    const instagramData = await this._fetch(request)
      .then((res) => {
        return res.data[0].instagram_business_account;
      })
      .then((account) => {
        console.log(account);
        return {
          instagram_user_id: account.id,
          instagram_name: account.username,
          instagram_token: token,
        };
      });

    return instagramData;
  };

  getPosts = async (instagramId, token) => {
    const request = {
      method: "GET",
      path: `${instagramId}/media`,
      options: `fields=like_count,media_url,media_type,permalink,comments,timestamp&
    access_token=${token}`,
    };

    const posts = await this._fetch(request).then((data) => data[0]);

    return posts;
  };
}
const { APP_ID_GRAPH, APP_SECRET_GRAPH } = process.env;

const instagramApi = new ApiGraphInstagram();

module.exports = instagramApi;
