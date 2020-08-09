import React from "react";
import { FeedbackTable } from "../../components";
// let OrderDetails;
const Feedback = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <FeedbackTable />
        </div>
      </div>
    </div>
  );
};
export default Feedback;
