import React from "react";
import { LChart, BChart } from "..";

const Chart = () => {
  return (
    <div style={{ minWidth: "100%" }} className="row justify-content-between">
      <div className="col-12 col-lg-6 col-md-6 mt-4 leftGraph">
        <LChart />
      </div>
      <div className="col-12 col-lg-5 col-md-5 mt-4 leftGraph">
        <BChart />
      </div>
    </div>
  );
};

export default Chart;
