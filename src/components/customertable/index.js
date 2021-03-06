import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";

// let CustomerTable;

const CustomerTable = (props) => {
  const [data, setData] = useState();

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchByID, setSearchByID] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");
  useEffect(() => {
    const dashboard = async () => {
      console.log("new-restaurants");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/all-customers`,
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
  // const handleIDSearch = (event) => {
  //   setSearchByID(event.target.value);
  // };

  const emailRef = useRef();
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchByEmail === emailRef.current.value) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/get-customer-by-email`,
            "POST",
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            JSON.stringify({
              userId,
              emailQuery: searchByEmail,
              type: "All",
            })
          );
          console.log("responseData", responseData);
          setData(responseData.users);
        } catch (err) {}
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchByEmail, sendRequest, userId]);

  // const handleEmailSearch = async (event) => {
  //   // console.log(emailRef.current.value === event.currentTarget.value);
  //   setSearchByEmail(emailRef.current.value);
  //   // return;
  //   // setSearchByEmail(event.current.value);
  // };
  // const searchingById = (searchByID) => {
  //   return (result) => {
  //     return (
  //       result._id.toLowerCase().includes(searchByID.toLowerCase()) ||
  //       !searchingById
  //     );
  //     //   return console.log(result);
  //   };
  // };
  // const searchingByEmail = (searchByEmail) => {
  //   return (result) => {
  //     return (
  //       result.email.toLowerCase().includes(searchByEmail.toLowerCase()) ||
  //       !searchByEmail
  //     );
  //     //   return console.log(result);
  //   };
  // };
  let content;
  if (!isLoading && data)
    content = data
      // .filter(searchingById(searchByID))
      // .filter(searchingByEmail(searchByEmail))
      .map((item, index) => {
        return (
          <tr key={index}>
            {/* <td className="orderTableTD">{item._id}</td> */}
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
      });
  else content = <p></p>;
  return (
    <div className="restaurantmanagementtable mb-4">
      <div class="container">
        <div
          className={`newOrderTableHeading ${
            data && data.length > 0 ? " maximumWidthRestaurant" : null
          }`}
        >
          <h3>All Customers</h3>
        </div>
        <table class="table table-hover mt-3">
          <thead style={{ backgroundColor: "#3b3b3b", color: "#fff" }}>
            <tr className="customerTableHeaderRow">
              {/* <th className="orderTableTH">ID</th> */}
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
              {/* <td>
              <input
                type='text'
                placeholder='Enter ID'
                className='searchOrderData'
                onChange={handleIDSearch}
                value={searchByID}
              />
            </td> */}
              <td></td>
              <td></td>
              <td>
                <input
                  ref={emailRef}
                  type="text"
                  placeholder="Enter Email"
                  className="searchOrderData"
                  onChange={(e) => setSearchByEmail(e.target.value)}
                  value={searchByEmail}
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {data && data.length > 0 ? (
              content
            ) : (
              <div className="noNewOrderHeadingDiv mt-3">
                <tr>
                  <h4>No Customers</h4>
                </tr>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CustomerTable;
