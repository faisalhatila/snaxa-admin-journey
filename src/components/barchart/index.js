import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class BarChart extends Component {
  state = {
    chartData: {
      labels: [
        "Foods In",
        "KFC",
        "McDonalds",
        "Mandi House",
        "Al Sajjad",
        "Al Baik",
        "My Kolachi",
      ],
      datasets: [
        {
          label: "Population",
          data: [15000, 18000, 5000, 17000, 13000, 1800, 170],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    },
    chartData2: {
      labels: [
        "Foods In",
        "KFC",
        "McDonalds",
        "Mandi House",
        "Al Sajjad",
        "Al Baik",
        "My Kolachi",
      ],
      datasets: [
        {
          label: "Population",
          data: [15000, 18000, 5000, 17000, 13000, 1800, 170],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    },
  };

  render() {
    const { chartData } = this.state;
    return (
      <div>
        <Bar data={chartData} options={{}} />
      </div>
    );
  }
}
