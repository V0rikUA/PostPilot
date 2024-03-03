import MainDashboardComponent from "./MainDashboardComponent";
import SideDashboardComponent from "./SideDashboardComponent";
import SidebarComponent from "./SidebarComponent";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <SidebarComponent />
        <MainDashboardComponent />
        <SideDashboardComponent />
      </div>
    </>
  );
};

export default Dashboard;
