import React, { Component } from "react";
import { OrderDetailsForn } from "../../components";
let OrderDetails;
export default OrderDetails = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <OrderDetailsForn goBack={props.goBack} orderId={props.orderId} />
        </div>
      </div>
    </div>
  );
};
