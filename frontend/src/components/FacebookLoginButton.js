import OAuth2Login from "react-simple-oauth2-login";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FacebookLoginButton = (props) => {
  const { appId } = props;

  const onSuccess = (res) => {
    api.submitShortTimeTokenV2({ token: res.access_token });
  };
  const onFailure = (res) => {
    console.error(res);
  };

  return (
    <div>
      <OAuth2Login
        authorizationUrl="https://www.facebook.com/v19.0/dialog/oauth"
        clientId={appId}
        redirectUri="kirovproject.site/"
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
