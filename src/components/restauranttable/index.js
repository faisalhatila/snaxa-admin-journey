import React, { Component } from "react";

export default class RestaurantTable extends Component {
  state = {
    data: [
      {
        id: 124156,
        restaurantName: "Alexa",
        email: "alaska@mail.com",
        addres: "California Street 11th House",
        status: "Active",
      },
      {
        id: 124157,
        restaurantName: "Alexa",
        email: "alaska@mail.com",
        addres: "California Street 11th House",
        status: "Active",
      },
      {
        id: 124158,
        restaurantName: "Alexa",
        email: "alaska@mail.com",
        addres: "California Street 11th House",
        status: "Active",
      },
      {
        id: 124159,
        restaurantName: "Alexa",
        email: "alaska@mail.com",
        addres: "California Street 11th House",
        status: "Active",
      },
      {
        id: 124160,
        restaurantName: "Alexa",
        email: "alaska@mail.com",
        addres: "California Street 11th House",
        status: "Active",
      },
      {
        id: 124161,
        restaurantName: "Alexa",
        email: "alaska@mail.com",
        addres: "California Street 11th House",
        status: "Active",
      },
      {
        id: 124163,
        restaurantName: "Alexa",
        email: "alaska@mail.com",
        addres: "California Street 11th House",
        status: "Active",
      },
    ],
  };
  render() {
    const { data } = this.state;
    return (
      <div className="restaurantmanagementtable mb-4">
        <div class="container">
          <div
            className={`newOrderTableHeading ${
              data.length > 0 ? " maximumWidthRestaurant" : null
            }`}
          >
            <h3>All Restaurants</h3>
          </div>
          {data.length > 0 ? (
            <table class="table table-hover mt-3">
              <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                <tr>
                  <th>ID</th>
                  <th>Restaurant Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                </tr>
                {data.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.restaurantName}</td>
                      <td>{item.email}</td>
                      <td>{item.addres}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="noNewOrderHeadingDiv mt-3">
              <h4>No New Restaurant Added</h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}
