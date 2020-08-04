import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import useForm from "./useform";
import validate from "./validate";

const Faqdetails = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [orderStatusName, setOrderStatusName] = useState("");
  const [isCompletedStatus, setIsCompletedStatus] = useState(false);
  const [isCancelledStatus, setIsCancelledStatus] = useState(false);
  const handleChangeOrderStatusName = (e) => {
    setOrderStatusName(e.target.value);
  };
  const handleCompletedMarkCheck = (e) => {
    setIsCompletedStatus(e.target.checked);
    setIsCancelledStatus(false);
  };
  const handleCencelledMarkCheck = (e) => {
    setIsCompletedStatus(false);
    setIsCancelledStatus(e.target.checked);
  };
  const handleAddOrderStatusName = async (e) => {
    e.preventDefault();
    handleSubmit();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/add-order-status`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          orderStatus: orderStatusName,
          active: isCompletedStatus,
        })
      );
      console.log("responseData", responseData);
      setData(responseData.orderStatuses);
    } catch (err) {}
    setOrderStatusName("");
    setIsCompletedStatus(false);
  };
  const handleDeleteOrderStatusName = async (itemIndex) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-order-status`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          orderStatus: itemIndex,
        })
      );
      console.log("responseData", responseData);
      setData(responseData.orderStatuses);
    } catch (err) {}
  };
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-order-status`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
          })
        );
        console.log("responseData", responseData);
        setData(responseData.orderStatuses);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate
  );
  function submit() {
    console.log("success");
  }
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
                <label for="exampleInputEmail1">Question</label>
                <div className="d-flex align-items-center">
                  <input
                    onChange={handleChange}
                    value={values.orderStatusName}
                    name="orderstatus"
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Question"
                  />
                  {/* <button
                    type="submit"
                    className="addOrderStatusButton"
                    onClick={handleAddOrderStatusName}
                  >
                    Add
                  </button> */}
                </div>
                {/* {errors.orderStatusNameError ? (
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {errors.orderStatusNameError}
                  </div>
                ) : null} */}
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Answer</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  // style={{ resize: "none" }}
                ></textarea>
              </div>
              <button
                type="submit"
                className="addOrderStatusButton"
                onClick={handleAddOrderStatusName}
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
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return item.active === false ? (
                        <tr>
                          <td className="orderTableTD">{item.orderstatus}</td>
                          <div className="d-flex align-items-center justify-content-center">
                            <i
                              style={{ cursor: "pointer" }}
                              class="far fa-edit mr-3 editButtonIcon"
                            ></i>
                            <label
                              className="noMargin deleteOrderStatusButton"
                              //   onClick={() =>
                              //     handleDeleteOrderStatusName(item._id)
                              //   }
                            >
                              Delete
                            </label>
                          </div>
                        </tr>
                      ) : null;
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
export default Faqdetails;
