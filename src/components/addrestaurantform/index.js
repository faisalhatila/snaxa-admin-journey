import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import GoogleMapContainer from "../googlemap";
import AutoComplete from "../googlemap/autocomplete";
import {
  AddCategoryForm,
  AddItemFrom,
  AddAddonCategoryForm,
  AddAddonItemForm,
  ReviewTableShort,
  ReviewsDetailed,
  RestaurantContactTable,
} from "..";
const animatedComponents = makeAnimated();
const AddRestaurantForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [categoryName, setCategoryName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemStatus, setItemStatus] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [storeWeb, setStoreWeb] = useState("");
  const [commission, setCommision] = useState(0);
  const [colourOptions, setColourOptions] = useState([]);
  const [data, setData] = useState();
  const [inputs, setInputs] = useState({});
  const [cuisines, setCuisines] = useState([]);
  const [alreadyCuisines, setALreadyCuisines] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryCharges, setDeliveryCharges] = useState("");
  const [editRestaurantActiveTab, setEditRestaurantActiveTab] = useState(
    "Info"
  );
  const [colourOptions1, setColourOptions1] = useState([]);
  const [
    editRestaurantItemsActiveTab,
    setEditRestaurantItemActiveTab,
  ] = useState("Category");
  const [reviewTableStatus, setReviewTableStatus] = useState(0);
  const [workingDays, setWorkingDays] = useState([
    {
      isChecked: false,
      id: 0, // Monday,
      label: "Monday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      id: 1,
      label: "Tuesday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      id: 2,
      label: "Wednesday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      id: 3,
      startTime: "",
      label: "Thursday",
      endTime: "",
    },
    {
      isChecked: false,
      id: 4,
      label: "Friday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      id: 5,
      label: "Saturday",
      startTime: "",
      endTime: "",
    },
    {
      isChecked: false,
      id: 6,
      label: "Sunday",
      startTime: "",
      endTime: "",
    },
  ]);
  const editRestaurantTabs = ["Info", "Menu"];
  const editRestaurantItemTabs = [
    "Category",
    "Category Item",
    "Addon Category",
    "Addon Item",
  ];
  const handleActiveEditRestaurantTab = (tab) => {
    setEditRestaurantActiveTab(tab);
  };
  const handleActiveEditRestaurantItemTab = (tab) => {
    setEditRestaurantItemActiveTab(tab);
  };
  const startTimeHandler = (b, e) => {
    console.log("e", e.target);
    setWorkingDays((prevState) => {
      const tempObject = prevState[b];
      tempObject.startTime = e.target.value;
      prevState[b] = tempObject;
      return prevState;
    });
    console.log("prevState", workingDays);
  };
  const endTimeHandler = (b, e) => {
    console.log("e", e.target.value);
    setWorkingDays((prevState) => {
      const tempObject = prevState[b];
      tempObject.endTime = e.target.value;
      prevState[b] = tempObject;
      return prevState;
    });
    console.log("prevState", workingDays);
  };
  const workingDayHandler = (b) => {
    setWorkingDays((prevState) => {
      console.log("#######################################");
      console.log(prevState);
      console.log("#######################################");

      const tempObject = prevState[b];
      tempObject.isChecked = !tempObject.isChecked;
      prevState[b] = tempObject;
      return prevState;
    });
    // console.log("prevState", workingDays);
  };
  const cuisinesArr = [];
  // const colourOptions1 = [
  //   { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  //   { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  //   { value: "purple", label: "Purple", color: "#5243AA" },
  //   { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  //   { value: "orange", label: "Orange", color: "#FF8B00" },
  //   { value: "yellow", label: "Yellow", color: "#FFC400" },
  //   { value: "green", label: "Green", color: "#36B37E" },
  //   { value: "forest", label: "Forest", color: "#00875A" },
  //   { value: "slate", label: "Slate", color: "#253858" },
  //   { value: "silver", label: "Silver", color: "#666666" },
  // ];
  // const colourOptions1 = [
  //   { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  //   { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  //   { value: "purple", label: "Purple", color: "#5243AA" },
  //   { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  //   { value: "orange", label: "Orange", color: "#FF8B00" },
  //   { value: "yellow", label: "Yellow", color: "#FFC400" },
  //   { value: "green", label: "Green", color: "#36B37E" },
  //   { value: "forest", label: "Forest", color: "#00875A" },
  //   { value: "slate", label: "Slate", color: "#253858" },
  //   { value: "silver", label: "Silver", color: "#666666" },
  // ];
  // const colourOptions1 = [];

  useEffect(() => {
    // console.log("###################################################");
    // console.log(props.restaurantId);
    // console.log("###################################################");
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
        console.log("responseData", responseData.existingRestaurant);
        setData(responseData);
        if (responseData.existingRestaurantAdmin.new) {
          setCategoryName(responseData.existingRestaurantAdmin.name);
          setFName(responseData.existingRestaurantAdmin.fname);
          setLName(responseData.existingRestaurantAdmin.lname);
          setEmail(responseData.existingRestaurantAdmin.email);
          setCountry(responseData.existingRestaurantAdmin.country);
          setCity(responseData.existingRestaurantAdmin.city);
          setMobile(responseData.existingRestaurantAdmin.mobilenumber);
          setStoreWeb(responseData.existingRestaurantAdmin.socialmedia);
        } else {
          setCategoryName(responseData.existingRestaurantAdmin.name);
          setItemDescription(responseData.existingRestaurant.description);
          setApproveStatus(responseData.existingRestaurantAdmin.approved);
          setItemStatus(responseData.existingRestaurantAdmin.active);
          setFName(responseData.existingRestaurantAdmin.fname);
          setLName(responseData.existingRestaurantAdmin.lname);
          setEmail(responseData.existingRestaurantAdmin.email);
          setCountry(responseData.existingRestaurantAdmin.country);
          setCity(responseData.existingRestaurantAdmin.city);
          setMobile(responseData.existingRestaurantAdmin.mobilenumber);
          setWorkingDays(responseData.existingRestaurant.workinghours);
          setStoreWeb(responseData.existingRestaurantAdmin.socialmedia);
          setALreadyCuisines(responseData.existingRestaurant.cuisines);
          // console.log("########################################");
          // console.log(responseData.existingRestaurant.cuisines);
          // console.log("########################################");
          const temp = responseData.cuisines.map((i) => {
            return { value: i._id, label: i.cuisine };
            // return {
            //   value: i.cuisine.toLowerCase(),
            //   label: i.cuisine,
            //   color: "#FFC400",
            // };
          });
        }
      } catch (err) {
        // console.log("err", err);
      }
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-cuisine`,
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
        const temp = responseData.cuisines.map((i) => {
          return { value: i._id, label: i.cuisine };
          // return {
          //   value: i.cuisine.toLowerCase(),
          //   label: i.cuisine,
          //   color: "#FFC400",
          // };
        });
        setColourOptions(temp);
        cuisinesArr.push(temp);
        // colourOptions1.push(temp);
        // setColourOptions1(temp);
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
  // const handleChangeItemPriority = (event) => {
  // 	setItemPriority(event.target.value);
  // 	// itemPriorityError: "",
  // };
  const handleChangeItemStatus = (event) => {
    setItemStatus(event.target.checked);
  };
  const handleChangeItemApproveStatus = (event) => {
    setApproveStatus(event.target.checked);
  };
  // const handleDayChange = (event) => {
  // 	event.persist();
  // 	setInputs((inputs) => ({
  // 		...inputs,
  // 		[event.target.name]: event.target.checked,
  // 	}));
  // 	console.log(event.target.name);
  // };
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
            name: categoryName,
            fname: fName,
            lname: lName,
            email,
            country,
            city,
            mobilenumber: mobile,
            socialmedia: storeWeb,
            description: itemDescription,
            cuisines,
            workinghours: workingDays,
          })
        );
        console.log("responseData", responseData);
        setCurrentStep(1);
      } catch (err) {
        // console.log("err", err);
      }
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="row">
      {/* <div className="col-8 col-lg-3 col-md-3 editRestaurantScreenTabsTitle editRestaurantScreenTabsTitleActive">
        Info
      </div>
      <div className="col-8 col-lg-3 col-md-3 editRestaurantScreenTabsTitle">
        Menu
      </div>
      <div className="col-8 col-lg-3 col-md-3 editRestaurantScreenTabsTitle">
        Reviews
      </div> */}
      {editRestaurantTabs.map((tab, i) => {
        //     <div className="col-8 col-lg-3 col-md-3 editRestaurantScreenTabsTitle editRestaurantScreenTabsTitleActive">
        //   Info
        // </div>
        return (
          <div
            key={i}
            onClick={() => handleActiveEditRestaurantTab(tab)}
            className={`col-8 col-lg-3 col-md-3 editRestaurantScreenTabsTitle ${
              editRestaurantActiveTab === tab &&
              "editRestaurantScreenTabsTitleActive"
            }`}
          >
            {tab}
          </div>
        );
      })}
      {editRestaurantActiveTab === "Info" && (
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <form className="col-12 updateVendorForm">
            <div className={`row ${currentStep === 2 ? "d-none" : null}`}>
              <div className="col-12 col-md-6 col-lg-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Restaurant Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Item Name"
                    onChange={handleChangecategoryName}
                    value={categoryName}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Delivery Charges</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    class="form-control"
                    placeholder="Delivery Charges"
                    onChange={(e) => setDeliveryCharges(e.target.value)}
                    value={deliveryCharges}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">
                    Restaurant Commision in %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    class="form-control"
                    placeholder="Enter Commission"
                    onChange={setCommision}
                    value={commission}
                  />
                </div>
                <div className="row">
                  <div class="form-group col-6">
                    <label>Owner's First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter First Name"
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-6">
                    <label>Owner's Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Last Name"
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div class="form-group col-12">
                    <label>Owner's Email</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div class="form-group col-6">
                    <label>Country</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-6">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div class="form-group col-6">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-6">
                    <label>Website</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Website"
                      value={storeWeb}
                      onChange={(e) => setStoreWeb(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Short Description
                  </label>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Enter Item Description"
                    value={itemDescription}
                    onChange={handleChangeItemDescription}
                  ></textarea>
                </div>
                <div className="row"></div>
                {/* <div className="row">
                  <div class="form-group col-12 ">
                    <label for="exampleInputEmail1">Select Cuisines</label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      // defaultValue={[colourOptions[0], colourOptions[1]]}
                      // defaultValue={[cuisinesArr[0], cuisinesArr[1]]}
                      // defaultValue={[colourOptions1[2], colourOptions1[3]]}
                      defaultValue={colourOptions1.map((item, i) => item)}
                      isMulti
                      options={colourOptions}
                      onChange={(e) => setCuisines(e)}
                    />
                  </div>
                </div> */}
                {console.log(alreadyCuisines)}
                {colourOptions1 && (
                  <div className="row">
                    <div class="form-group col-12 ">
                      <label for="exampleInputEmail1">Select Cuisines</label>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        // defaultValue={[colourOptions[0], colourOptions[1]]}
                        // defaultValue={[cuisinesArr[0], cuisinesArr[1]]}
                        // defaultValue={[colourOptions1[2], colourOptions1[3]]}
                        defaultValue={alreadyCuisines}
                        isMulti
                        options={colourOptions}
                        onChange={(e) => setCuisines(e)}
                      />
                    </div>
                  </div>
                )}
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input"
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
                // style={{ overflowX: "auto" }}
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
                    {workingDays.map((days) => {
                      return (
                        <tr key={days.id}>
                          <th scope="row">
                            <input
                              checked={days.isChecked}
                              type="checkbox"
                              onChange={() => workingDayHandler(days.id)}
                            />
                          </th>
                          <td>{days.label}</td>
                          <td>
                            <input
                              // disabled={!days.isChecked}
                              type="time"
                              value={days.startTime}
                              // placeholder='20:20'
                              onChange={(e) => startTimeHandler(days.id, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              value={days.endTime}
                              onChange={(e) => endTimeHandler(days.id, e)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="googleMap">
                  <AutoComplete
                    placeholder="Search for area, street name, landmark..."
                    onClick={() => {}}
                    setLatLng={() => {}}
                    map
                  />
                  <GoogleMapContainer />
                </div>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-primary mt-3 mr-4"
              onClick={props.goBack}
              style={{ backgroundColor: "#ed1b24", border: "#ed1b24" }}
            >
              Back
            </button>
            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={handleSubmit}
              style={{ backgroundColor: "#b40008", border: "none" }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {editRestaurantActiveTab === "Menu" && (
        <div className="col-12 customerDetailFormMainDiv">
          <div className="row col-5 justify-content-between mt-1">
            {/* <label className="noMargin restaurantMenuTabsLabels">
              Add Category
            </label>
            <label className="noMargin restaurantMenuTabsLabels">
              Add Item
            </label>
            <label className="noMargin restaurantMenuTabsLabels">
              Add Addon Category
            </label>
            <label className="noMargin restaurantMenuTabsLabels restaurantMenuTabsActiveLabel">
              Add Addon Item
            </label> */}
            {editRestaurantItemTabs.map((tab, i) => {
              return (
                <label
                  onClick={() => handleActiveEditRestaurantItemTab(tab)}
                  className={`noMargin restaurantMenuTabsLabels ${
                    editRestaurantItemsActiveTab === tab &&
                    " restaurantMenuTabsActiveLabel"
                  }`}
                >
                  {tab}
                </label>
              );
            })}
          </div>
          {editRestaurantItemsActiveTab === "Category" && (
            <div className="col mt-3">
              <AddCategoryForm restaurantId={props.restaurantId} />
            </div>
          )}
          {editRestaurantItemsActiveTab === "Category Item" && (
            <div className="col mt-3">
              <AddItemFrom restaurantId={props.restaurantId} />
            </div>
          )}
          {editRestaurantItemsActiveTab === "Addon Category" && (
            <div className="col mt-3">
              <AddAddonCategoryForm restaurantId={props.restaurantId} />
            </div>
          )}
          {editRestaurantItemsActiveTab === "Addon Item" && (
            <div className="col mt-3">
              <AddAddonItemForm restaurantId={props.restaurantId} />
            </div>
          )}
        </div>
      )}
      {editRestaurantActiveTab === "Reviews" && reviewTableStatus === 0 && (
        <div className="col customerDetailFormMainDiv pt-4">
          <ReviewTableShort
            handleReviewTableStatus={() => setReviewTableStatus(1)}
          />
        </div>
      )}
      {/* {editRestaurantActiveTab === "Reviews" && reviewTableStatus === 1 && (
        <div className="col customerDetailFormMainDiv pt-4">
          <ReviewsDetailed />
        </div>
      )} */}
      {/* {editRestaurantActiveTab === "Contact" && (
        <div className="col customerDetailFormMainDiv pt-4">
          <RestaurantContactTable />
        </div>
      )} */}
    </div>
  );
};

// const colourOptions = [
//   { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
//   { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
//   { value: "purple", label: "Purple", color: "#5243AA" },
//   { value: "red", label: "Red", color: "#FF5630", isFixed: true },
//   { value: "orange", label: "Orange", color: "#FF8B00" },
//   { value: "yellow", label: "Yellow", color: "#FFC400" },
//   { value: "green", label: "Green", color: "#36B37E" },
//   { value: "forest", label: "Forest", color: "#00875A" },
//   { value: "slate", label: "Slate", color: "#253858" },
//   { value: "silver", label: "Silver", color: "#666666" },
// ];
export default AddRestaurantForm;
