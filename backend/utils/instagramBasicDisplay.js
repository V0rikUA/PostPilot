class InstagramBasicDisplay {
  _fetch = async (url, formData, method) => {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: \ncode ${response.status}\nMessage${response.statusText}`
          );
        }
        return response.json();
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  getUserToken = async ({ clientId, clientSecret, redirectUri, code }) => {
    const url = "https://api.instagram.com/oauth/access_token";
    const formData = new URLSearchParams();

    const method = "POST";

    formData.append("client_id", clientId);
    formData.append("client_secret", clientSecret);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", redirectUri);
    formData.append("code", code);
    const instUserData = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: \ncode ${response.status}\nMessage${response.statusText}`
          );
        }
        return response.json();
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    return { token: instUserData.access_token, instId: instUserData.user_id };
  };

  getInstagramUser = async (userToken, userId) => {
    const url = `https://graph.instagram.com/${userId}`;

    const method = "GET";

    const formData = new URLSearchParams();
    formData.append("fields", "username");
    formData.append("access_token", `${userToken}`);

    const user = await fetch(
      `${url}?fields=username&access_token=${userToken}`,
      {
        method,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: \ncode ${response.status}\nMessage${response.statusText}`
          );
        }
        return response.json();
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    return user.username;
  };
}

const instBasicDisplayApi = new InstagramBasicDisplay();
module.exports = instBasicDisplayApi;
