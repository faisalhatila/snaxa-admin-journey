import React, { Component } from "react";

export default class OrderTable extends Component {
  state = {
    data: [
      {
        id: 124156,
        customer: "Faisal",
        mobileNo: "03211234567",
        restaurant: "Alaska Restaurant",
        area: "Gulberg",
        branch: "Block 17",
        orderTime: "Noon",
        payment: "COD",
        amount: 1000,
        orderSource: "Online",
        status: "Pending",
      },
      {
        id: 124157,
        customer: "Faisal",
        mobileNo: "03211234567",
        restaurant: "Alaska Restaurant",
        area: "Gulberg",
        branch: "Block 17",
        orderTime: "Noon",
        payment: "COD",
        amount: 1000,
        orderSource: "Online",
        status: "Pending",
      },
      {
        id: 124158,
        customer: "Faisal",
        mobileNo: "03211234567",
        restaurant: "Alaska Restaurant",
        area: "Gulberg",
        branch: "Block 17",
        orderTime: "Noon",
        payment: "COD",
        amount: 1000,
        orderSource: "Online",
        status: "Pending",
      },
      {
        id: 124159,
        customer: "Faisal",
        mobileNo: "03211234567",
        restaurant: "Alaska Restaurant",
        area: "Gulberg",
        branch: "Block 17",
        orderTime: "Noon",
        payment: "COD",
        amount: 1000,
        orderSource: "Online",
        status: "Pending",
      },
      {
        id: 124160,
        customer: "Faisal",
        mobileNo: "03211234567",
        restaurant: "Alaska Restaurant",
        area: "Gulberg",
        branch: "Block 17",
        orderTime: "Noon",
        payment: "COD",
        amount: 1000,
        orderSource: "Online",
        status: "Pending",
      },
      {
        id: 124161,
        customer: "Faisal",
        mobileNo: "03211234567",
        restaurant: "Alaska Restaurant",
        area: "Gulberg",
        branch: "Block 17",
        orderTime: "Noon",
        payment: "COD",
        amount: 1000,
        orderSource: "Online",
        status: "Pending",
      },
      {
        id: 124163,
        customer: "Faisal",
        mobileNo: "03211234567",
        restaurant: "Alaska Restaurant",
        area: "Gulberg",
        branch: "Block 17",
        orderTime: "Noon",
        payment: "COD",
        amount: 1000,
        orderSource: "Online",
        status: "Pending",
      },
    ],
  };
  render() {
    const { data } = this.state;
    return (
      <div className="ordermanagementtable">
        <div class="container">
          <div className="orderTableHeading">
            <h3>Punched Orders</h3>
          </div>

          <table class="table table-hover">
            <thead style={{ backgroundColor: "gray", color: "#fff" }}>
              <tr>
                {/* <th><input type="checkbox" /></th> */}
                <th className="orderTableTH">Order ID</th>
                <th className="orderTableTH">Customer Name</th>
                <th className="orderTableTH">Mobile No</th>
                <th className="orderTableTH">Restaurant</th>
                <th className="orderTableTH">Area</th>
                <th className="orderTableTH">Branch</th>
                <th className="orderTableTH">Order Time</th>
                <th className="orderTableTH">Payment</th>
                <th className="orderTableTH">Amount</th>
                <th className="orderTableTH">Order Source</th>
                <th className="orderTableTH">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    placeholder="Order ID"
                    className="searchOrderData orderIDSearch"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Customer Name"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Mobile No"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Restaurant"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Area"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Branch"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Order Time"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Payment"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Amount"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Order Source"
                    className="searchOrderData"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Status"
                    className="searchOrderData"
                  />
                </td>
              </tr> */}
              {data.map((item) => {
                return (
                  <tr>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td className="orderTableTD">{item.id}</td>
                    <td className="orderTableTD">{item.customer}</td>
                    <td className="orderTableTD">{item.mobileNo}</td>
                    <td className="orderTableTD">{item.restaurant}</td>
                    <td className="orderTableTD">{item.area}</td>
                    <td className="orderTableTD">{item.branch}</td>
                    <td className="orderTableTD">{item.orderTime}</td>
                    <td className="orderTableTD">{item.payment}</td>
                    <td className="orderTableTD">${item.amount}</td>
                    <td className="orderTableTD">{item.orderSource}</td>
                    <td className="orderTableTD">
                      <div className="d-flex justify-content-center">
                        <div>{item.status}</div>
                        <label className="orderView ml-3">View</label>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
