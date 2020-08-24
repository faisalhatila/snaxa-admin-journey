import React from "react";
import { ReviewTableDetailRating, ReviewTableDetail } from "..";

const ReviewsDetailed = (props) => {
  return (
    <div>
      <ReviewTableDetailRating />
      <ReviewTableDetail />
      <label
        style={{
          backgroundColor: "green",
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
