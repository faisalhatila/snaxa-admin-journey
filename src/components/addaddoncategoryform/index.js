// import { ImageUpload } from "..";
import React, { useState, useEffect } from "react";
// import { set } from "lodash";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
// import makeAnimated from "react-select/animated";
// const animatedComponents = makeAnimated();

// let itemIndex = 0;
// let AddAddonCategoryForm;
const AddAddonCategoryForm = (props) => {
  // const [addOnName, setAddOnName] = useState("");
  const [addOnIsRequired, setAddOnIsRequired] = useState(false);
  const [addOnIsMultipleSelect, setAddOnIsMultipleSelect] = useState(false);
  // const [addOnQuantity, setAddOnQuantity] = useState(1);
  const [addOnMinQuantity, setAddOnMinQuantity] = useState(1);
  const [addOnMaxQuantity, setAddOnMaxQuantity] = useState(null);

  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [restaurant, selectRestaurant] = useState();
  const [restaurantID, setRestaurantID] = useState();
  const [data, setData] = useState([]);
  const [addOnData, setAddOnData] = useState([]);
  const [colourOptions, setColourOptions] = useState([]);
  const [addOnCategoryName, setaddOnCategoryName] = useState("");
  // const [addOnCategoryNameError, setaddOnCategoryNameError] = useState("");
  const [editing, setEditing] = useState(false);
  const [addOnId, setAddOnId] = useState();
  useEffect(() => {
    const dashboard = async () => {
      cancelEditing();
      selectRestaurant(props.restaurantId);
      setRestaurantID(props.restaurantId);
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-all-addons`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            // restaurant: e.value,
            restaurant: props.restaurantId,
          })
        );
        console.log("responseData", responseData.addOns);
        setAddOnData(responseData.addOns);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  // const validate = () => {
  // 	// const { cuisineName } = state;
  // 	// let { cuisineNameError } = state;
  // 	// if (!cuisineName) {
  // 	//   cuisineNameError = "Please Enter Cuisine Name";
  // 	// } else {
  // 	//   cuisineNameError = "";
  // 	// }
  // 	// if (cuisineNameError) {
  // 	//   setState({
  // 	//     cuisineNameError,
  // 	//   });
  // 	//   return false;
  // 	// }
  // 	return true;
  // };
  const handleChangeAddonCategoryName = (e) => {
    setaddOnCategoryName(e.target.value);
    // cuisineNameError: "",
  };
  const handleAddAddonCategoryName = async () => {
    // const isValid = validate();
    let urlToAddAndEdit = "/add-addon-category";
    if (editing) urlToAddAndEdit = "/edit-addon-category";
    if (true) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}${urlToAddAndEdit}`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            restaurantId: restaurantID,
            addOnName: addOnCategoryName,
            requiredStatus: addOnIsRequired,
            multiSelection: addOnIsMultipleSelect,
            howMany: addOnIsMultipleSelect ? 1 : addOnMinQuantity,
            howManyMaximum: addOnIsMultipleSelect ? null : addOnMaxQuantity,
            addOnId,
          })
        );
        console.log("responseData", responseData);
        handleRestaurantSelect(colourOptions[restaurant]);
        setaddOnCategoryName("");
        setAddOnMinQuantity(1);
        setAddOnMaxQuantity(null);
        cancelEditing();
        setAddOnData(responseData.addOns);
      } catch (err) {
        // console.log("err", err);
      }
    }
  };
  const handleDeleteAddonCategoryName = async (itemIndex) => {
    cancelEditing();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-addon-category`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          addOn: itemIndex,
        })
      );
      handleRestaurantSelect(colourOptions[restaurant]);
    } catch (err) {
      // console.log("err", err);
    }
  };

  const cancelEditing = () => {
    setEditing(false);
    setaddOnCategoryName("");
    setAddOnMinQuantity(1);
    setAddOnIsRequired(false);
    setAddOnMaxQuantity(null);
    setAddOnIsMultipleSelect(false);
  };

  const handleEditViewCategory = async (id) => {
    setAddOnId(id);
    setEditing(true);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/edit-view-addon-category`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          addOn: id,
        })
      );
      // handleRestaurantSelect(colourOptions[restaurant]);
      setaddOnCategoryName(responseData.existingAddOn.addOnName);
      setAddOnMinQuantity(responseData.existingAddOn.howMany);
      setAddOnIsRequired(responseData.existingAddOn.requiredStatus);
      setAddOnMaxQuantity(
        responseData.existingAddOn.howManyMaximum
          ? responseData.existingAddOn.howManyMaximum
          : null
      );
      setAddOnIsMultipleSelect(responseData.existingAddOn.multiSelection);
    } catch (err) {
      // console.log("err", err);
    }
  };
  console.log(addOnIsMultipleSelect);

  const handleAddOnMinQuantityChange = (event) => {
    setAddOnMinQuantity(event.target.value);
  };
  const handleAddOnMaxQuantityChange = (event) => {
    setAddOnMaxQuantity(event.target.value);
  };

  const handleRestaurantSelect = async (e) => {
    cancelEditing();
    selectRestaurant(e.index);
    setRestaurantID(e.value);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/get-all-addons`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          restaurant: e.value,
        })
      );
      console.log("responseData", responseData.addOns);
      setAddOnData(responseData.addOns);
    } catch (err) {
      // console.log("err", err);
    }
  };

  console.log(addOnIsMultipleSelect);
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

  let content;
  if (!isLoading && data)
    content = (
      <div className="row">
        {/* <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Add Addon Category
        </div> */}
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">Select Restaurant</label>
                <Select
                  defaultValue={colourOptions[restaurant]}
                  options={colourOptions}
                  formatGroupLabel={formatGroupLabel}
                  onChange={handleRestaurantSelect}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Add On Category</label>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    class="form-control mr-4"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Addon Category Name"
                    onChange={handleChangeAddonCategoryName}
                    value={addOnCategoryName}
                  />
                  <label
                    className="addOrderStatusButton"
                    onClick={handleAddAddonCategoryName}
                  >
                    {editing ? "Edit" : "Add"}
                  </label>
                  {editing && (
                    <label
                      className="addOrderStatusButton"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </label>
                  )}
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Required</label>
                  <div className="d-flex">
                    <div class="form-check mr-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        checked={addOnIsRequired}
                        onChange={(e) => setAddOnIsRequired(true)}
                        // value={true}
                      />
                      <label class="form-check-label" for="exampleRadios1">
                        Yes
                      </label>
                    </div>
                    <div class="form-check mr-3">
                      <input
                        class="form-check-input"
                        checked={!addOnIsRequired}
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        // value={false}
                        onChange={(e) => setAddOnIsRequired(false)}
                      />
                      <label class="form-check-label" for="exampleRadios2">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div class="form-group mr-5">
                    <label for="exampleInputEmail1">Is Multiple Select</label>
                    <div className="d-flex">
                      <div class="form-check mr-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="addOnIsMultipleSelect"
                          // value={true}
                          checked={addOnIsMultipleSelect}
                          onChange={(e) => setAddOnIsMultipleSelect(true)}
                        />
                        <label
                          class="form-check-label"
                          for="addOnIsMultipleSelect"
                        >
                          Yes
                        </label>
                      </div>
                      <div class="form-check mr-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          // value={false}
                          checked={!addOnIsMultipleSelect}
                          name="addOnIsMultipleSelect"
                          onChange={(e) => setAddOnIsMultipleSelect(false)}
                        />
                        <label
                          class="form-check-label"
                          for="addOnIsMultipleSelect"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  {addOnIsMultipleSelect === true ? (
                    <div class="form-group mr-3">
                      <label for="exampleInputEmail1">Min Quantity</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleAddOnMinQuantityChange}
                        value={addOnMinQuantity}
                        style={{ maxWidth: "70px" }}
                      />
                    </div>
                  ) : null}
                  {addOnIsMultipleSelect === true ? (
                    <div class="form-group">
                      <label for="exampleInputEmail1">Max Quantity</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleAddOnMaxQuantityChange}
                        value={addOnMaxQuantity}
                        style={{ maxWidth: "70px" }}
                      />
                    </div>
                  ) : null}
                </div>
                {/* {addOnCategoryNameError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{addOnCategoryNameError}
									</div>
								) : null} */}
              </div>
              {/* <button type='submit' class='btn btn-primary mt-3'>
								Add Item
							</button> */}
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>Addon Categories</strong>
                </label>

                <table class="table table-hover">
                  <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                    <tr>
                      <th className="orderTableTH">Addon Category Name</th>
                      {/* <th className="orderTableTH">Restaurant Name</th> */}
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addOnData.map((item) => {
                      return (
                        <tr>
                          {/* {console.log(colourOptions)} */}
                          <td className="orderTableTD">{item.addOnName}</td>
                          {/* <td className="orderTableTD">
                            {colourOptions[restaurant].label}
                          </td> */}
                          {/* <td className='orderTableTD'>
														<label
															className='noMargin deleteOrderStatusButton'
															onClick={() =>
																handleDeleteAddonCategoryName(item._id)
															}>
															Delete
														</label>
													</td> */}
                          <div className="d-flex align-items-center justify-content-center">
                            <i
                              //   onClick={() => props.editRestaurant(item._id)}
                              style={{ cursor: "pointer" }}
                              class="far fa-edit mr-3 editButtonIcon"
                              onClick={() => handleEditViewCategory(item._id)}
                            ></i>
                            <label
                              className="noMargin deleteOrderStatusButton"
                              onClick={() =>
                                handleDeleteAddonCategoryName(item._id)
                              }
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
// const colourOptions = [
// 	{ value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
// 	{ value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
// 	{ value: "purple", label: "Purple", color: "#5243AA" },
// 	{ value: "red", label: "Red", color: "#FF5630", isFixed: true },
// 	{ value: "orange", label: "Orange", color: "#FF8B00" },
// 	{ value: "yellow", label: "Yellow", color: "#FFC400" },
// 	{ value: "green", label: "Green", color: "#36B37E" },
// 	{ value: "forest", label: "Forest", color: "#00875A" },
// 	{ value: "slate", label: "Slate", color: "#253858" },
// 	{ value: "silver", label: "Silver", color: "#666666" },
// ];
export default AddAddonCategoryForm;
