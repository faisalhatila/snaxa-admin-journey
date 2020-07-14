import React, { Component, useState, useEffect } from "react";
import { useAuth } from "../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";

let OrderTable;
export default OrderTable = (props) => {
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
					`${process.env.REACT_APP_BACKEND_URL}/punched-orders`,
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
				setData(responseData.existingOrders);
			} catch (err) {
				// console.log("err", err);
			}
		};
		if (token && userId) dashboard();
	}, [token, userId, sendRequest]);
	let content;
	if (!isLoading && data)
		content = (
			<div className='ordermanagementtable'>
				<div class='container'>
					<div className='orderTableHeading'>
						<h3>Punched Orders</h3>
					</div>

					<table class='table table-hover'>
						<thead style={{ backgroundColor: "gray", color: "#fff" }}>
							<tr>
								{/* <th><input type="checkbox" /></th> */}
								<th className='orderTableTH'>Order ID</th>
								<th className='orderTableTH'>Customer Name</th>
								<th className='orderTableTH'>Mobile No</th>
								<th className='orderTableTH'>Restaurant</th>
								<th className='orderTableTH'>Area</th>
								<th className='orderTableTH'>Branch</th>
								<th className='orderTableTH'>Order Time</th>
								<th className='orderTableTH'>Payment</th>
								<th className='orderTableTH'>Amount</th>
								{/* <th className='orderTableTH'>Order Source</th> */}
								<th className='orderTableTH'>Status</th>
							</tr>
						</thead>
						<tbody>
							{/* <tr>
            <td></td>
            <td>
              <input
                type="text"
                placeholder="Order ID"
                className="searchOrderData orderIDSearch"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Customer Name"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Mobile No"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Restaurant"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Area"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Branch"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Order Time"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Payment"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Amount"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Order Source"
                className="searchOrderData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Status"
                className="searchOrderData"
              />
            </td>
          </tr> */}
							{data.map((item) => {
								return (
									<tr>
										{/* <td>
                  <input type="checkbox" />
                </td> */}
										<td className='orderTableTD'>{item._id}</td>
										<td className='orderTableTD'>
											{item.userId.fname} {item.userId.lname}
										</td>
										<td className='orderTableTD'>{item.mobileNo}</td>
										<td className='orderTableTD'>{item.RestaurantName}</td>
										<td className='orderTableTD'>{item.area}</td>
										<td className='orderTableTD'>{item.branch}</td>
										<td className='orderTableTD'>
											{new Date(item.createdAt).toDateString()}
											<br />
											{new Date(item.createdAt).toLocaleTimeString()}
										</td>
										{/* <td className='orderTableTD'>{item.payment}</td> */}
										<td className='orderTableTD'>COD</td>
										<td className='orderTableTD'>AED {item.totalPrice}</td>
										{/* <td className='orderTableTD'>{item.orderSource}</td> */}
										<td className='orderTableTD'>
											<div className='d-flex justify-content-center'>
												<div>{item.orderStatus}</div>
												<label
													className='orderView ml-3'
													onClick={() => props.editOrder(item._id)}>
													View
												</label>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	else content = <p>Loading...</p>;
	return content;
};
