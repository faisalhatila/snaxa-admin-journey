import React from "react";
import { ReviewsTable } from "../../components";
// let OrderDetails;
const Reviews = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <ReviewsTable />
        </div>
      </div>
    </div>
  );
};
export default Reviews;
