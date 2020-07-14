import React, { Component, useState } from "react";
import {
	LeftMenu,
	NewRestaurant,
	RestaurantTable,
	AddRestaurantForm,
} from "../../components";
import { AddRestaurant } from "..";

let RestaurantManagement;

export default RestaurantManagement = (props) => {
	const [editRestaurantStatus, setEditRestaurantStatus] = useState(false);
	const [restaurant, setRestaurant] = useState(false);

	const editRestaurant = (id) => {
		setRestaurant(id);
		setEditRestaurantStatus(true);
	};

	let content;

	if (!editRestaurantStatus)
		content = (
			<div className='container'>
				<div className='row'>
					{/* <LeftMenu /> */}
					<div className='col-12 mt-4'>
						<NewRestaurant editRestaurant={editRestaurant} />
						<RestaurantTable editRestaurant={editRestaurant} />
					</div>
				</div>
			</div>
		);

	if (editRestaurantStatus)
		// content = <AddRestaurantForm restaurantId={props.restaurantId} />;
		content = <AddRestaurant restaurantId={restaurant} />;

	return content;
};
