const { errors } = require("celebrate");

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

    const responce = await this._fetch(request).then((responce) => responce);
    let posts = responce.data;
    let nextPage = responce.paging.next ? true : false;
    let nextRequest = nextPage ? responce.paging.next : "";
    while (nextPage) {
      posts = [
        ...posts,
        await fetch(nextRequest, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then((res) => {
          if (res["paging"]["next"]) {
            return res["data"];
          }
          nextPage = false;
        }),
      ];
    }

    return await posts;
  };

  getUserInfo = (instagramId, token) => {
    const request = {
      method: "GET",
      path: `${instagramId}`,
      options: `fields=followers_count,media_count,profile_picture_url&
    access_token=${token}`,
    };

    const userInfo = this._fetch(request)
      .then((res) => {
        return res;
      })
      .catch((errors) => {
        console.error(errors);
      });

    return userInfo;
  };

  getPostInsight = async (mediaId, token) => {
    const request = {
      method: "GET",
      path: `${mediaId}/insights`,
      options: `metric=impressions,reach,saved,video_views&
    access_token=${token}`,
    };

    const postInsight = await this._fetch(request)
      .then((data) => data.data)
      .then((data) => {
        return {
          videoViews: data[0].values[0].value,
          impressions: data[1].values[0].value,
          reach: data[2].values[0].value,
          saved: data[3].values[0].value,
        };
      })
      .catch((error) => console.error(error));
    return postInsight;
  };

  getUserInsight = async ({ instUserId, instToken, since, until }) => {
    const request = {
      method: "GET",
      path: `${instUserId}/insights`,
      options: `metric=accounts_engaged,reach,impressions,likes,profile_views&since=${since}&until=${until}&period=day&metric_type=total_value&access_token=${instToken}`,
    };

    const userInsights = await this._fetch(request)
      .then((responce) => responce.data)
      .then((data) => {
        return {
          accountEngaged: data[0].total_value.value,
          reach: data[1].total_value.value,
          impressions: data[2].total_value.value,
          likes: data[3].total_value.value,
          profileViews: data[4].total_value.value,
        };
      })
      .catch((errors) => console.log(errors));
    return userInsights;
  };
}
const { APP_ID_GRAPH, APP_SECRET_GRAPH } = process.env;

const instagramApi = new ApiGraphInstagram();

module.exports = instagramApi;
