import { ImageUpload } from "..";
import React, { Component, useState, useEffect } from "react";
import { set } from "lodash";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
let itemIndex = 0;
let AddOrderStatusForm;
export default AddOrderStatusForm = (props) => {
	const { userId, token } = useAuth();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [data, setData] = useState([]);
	const [orderStatusName, setOrderStatusName] = useState("");
	const [orderStatusNameError, setOrderStatusNameError] = useState("");
	const [isCompletedStatus, setIsCompletedStatus] = useState(false);
	const validate = () => {
		// const { orderStatusName } = state;
		// let { orderStatusNameError } = state;
		// if (!orderStatusName) {
		// 	orderStatusNameError = "Please Enter Order Status Name";
		// } else {
		// 	orderStatusNameError = "";
		// }
		// if (orderStatusNameError) {
		// 	setState({
		// 		orderStatusNameError,
		// 	});
		// 	return false;
		// }
		return true;
	};

	const handleChangeOrderStatusName = (e) => {
		setOrderStatusName(e.target.value);
		// orderStatusNameError: "",
	};
	const handleCompletedMarkCheck = (e) => {
		setIsCompletedStatus(e.target.checked);
	};
	const handleAddOrderStatusName = async () => {
		// const isValid = validate();
		if (true) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/add-order-status`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
						orderStatus: orderStatusName,
						active: isCompletedStatus,
					})
				);
				console.log("responseData", responseData);
				setData(responseData.orderStatuses);
			} catch (err) {
				// console.log("err", err);
			}
			setOrderStatusName("");
			setIsCompletedStatus(false);
		}
	};
	const handleDeleteOrderStatusName = async (itemIndex) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/delete-order-status`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({
					userId,
					orderStatus: itemIndex,
				})
			);
			console.log("responseData", responseData);
			setData(responseData.orderStatuses);
		} catch (err) {
			// console.log("err", err);
		}
	};
	useEffect(() => {
		const dashboard = async () => {
			console.log("Dashboard");
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/get-order-status`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
					})
				);
				console.log("responseData", responseData);
				setData(responseData.orderStatuses);
			} catch (err) {
				// console.log("err", err);
			}
		};
		if (token && userId) dashboard();
	}, [token, userId, sendRequest]);
	let content;
	if (!isLoading)
		content = (
			<div className='row'>
				<div className='col-4 col-lg-3 col-md-3 updateVendorFormTitle'>
					Add Order Status
				</div>
				<div className='col-12 customerDetailFormMainDiv d-lg-flex d-md-flex'>
					<div className='row col-12'>
						<form className='col-12 col-md-6 col-lg-6 updateVendorForm'>
							<div class='form-group'>
								<label for='exampleInputEmail1'>Order Status Name</label>
								<div className='d-flex align-items-center'>
									<input
										type='text'
										class='form-control mr-4'
										id='exampleInputEmail1'
										aria-describedby='emailHelp'
										placeholder='Enter Order Status Name'
										onChange={handleChangeOrderStatusName}
										value={orderStatusName}
									/>
									<label
										className='addOrderStatusButton'
										onClick={handleAddOrderStatusName}>
										Add
									</label>
								</div>
								{orderStatusNameError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{orderStatusNameError}
									</div>
								) : null}
								<div class='form-check mt-4'>
									<input
										type='checkbox'
										class='form-check-input'
										id='exampleCheck1'
										onChange={handleCompletedMarkCheck}
										checked={isCompletedStatus}
									/>
									<label class='form-check-label' for='exampleCheck1'>
										Will it mark an order as completed order
									</label>
								</div>
							</div>
							<button
								type='submit'
								class='btn btn-primary mt-3'
								// onClick={handleSubmit}
							>
								Add Item
							</button>
						</form>
						<div className='col-12 col-md-6 col-lg-6 updateVendorForm'>
							<div class='form-group'>
								<label for='exampleInputEmail1'>
									<strong>Active Order Status</strong>
								</label>
								<ul>
									{data.map((item, index) => {
										return item.active === false ? (
											<li key={index} className='mb-2'>
												<div className='d-flex align-items-center'>
													<label className='mr-4 noMargin'>
														{item.orderstatus}
													</label>
													<label
														className='noMargin deleteOrderStatusButton'
														onClick={() =>
															handleDeleteOrderStatusName(item._id)
														}>
														Delete
													</label>
												</div>
											</li>
										) : null;
									})}
								</ul>
							</div>
							<div class='form-group'>
								<label for='exampleInputEmail1'>
									<strong>Completed Order Status</strong>
								</label>
								<ul>
									{data.map((item, index) => {
										return item.active === true ? (
											<li key={item._id} className='mb-2'>
												<div className='d-flex align-items-center'>
													<label className='mr-4 noMargin'>
														{item.orderstatus}
													</label>
													<label
														className='noMargin deleteOrderStatusButton'
														onClick={() =>
															handleDeleteOrderStatusName(item._id)
														}>
														Delete
													</label>
												</div>
											</li>
										) : null;
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	else content = <p>Loading...</p>;
	return content;
};
