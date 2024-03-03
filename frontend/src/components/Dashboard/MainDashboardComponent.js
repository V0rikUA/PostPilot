import InstagramSubscribersChart from "./BarChart";
import instagramLogo from "../../assets/social-medie-icons/instagram.png";
import activeCardLogo from "../../assets/social-medie-icons/active-card.png";
import KeyMetrikConponent from "./KeyMetrikComponent";
import { memo } from "react";

const MainDashboardComponent = () => {
  return (
    <div className="dashboard__main">
      <ul className="main__connected-sm-list">
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
          <h2 className="connected-sm-list__item__followers">280K</h2>
          <span className="connected-sm-list__item__text">followers</span>
        </li>
      </ul>
      <InstagramSubscribersChart />
      <KeyMetrikConponent />
    </div>
  );
};

export default memo(MainDashboardComponent);
