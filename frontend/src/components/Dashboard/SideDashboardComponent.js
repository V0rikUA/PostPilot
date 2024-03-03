import { memo } from "react";
import plug from "../../assets/images-plug/loading-photo.png";
import api from "../../utils/api";

const SideDashboardComponent = () => {
  return (
    <div
      className="dashboard__side"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="dashboard__side__image-container"
        style={{ height: "30%", marginTop: "60px" }}
      >
        <img src={plug} style={{ height: "100%" }} alt="some" />
      </div>
      <div>
        <h2>Amount</h2>
        <spam>Account reached</spam>
        <div>
          <h2>GRAPHIC</h2>
        </div>
      </div>
      <div>
        <div>clicks</div>
        <div>Likes</div>
        <div>Impressions</div>
      </div>
    </div>
  );
};

export default memo(SideDashboardComponent);
