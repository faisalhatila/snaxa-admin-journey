import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Colors from "../../UI/constants/Colors";

// let ReviewTableShort;
const ReviewTableDetailRating = (props) => {
  // console.log("###################################");
  // console.log("dataReview", props.currentReview);
  // console.log("###################################");
  const [data, setData] = useState();

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchByName, setSearchByName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");

  // console.log(userId, token);
  // const auth = useContext(AuthContext);
  useEffect(() => {
    const dashboard = async () => {
      console.log("new-restaurants");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/new-restaurants`,
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
        setData(responseData.existingRestaurantsAdmin);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  const emailRef = useRef();
  useEffect(() => {
    const timer = setTimeout(async () => {
      //   if (searchByEmail === emailRef.current.value) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-restaurant-by-email`,
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
        setData(responseData.restaurants);
      } catch (err) {}
      //   }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchByEmail, sendRequest, userId]);

  const nameRef = useRef();
  useEffect(() => {
    const timer = setTimeout(async () => {
      //   if (searchByName === nameRef.current.value) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-restaurant-by-name`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            emailQuery: searchByName,
            type: "New",
          })
        );
        console.log("responseData", responseData);
        setData(responseData.restaurants);
      } catch (err) {}
      //   }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchByName, sendRequest, userId]);

  let content;
  const currentReview = props.currentReview;
  if (!isLoading && currentReview)
    content = (
      <tr>
        <td className="orderTableTD">{currentReview.restaurantName}</td>
        <td className="orderTableTD">{currentReview.restaurantRatings[0]}</td>
        <td className="orderTableTD">{currentReview.restaurantRatings[1]}</td>
        <td className="orderTableTD">{currentReview.restaurantRatings[2]}</td>
        <td className="orderTableTD">{currentReview.restaurantRatings[3]}</td>
        {/* <td className="orderTableTD">{item.addres}</td>
      <td className="orderTableTD">
        {item.approved ? "Approved" : "Not Approved"}
      </td>
      <td className="orderTableTD">
        <i
          onClick={() => props.editRestaurant(item._id)}
          style={{ cursor: "pointer" }}
          class="far fa-edit"
        ></i>
      </td> */}
      </tr>
    );
  // content = [...Array(1)].map((item, i) => {
  //   return (
  //     <tr>
  //       <td className="orderTableTD">Biryani</td>
  //       <td className="orderTableTD">5 *</td>
  //       <td className="orderTableTD">5 *</td>
  //       <td className="orderTableTD">5 *</td>
  //       <td className="orderTableTD">5 *</td>
  //     </tr>
  //   );
  // });
  // else content = <p>Loading...</p>;
  return (
    <div className="restaurantmanagementtable mb-4">
      <div class="container">
        <div
          className={`newOrderTableHeading ${
            data && data.length > 0 ? " maximumWidthRestaurant" : null
          }`}
        >
          <h3>Restaurant Ratings</h3>
        </div>
        <table class="table table-hover">
          <thead style={{ backgroundColor: Colors.tableHead, color: "#fff" }}>
            <tr className="restaurantTableHeadiingRow">
              <th className="orderTableTH">Restaurant Name</th>
              <th className="orderTableTH">Order Packaging</th>
              <th className="orderTableTH">Value of money</th>
              <th className="orderTableTH">Delivery Time</th>
              <th className="orderTableTH">Quality of food</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Enter Name"
                  className="searchOrderData"
                  onChange={(e) => setSearchByName(e.target.value)}
                  value={searchByName}
                />
              </td>
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
            </tr> */}
            {/* {data && data.length > 0 ? (
              content
            ) : (
              <div className="noNewOrderHeadingDiv mt-3">
                <tr>
                  <h4>No New Restaurant Added</h4>
                </tr>
              </div>
            )} */}
            {content}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ReviewTableDetailRating;
