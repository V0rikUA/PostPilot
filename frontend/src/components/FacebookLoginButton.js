import OAuth2Login from "react-simple-oauth2-login";
import api from "../utils/api";

const FacebookLoginButton = ({ appId }) => {
  const onSuccess = (res) => {
    api.submitShortTimeToken(res);
  };
  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <OAuth2Login
        authorizationUrl="https://api.instagram.com/oauth/authorize"
        clientId={`${appId}`}
        redirectUri="https://localhost:3000/"
        scope="user_profile,user_media"
        responseType="code"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default FacebookLoginButton;
