import React, { Component, useState } from "react";
import {
	LeftMenu,
	NewRestaurant,
	RestaurantTable,
	AddRestaurantForm,
	CustomerTable,
	NewCustomer,
} from "../../components";
import { AddRestaurant } from "..";
import CustomerForm from './../../components/customerdetails/index';

let CustomerManagement;

export default CustomerManagement = (props) => {
	const [editCustomerStatus, setEditCustomerStatus] = useState(false);
	const [customer, setCustomer] = useState(false);

	const editCustomer = (id) => {
		setCustomer(id);
		setEditCustomerStatus(true);
	};

	let content;

	if (!editCustomerStatus)
		content = (
			<React.Fragment>
				<NewCustomer editCustomer={editCustomer} />
				<CustomerTable editCustomer={editCustomer} />
			</React.Fragment>
		);

	if (editCustomerStatus) content = <CustomerForm customerId={customer} />;

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 mt-4'>{content}</div>
			</div>
		</div>
	);
};
