import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthsPageLineChart = ({ chartData }) => {
  return (
    <Bar
      data={chartData}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: function (value) {
                return value + " €";
              },
            },
          },
        },
      }}
    />
  );
};

export default MonthsPageLineChart;
