import React, { Component } from "react";
import { LeftMenu, OrderTable, NewOrder } from "../../components";

export default class OrderManagement extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {/* <LeftMenu /> */}
          <div className="col-12 mt-4">
            <NewOrder />
            <OrderTable />
          </div>
        </div>
      </div>
    );
  }
}
