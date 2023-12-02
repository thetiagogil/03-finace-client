import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthsPageLineChart = ({ chartData, type }) => {
  return (
    <Doughnut
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            position: "top",
            text: `Highest ${type} Months`,
          },
          legend: {
            display: true,
            position: "right",
            align: "center",
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      }}
    />
  );
};

export default MonthsPageLineChart;
