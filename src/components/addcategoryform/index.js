import { ImageUpload } from "..";
import React, { Component } from "react";

export default class AddCategoryForm extends Component {
  state = {
    categoryName: "",
    itemDescription: "",
    itemPriority: "",
    itemStatus: false,
    categoryNameError: "",
    itemDescriptionError: "",
    itemPriorityError: "",
    data: [],
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
  render() {
    const {
      categoryName,
      categoryNameError,
      itemDescription,
      itemDescriptionError,
      itemPriority,
      itemPriorityError,
      itemStatus,
    } = this.state;
    return (
      <div className="row">
        <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Item Details
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <form className="col-12 col-lg-6 col-md-6 updateVendorForm">
            <div class="form-group">
              <label for="exampleInputEmail1">Item Name</label>
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
              <label for="exampleFormControlTextarea1">Description</label>
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
            <div
              class="form-group"
              style={{ boxShadow: "0px 0px 5px 2px #ccc" }}
            >
              <ImageUpload />{" "}
            </div>
            <div class="form-group">
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
            </div>
            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={this.handleSubmit}
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    );
  }
}
