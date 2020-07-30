import React from "react";
import { OrderDetailsForn } from "../../components";
// let OrderDetails;
const OrderDetails = (props) => {
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
export default OrderDetails