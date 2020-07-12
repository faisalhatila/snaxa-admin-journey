import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  LeftMenu,
  DataCounter,
  Chart,
  NewRestaurant,
  NewOrder,
} from "../../components";

class HomeContainer extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <LeftMenu />
          <div className="col-12 col-lg-9 col-md-9 mt-4">
            <DataCounter />
            <div className="">
              <Chart />
            </div>
            <div className="mt-4">
              <NewOrder />
            </div>
            <div>
              <NewRestaurant />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
