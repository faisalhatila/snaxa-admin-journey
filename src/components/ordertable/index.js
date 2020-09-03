import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { useSocket } from "../../shared/hooks/socket-hook";
import { useInfiniteScrolling } from "../../shared/hooks/infinite-scrolling-hook";
// let NewOrder;
const NewOrder = (props) => {
  // const [data, setData] = useState([]);
  const { socketData, setSocketData, handleSocket, socket } = useSocket();
  const { list, setList, skip, setSkip, handleScroll } = useInfiniteScrolling();
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchByID, setSearchByID] = useState("");
  const [searchByMobileNo, setSearchByMobileNo] = useState("");
  // const [searching, setSearching] = useState(false);
  const idRef = useRef();
  const mobileRef = useRef();

  useEffect(() => {
    handleSocket("order");
    console.log("socketData", socketData);
    // socketData.order && setList([socketData.order, ...data]);
    socketData.order && setList([socketData.order, ...list]);
  }, [socketData]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      // if (idRef.current && searchByID === idRef.current.value) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/punched-orders?skip=${skip}`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            query: searchByID,
          })
        );
        console.log("responseDataNewOrders", responseData);
        setList([...list, ...responseData.orders]);
        // setList(responseData.orders);
      } catch (err) {}
      // }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchByID, sendRequest, userId, skip]);

  const handleIDSearch = (event) => {
    setSearchByID(event.target.value);
    setSkip(0);
    setList([]);
  };
  const handlePhoneNoSearch = (event) => {
    setSearchByMobileNo(event.target.value);
    setSkip(0);
    setList([]);
  };
  let content;

  if (list.length > 0)
    content = list.map((item) => {
      return (
        <tr>
          <td className="orderTableTD">{item.oid}</td>
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
    });
  else content = <p>Loading...</p>;

  return (
    <div className="ordermanagementtable mb-4" onScroll={handleScroll}>
      <div class="container">
        <div
          className={`newOrderTableHeading ${
            list && list.length > 0 ? " maximumWidth" : null
          }`}
        >
          <h3>Active Orders</h3>
        </div>
        <table class="table table-hover">
          <thead style={{ backgroundColor: "#3b3b3b", color: "#fff" }}>
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
                  ref={idRef}
                  type="text"
                  placeholder="Enter Order ID"
                  className="searchOrderData"
                  // onChange={(e) => handleIDSearch(e)}
                  onChange={handleIDSearch}
                  value={searchByID}
                />
              </td>
              <td></td>
              <td>
                <input
                  ref={mobileRef}
                  type="text"
                  placeholder="Enter Mobile No"
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
            {list && list.length > 0 ? (
              content
            ) : (
              <div className="noNewOrderHeadingDiv mt-3">
                <h4>No New Order Received</h4>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default NewOrder;
