import React, { useState, useEffect } from "react";
import {
  ReviewsTable,
  DetailedReviews,
  ReviewTableShort,
  ReviewsDetailed,
} from "../../components";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useAuth } from "../../shared/hooks/auth-hooks";
// let OrderDetails;
const Reviews = (props) => {
  const [reviewTableStep, setReviewTableStep] = useState(1);
  const [data, setData] = useState([]);
  const [currentReview, setCurrentReview] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isUpdating, setIsUpdating] = useState(true);
  const { userId, token } = useAuth();

  const handleViewCurrentReview = (review) => {
    setCurrentReview(review);
  };

  // const handleDeleteReview = async (review) => {
  //   console.log("####################################");
  //   console.log(review);
  //   console.log("####################################");
  //   // setIsUpdating(true);
  //   try {
  //     const responseData = await sendRequest(
  //       `${process.env.REACT_APP_BACKEND_URL}/delete-review`,
  //       "POST",
  //       {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //       JSON.stringify({
  //         reviewId: review.reviewId,
  //         userId,
  //         // orderStatus: itemIndex,
  //       })
  //     );
  //     console.log("###################################################");
  //     console.log("responseData", responseData);
  //     console.log("###################################################");
  //     getReviews();
  //     // setIsUpdating(false);
  //   } catch (err) {}
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          {reviewTableStep === 1 ? (
            <ReviewTableShort
              dataReview={data.length > 0 && data}
              next={() => setReviewTableStep(2)}
              // handleApproveReview={handleApproveReview}
              // handleDeleteReview={handleDeleteReview}
              isUpdating={isUpdating}
              isLoading={isLoading}
              handleViewCurrentReview={handleViewCurrentReview}
            />
          ) : (
            <ReviewsDetailed
              currentReview={currentReview}
              back={() => setReviewTableStep(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Reviews;
