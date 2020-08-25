// import { ImageUpload } from "..";
import React, { useState, useEffect } from "react";
// import styled from "@emotion/styled";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Colors from "../../UI/constants/Colors";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// const animatedComponents = makeAnimated();

// let CustomerForm;
const CustomerForm = (props) => {
  // const [categoryName, setCategoryName] = useState();
  // const [itemDescription, setItemDescription] = useState();
  // const [categoryNameError, setCategoryNameError] = useState();
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-customer`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            customerId: props.customerId,
          })
        );
        console.log("responseData", responseData);
        setData(responseData.existingUsers);
        setFirstName(responseData.existingUsers.fname);
        setLastName(responseData.existingUsers.lname);
        setEmail(responseData.existingUsers.email);
        setDateOfBirth(responseData.existingUsers.date.substr(0, 10));
        setIsMale(responseData.existingUsers.gender === "Male" && true);
        setIsFemale(responseData.existingUsers.gender === "Female" && true);
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  // setValues = (selectValues) => setState({ selectValues });

  const validate = () => {
    // const { categoryName, itemDescription, itemPriority } = state;
    // let {
    // 	categoryNameError,
    // 	itemDescriptionError,
    // 	itemPriorityError,
    // } = state;
    // if (!categoryName) {
    // 	categoryNameError = "Please Enter Category Name";
    // } else {
    // 	categoryNameError = "";
    // }
    // if (!itemDescription) {
    // 	itemDescriptionError = "Please Enter Item Name";
    // } else {
    // 	itemDescriptionError = "";
    // }
    // if (!itemPriority) {
    // 	itemPriorityError = "Please Enter Item Name";
    // } else {
    // 	itemPriorityError = "";
    // }
    // if (categoryNameError || itemPriorityError || itemDescriptionError) {
    // 	setState({
    // 		categoryNameError,
    // 		itemPriorityError,
    // 		itemDescriptionError,
    // 	});
    // 	return false;
    // }
    return true;
  };
  console.log("Data", data);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/edit-customer`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            customerId: data._id,
            email,
            fname: firstName,
            lname: lastName,
            gender: isMale ? "Male" : "Female",
            date: dateOfBirth,
          })
        );
        console.log("responseData2", responseData);
        setData(responseData.existingUsers);
        setFirstName(responseData.existingUsers.fname);
        setLastName(responseData.existingUsers.lname);
        setEmail(responseData.existingUsers.email);
        setDateOfBirth(responseData.existingUsers.date);
        setIsMale(responseData.existingUsers.gender === "Male" && true);
        setIsFemale(responseData.existingUsers.gender === "Female" && true);
      } catch (err) {
        console.log("err", err);
        setData(data);
        setFirstName(data.fname);
        setLastName(data.lname);
        setEmail(data.email);
        setDateOfBirth(data.date);
        setIsMale(data.gender === "Male" && true);
        setIsFemale(data.gender === "Female" && true);
      }
    }
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    console.log();
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleIsMaleChange = (event) => {
    setIsMale(event.target.checked);
    setIsFemale(false);
  };
  const handleIsFemaleChange = (event) => {
    setIsFemale(event.target.checked);
    setIsMale(false);
  };
  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };
  let content;
  if (!isLoading && data)
    content = (
      <div className="row">
        <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Edit Customer
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <form className="col-12 updateVendorForm">
            <div className="row">
              <div class="form-group col-12 col-md-6 col-lg-6">
                <label for="exampleInputEmail1">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Item Name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                />
                {/* {categoryNameError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {categoryNameError}
                  </div>
                ) : null} */}
              </div>
              <div class="form-group col-12 col-md-6 col-lg-6">
                <label for="exampleInputEmail1">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Item Name"
                  onChange={handleLastNameChange}
                  value={lastName}
                />
                {/* {categoryNameError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {categoryNameError}
                  </div>
                ) : null} */}
              </div>
            </div>
            <div className="row">
              <div class="form-group col">
                <label for="exampleInputEmail1">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Item Name"
                  onChange={handleEmailChange}
                  value={email}
                />
                {/* {categoryNameError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {categoryNameError}
                  </div>
                ) : null} */}
              </div>
            </div>
            <div className="row">
              <div className="d-flex col align-items-center">
                <div class="form-check mr-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    onChange={handleIsMaleChange}
                    checked={isMale}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Male
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                    onChange={handleIsFemaleChange}
                    checked={isFemale}
                  />
                  <label class="form-check-label" for="exampleRadios2">
                    Female
                  </label>
                </div>
              </div>
              <div class="form-group col-12 col-md-6 col-lg-6">
                <label for="exampleInputEmail1">Date Of Birth</label>
                <input
                  type="date"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Item Name"
                  onChange={handleDateOfBirthChange}
                  value={dateOfBirth}
                />
                {/* {categoryNameError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {categoryNameError}
                  </div>
                ) : null} */}
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary mt-3 mr-4"
              onClick={props.goBack}
              style={{ backgroundColor: Colors.tableHead, border: "green" }}
            >
              Back
            </button>
            <button
              style={{ backgroundColor: Colors.accentColor, border: "green" }}
              type="submit"
              class="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              Edit User
            </button>
          </form>
        </div>
      </div>
    );
  else content = <p>Loading...</p>;

  return content;
};
export default CustomerForm;
