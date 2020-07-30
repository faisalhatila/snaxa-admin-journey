import { ImageUpload } from "..";
import React, { Component, useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

let itemIndex = 0;

let AddRestaurantForm;
export default AddRestaurantForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [categoryName, setCategoryName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPriority, setItemPriority] = useState("");
  const [itemStatus, setItemStatus] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [categoryNameError, setCategoryNameError] = useState("");
  const [itemDescriptionError, setItemDescriptionError] = useState("");
  const [itemPriorityError, setItemPriorityError] = useState("");
  const [data, setData] = useState();
  const [inputs, setInputs] = useState({});
  // {
  //   id : 0,
  //   checked: "Monday",
  //   startTime: "",
  //   endTime: "",
  // }
  const [workingDays, setWorkingDays] = useState([
    {
      isChecked: false,
      nameStartTime: "monstart",
      nameEndTime: "monend",
      day: "Monday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      nameStartTime: "tuestart",
      nameEndTime: "tueend",
      day: "Tuesday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      nameStartTime: "wedstart",
      nameEndTime: "wedend",
      day: "Wednesday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      nameStartTime: "thustart",
      nameEndTime: "thuend",
      day: "Thursday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      nameStartTime: "fristart",
      nameEndTime: "friend",
      day: "Friday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      nameStartTime: "satstart",
      nameEndTime: "satend",
      day: "Saturday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      nameStartTime: "sunstart",
      nameEndTime: "sunend",
      day: "Sunday",
      startTime: "",
      endTime: "",
    },
  ]);
  const [workDays, setWorkDays] = useState([]);
  const [cuisineName, setCuisineName] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-restaurant`,
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
        setData(responseData);
        if (responseData.existingRestaurantAdmin.new) {
          setCategoryName(responseData.existingRestaurantAdmin.name);
        } else {
          setCategoryName(responseData.existingRestaurantAdmin.name);
          setItemDescription(responseData.existingRestaurant.description);
          setApproveStatus(responseData.existingRestaurantAdmin.approved);
          setItemStatus(responseData.existingRestaurantAdmin.active);
        }
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
  const handleChangeItemDescription = (event) => {
    setItemDescription(event.target.value);
    // itemDescriptionError: "",
  };
  const handleChangeItemPriority = (event) => {
    setItemPriority(event.target.value);
    // itemPriorityError: "",
  };
  const handleChangeItemStatus = (event) => {
    setItemStatus(event.target.checked);
  };
  const handleChangeItemApproveStatus = (event) => {
    setApproveStatus(event.target.checked);
  };
  const handleDayChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.checked,
    }));
    console.log(event.target.name);
  };
  const seeDays = () => {
    console.log(inputs);
    // const arr1 = ["faisal", "hanif"];
    // const arr2 = [26, 27];
    // const obj = [{ name: arr1[0], age: arr2[0] }];
    // const obj1 = [{ name: arr1[1], age: arr2[1] }];
    // console.log(obj, obj1);
  };
  let validate = () => {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/edit-restaurant`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            active: itemStatus,
            approve: approveStatus,
            restaurantId: props.restaurantId,
          })
        );
        console.log("responseData", responseData);
        setCurrentStep(1);
      } catch (err) {
        // console.log("err", err);
      }
    }
  };
  const handleAddCuisine = () => {
    const itemObj = {
      itemIndex: itemIndex,
      cuisineName: cuisineName,
      //   price: state.number,
      //   description: state.desc,
      isDisable: true,
    };
    itemIndex++;
    cuisines.push(itemObj);
    setCuisines(cuisines);
    setCuisineName("");
  };
  const handleDeleteCuisine = (itemIndex) => {
    // console.log(props);
    // alert("hi");
    cuisines = cuisines.filter((item) => {
      return item.itemIndex !== itemIndex;
    });
    setCuisines(cuisines);
    console.log(cuisines);
  };
  const handleNext = () => {
    setCurrentStep(2);
  };
  const colourOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ];
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="row">
      <div className="col-8 col-lg-3 col-md-3 updateVendorFormTitle">
        Restaurant Details
      </div>
      <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
        <form className="col-12 updateVendorForm">
          <div className={`row ${currentStep === 2 ? "d-none" : null}`}>
            <div className="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Restaurant Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Item Name"
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
              <div class="form-group">
                <label for="exampleFormControlTextarea1">
                  Short Description
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Enter Item Description"
                  value={itemDescription}
                  onChange={handleChangeItemDescription}
                ></textarea>
                {/* {itemDescriptionError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{itemDescriptionError}
									</div>
								) : null} */}
              </div>
              <div className="row">
                <div class="form-group col-6">
                  <label for="exampleInputEmail1">Min Delivery Order</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Item Name"
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
                <div class="form-group col-6">
                  <label for="exampleInputEmail1">Delivery Charges</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Item Name"
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
              </div>
              <div className="row">
                <div class="form-group d-flex col align-items-center">
                  <label
                    className="mr-4"
                    for="exampleInputEmail1"
                    style={{ marginBottom: 0 }}
                  >
                    Pre Order
                  </label>
                  <input type="checkbox" />
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
                <div class="form-group col-12 col-md-6 col-lg-6">
                  <label for="exampleInputEmail1">Select Add Ons</label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    //   defaultValue={[colourOptions[4], colourOptions[5]]}
                    isMulti
                    options={colourOptions}
                    //   onChange={(e) => setAddOnList(e)}
                  />
                </div>
              </div>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch2"
                  onChange={handleChangeItemApproveStatus}
                  checked={approveStatus}
                />
                <label class="custom-control-label" for="customSwitch2">
                  Approve
                </label>
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
                  Active Status
                </label>
              </div>
            </div>
            <div
              className="col-12 col-md-6 col-lg-6"
              style={{ overflowX: "auto" }}
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th></th>
                    <th>Days</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {workingDays.map((days, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">
                          <input
                            type="checkbox"
                            name={days.nameStartTime}
                            onChange={handleDayChange}
                          />
                        </th>
                        <td>{days.day}</td>
                        <td>
                          <input
                            type="time"
                            id="appt"
                            name={days.nameStartTime}
                            // onChange={(e) => console.log(e.target.name)}
                            // onChange={handleDayChange}
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            id="appt"
                            name={days.nameEndTime}
                            // onChange={(e) => console.log(e.target.name)}
                            // onChange={handleDayChange}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button type="button" onClick={seeDays}>
                see
              </button>
            </div>
          </div>
          <div className={`${currentStep === 1 ? "d-none" : null}`}>
            <div className="addCuisineForm">
              <h3>Add Cuisine</h3>
              <div class="form-group">
                <label for="exampleInputEmail1">Cuisine Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Cuisine Name"
                  onChange={(e) => setCuisineName(e.target.value)}
                  value={cuisineName}
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
              <div>
                <ul>
                  {cuisines.map((item, index) => {
                    return (
                      <div className="row mb-3" key={index}>
                        <li>{item.cuisineName}</li>
                        <label
                          style={{ margin: 0 }}
                          className="deleteCuisine ml-4"
                          onClick={() => handleDeleteCuisine(item.itemIndex)}
                        >
                          Delete
                        </label>
                      </div>
                    );
                  })}
                </ul>
              </div>
              <button
                type="button"
                class="btn btn-primary mt-3"
                onClick={handleAddCuisine}
              >
                Add Cuisine
              </button>
            </div>
          </div>
          {/* <div
              class="form-group"
              style={{ boxShadow: "0px 0px 5px 2px #ccc" }}
            >
              <ImageUpload />{" "}
            </div> */}
          {/* <div class="form-group">
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
              {itemPriorityError ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {itemPriorityError}
                </div>
              ) : null}
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
            </div> */}
          {/* <label className="noMargin goBackBtn" onClick={props.goBack}>
            Back
          </label> */}
          <button
            type="button"
            class="btn btn-primary mt-3 mr-4"
            onClick={props.goBack}
            style={{ backgroundColor: "green", border: "green" }}
          >
            Back
          </button>
          {currentStep === 1 ? (
            <button
              type="button"
              class="btn btn-primary mt-3"
              onClick={handleNext}
            >
              Next
            </button>
          ) : null}
          {currentStep === 2 ? (
            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};
