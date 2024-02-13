class API {
  constructor(baseUrl, auth) {
    this._baseUrl = baseUrl;
    this._authToken = auth;
  }

  _handleResponce(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _fetch({ path, method, data }) {
    console.log(data);
    return fetch(this._baseUrl + path, {
      method,
      headers: {
        // authorization: `Bearer ${this._authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => this._handleResponce(response));
  }

  setUserToken = (token) => (this._authToken = token);

  submitShortTimeToken = (code) => {
    this._fetch({
      path: "api/instagram/access_token",
      method: "POST",
      data: code,
    });
  };
}

const jwt = localStorage.getItem("jwt");
const api = new API("http://localhost:3001/", jwt);
export default api;
