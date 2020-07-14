import React, { Component } from "react";
import { AddCuisineForm } from "../../components";
export default class AddCuisine extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <AddCuisineForm />
          </div>
        </div>
      </div>
    );
  }
}
