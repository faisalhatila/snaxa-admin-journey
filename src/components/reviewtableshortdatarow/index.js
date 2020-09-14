import React, { useEffect, useState } from "react";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { useAuth } from "../../shared/hooks/auth-hooks";
import Colors from "../../UI/constants/Colors";
const ReviewTableShortDataRow = (props) => {
  const [data, setData] = useState();
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
      //   props.getReviews();
      setData(responseData.review);
    } catch (err) {}
  };
  const handleDeleteReview = async (review) => {
    console.log("####################################");
    console.log(review);
    console.log("####################################");
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-review`,
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
      //   props.getReviews();
      setData(responseData.deleted);
    } catch (err) {}
  };
  const { item } = props;

  useEffect(() => {
    setData(item);
  }, [item]);

  console.log("#################################################");
  console.log(data);
  console.log("#################################################");

  if (data === true) return <span></span>;
  return (
    <tr>
      <td className="orderTableTD">{data && data.userName}</td>
      <td className="orderTableTD">{data && data.restaurantName}</td>
      <td className="orderTableTD">{data && data.comment}</td>
      <td className="orderTableTD">
        {/* <i style={{ cursor: "pointer" }} class="far fa-edit"></i> */}
        <div className="d-flex">
          <label
            className="reviewTableViewButton mr-2"
            style={{ background: Colors.tableHead }}
            // onClick={() => handleViewReviews(item)}
          >
            View
          </label>
          {/* <label
                className="reviewTableDeleteButton mr-2"
                onClick={() => handleApproveReview(item)}
              >
                Approve
              </label> */}
          {isLoading && !data.approved && data ? (
            <div>
              <label className="reviewTableApprovedButton mr-2">Loading</label>
            </div>
          ) : data && !data.approved ? (
            <div>
              <label
                className="reviewTableApproveButton mr-2"
                onClick={() => handleApproveReview(data)}
              >
                Approve
              </label>
            </div>
          ) : (
            <div>
              <label
                className="reviewTableApprovedButton mr-2"
                // onClick={() => handleApproveReview(item)}
              >
                Approved
              </label>
            </div>
          )}
          {/* <label
            className="reviewTableDeleteButton"
            onClick={() => {
              handleDeleteReview(data);
            }}
          >
            Delete
          </label> */}
          {isLoading && data.approved && data ? (
            <div>
              <label className="reviewTableApprovedButton mr-2">Loading</label>
            </div>
          ) : data && data ? (
            <div>
              <label
                className="reviewTableDeleteButton"
                onClick={() => {
                  handleDeleteReview(data);
                }}
              >
                Delete
              </label>
            </div>
          ) : (
            <div>
              <label
                className="reviewTableDeleteButton"
                onClick={() => {
                  handleDeleteReview(data);
                }}
              >
                Delete
              </label>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ReviewTableShortDataRow;
