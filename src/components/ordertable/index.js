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
                <th>{/* <input type="checkbox" /> */}</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Mobile No</th>
                <th>Restaurant</th>
                <th>Area</th>
                <th>Branch</th>
                <th>Order Time</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Order Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
              </tr>
              {data.map((item) => {
                return (
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{item.id}</td>
                    <td>{item.customer}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.restaurant}</td>
                    <td>{item.area}</td>
                    <td>{item.branch}</td>
                    <td>{item.orderTime}</td>
                    <td>{item.payment}</td>
                    <td>${item.amount}</td>
                    <td>{item.orderSource}</td>
                    <td>
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
