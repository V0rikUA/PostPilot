class API {
  constructor(baseUrl, auth) {
    this._baseUrl = baseUrl;
    this._authToken = auth;
  }

  _handleResponce(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //
  //
  //
  //
  //
  _fetch({ path, method, data }) {
    return fetch(this._baseUrl + path, {
      method,
      headers: {
        authorization: `Bearer ${this._authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => this._handleResponce(response));
  }

  setUserToken = (token) => (this._authToken = token);

  init = () => {
    return Promise.all([this.getUserInfo()]);
  };

  // submitShortTimeToken = (code) => {
  //   this._fetch({
  //     path: "api/user/me/instagram/",
  //     method: "POST",
  //     data: code,
  //   });
  // };

  submitShortTimeTokenV2 = (token) => {
    this._fetch({
      path: "api/user/me/instagram/2",
      method: "POST",
      data: token,
    });
  };

  getUserInfo = () => {
    return fetch(this._baseUrl + "api/user/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${this._authToken}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponce);
  };

  getposts = () => {
    return fetch(this._baseUrl + "api/user/me/instagram/posts", {
      method: "GET",
      headers: {
        authorization: `Bearer ${this._authToken}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponce);
  };

  getPostInsight = (postID) => {
    return fetch(this._baseUrl + `api/user/me/instagram/posts/${postID}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this._authToken}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponce);
  };

  getUserInsigts = (period) => {
    return fetch(
      this._baseUrl + `api/user/me/instagram/insites?period=${period}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${this._authToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then(this._handleResponce);
  };

  getUserInsigtsDetailed = (period) => {
    return fetch(
      this._baseUrl + `api/user/me/instagram/insites/detailed?period=${period}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${this._authToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then(this._handleResponce);
  };
}

const jwt = localStorage.getItem("jwt");
const api = new API("http://localhost:3001/", jwt);
export default api;
