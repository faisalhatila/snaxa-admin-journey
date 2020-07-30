// import { ImageUpload } from "..";
import React, { useState, useEffect } from "react";
// import { set } from "lodash";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import useForm from "./useform";
import validate from "./validate";

// let itemIndex = 0;
// let AddOrderStatusForm;
const Faqdetails = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [orderStatusName, setOrderStatusName] = useState("");
  // const [orderStatusNameError, setOrderStatusNameError] = useState("");
  const [isCompletedStatus, setIsCompletedStatus] = useState(false);
  const [isCancelledStatus, setIsCancelledStatus] = useState(false);
  // const validate = () => {
  //   // const { orderStatusName } = state;
  //   // let { orderStatusNameError } = state;
  //   // if (!orderStatusName) {
  //   // 	orderStatusNameError = "Please Enter Order Status Name";
  //   // } else {
  //   // 	orderStatusNameError = "";
  //   // }
  //   // if (orderStatusNameError) {
  //   // 	setState({
  //   // 		orderStatusNameError,
  //   // 	});
  //   // 	return false;
  //   // }
  //   return true;
  // };

  const handleChangeOrderStatusName = (e) => {
    setOrderStatusName(e.target.value);
    // orderStatusNameError: "",
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
    } catch (err) {
      // console.log("err", err);
    }
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
    } catch (err) {
      // console.log("err", err);
    }
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
      } catch (err) {
        // console.log("err", err);
      }
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
          Add Order Status
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">Order Status Name</label>
                <div className="d-flex align-items-center">
                  <input
                    onChange={handleChange}
                    value={values.orderStatusName}
                    name="orderstatus"
                    type="text"
                    class="form-control mr-4"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Order Status Name"
                  />
                  <button
                    type="submit"
                    className="addOrderStatusButton"
                    onClick={handleAddOrderStatusName}
                  >
                    Add
                  </button>
                </div>
                {errors.orderStatusNameError ? (
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {errors.orderStatusNameError}
                  </div>
                ) : null}
                {/* {orderStatusNameError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {orderStatusNameError}
                  </div>
                ) : null} */}
                <div class="form-check mt-4">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    onChange={handleCompletedMarkCheck}
                    checked={isCompletedStatus}
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Will it mark an order as completed order
                  </label>
                </div>
                <div class="form-check mt-4">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    onChange={handleCencelledMarkCheck}
                    checked={isCancelledStatus}
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Will it mark an order as cancelled order
                  </label>
                </div>
              </div>
              {/* <button
                type="submit"
                class="btn btn-primary mt-3"
                // onClick={handleSubmit}
              >
                Add Item
              </button> */}
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>Active Order Status</strong>
                </label>
                {/* <ul>
									{data.map((item, index) => {
										return item.active === false ? (
											<li key={index} className='mb-2'>
												<div className='d-flex align-items-center'>
													<label className='mr-4 noMargin'>
														{item.orderstatus}
													</label>
													<label
														className='noMargin deleteOrderStatusButton'
														onClick={() =>
															handleDeleteOrderStatusName(item._id)
														}>
														Delete
													</label>
												</div>
											</li>
										) : null;
									})}
								</ul> */}
                <table class="table table-hover">
                  <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                    <tr>
                      <th className="orderTableTH">Item Name</th>
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
                              //   onClick={() => props.editRestaurant(item._id)}
                              style={{ cursor: "pointer" }}
                              class="far fa-edit mr-3 editButtonIcon"
                            ></i>
                            <label
                              className="noMargin deleteOrderStatusButton"
                              onClick={() =>
                                handleDeleteOrderStatusName(item._id)
                              }
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
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>Completed Order Status</strong>
                </label>
                {/* <ul>
                  {data.map((item, index) => {
                    return item.active === true ? (
                      <li key={item._id} className="mb-2">
                        <div className="d-flex align-items-center">
                          <label className="mr-4 noMargin">
                            {item.orderstatus}
                          </label>
                          <label
                            className="noMargin deleteOrderStatusButton"
                            onClick={() =>
                              handleDeleteOrderStatusName(item._id)
                            }
                          >
                            Delete
                          </label>
                        </div>
                      </li>
                    ) : null;
                  })}
                </ul> */}
                <table class="table table-hover">
                  <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                    <tr>
                      <th className="orderTableTH">Item Name</th>
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return item.active === true ? (
                        <tr>
                          <td className="orderTableTD">{item.orderstatus}</td>
                          <td className="orderTableTD">
                            <div className="d-flex align-items-center justify-content-center">
                              <i
                                //   onClick={() => props.editRestaurant(item._id)}
                                style={{ cursor: "pointer" }}
                                class="far fa-edit mr-3 editButtonIcon"
                              ></i>
                              <label
                                className="noMargin deleteOrderStatusButton"
                                onClick={() =>
                                  handleDeleteOrderStatusName(item._id)
                                }
                              >
                                Delete
                              </label>
                            </div>
                          </td>
                        </tr>
                      ) : null;
                    })}
                  </tbody>
                </table>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>Cancelled Order Status</strong>
                </label>
                {/* <ul>
                  {data.map((item, index) => {
                    return item.active === true ? (
                      <li key={item._id} className="mb-2">
                        <div className="d-flex align-items-center">
                          <label className="mr-4 noMargin">
                            {item.orderstatus}
                          </label>
                          <label
                            className="noMargin deleteOrderStatusButton"
                            onClick={() =>
                              handleDeleteOrderStatusName(item._id)
                            }
                          >
                            Delete
                          </label>
                        </div>
                      </li>
                    ) : null;
                  })}
                </ul> */}
                <table class="table table-hover">
                  <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                    <tr>
                      <th className="orderTableTH">Item Name</th>
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return item.active === true ? (
                        <tr>
                          <td className="orderTableTD">{item.orderstatus}</td>
                          <td className="orderTableTD">
                            <div className="d-flex align-items-center justify-content-center">
                              <i
                                //   onClick={() => props.editRestaurant(item._id)}
                                style={{ cursor: "pointer" }}
                                class="far fa-edit mr-3 editButtonIcon"
                              ></i>
                              <label
                                className="noMargin deleteOrderStatusButton"
                                onClick={() =>
                                  handleDeleteOrderStatusName(item._id)
                                }
                              >
                                Delete
                              </label>
                            </div>
                          </td>
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
