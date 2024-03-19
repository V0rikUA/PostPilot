import InstagramSubscribersChart from "../Charts/BarChart";
import KeyMetrikConponent from "./KeyMetrikComponent";
import { memo, useEffect } from "react";
import SocialMediaBar from "./SocialMediaBar";
import { useDispatch, useSelector } from "react-redux";
import { getBaseInsights } from "../../feature/InsigtsSlice";

const MainDashboardComponent = () => {
  const connectedSM = useSelector((state) => state.user.connectedSM);
  const { isLoaded } = useSelector((state) => state.insights);
  const dispatch = useDispatch();

  if (connectedSM.instagram.connected && !isLoaded) {
    console.log("getting insights");
    dispatch(getBaseInsights());
  }

  return (
    <div className="dashboard__main">
      <ul className="main__connected-sm-list">
        <SocialMediaBar />
      </ul>
      <InstagramSubscribersChart />
      <KeyMetrikConponent />
    </div>
  );
};

export default MainDashboardComponent;
