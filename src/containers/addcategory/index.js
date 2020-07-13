import React, { Component } from "react";
import { AddCategoryForm } from "../../components";

export default class AddCategory extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <AddCategoryForm />
          </div>
        </div>
      </div>
    );
  }
}
