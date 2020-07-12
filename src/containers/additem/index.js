import React, { Component } from "react";
import { AddItemFrom } from "../../components";

export default class AddItem extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <AddItemFrom />
          </div>
        </div>
      </div>
    );
  }
}
