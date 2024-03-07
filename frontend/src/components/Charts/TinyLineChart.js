import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const TinyLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="50%">
      <LineChart width={80} height={80} data={data}>
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TinyLineChart;
