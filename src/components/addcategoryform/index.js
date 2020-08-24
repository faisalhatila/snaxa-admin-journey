import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const AddCategoryForm = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [itemPriority, setItemPriority] = useState("");
  const [itemStatus, setItemStatus] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [colourOptions, setColourOptions] = useState([]);
  const [restaurantID, setRestaurantID] = useState();

  useEffect(() => {
    const dashboard = async () => {
      setEditing(false);
      setRestaurantID(props.restaurantId);
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-categories`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            restaurantId: props.restaurantId,
          })
        );
        console.log("responseData", responseData);
        setCategories(responseData.existingCategories);
        setCategoryName("");
        setItemPriority("");
        setItemStatus(true);
      } catch (err) {
        console.log("##############################################");
        console.log("err", err);
        console.log("##############################################");
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-all-restaurants`,
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
        setData(responseData.allRestaurants);
        const temp = responseData.allRestaurants.map((i, index) => {
          return { index, value: i.restaurant, label: i.name };
        });
        setColourOptions(temp);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  const handleChangecategoryName = (event) => {
    setCategoryName(event.target.value);
  };
  const handleChangeItemPriority = (event) => {
    setItemPriority(event.target.value);
  };
  const handleChangeItemStatus = (event) => {
    setItemStatus(event.target.checked);
  };
  const validate = () => {
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    let urltoEditandAdd = "/add-category";
    if (editing) urltoEditandAdd = "/edit-category";
    if (isValid) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}${urltoEditandAdd}`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            categoryName: categoryName,
            priority: itemPriority,
            restaurantId: props.restaurantId,
            status: itemStatus,
            categoryId,
          })
        );
        console.log("responseData", responseData);
        setCategories(responseData.existingCategories);
        setCategoryName("");
        setItemPriority("");
        setItemStatus(true);
        setEditing(false);
      } catch (err) {}
    }
  };
  const handleDeleteCategory = async (id) => {
    setEditing(false);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-category`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          categoryId: id,
          restaurantId: props.restaurantId,
        })
      );
      console.log("responseData", responseData);
      setCategories(responseData.existingCategories);
      setCategoryName("");
      setItemPriority("");
      setItemStatus(true);
    } catch (err) {}
  };
  const handleViewEditCategory = async (id) => {
    setEditing(true);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/view-edit-category`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          categoryId: id,
        })
      );
      console.log("responseData", responseData);
      setCategoryName(responseData.existingCategories.categoryName);
      setItemPriority(responseData.existingCategories.priority);
      setItemStatus(responseData.existingCategories.status);
      setCategoryId(responseData.existingCategories._id);
    } catch (err) {}
  };

  const handleCancelEdit = () => {
    setCategoryName("");
    setItemPriority("");
    setItemStatus(true);
    setEditing(false);
  };

  let content;
  if (!isLoading && data.length > 0)
    content = (
      <div className="row">
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
            <div className="row">
              <div class="form-group col-12">
                <label for="exampleInputEmail1">Category Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Category Name"
                  onChange={handleChangecategoryName}
                  value={categoryName}
                />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Priority</label>
              <input
                type="text"
                class="form-control"
                placeholder="Priority"
                onChange={handleChangeItemPriority}
                value={itemPriority}
              />
            </div>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customSwitch1"
                onChange={handleChangeItemStatus}
                checked={itemStatus}
              />
              <label class="custom-control-label" for="customSwitch1">
                Status
              </label>
            </div>

            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              {editing ? "Edit Item" : "Add Item"}
            </button>
            {editing && (
              <button
                type="submit"
                class="btn btn-primary mt-3"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
          <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
            <table class="table table-hover">
              <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                <tr>
                  <th className="orderTableTH">Category</th>
                  <th className="orderTableTH">Status</th>
                  <th className="orderTableTH">Priority</th>
                  <th className="orderTableTH">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => {
                  return (
                    <tr>
                      <td className="orderTableTD">{item.categoryName}</td>
                      <td className="orderTableTD">
                        {item.status ? "Active" : "Not Active"}
                      </td>
                      <td className="orderTableTD">{item.priority}</td>
                      <div className="d-flex align-items-center justify-content-center">
                        <i
                          onClick={() => handleViewEditCategory(item._id)}
                          style={{ cursor: "pointer" }}
                          class="far fa-edit mr-3 editButtonIcon"
                        ></i>
                        <label
                          className="noMargin deleteOrderStatusButton"
                          onClick={() => handleDeleteCategory(item._id)}
                        >
                          Delete
                        </label>
                      </div>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  else content = <p>Loading...</p>;
  return content;
};
const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);
const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};
export default AddCategoryForm;
