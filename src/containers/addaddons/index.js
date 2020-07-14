import React, { Component } from "react";
import { AddAddonForm } from "../../components";

export default class AddAddons extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <AddAddonForm />
          </div>
        </div>
      </div>
    );
  }
}
