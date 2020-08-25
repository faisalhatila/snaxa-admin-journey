import React from "react";
import { ReviewTableDetailRating, ReviewTableDetail } from "..";
import Colors from "../../UI/constants/Colors";

const ReviewsDetailed = (props) => {
  return (
    <div>
      <ReviewTableDetailRating />
      <ReviewTableDetail />
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
