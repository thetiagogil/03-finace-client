import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const MonthsPageLineChart = ({ chartData }) => {
  return (
    <Line
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
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        elements: {
          point: {
            radius: 3,
            backgroundColor: "rgb(70, 190, 190)",
            borderColor: "rgb(70, 190, 190)",
          },
          line: {
            tension: 0.2,
            borderWidth: 1,
            borderColor: "rgb(70, 190, 190)",
            backgroundColor: "rgb(70, 190, 190, 0.2)",
          },
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
              const value = tooltipItem.yLabel;
              return `${datasetLabel}: ${value} €`; // Customize the tooltip text here
            },
          },
        },
      }}
    />
  );
};

export default MonthsPageLineChart;
