import React, { useState } from "react";
import { AllOrders } from "../../components";
// import { AddOrderStatus } from "..";
import OrderDetails from "../orderdetails";

// let OrderManagement;
const OrderManagement = (props) => {
  const [editRestaurantStatus, setEditRestaurantStatus] = useState(false);
  const [orderId, setOrderId] = useState(false);

  const editRestaurant = (id) => {
    setOrderId(id);
    setEditRestaurantStatus(true);
  };
  const goBack = () => {
    setEditRestaurantStatus(false);
  };

  let content;

  if (!editRestaurantStatus)
    content = (
      <div className="container">
        <div className="row">
          {/* <LeftMenu /> */}
          <div className="col-12 mt-4">
            {/* <NewOrder editOrder={editRestaurant} /> */}
            <AllOrders editOrder={editRestaurant} />
          </div>
        </div>
      </div>
    );
  if (editRestaurantStatus)
    content = <OrderDetails goBack={goBack} orderId={orderId}></OrderDetails>;

  return content;
};
export default OrderManagement;
