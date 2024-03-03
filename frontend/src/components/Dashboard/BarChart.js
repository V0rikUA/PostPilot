import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const InstagramSubscribersChart = () => {
  const chartData = {
    labels: [
      "Jan 5",
      "Jan 7",
      "Jan 9",
      "Jan 11",
      "Jan 13",
      "Jan 15",
      "Jan 17",
      "Jan 19",
      "Jan 21",
      "Jan 5",
      "Jan 7",
      "Jan 9",
      "Jan 11",
      "Jan 13",
      "Jan 15",
      "Jan 17",
      "Jan 19",
      "Jan 21",
    ],
    datasets: [
      {
        label: "Gained",
        data: [
          65, 59, 80, 81, 56, 55, 40, 45, 60, 65, 59, 80, 81, 56, 55, 40, 45,
          60,
        ], // Replace with your data
        backgroundColor: "rgba(255, 193, 7, 0.6)",
        borderRadius: 30,
        barThickness: 25,
      },
      {
        label: "Lost",
        data: [
          -28, -48, -40, -30, -86, -27, -90, -50, -30, -28, -48, -40, -30, -86,
          -27, -90, -50, -30,
        ], // Replace with your data
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
        maxHeight: "50%",
        width: "100%",
        backgroundColor: "rgba(248, 221, 230, 1)",
        border: "7px solid rgba(248, 248, 248, 1)",
        borderRadius: 30,
        padding: 30,
      }}
    />
  );
};

export default InstagramSubscribersChart;
