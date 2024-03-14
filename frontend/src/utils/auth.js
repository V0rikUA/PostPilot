const BASE_URL = "http://localhost:3000";

const handleResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const register = (email, password) => {
  return fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const userSignIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/api/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const checkUserToken = (token) => {
  return fetch(`${BASE_URL}/api/checkToken`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => (res.ok ? true : false))
    .catch((error) => {
      return Promise.reject(error.message);
    });
};

export const updatePassword = (token, password) => {
  return fetch(`${BASE_URL}/api/new-password`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  }).then(handleResponse);
};
