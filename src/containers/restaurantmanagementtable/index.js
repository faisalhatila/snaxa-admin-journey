import React, { useState } from "react";
import {
  // LeftMenu,
  NewRestaurant,
  RestaurantTable,
  // AddRestaurantForm,
} from "../../components";
import { AddRestaurant } from "..";

// let RestaurantManagement;

const RestaurantManagement = (props) => {
  const [editRestaurantStatus, setEditRestaurantStatus] = useState(false);
  const [restaurant, setRestaurant] = useState(false);

  const editRestaurant = (id) => {
    setRestaurant(id);
    setEditRestaurantStatus(true);
  };
  const goBack = () => {
    setEditRestaurantStatus(false);
  };

  let content;

  if (!editRestaurantStatus)
    content = (
      <div className="container">
        <div className="row">
          {/* <LeftMenu /> */}
          <div className="col-12 mt-4">
            <NewRestaurant editRestaurant={editRestaurant} />
            <RestaurantTable editRestaurant={editRestaurant} />
          </div>
        </div>
      </div>
    );

  if (editRestaurantStatus)
    // content = <AddRestaurantForm restaurantId={props.restaurantId} />;
    content = <AddRestaurant goBack={goBack} restaurantId={restaurant} />;

  return content;
};
export default RestaurantManagement;
