import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
// import useForm from "./useform";
// import validate from "./validate";

const Termsandconditionsform = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState("");
  const [para, setPara] = useState("");
  const [priority, setPriority] = useState();
  // const [isCompletedStatus, setIsCompletedStatus] = useState(false);
  // const [isCancelledStatus, setIsCancelledStatus] = useState(false);
  const headingChangeHandler = (event) => {
    setHeading(event.target.value);
  };
  const paraChangeHandler = (event) => {
    setPara(event.target.value);
  };
  const priorityChangeHandler = (event) => {
    const prty = parseInt(event.target.value);
    setPriority(prty);
  };
  const handleAddFAQs = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/add-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          heading: heading,
          para: para,
          type: "f",
          priority: priority,
        })
      );
      console.log("responseData", responseData);
      // setData(responseData.existingFtps);
      fetchTerms();
    } catch (err) {}
    // setIsCompletedStatus(false);
  };
  const handleDeleteFAQs = async (itemIndex) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          _id: itemIndex,
          userId,
          // orderStatus: itemIndex,
        })
      );
      console.log("responseData", responseData);
      // setData(responseData.orderStatuses);
      fetchTerms();
    } catch (err) {}
  };
  const fetchTerms = async () => {
    console.log("Dashboard");
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/view-ftps`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          type: "t",
        })
      );
      console.log("responseData", responseData);
      setData(responseData.existingFtps);
    } catch (err) {}
  };
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/view-ftps`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            type: "t",
          })
        );
        console.log("responseData", responseData);
        setData(responseData.existingFtps);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  //   const { handleChange, handleSubmit, values, errors } = useForm(
  //     submit,
  //     validate
  //   );
  //   function submit() {
  //     console.log("success");
  //   }
  let content;
  if (!isLoading)
    content = (
      <div className="row">
        <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          FAQs
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">Heading</label>
                <div className="d-flex align-items-center">
                  <input
                    value={heading}
                    onChange={headingChangeHandler}
                    name="orderstatus"
                    type="text"
                    class="form-control"
                    placeholder="Enter Question"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Answer</label>
                <textarea
                  class="form-control"
                  rows="5"
                  value={para}
                  onChange={paraChangeHandler}
                  // style={{ resize: "none" }}
                ></textarea>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Priority</label>
                <div className="d-flex align-items-center">
                  <input
                    value={priority}
                    onChange={priorityChangeHandler}
                    name="orderstatus"
                    type="text"
                    class="form-control"
                    placeholder="Priority"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="addOrderStatusButton"
                onClick={handleAddFAQs}
              >
                Add
              </button>
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>FAQs Table</strong>
                </label>
                <table class="table table-hover">
                  <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                    <tr>
                      <th className="orderTableTH">FAQ</th>
                      <th className="orderTableTH">Priority</th>
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(data)}
                    {data.map((item, index) => {
                      return (
                        <tr>
                          <td className="orderTableTD">{item.heading}</td>
                          <td className="orderTableTD">{item.priority}</td>
                          <td className="orderTableTD">
                            <div className="d-flex align-items-center justify-content-center">
                              <i
                                style={{ cursor: "pointer" }}
                                class="far fa-edit mr-3 editButtonIcon"
                              ></i>
                              <label
                                className="noMargin deleteOrderStatusButton"
                                onClick={() => handleDeleteFAQs(item._id)}
                              >
                                Delete
                              </label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else content = <p>Loading...</p>;
  return content;
};
export default Termsandconditionsform;
