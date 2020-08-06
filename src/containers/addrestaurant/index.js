import React from "react";
import { AddRestaurantForm } from "../../components";

// let AddRestaurant;
const AddRestaurant = (props) => {
  // console.log("###################################################");
  // console.log(props.restaurantId);
  // console.log("###################################################");
  return (
    <div className="container">
      <div className="row">
        {/* <LeftMenu /> */}
        <div className="col-12 mt-4">
          <AddRestaurantForm
            goBack={props.goBack}
            restaurantId={props.restaurantId}
          />
        </div>
      </div>
    </div>
  );
};
export default AddRestaurant;
