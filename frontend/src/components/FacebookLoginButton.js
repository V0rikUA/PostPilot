import OAuth2Login from "react-simple-oauth2-login";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const FacebookLoginButton = (props) => {
  const { appId } = props;
  const navigate = useNavigate();

  const onSuccess = (res) => {
    api.submitShortTimeToken({ token: res.access_token }).then(() => {
      navigate("/");
    });
  };
  const onFailure = (res) => {
    console.error(res);
  };

  return (
    <div>
      <OAuth2Login
        authorizationUrl="https://www.facebook.com/v19.0/dialog/oauth"
        clientId={appId}
        redirectUri="https://localhost:3005/"
        extraParams={{ setup: { channel: "IG_API_ONBOARDING" } }}
        scope="instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list"
        responseType="token"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default FacebookLoginButton;
