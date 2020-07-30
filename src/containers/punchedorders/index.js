import React, { Component } from "react";
import { PunchedOrderDesc } from "../../components";
import ReactToPrint from "react-to-print";

export default class PunchedOrders extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {/* <LeftMenu /> */}
          <div className="col-12 mt-4">
            <div className="d-flex">
              <ReactToPrint
                trigger={() => (
                  <label className="mr-2 receiptButton receiptPrintButton">
                    <i class="fas fa-print pr-2"></i>Print
                  </label>
                )}
                content={() => this.componentRef}
              />
              <div className="d-flex">
                <label className="mr-2 receiptButton receiptDeclineButton">
                  <i class="fas fa-times pr-2"></i>Decline
                </label>
              </div>
            </div>
            <PunchedOrderDesc ref={(el) => (this.componentRef = el)} />
          </div>
        </div>
      </div>
    );
  }
}
