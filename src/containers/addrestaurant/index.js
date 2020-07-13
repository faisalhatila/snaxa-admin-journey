import React, { Component } from "react";
import { AddRestaurantForm } from "../../components";

export default class AddRestaurant extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {/* <LeftMenu /> */}
          <div className="col-12 mt-4">
            <AddRestaurantForm />
          </div>
        </div>
      </div>
    );
  }
}
