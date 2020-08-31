import React from "react";
import { LChart, BChart } from "..";

const Chart = () => {
  return (
    <div style={{ minWidth: "100%" }} className="row justify-content-between">
      <div className="col-6">
        <div className="col-12  mt-4 leftGraph">
          <LChart />
        </div>
      </div>
      <div className="col-6">
        <div className="col-12  mt-4 leftGraph">
          <BChart />
        </div>
      </div>
    </div>
  );
};

export default Chart;
