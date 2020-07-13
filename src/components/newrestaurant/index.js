import React, { Component, useState, useEffect } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";

let NewRestaurant;
export default NewRestaurant = (props) => {
	const [data, setData] = useState();

	const { userId, token } = useAuth();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// console.log(userId, token);
	// const auth = useContext(AuthContext);
	useEffect(() => {
		const dashboard = async () => {
			console.log("new-restaurants");
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/new-restaurants`,
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
				setData(responseData.existingRestaurants);
			} catch (err) {
				// console.log("err", err);
			}
		};
		if (token && userId) dashboard();
	}, [token, userId, sendRequest]);

	let content;

	if (!isLoading && data)
		content = (
			<div className='restaurantmanagementtable mb-4'>
				<div class='container'>
					<div
						className={`newOrderTableHeading ${
							data.length > 0 ? " maximumWidthRestaurant" : null
						}`}>
						<h3>New Restaurants</h3>
					</div>
					{data.length > 0 ? (
						<table class='table table-hover'>
							<thead style={{ backgroundColor: "gray", color: "#fff" }}>
								<tr>
									<th>ID</th>
									<th>Restaurant Name</th>
									<th>Email</th>
									<th>Address</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<input
											type='text'
											placeholder='Order ID'
											className='searchOrderData orderIDSearch'
										/>
									</td>
									<td>
										<input
											type='text'
											placeholder='Customer Name'
											className='searchOrderData'
										/>
									</td>
									<td>
										<input
											type='text'
											placeholder='Mobile No'
											className='searchOrderData'
										/>
									</td>
									<td>
										<input
											type='text'
											placeholder='Restaurant'
											className='searchOrderData'
										/>
									</td>
									<td>
										<input
											type='text'
											placeholder='Area'
											className='searchOrderData'
										/>
									</td>
								</tr>
								{data.map((item) => {
									return (
										<tr>
											<td>{item._id}</td>
											<td>{item.name}</td>
											<td>{item.email}</td>
											<td>{item.addres}</td>
											<td>{item.status}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					) : (
						<div className='noNewOrderHeadingDiv mt-3'>
							<h4>No New Restaurant Added</h4>
						</div>
					)}
				</div>
			</div>
		);
	else content = <p>Loading...</p>;

	return content;
};
