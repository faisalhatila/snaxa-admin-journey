import React, { Component } from "react";
import { AddRestaurantForm } from "../../components";

let AddRestaurant;
export default AddRestaurant = (props) => {
	return (
		<div className='container'>
			<div className='row'>
				{/* <LeftMenu /> */}
				<div className='col-12 mt-4'>
					<AddRestaurantForm restaurantId={props.restaurantId} />
				</div>
			</div>
		</div>
	);
};
