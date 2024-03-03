import OAuth2Login from "react-simple-oauth2-login";
import api from "../utils/api";

const FacebookLoginButton = ({ appId = "923468098972476" }) => {
  const onSuccess = (res) => {
    // api.submitShortTimeToken(res);
    api.submitShortTimeTokenV2({ token: res.access_token });
  };
  const onFailure = (res) => {};

  return (
    <div>
      <OAuth2Login
        authorizationUrl="https://www.facebook.com/v19.0/dialog/oauth"
        clientId={`936982034807327`}
        redirectUri="https://localhost:3000/"
        extraParams={{ setup: { channel: "IG_API_ONBOARDING" } }}
        scope="instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list"
        responseType="token"
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Log in v2"
      />
    </div>
  );
};

export default FacebookLoginButton;
