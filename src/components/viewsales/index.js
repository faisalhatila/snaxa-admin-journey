import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Colors from "../../UI/constants/Colors";

// let ViewSales;
const ViewSales = (props) => {
  const [data, setData] = useState();

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchByName, setSearchByName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");

  // console.log(userId, token);
  // const auth = useContext(AuthContext);
  //   useEffect(() => {
  //     const dashboard = async () => {
  //       try {
  //         const responseData = await sendRequest(
  //           `${process.env.REACT_APP_BACKEND_URL}/contact-us-forms `,
  //           "POST",
  //           {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           JSON.stringify({
  //             userId,
  //           })
  //         );
  //         console.log("#########################################");
  //         console.log("responseData", responseData);
  //         console.log("#########################################");
  //         setData(responseData.contactForms);
  //       } catch (err) {
  //         // console.log("err", err);
  //       }
  //     };
  //     if (token && userId) dashboard();
  //   }, [token, userId, sendRequest]);

  let content;
  //   if (!isLoading && data)
  //     content = data.map((item, i) => {
  //       return (
  //         <tr key={i}>
  //           <td className="orderTableTD">{item.name}</td>
  //           <td className="orderTableTD">{item.email}</td>
  //           <td className="orderTableTD">{item.number}</td>
  //           <td className="orderTableTD">{item.comment}</td>
  //         </tr>
  //       );
  //     });
  //   else content = <p>Loading...</p>;
  content = [...Array(5)].map((i) => {
    return (
      <tr key={i}>
        <td className="orderTableTD">0100101</td>
        <td className="orderTableTD">09/01/2020</td>
        <td className="orderTableTD">KFC</td>
        <td className="orderTableTD">200</td>
        <td className="orderTableTD">1000</td>
        <td className="orderTableTD">Paid</td>
      </tr>
    );
  });
  return (
    <div>
      <div className="row">
        <div class="form-group col-3 offset-9">
          <label for="exampleFormControlSelect1">Search for</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>Last 14 Days</option>
            <option>Last 28 Days</option>
          </select>
        </div>
      </div>
      <div className="restaurantmanagementtable mb-4">
        <div class="container">
          <div
            className={`newOrderTableHeading ${
              data && data.length > 0 ? " maximumWidthRestaurant" : null
            }`}
          >
            <h3>Sales Report</h3>
          </div>
          <table class="table table-hover">
            <thead style={{ backgroundColor: Colors.tableHead, color: "#fff" }}>
              <tr className="restaurantTableHeadiingRow">
                <th className="orderTableTH">Order Id</th>
                <th className="orderTableTH">Date</th>
                <th className="orderTableTH">Restaurant Name</th>
                <th className="orderTableTH">Commision Amount</th>
                <th className="orderTableTH">Total Amount</th>
                <th className="orderTableTH">Status</th>
                {/* <th className="orderTableTH">Action</th> */}
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
    </div>
  );
};
export default ViewSales;
