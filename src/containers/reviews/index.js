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
  const { userId, token } = useAuth();
  useEffect(() => {
    const dashboard = async () => {
      // console.log("new-restaurants");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/view-reviews`
          // "POST",
          // {
          //   "Content-Type": "application/json",
          //   Authorization: "Bearer " + token,
          // },
          // JSON.stringify({
          //   userId,
          // })
        );
        console.log("responseData", responseData);
        setData(responseData.reviews);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          {reviewTableStep === 1 ? (
            <ReviewTableShort
              dataReview={data.length > 0 && data}
              getCurrReview={(reviewData) => setCurrentReview(reviewData)}
              next={() => setReviewTableStep(2)}
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
