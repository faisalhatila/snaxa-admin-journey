import React, { Component, useState } from "react";
import { LeftMenu, OrderTable, NewOrder } from "../../components";
import { AddOrderStatus } from "..";
import OrderDetails from "../orderdetails";

let OrderManagement;
export default OrderManagement = (props) => {
	const [editRestaurantStatus, setEditRestaurantStatus] = useState(false);
	const [orderId, setOrderId] = useState(false);

	const editRestaurant = (id) => {
		setOrderId(id);
		setEditRestaurantStatus(true);
	};

	let content;

	if (!editRestaurantStatus)
		content = (
			<div className='container'>
				<div className='row'>
					{/* <LeftMenu /> */}
					<div className='col-12 mt-4'>
						<NewOrder editOrder={editRestaurant} />
						<OrderTable editOrder={editRestaurant} />
					</div>
				</div>
			</div>
		);
	if (editRestaurantStatus)
		content = <OrderDetails orderId={orderId}></OrderDetails>;

	return content;
};
