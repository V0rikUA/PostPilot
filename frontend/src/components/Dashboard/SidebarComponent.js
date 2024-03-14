import { memo, useState } from "react";
import logo from "../../assets/logo.svg";
import calendar from "../../assets/sidebar/calendar.png";
import cardiogram from "../../assets/sidebar/cardiogram.png";
import chat from "../../assets/sidebar/chat.png";
import logout from "../../assets/sidebar/log-out.png";
import settings from "../../assets/sidebar/setting-lines 1.png";
import settingsActive from "../../assets/sidebar/active/settings-active.png";
import calendarActive from "../../assets/sidebar/active/calendar-active.png";
import cardiogramActive from "../../assets/sidebar/active/cardiogram-active.png";
import chatActive from "../../assets/sidebar/active/chat-active.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../feature/AuthenticationSlice";

const SidebarItem = ({ active, icon, name, handleSelect }) => {
  return (
    <li
      className={`sidebar__list__item ${
        active ? "sidebar__list__item_active" : ""
      }`}
      onClick={(e) => handleSelect(name)}
    >
      <img
        src={active ? icon.active : icon.default}
        alt={`${name} icon`}
        name={name}
      />
    </li>
  );
};

const SidebarComponent = ({ tabOpened, setTabOpened }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSelect = (name) => {
    setTabOpened(name);
  };

  const sidebarItems = [
    {
      name: "Main",
      icon: { active: cardiogramActive, default: cardiogram },
    },
    {
      name: "Schedule",
      icon: { active: calendarActive, default: calendar },
    },
    {
      name: "Settings",
      icon: { active: settingsActive, default: settings },
    },
    {
      name: "Chat",
      icon: { active: chatActive, default: chat },
    },
  ];

  const handleSighnOut = () => {
    setTabOpened("");
    localStorage.removeItem("jwt");
    dispatch(setIsLoggedIn(false));
    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <img
        src={logo}
        alt="Logo of PostPilot web app"
        className="sidebar__logo"
      />
      <ul className="sidebar__list">
        {sidebarItems.map((item, index) => {
          return (
            <SidebarItem
              key={index}
              active={tabOpened === item.name}
              icon={item.icon}
              name={item.name}
              handleSelect={() => handleSelect(item.name)}
              alt={item.name}
            />
          );
        })}
        <li
          className={`sidebar__list__item `}
          onClick={(e) => handleSighnOut()}
        >
          <img src={logout} alt={"Logout icon"} name="Logout" />
        </li>
      </ul>
    </nav>
  );
};

export default memo(SidebarComponent);
