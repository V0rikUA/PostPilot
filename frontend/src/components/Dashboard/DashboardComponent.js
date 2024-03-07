import { useState } from "react";
import MainDashboardComponent from "./MainDashboardComponent";
import SideDashboardComponent from "./SideDashBoard/SideDashboardComponent";
import SidebarComponent from "./SidebarComponent";
import DashboardSettings from "./DashBoardSettings/DashboardSetting";

const some = (tab) => {
  switch (tab) {
    case "Main":
      return (
        <>
          <MainDashboardComponent /> <SideDashboardComponent />
        </>
      );
    case "Settings":
      return (
        <>
          <DashboardSettings />
        </>
      );
    default:
      return (
        <>
          <h1 style={{ position: "absolute", left: "50%", top: "50%" }}>
            Work in progress
          </h1>
        </>
      );
  }
};

const Dashboard = () => {
  const [tabOpened, setTabOpened] = useState("Main");

  return (
    <>
      <div className="dashboard">
        <SidebarComponent tabOpened={tabOpened} setTabOpened={setTabOpened} />
        {some(tabOpened)}
      </div>
    </>
  );
};

export default Dashboard;
