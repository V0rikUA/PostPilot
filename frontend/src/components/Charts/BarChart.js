import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const InstagramSubscribersChart = () => {
  const chartData = {
    labels: ["Mar 1", "Mar 3", "Mar 7"],
    datasets: [
      {
        label: "Gained",
        data: [1, 0, 0], // Replace with your data
        backgroundColor: "rgba(255, 193, 7, 0.6)",
        borderRadius: 30,
        barThickness: 25,
      },
      {
        label: "Lost",
        data: [0, 0, 0], // Replace with your data
        backgroundColor: "rgba(233, 30, 99, 0.6)",
        borderRadius: 30,
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        grid: { color: "rgba(248, 248, 248, 1)" },
        border: { dash: [2, 4], color: "rgba(248, 248, 248, 1)" },
      },
      x: {
        stacked: true,

        grid: {
          display: false,
        },
        border: {
          color: "rgba(248, 248, 248, 1)",
        },
        ticks: {
          // color: "rgba(248, 248, 248, 1)",
          font: {
            size: 15,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", // Move the legend to the right
        align: "end",
        labels: {
          usePointStyle: true, // Change legend icons to circles
          pointStyle: "circle", // Explicitly setting point style to circle
        },
      },
      title: {
        // This will add a title to your chart
        display: true,
        text: "Instagram Subscribers",
        position: "top",
        align: "start",
        color: "rgba(30, 30, 30, 1)",
        font: {
          size: 18, // You can customize the font size here
        },
        padding: {
          top: 0,
          bottom: 0, // Adjust the padding as needed
        },
      },
    },
  };

  return (
    <Bar
      data={chartData}
      options={options}
      style={{
        margin: "0",
        maxHeight: "40%",
        width: "100%",
        backgroundColor: "rgba(248, 221, 230, 1)",
        border: "7px solid rgba(248, 248, 248, 1)",
        borderRadius: 30,
        padding: 20,
      }}
    />
  );
};

export default InstagramSubscribersChart;
