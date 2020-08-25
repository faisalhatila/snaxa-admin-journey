import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { useInfiniteScrolling } from "../../shared/hooks/infinite-scrolling-hook";

// let NewCustomerTable;

const NewCustomerTable = (props) => {
  // const [searchByID, setSearchByID] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { list, setList, skip, setSkip, handleScroll } = useInfiniteScrolling();
  useEffect(() => {
    const dashboard = async () => {
      console.log("new-restaurants");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/new-customers?skip=${skip}`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
          })
        );
        console.log("responseData1", responseData);
        setList([...list, ...responseData.existingUsers]);

        // setList([...list, ...responseData.existingUsers]);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest, skip]);
  // const handleIDSearch = (event) => {
  // 	setSearchByID(event.target.value);
  // };
  const emailRef = useRef();
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchByEmail === emailRef.current.value) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/get-customer-by-email?skip=${skip}`,
            "POST",
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            JSON.stringify({
              userId,
              emailQuery: searchByEmail,
              type: "New",
            })
          );
          console.log("responseData", responseData);
          setList([...list, ...responseData.users]);
        } catch (err) {}
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchByEmail, sendRequest, userId]);

  let content;
  if (list.length > 0)
    content = list.map((item, index) => {
      return (
        <tr key={index}>
          <td className="orderTableTD">{item.fname}</td>
          <td className="orderTableTD">{item.lname}</td>
          <td className="orderTableTD">{item.email}</td>
          <td className="orderTableTD">{item.gender}</td>
          <td className="orderTableTD">{new Date(item.date).toDateString()}</td>
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
    <div className="restaurantmanagementtable mb-4" onScroll={handleScroll}>
      <div class="container">
        <div
          className={`newOrderTableHeading ${
            list && list.length > 0 ? " maximumWidthRestaurant" : null
          }`}
        >
          <h3>New Customers</h3>
        </div>
        <table class="table table-hover mt-3">
          <thead style={{ backgroundColor: "#3b3b3b", color: "#fff" }}>
            <tr className="customerTableHeaderRow">
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
              <td></td>
              <td>
                <input
                  ref={emailRef}
                  type="text"
                  placeholder="Enter Email"
                  className="searchOrderData"
                  onChange={(e) => {
                    setSearchByEmail(e.target.value);
                    setSkip(0);
                    setList([]);
                  }}
                  value={searchByEmail}
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {list && list.length > 0 ? (
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
export default NewCustomerTable;
