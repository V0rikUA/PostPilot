import instagramLogo from "../../assets/social-medie-icons/instagram.png";
import activeCardLogo from "../../assets/social-medie-icons/active-card.png";
import { useSelector } from "react-redux";
const SocialMediaBar = () => {
  const { instagram } = useSelector((state) => state.user.connectedSM);

  return (
    <>
      <li className="main__connected-sm-list__item">
        <img
          className="connected-sm-list__item__logo"
          src={instagramLogo}
          alt="instagram logo"
        />
        <img
          className="connected-sm-list__item__active"
          src={activeCardLogo}
          alt="active social media icon"
        />
        <h2 className="connected-sm-list__item__followers">
          {instagram.connected ? instagram.followers_count : ""}
        </h2>
        <h3></h3>
        <span className="connected-sm-list__item__text">followers</span>
      </li>
    </>
  );
};

export default SocialMediaBar;
