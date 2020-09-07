import React from "react";
import { ReviewTableDetailRating, ReviewTableDetail } from "..";
import Colors from "../../UI/constants/Colors";

const ReviewsDetailed = (props) => {
  console.log("################################");
  console.log("detailedddd", props.currentReview);
  console.log("################################");
  return (
    <div>
      <ReviewTableDetailRating currentReview={props.currentReview} />
      <ReviewTableDetail currentReview={props.currentReview} />
      <label
        style={{
          backgroundColor: Colors.tableHead,
          color: "#fff",
          borderRadius: "5px",
          padding: "5px 10px",
        }}
        onClick={props.back}
      >
        Back
      </label>
    </div>
  );
};
export default ReviewsDetailed;
