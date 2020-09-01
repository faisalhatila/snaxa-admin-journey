import React from "react";
import { ViewSales } from "../../components";
// let AddOrderStatus;
const ViewSalesContainer = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <ViewSales />
        </div>
      </div>
    </div>
  );
};
export default ViewSalesContainer;
