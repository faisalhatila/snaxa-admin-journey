import React, { useState } from "react";
import {
  ReviewsTable,
  DetailedReviews,
  ReviewTableShort,
  ReviewsDetailed,
} from "../../components";
// let OrderDetails;
const Reviews = (props) => {
  const [reviewTableStep, setReviewTableStep] = useState(1);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          {/* {reviewTableStep === 1 ? (
            <ReviewsTable next={() => setReviewTableStep(2)} />
          ) : (
            <DetailedReviews back={() => setReviewTableStep(1)} />
          )} */}
          {reviewTableStep === 1 ? (
            <ReviewTableShort next={() => setReviewTableStep(2)} />
          ) : (
            <ReviewsDetailed back={() => setReviewTableStep(1)} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Reviews;
