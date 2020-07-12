import { ImageUpload } from "..";
import React, { Component } from "react";
let itemIndex = 0;

export default class AddRestaurantForm extends Component {
  state = {
    categoryName: "",
    itemDescription: "",
    itemPriority: "",
    itemStatus: false,
    categoryNameError: "",
    itemDescriptionError: "",
    itemPriorityError: "",
    data: [],
    workingDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "ThursDay",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    cuisineName: "",
    cuisines: [],
    currentStep: 1,
  };
  handleChangecategoryName = (event) => {
    this.setState({
      categoryName: event.target.value,
      categoryNameError: "",
    });
  };
  handleChangeItemDescription = (event) => {
    this.setState({
      itemDescription: event.target.value,
      itemDescriptionError: "",
    });
  };
  handleChangeItemPriority = (event) => {
    this.setState({
      itemPriority: event.target.value,
      itemPriorityError: "",
    });
  };
  handleChangeItemStatus = (event) => {
    console.log(event.target.checked);
    this.setState({
      itemStatus: event.target.checked,
    });
  };
  validate = () => {
    const { categoryName, itemDescription, itemPriority } = this.state;
    let {
      categoryNameError,
      itemDescriptionError,
      itemPriorityError,
    } = this.state;
    if (!categoryName) {
      categoryNameError = "Please Enter Category Name";
    } else {
      categoryNameError = "";
    }
    if (!itemDescription) {
      itemDescriptionError = "Please Enter Item Name";
    } else {
      itemDescriptionError = "";
    }
    if (!itemPriority) {
      itemPriorityError = "Please Enter Item Name";
    } else {
      itemPriorityError = "";
    }
    if (categoryNameError || itemPriorityError || itemDescriptionError) {
      this.setState({
        categoryNameError,
        itemPriorityError,
        itemDescriptionError,
      });
      return false;
    }
    return true;
  };
  handleSubmit = (event) => {
    const {
      categoryName,
      itemDescription,
      itemPriority,
      itemStatus,
    } = this.state;
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      let collections = [
        categoryName,
        itemDescription,
        itemPriority,
        itemStatus,
      ];
      let { data } = this.state;
      data.push(collections);
      setTimeout(() => {
        alert("perfect");
      }, 2000);
    }
  };
  handleAddCuisine = () => {
    const itemObj = {
      itemIndex: itemIndex,
      cuisineName: this.state.cuisineName,
      //   price: this.state.number,
      //   description: this.state.desc,
      isDisable: true,
    };
    itemIndex++;
    this.state.cuisines.push(itemObj);
    this.setState(
      {
        cuisines: this.state.cuisines,
        cuisineName: "",
      },
      () => {
        console.log("State", this.state);
      }
    );
  };
  handleDeleteCuisine = (itemIndex) => {
    // console.log(props);
    // alert("hi");
    let { cuisines } = this.state;
    cuisines = this.state.cuisines.filter((item) => {
      return item.itemIndex !== itemIndex;
    });
    this.setState({ cuisines });
    console.log(cuisines);
  };
  handleNext = () => {
    this.setState({
      currentStep: 2,
    });
  };
  render() {
    const {
      categoryName,
      categoryNameError,
      itemDescription,
      itemDescriptionError,
      itemPriority,
      itemPriorityError,
      itemStatus,
      workingDays,
      cuisineName,
      cuisines,
      currentStep,
    } = this.state;
    return (
      <div className="row">
        <div className="col-8 col-lg-3 col-md-3 updateVendorFormTitle">
          Restaurant Details
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <form className="col-12 updateVendorForm">
            <div
              className={`row ${
                this.state.currentStep === 2 ? "d-none" : null
              }`}
            >
              <div className="col-12 col-md-6 col-lg-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Restaurant Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Item Name"
                    onChange={this.handleChangecategoryName}
                    value={categoryName}
                  />
                  {categoryNameError ? (
                    <div
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {categoryNameError}
                    </div>
                  ) : null}
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
                    onChange={this.handleChangeItemDescription}
                  ></textarea>
                  {itemDescriptionError ? (
                    <div
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {itemDescriptionError}
                    </div>
                  ) : null}
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
                      onChange={this.handleChangecategoryName}
                      value={categoryName}
                    />
                    {categoryNameError ? (
                      <div
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {categoryNameError}
                      </div>
                    ) : null}
                  </div>
                  <div class="form-group col-6">
                    <label for="exampleInputEmail1">Delivery Charges</label>
                    <input
                      type="number"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Item Name"
                      onChange={this.handleChangecategoryName}
                      value={categoryName}
                    />
                    {categoryNameError ? (
                      <div
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {categoryNameError}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div class="form-group row col align-items-center">
                  <label
                    className="mr-4"
                    for="exampleInputEmail1"
                    style={{ marginBottom: 0 }}
                  >
                    Pre Order
                  </label>
                  {/* <input
                      type="number"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Item Name"
                      onChange={this.handleChangecategoryName}
                      value={categoryName}
                    /> */}
                  <input type="checkbox" />
                  {categoryNameError ? (
                    <div
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {categoryNameError}
                    </div>
                  ) : null}
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
                            <input type="checkbox" />
                          </th>
                          <td>{days}</td>
                          <td>
                            <select disabled={true}>
                              <option>12:00</option>
                              <option>01:00</option>
                              <option>02:00</option>
                            </select>
                          </td>
                          <td>
                            <select>
                              <option>12:00</option>
                              <option>01:00</option>
                              <option>02:00</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className={`${this.state.currentStep === 1 ? "d-none" : null}`}
            >
              <div className="addCuisineForm">
                <h3>Add Cuisine</h3>
                <div class="form-group">
                  <label for="exampleInputEmail1">Cousine Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Cuisine Name"
                    onChange={(e) =>
                      this.setState({ cuisineName: e.target.value })
                    }
                    value={cuisineName}
                  />
                  {categoryNameError ? (
                    <div
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {categoryNameError}
                    </div>
                  ) : null}
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
                            onClick={() =>
                              this.handleDeleteCuisine(item.itemIndex)
                            }
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
                  onClick={this.handleAddCuisine}
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
                onChange={this.handleChangeItemPriority}
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
                onChange={this.handleChangeItemStatus}
                checked={itemStatus}
              />
              <label class="custom-control-label" for="customSwitch1">
                Status
              </label>
            </div> */}
            {currentStep === 1 ? (
              <button
                type="button"
                class="btn btn-primary mt-3"
                onClick={this.handleNext}
              >
                Next
              </button>
            ) : null}
            {currentStep === 2 ? (
              <button
                type="submit"
                class="btn btn-primary mt-3"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}
