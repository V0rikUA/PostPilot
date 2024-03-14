import OAuth2Login from "react-simple-oauth2-login";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FacebookLoginButton = () => {
  const [appId, setAppId] = useState("");
  const { instagram } = useSelector((state) => state.user.connectedSM);

  useEffect(() => {
    api.getAppId().then((data) => {
      setAppId(data);
    });
  }, []);

  const onSuccess = (res) => {
    api.submitShortTimeTokenV2({ token: res.access_token });
  };
  const onFailure = (res) => {
    console.error(res);
  };

  return (
    <div>
      {instagram.connected ? (
        <h4>Instagram connectd</h4>
      ) : (
        <OAuth2Login
          authorizationUrl="https://www.facebook.com/v19.0/dialog/oauth"
          clientId={appId}
          redirectUri="https://localhost:3005"
          extraParams={{ setup: { channel: "IG_API_ONBOARDING" } }}
          scope="instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list"
          responseType="token"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      )}
    </div>
  );
};

export default FacebookLoginButton;
