import React, { useEffect, useState } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";

const OrderDetails = (props) => {
	// console.log(props.orderStatus);
	const [singleOrder, setSingleOrder] = useState({});
	const [orderStatus, setOrderStatus] = useState("");
	const [orderStatuses, setOrderStatuses] = useState();
	const { userId, token } = useAuth();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const dashboard = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/order-details`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
						orderId: props.orderId,
					})
				);
				console.log("responseData", responseData);
				setOrderStatus(responseData.order.orderStatusId);
				setSingleOrder(responseData.order);
			} catch (err) {
				console.log("err", err);
			}
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
						orderId: props.orderId,
					})
				);
				setOrderStatuses(responseData.orderStatuses);
			} catch (err) {
				console.log("err", err);
			}
		};
		if (token && userId) dashboard();
	}, [token, userId, sendRequest]);

	let content2 = <p>Loading...</p>;

	const orderStatusHandler = async (event) => {
		setOrderStatus(event.target.value);
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/order-details-status`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({
					userId,
					orderId: props.orderId,
					orderStatus: event.target.value,
				})
			);
			console.log("responseData", responseData);
		} catch (err) {
			console.log("err", err);
		}
	};

	if (!isLoading && Object.keys(singleOrder).length > 0)
		content2 = (
			<div class='container'>
				<div className='orderDetailsRow1'>
					<div className='col-12 statusHeadingDiv'>
						<div className='statusHeadingDiv'>
							<p>Status</p>
						</div>
					</div>
					<div className='col-12 d-flex mt-3'>
						<div className='col-12 col-lg-3 col-md-3'>
							<div class='form-group orderStatusDropdownDiv'>
								<label for='exampleFormControlSelect1'>Example select</label>
								<select
									class='form-control'
									id='exampleFormControlSelect1'
									onChange={orderStatusHandler}
									value={orderStatus}>
									{orderStatuses &&
										orderStatuses.map((i) => {
											return <option value={i._id}>{i.orderstatus}</option>;
										})}
								</select>
							</div>
						</div>
						<div className='col-12 col-lg-9 col-md-9'>
							<div className='d-flex flex-column orderDescriptionParaDiv'>
								<p>Order Description</p>
								<p className='orderDescriptionPara'>
									Lorem ipsum, or lipsum as it is sometimes known, is dummy text
									used in laying out print, graphic or web designs
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='orderDetailsRow2 mt-4'>
					<div className='row mt-3'>
						<div className='col-12 col-lg-4 col-md-4'>
							<div className='orderDetailsRow2Col1'>
								<div className='orderDetailsRow2Col1TitleDiv'>
									<p>Restaurant Details</p>
								</div>
								<div className='orderDetailsRow2Col1DescriptionDiv'>
									<p className='bold'>Order#</p>
									<p>{singleOrder._id}</p>
									<p className='bold'>Restaurant</p>
									<p>{singleOrder.RestaurantName}</p>
									<p className='bold'>Location</p>
									<p>{singleOrder.city}</p>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-4 col-md-4'>
							<div className='orderDetailsRow2Col1'>
								<div className='orderDetailsRow2Col1TitleDiv'>
									<p>Customer Details</p>
								</div>
								<div className='orderDetailsRow2Col1DescriptionDiv'>
									<p className='bold'>Name</p>
									<p>
										{singleOrder.userId.fname} {singleOrder.userId.lname}
									</p>
									<p className='bold'>Email Address</p>
									<p>{singleOrder.userId.email}</p>
									<p className='bold'>Address</p>
									<p>{singleOrder.userId.address}</p>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-4 col-md-4'>
							<div className='orderDetailsRow2Col1'>
								<div className='orderDetailsRow2Col1TitleDiv'>
									<p>Order Info</p>
								</div>
								<div className='orderDetailsRow2Col1DescriptionDiv'>
									<p className='bold'>Item List</p>
									<div>
										{singleOrder.items.map((i) => (
											<div>
												<p style={{ fontWeight: "bold" }}>
													{i.quantity} x {i.name}
												</p>
												{i.addOnList.length > 0 && "AddOns: "}
												{i.addOnList.map((j) => (
													<span>{j} </span>
												))}
												<br />
											</div>
										))}
									</div>
									<p className='bold'>Date</p>
									<div>
										{new Date(singleOrder.createdAt).toDateString()}
										<br />
										{new Date(singleOrder.createdAt).toLocaleTimeString()}
									</div>
									<p className='bold'>Payment</p>
									<p>COD</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	// if (isLoading) content2 = <p>Loading</p>;

	return content2;
};
export default OrderDetails;
