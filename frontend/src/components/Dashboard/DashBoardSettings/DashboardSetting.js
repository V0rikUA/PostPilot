import { useState } from "react";
import ChangeCredentials from "./ChangeCredentials";
import LinkSocialMedia from "./LinkSocialMedia";
import bottomImage from "../../../assets/settings-image.png";

const SetSettingItem = ({ name, onClick, activeTab }) => {
  return (
    <li>
      <h2
        className={`dashboard-settings__list__item ${
          activeTab === name ? "activeTab" : ""
        }`}
        onClick={() => onClick()}
      >
        {`${name}`}
      </h2>
    </li>
  );
};

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("Link Social Media");
  const settingsItems = [
    {
      name: "Change Credentials",
      component: <ChangeCredentials />,
    },
    {
      name: "Link Social Media",
      component: <LinkSocialMedia />,
    },
  ];

  const onSettingMenuClick = (tabName) => {
    setActiveTab(tabName);
    console.log(activeTab);
  };

  return (
    <>
      <div className="dashboard-settings">
        <div className="dashboard-settings__menu">
          <ul className="dashboard-settings__list">
            {settingsItems.map((item, index) => {
              return (
                <SetSettingItem
                  key={index}
                  name={item.name}
                  onClick={() => onSettingMenuClick(item.name)}
                  activeTab={activeTab}
                />
              );
            })}
          </ul>
          <div className="image-container">
            <img src={bottomImage} alt="" />
          </div>
        </div>
        <div className="settings-component-container">
          {settingsItems.find((item) => item.name === activeTab).component}
        </div>
      </div>
    </>
  );
};

export default DashboardSettings;
