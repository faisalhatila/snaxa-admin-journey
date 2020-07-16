import React, { Component, useState, useEffect } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
let NewOrder;
export default NewOrder = (props) => {
  const [data, setData] = useState();

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchByID, setSearchByID] = useState("");
  const [searchByMobileNo, setSearchByMobileNo] = useState("");

  // console.log(userId, token);
  // const auth = useContext(AuthContext);
  useEffect(() => {
    const dashboard = async () => {
      console.log("new-restaurants");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/new-orders`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
          })
        );
        console.log("responseData", responseData);
        setData(responseData.existingOrders);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  const handleIDSearch = (event) => {
    setSearchByID(event.target.value);
  };
  const handlePhoneNoSearch = (event) => {
    setSearchByMobileNo(event.target.value);
  };
  const searchingById = (searchByID) => {
    return (result) => {
      return (
        result._id.toLowerCase().includes(searchByID.toLowerCase()) ||
        !searchingById
      );
      //   return console.log(result);
    };
  };
  //   const searchingByMobileNo = (searchByMobileNo) => {
  //     return (result) => {
  //       return (
  //         result.mobileNo
  //           .toLowerCase()
  //           .includes(searchByMobileNo.toLowerCase()) || !searchByMobileNo
  //       );
  //       //   return console.log(result);
  //     };
  //   };

  let content;

  if (!isLoading && data)
    content = (
      <div className="ordermanagementtable mb-4">
        <div class="container">
          <div
            className={`newOrderTableHeading ${
              data.length > 0 ? " maximumWidth" : null
            }`}
          >
            <h3>New Orders</h3>
          </div>
          {data.length > 0 ? (
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
                  {/* <th className='orderTableTH'>Order Source</th> */}
                  <th className="orderTableTH">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter ID"
                      className="searchOrderData"
                      onChange={handleIDSearch}
                      value={searchByID}
                    />
                  </td>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter ID"
                      className="searchOrderData"
                      onChange={handlePhoneNoSearch}
                      value={searchByMobileNo}
                    />
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {data
                  .filter(searchingById(searchByID))
                  //   .filter(searchingByMobileNo(searchByMobileNo))
                  .map((item) => {
                    return (
                      <tr>
                        <td className="orderTableTD">{item._id}</td>
                        <td className="orderTableTD">
                          {item.userId.fname} {item.userId.lname}
                        </td>
                        <td className="orderTableTD">{item.mobileNo}</td>
                        <td className="orderTableTD">{item.RestaurantName}</td>
                        <td className="orderTableTD">{item.area}</td>
                        <td className="orderTableTD">{item.branch}</td>
                        <td className="orderTableTD">
                          {new Date(item.createdAt).toDateString()}
                          <br />
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </td>
                        {/* <td className='orderTableTD'>{item.payment}</td> */}
                        <td className="orderTableTD">COD</td>
                        <td className="orderTableTD">AED {item.totalPrice}</td>
                        {/* <td className='orderTableTD'>{item.orderSource}</td> */}
                        <td className="orderTableTD">
                          <div className="d-flex justify-content-center">
                            <div>{item.orderStatus}</div>
                            <label
                              className="orderView ml-3"
                              onClick={() => props.editOrder(item._id)}
                            >
                              View
                            </label>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="noNewOrderHeadingDiv mt-3">
              <h4>No New Order Received</h4>
            </div>
          )}
        </div>
      </div>
    );
  else content = <p>Loading...</p>;

  return content;
};
