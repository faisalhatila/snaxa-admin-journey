import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Colors from "../../UI/constants/Colors";
import { ReviewTableShortDataRow } from "..";

// let ReviewTableShort;
const ReviewTableShort = (props) => {
  const [data, setData] = useState();

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchByName, setSearchByName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");
  // const [reviewId, setReviewId] = useState("");

  // console.log(userId, token);
  // const auth = useContext(AuthContext);
  const handleViewReviews = (review) => {
    console.log("##########################################");
    console.log(review);
    console.log("##########################################");
    props.handleViewCurrentReview(review);
    props.next();
  };
  const getReviews = async () => {
    // console.log("new-restaurants");
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/view-reviews`,
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
      setData(responseData.reviews);
    } catch (err) {
      // console.log("err", err);
    }
  };

  const handleApproveReview = async (review) => {
    console.log("####################################");
    console.log(review);
    console.log("####################################");
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/approve-review`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          reviewId: review.reviewId,
          userId,
          // orderStatus: itemIndex,
        })
      );
      console.log("###################################################");
      console.log("responseData", responseData);
      console.log("###################################################");
      getReviews();
      // setData(responseData.review);
    } catch (err) {}
  };

  useEffect(() => {
    const dashboard = async () => {
      // console.log("new-restaurants");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/view-reviews`,
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
        setData(responseData.reviews);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  console.log(props.isLoading);

  let content;
  if (!isLoading && data)
    content = data.map((item) => {
      return (
        // <tr>
        //   <td className="orderTableTD">{item.name}</td>
        //   <td className="orderTableTD">{item.email}</td>
        //   <td className="orderTableTD">{item.addres}</td>
        //   <td className="orderTableTD">
        //     {item.approved ? "Approved" : "Not Approved"}
        //   </td>
        //   <td className="orderTableTD">
        //     <i
        //       onClick={() => props.editRestaurant(item._id)}
        //       style={{ cursor: "pointer" }}
        //       class="far fa-edit"
        //     ></i>
        //   </td>
        // </tr>
        <ReviewTableShortDataRow item={item} getReviews={getReviews} />
      );
    });
  else content = <p>Loading...</p>;
  return (
    <div className="restaurantmanagementtable mb-4">
      <div class="container">
        <div
          className={`newOrderTableHeading ${
            data && data.length > 0 ? " maximumWidthRestaurant" : null
          }`}
        >
          <h3>Customers Reviews</h3>
        </div>
        <table class="table table-hover">
          <thead style={{ backgroundColor: Colors.tableHead, color: "#fff" }}>
            <tr className="restaurantTableHeadiingRow">
              {/* <th className='orderTableTH'>ID</th> */}
              {/* <th className="orderTableTH">Restaurant Name</th>
              <th className="orderTableTH">Email</th>
              <th className="orderTableTH">Address</th>
              <th className="orderTableTH">Status</th>
              <th className="orderTableTH">Action</th> */}
              <th className="orderTableTH">Name</th>
              <th className="orderTableTH">Name Restaurant</th>
              <th className="orderTableTH">Message</th>
              <th className="orderTableTH">Action</th>
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
            {/* {data && data.length > 0 ? ( */}
            {content}
            {/* ) : (
              <div className="noNewOrderHeadingDiv mt-3">
                <tr>
                  <h4>No New Restaurant Added</h4>
                </tr>
              </div>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ReviewTableShort;
