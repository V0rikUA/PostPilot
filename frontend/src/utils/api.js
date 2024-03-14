class API {
  constructor(baseUrl, auth) {
    this._baseUrl = baseUrl;
    this._authToken = auth;
  }

  _handleResponce(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _fetchBody({ path, method, data }) {
    return fetch(this._baseUrl + path, {
      method,
      headers: {
        authorization: `Bearer ${this._authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => this._handleResponce(response));
  }

  _fetchNoBody({ path, method }) {
    return fetch(this._baseUrl + path, {
      method,
      headers: {
        authorization: `Bearer ${this._authToken}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponce);
  }

  setUserToken = (token) => (this._authToken = token);

  init = () => {
    return Promise.all([this.getUserInfo()]);
  };

  submitShortTimeToken = (token) => {
    this._fetchBody({
      path: "instagram/short_token",
      method: "POST",
      data: token,
    });
  };

  getUserInfo = () => {
    const request = {
      path: "api/user/me",
      method: "GET",
    };

    return this._fetchNoBody(request);
  };

  getposts = () => {
    const request = {
      path: "instagram/posts",
      method: "GET",
    };

    return this._fetchNoBody(request);
  };

  getPostInsight = (postID) => {
    const request = {
      path: `instagram/posts/${postID}`,
      method: "GET",
    };

    return this._fetchNoBody(request);
  };

  getReelsInsight = (postID) => {
    const request = {
      path: `instagram/reels/${postID}`,
      method: "GET",
    };

    return this._fetchNoBody(request);
  };

  getUserInsigts = (period) => {
    const request = {
      path: `instagram/insites?period=${period}`,
      method: "GET",
    };

    return this._fetchNoBody(request);
  };

  getUserInsigtsDetailed = (period) => {
    const request = {
      path: `instagram/insites/detailed?period=${period}`,
      method: "GET",
    };

    return this._fetchNoBody(request);
  };

  getFollowUnfollow = () => {
    const request = {
      path: "instagram/follow-unfollow",
      method: "GET",
    };

    return this._fetchNoBody(request);
  };

  getAppId = () => {
    const request = {
      path: `getappid`,
      method: "GET",
    };

    return this._fetchNoBody(request);
  };
}

const jwt = localStorage.getItem("jwt");
const api = new API("http://localhost:3000/", jwt);
export default api;
