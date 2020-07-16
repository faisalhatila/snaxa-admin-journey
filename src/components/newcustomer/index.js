import React, { Component, useState, useEffect } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";

let NewCustomerTable;

export default NewCustomerTable = (props) => {
  const [data, setData] = useState();
  const [searchByID, setSearchByID] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const dashboard = async () => {
      console.log("new-restaurants");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/new-customers`,
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
        setData(responseData.existingUsers);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  const handleIDSearch = (event) => {
    setSearchByID(event.target.value);
  };
  const handleEmailSearch = (event) => {
    setSearchByEmail(event.target.value);
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
  const searchingByEmail = (searchByEmail) => {
    return (result) => {
      return (
        result.email.toLowerCase().includes(searchByEmail.toLowerCase()) ||
        !searchByEmail
      );
      //   return console.log(result);
    };
  };
  let content;
  if (!isLoading && data)
    content = (
      <div className="restaurantmanagementtable mb-4">
        <div class="container">
          <div
            className={`newOrderTableHeading ${
              data.length > 0 ? " maximumWidthRestaurant" : null
            }`}
          >
            <h3>New Customers</h3>
          </div>
          {data.length > 0 ? (
            <table class="table table-hover mt-3">
              <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                <tr>
                  <th className="orderTableTH">ID</th>
                  <th className="orderTableTH">First Name</th>
                  <th className="orderTableTH">Last Name</th>
                  <th className="orderTableTH">Email</th>
                  <th className="orderTableTH">Gender</th>
                  <th className="orderTableTH">Date Of Birth</th>
                  <th className="orderTableTH">Action</th>
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
                  <td></td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter Email"
                      className="searchOrderData"
                      onChange={handleEmailSearch}
                      value={searchByEmail}
                    />
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {data
                  .filter(searchingById(searchByID))
                  .filter(searchingByEmail(searchByEmail))
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="orderTableTD">{item._id}</td>
                        <td className="orderTableTD">{item.fname}</td>
                        <td className="orderTableTD">{item.lname}</td>
                        <td className="orderTableTD">{item.email}</td>
                        <td className="orderTableTD">{item.gender}</td>
                        <td className="orderTableTD">
                          {new Date(item.date).toDateString()}
                          {/* <br /> */}
                          {/* {new Date(item.date).toLocaleTimeString()} */}
                        </td>
                        <td className="orderTableTD">
                          <i
                            onClick={() => props.editCustomer(item._id)}
                            style={{ cursor: "pointer" }}
                            class="far fa-edit"
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="noNewOrderHeadingDiv mt-3">
              <h4>No Customers</h4>
            </div>
          )}
        </div>
      </div>
    );
  else content = <p>Loading...</p>;
  return content;
};
