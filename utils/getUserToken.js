/**
Asynchronously retrieves a long-term access token from Instagram's OAuth service.
 * This function constructs a request to Instagram's OAuth access token endpoint,
 * submitting a POST request with necessary credentials and the authorization code received
 * after the user has authorized the application. It handles the response by converting it to JSON
 * and returns the long-term access token. Errors during the fetch operation are caught and logged.
 *
 * @param {Object} params - The parameters for acquiring the access token.
 * @param {string} params.clientId - The client ID provided by Instagram when registering the application.
 * @param {string} params.clientSecret - The client secret provided by Instagram, used to authenticate the application.
 * @param {string} params.redirectUri - The URI to which Instagram redirects after authorization.
 * @param {string} params.code - The authorization code received from Instagram as part of the OAuth flow.
 * @returns {Promise<Object>} A promise that resolves with the long-term access token object upon successful retrieval.
 *                             The promise may reject or resolve with `undefined` if an error occurs during the fetch operation.
 *
 * @example
 * const tokenParams = {
 *   client_id: 'YOUR_CLIENT_ID',
 *   client_secret: 'YOUR_CLIENT_SECRET',
 *   redirect_uri: 'YOUR_REDIRECT_URI',
 *   code: 'AUTHORIZATION_CODE',
 * };
 *
 * getUserToken(tokenParams)
 *   .then(token => console.log(token))
 *   .catch(error => console.error(error));
 */
const getUserToken = async ({ clientId, clientSecret, redirectUri, code }) => {
  const url = "https://api.instagram.com/oauth/access_token";
  const formData = new URLSearchParams();

  console.log(
    `${clientId},\n\n ${clientSecret},\n\n ${redirectUri},\n\n ${code}`
  );

  formData.append("client_id", `${clientId}`);
  formData.append("client_secret", `${clientSecret}`);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", `${redirectUri}`);
  formData.append("code", `${code}`);
  const longTermToken = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: code ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      // Handle fetch error
      console.error("There was a problem with your fetch operation:", error);
    });
  return longTermToken;
};

module.exports = { getUserToken };
