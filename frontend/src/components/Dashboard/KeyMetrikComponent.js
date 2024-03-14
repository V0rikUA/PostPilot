import { useSelector } from "react-redux";
import TinyLineChart from "../Charts/TinyLineChart";
import { memo } from "react";
import KeyMetrikChart from "./KeyMetrikChart";

const getArrayForChart = (first, object, subKey) => {
  const result = [{ name: "first", pv: first }];
  for (let key in object) {
    result.push({ name: key, pv: object[key][subKey] });
  }
  return result;
};

const KeyMetrikConponent = () => {
  const { detailed, this_month, prevMonth } = useSelector(
    (state) => state.insights
  );

  const engagedUsersData = getArrayForChart(
    prevMonth.accountEngaged,
    detailed,
    "accountEngaged"
  );
  const pageImpression = getArrayForChart(
    prevMonth.impressions,
    detailed,
    "impressions"
  );
  const likesData = getArrayForChart(prevMonth.likes, detailed, "likes");
  const profileViewsData = getArrayForChart(
    prevMonth.profileViews,
    detailed,
    "profileViews"
  );
  const reachData = getArrayForChart(prevMonth.reach, detailed, "reach");

  return (
    <div className="dashboard__main__additional-meticks" style={{}}>
      <div className="additional-meticks__key-metricks">
        <h3>Key Metricks</h3>
        <KeyMetrikChart />
      </div>
      <div className="additional-meticks__engaged-users">
        <h2 style={{ textAlign: "center" }}>Engaged Users</h2>
        <TinyLineChart data={engagedUsersData} />
        <h5
          style={{ textAlign: "center" }}
        >{`Users engaed this month: ${this_month.accountEngaged}`}</h5>
      </div>
      <div className="additional-meticks__page-impression">
        <h2 style={{ textAlign: "center" }}>Page Impressions</h2>
        <TinyLineChart data={pageImpression} />
        <h5
          style={{ textAlign: "center" }}
        >{`Total impressions this month : ${this_month.impressions}`}</h5>
      </div>
    </div>
  );
};

export default memo(KeyMetrikConponent);
