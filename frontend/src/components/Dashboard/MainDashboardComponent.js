import InstagramSubscribersChart from "../Charts/BarChart";
import KeyMetrikConponent from "./KeyMetrikComponent";
import { memo, useEffect } from "react";
import SocialMediaBar from "./SocialMediaBar";
import { useDispatch } from "react-redux";
import {
  getDetailedInsigts,
  getInsigts,
  getBaseInsights,
} from "../../feature/InsigtsSlice";

const MainDashboardComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBaseInsights());
  }, []);
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

export default memo(MainDashboardComponent);
