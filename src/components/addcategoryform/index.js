// import { ImageUpload } from "..";
import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
// import { Select } from "react-dropdown-select";

// let AddCategoryForm;
const AddCategoryForm = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [restaurant, setRestaurant] = useState("");
  // const [itemDescription, setItemDescription] = useState("");
  const [itemPriority, setItemPriority] = useState("");
  const [itemStatus, setItemStatus] = useState(true);
  // const [categoryNameError, setIategoryNameError] = useState("");
  // const [itemDescriptionError, setItemDescriptionError] = useState("");
  // const [itemPriorityError, setItemPriorityError] = useState("");
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
      // console.log(event);
      setEditing(false);
      // setRestaurant(event.index);
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
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  const handleChangecategoryName = (event) => {
    setCategoryName(event.target.value);
    // categoryNameError: "",
  };
  // const handleChangeItemDescription = (event) => {
  // 	// setState({
  // 	// itemDescription: event.target.value,
  // 	// itemDescriptionError: "",
  // 	// });
  // };
  const handleChangeItemPriority = (event) => {
    setItemPriority(event.target.value);
    // itemPriorityError: "",
  };
  const handleChangeItemStatus = (event) => {
    setItemStatus(event.target.checked);
  };
  const validate = () => {
    // const { categoryName, itemDescription, itemPriority } = state;
    // let {
    //   categoryNameError,
    //   itemDescriptionError,
    //   itemPriorityError,
    // } = state;
    // if (!categoryName) {
    //   categoryNameError = "Please Enter Category Name";
    // } else {
    //   categoryNameError = "";
    // }
    // if (!itemDescription) {
    //   itemDescriptionError = "Please Enter Item Name";
    // } else {
    //   itemDescriptionError = "";
    // }
    // if (!itemPriority) {
    //   itemPriorityError = "Please Enter Item Name";
    // } else {
    //   itemPriorityError = "";
    // }
    // if (categoryNameError || itemPriorityError || itemDescriptionError) {
    //   setState({
    //     categoryNameError,
    //     itemPriorityError,
    //     itemDescriptionError,
    //   });
    //   return false;
    // }
    return true;
  };
  // const handleSelectRestaurant = async (event) => {
  //   console.log(event);
  //   setEditing(false);
  //   setRestaurant(event.index);
  //   setRestaurantID(event.value);
  //   try {
  //     const responseData = await sendRequest(
  //       `${process.env.REACT_APP_BACKEND_URL}/get-categories`,
  //       "POST",
  //       {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //       JSON.stringify({
  //         userId,
  //         restaurantId: event.value,
  //       })
  //     );
  //     console.log("responseData", responseData);
  //     setCategories(responseData.existingCategories);
  //     setCategoryName("");
  //     setItemPriority("");
  //     setItemStatus(true);
  //   } catch (err) {
  //     // console.log("err", err);
  //   }
  // };
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
            // restaurantId: restaurant,
            restaurantId: props.restaurantId,
            status: itemStatus,
            categoryId,
          })
        );
        console.log("responseData", responseData);
        setCategories(responseData.existingCategories);
        setCategoryName("");
        // setRestaurant(1);
        setItemPriority("");
        setItemStatus(true);
        setEditing(false);
      } catch (err) {
        // console.log("err", err);
      }
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
      // setRestaurant(1);
      setItemPriority("");
      setItemStatus(true);
    } catch (err) {
      // console.log("err", err);
    }
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
      // setCategories(responseData.existingCategories);
      setCategoryName(responseData.existingCategories.categoryName);
      setItemPriority(responseData.existingCategories.priority);
      setItemStatus(responseData.existingCategories.status);
      setCategoryId(responseData.existingCategories._id);
    } catch (err) {
      // console.log("err", err);
    }
  };

  const handleCancelEdit = () => {
    setCategoryName("");
    // setRestaurant(1);
    setItemPriority("");
    setItemStatus(true);
    setEditing(false);
  };

  let content;
  if (!isLoading && data.length > 0)
    content = (
      <div className="row">
        {/* <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Category Details
        </div> */}
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
            <div className="row">
              <div class="form-group col-12">
                <label for="exampleInputEmail1">Category Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Category Name"
                  onChange={handleChangecategoryName}
                  value={categoryName}
                />
                {/* {categoryNameError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{categoryNameError}
									</div>
								) : null} */}
              </div>
              {/* <div class="form-group col-12 col-md-6 col-lg-6">
                <label for="exampleFormControlSelect1">Select Restaurant</label>
                <Select
                  defaultValue={colourOptions[restaurant]}
                  options={colourOptions}
                  formatGroupLabel={formatGroupLabel}
                  onChange={handleSelectRestaurant}
                />
              </div> */}
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Priority</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Priority"
                onChange={handleChangeItemPriority}
                value={itemPriority}
              />
              {/* {itemPriorityError ? (
								<div
									style={{
										textAlign: "center",
										color: "red",
										fontWeight: "bold",
									}}>
									{itemPriorityError}
								</div>
							) : null} */}
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
            {" "}
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

                {/* );
                })} */}
              </tbody>
            </table>
          </div>{" "}
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
