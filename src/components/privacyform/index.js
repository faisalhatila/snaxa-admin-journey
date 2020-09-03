import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
// import useForm from "./useform";
// import validate from "./validate";

const PrivacyForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState("");
  const [para, setPara] = useState("");
  const [priority, setPriority] = useState();
  const [editing, setEditing] = useState(false);
  const [ftpDataId, setFtpDataId] = useState("");

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
  const handleAddPrivacy = async (e) => {
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
          type: "p",
          priority: priority,
        })
      );
      console.log("responseData", responseData);
      // setData(responseData.existingFtps);
      setHeading("");
      setPara("");
      setFtpDataId("");
      setHeading("");
      setPriority("");
      fetchPrivacy();
    } catch (err) {}
    // setIsCompletedStatus(false);
  };
  const handleViewEditPrivacy = async (id) => {
    setEditing(true);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/view-edit-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          ftpId: id,
        })
      );
      console.log("responseData", responseData);
      // setCategoryName(responseData.existingCategories.categoryName);
      // setItemPriority(responseData.existingCategories.priority);
      // setItemStatus(responseData.existingCategories.status);
      // setCategoryId(responseData.existingCategories._id);
      setHeading(responseData.editInfo.heading);
      setPara(responseData.editInfo.para);
      setPriority(responseData.editInfo.priority);
      setFtpDataId(responseData.editInfo._id);
    } catch (err) {}
  };
  const handleEditPrivacy = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/edit-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          ftpId: ftpDataId,
          heading: heading,
          para: para,
          type: "p",
          priority: priority,
        })
      );
      console.log("responseData", responseData);
      // setData(responseData.existingFtps);
      setHeading("");
      setPara("");
      setFtpDataId("");
      setHeading("");
      setPriority("");
      setEditing(false);
      fetchPrivacy();
    } catch (err) {}
    // setIsCompletedStatus(false);
  };
  const handleCancelEdit = () => {
    setHeading("");
    setPriority("");
    setPara(true);
    setFtpDataId("");
    setEditing(false);
    fetchPrivacy();
  };
  const handleDeletePrivacy = async (itemIndex) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          ftpId: itemIndex,
          userId,
          // orderStatus: itemIndex,
        })
      );
      console.log("responseData", responseData);
      // setData(responseData.orderStatuses);
      setHeading("");
      setPara("");
      setFtpDataId("");
      setHeading("");
      setPriority("");
      fetchPrivacy();
    } catch (err) {}
  };
  const fetchPrivacy = async () => {
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
          type: "p",
        })
      );
      console.log("#########################################");
      console.log("responseData", responseData.existingFtps);
      console.log("#########################################");
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
            type: "p",
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
          Privacy
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
              {!editing && (
                <button
                  type="submit"
                  className="addOrderStatusButton"
                  onClick={handleAddPrivacy}
                >
                  Add
                </button>
              )}
              {editing && (
                <div className="d-flex align-items-center">
                  <button
                    type="submit"
                    className="addOrderStatusButton mr-3"
                    onClick={handleEditPrivacy}
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    class="addOrderStatusButton"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>Privacy table</strong>
                </label>
                <table class="table table-hover">
                  <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                    <tr>
                      <th className="orderTableTH">Privacy</th>
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
                                onClick={() => handleViewEditPrivacy(item._id)}
                              ></i>
                              <label
                                className="noMargin deleteOrderStatusButton"
                                onClick={() => handleDeletePrivacy(item._id)}
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
export default PrivacyForm;
