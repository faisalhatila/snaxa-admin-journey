import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import useForm from "./useform";
import validate from "./validate";

const SocialNetworkForm = (props) => {
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
  // const handleMenuCheck = (menu) => {
  //   let temp = siteinfoArray;
  //   temp = temp.map((i) => {
  //     if (i.isChecked) {
  //       i.isChecked = !i.isChecked;
  //       return i;
  //     } else return i;
  //   });
  //   const tempObj = temp[menu];
  //   tempObj.isChecked = !temp[menu].isChecked;
  //   temp[menu] = tempObj;
  //   setSiteinfoArray(temp);
  //   console.log(temp);
  // };

  let content;
  if (!isLoading)
    content = (
      <div className="row mt-4">
        <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Social Network
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 updateVendorForm">
              <div className="row">
                <div class="form-group col">
                  <label>Facebook</label>
                  <div className="d-flex align-items-center">
                    <input
                      onChange={handleChange}
                      value={values.orderStatusName}
                      name="orderstatus"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter URL"
                    />
                  </div>
                </div>
                <div class="form-group col">
                  <label>Twitter</label>
                  <div className="d-flex align-items-center">
                    <input
                      onChange={handleChange}
                      value={values.orderStatusName}
                      name="orderstatus"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter URL"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="form-group col">
                  <label>Linkedin</label>
                  <div className="d-flex align-items-center">
                    <input
                      onChange={handleChange}
                      value={values.orderStatusName}
                      name="orderstatus"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Url"
                    />
                  </div>
                </div>
                <div class="form-group col">
                  <label>Instagram</label>
                  <div className="d-flex align-items-center">
                    <input
                      onChange={handleChange}
                      value={values.orderStatusName}
                      name="orderstatus"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Url"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="addOrderStatusButton"
                onClick={handleAddOrderStatusName}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  else content = <p>Loading...</p>;
  return content;
};
export default SocialNetworkForm;
