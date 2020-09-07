import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Colors from "../../UI/constants/Colors";

// let FeedbackTable;
const FeedbackTable = (props) => {
  const [data, setData] = useState();

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchByName, setSearchByName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");

  // console.log(userId, token);
  // const auth = useContext(AuthContext);
  useEffect(() => {
    const dashboard = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/view-feedbacks`,
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
        setData(responseData.feedbacks);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  const emailRef = useRef();
  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     //   if (searchByEmail === emailRef.current.value) {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/get-restaurant-by-email`,
  //         "POST",
  //         {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //         JSON.stringify({
  //           userId,
  //           emailQuery: searchByEmail,
  //           type: "New",
  //         })
  //       );
  //       console.log("responseData", responseData);
  //       setData(responseData.restaurants);
  //     } catch (err) {}
  //     //   }
  //   }, 500);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [searchByEmail, sendRequest, userId]);

  const nameRef = useRef();
  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     //   if (searchByName === nameRef.current.value) {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/get-restaurant-by-name`,
  //         "POST",
  //         {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //         JSON.stringify({
  //           userId,
  //           emailQuery: searchByName,
  //           type: "New",
  //         })
  //       );
  //       console.log("responseData", responseData);
  //       setData(responseData.restaurants);
  //     } catch (err) {}
  //     //   }
  //   }, 500);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [searchByName, sendRequest, userId]);

  let content;
  if (!isLoading && data)
    content = data.map((item) => {
      return (
        <tr>
          <td className="orderTableTD">{item.overallexperience}</td>
          <td className="orderTableTD">{item.effort}</td>
          <td className="orderTableTD">{item.likely}</td>
          <td className="orderTableTD">{item.comment}</td>
        </tr>
      );
    });
  // content = [...Array(5)].map((item, i) => {
  //   return (
  //     <tr>
  //       <td className="orderTableTD">Extremly Satisfied</td>
  //       <td className="orderTableTD">5</td>
  //       <td className="orderTableTD">10</td>
  //       <td className="orderTableTD">Good work keep it up</td>
  //     </tr>
  //   );
  // });
  else content = <p>Loading...</p>;
  return (
    <div className="restaurantmanagementtable mb-4">
      <div class="container">
        <div
          className={`newOrderTableHeading ${
            data && data.length > 0 ? " maximumWidthRestaurant" : null
          }`}
        >
          <h3>Feedback</h3>
        </div>
        <table class="table table-hover">
          <thead style={{ backgroundColor: Colors.tableHead, color: "#fff" }}>
            <tr className="restaurantTableHeadiingRow">
              <th className="orderTableTH">Experience (max. 5)</th>
              <th className="orderTableTH">Effort (max. 5)</th>
              <th className="orderTableTH">Recommend (max. 10)</th>
              <th className="orderTableTH">Comment</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td></td>
              <td>
                <input
                  ref={emailRef}
                  type="text"
                  placeholder="Enter Restaurant Name"
                  className="searchOrderData"
                  onChange={(e) => setSearchByEmail(e.target.value)}
                  value={searchByEmail}
                />
              </td>
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
export default FeedbackTable;
