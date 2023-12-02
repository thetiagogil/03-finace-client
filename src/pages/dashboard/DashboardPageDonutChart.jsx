import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthsPageLineChart = ({ chartData }) => {
  return (
    <Doughnut
      data={chartData}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        cutout: 80,
        plugins: {
          legend: {
            display: true,
            position: "right",
            align: "center",
          },
        },
      }}
    />
  );
};

export default MonthsPageLineChart;
