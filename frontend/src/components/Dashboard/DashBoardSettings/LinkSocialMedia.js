import { useSelector } from "react-redux";
import FacebookLoginButton from "../../FacebookLoginButton";
import api from "../../../utils/api";
import { useEffect, useState } from "react";

const LinkSocialMedia = () => {
  const { instagram } = useSelector((state) => state.user.connectedSM);
  const [appId, setAppId] = useState("");

  useEffect(() => {
    api.getAppId().then((data) => {
      setAppId(data.toString());
    });
  }, []);
  return (
    <div className="link-social-media">
      <h1>Link Social Media</h1>
      {instagram.connected ? (
        <h2>Instagram is linked</h2>
      ) : (
        <FacebookLoginButton appId={appId} />
      )}
    </div>
  );
};

export default LinkSocialMedia;
