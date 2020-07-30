import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class Chart extends Component {
  state = {
    chartData: {
      labels: [
        "Karachi",
        "Lahore",
        "Quetta",
        "Peshawar",
        "Islamabad",
        "Multan",
        "Hyderabad",
      ],
      datasets: [
        {
          label: "Population",
          data: [
            25000000,
            15000000,
            1000000,
            4200000,
            1000000,
            1800000,
            1700000,
          ],
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
        "Karachi",
        "Lahore",
        "Quetta",
        "Peshawar",
        "Islamabad",
        "Multan",
        "Hyderabad",
      ],
      datasets: [
        {
          label: "Population",
          data: [
            35000000,
            25000000,
            2000000,
            5200000,
            2000000,
            2800000,
            2700000,
          ],
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
        <Line data={chartData} options={{}} />
      </div>
    );
  }
}
