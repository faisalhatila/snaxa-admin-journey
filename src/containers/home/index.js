import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import {
	LeftMenu,
	DataCounter,
	Chart,
	NewRestaurant,
	NewOrder,
} from "../../components";

const HomeContainer = (props) => {
	const { userId, token } = useAuth();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// console.log(userId, token);
	// const auth = useContext(AuthContext);
	const [data, setData] = useState();
	useEffect(() => {
		const dashboard = async () => {
			console.log("Dashboard");
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/dashboard`,
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
				setData(responseData);
			} catch (err) {
				// console.log("err", err);
			}
		};
		if (token && userId) dashboard();
	}, [token, userId, sendRequest]);
	let content;
	if (!isLoading && data)
		content = (
			<div className='container'>
				<div className='row'>
					{/* <LeftMenu /> */}
					<div className='col-12 mt-4'>
						<DataCounter data={data} />
						<div className=''>
							<Chart />
						</div>
						<div className='mt-4'>
							<NewOrder />
						</div>
						<div>
							<NewRestaurant />
						</div>
					</div>
				</div>
			</div>
		);
	else content = <p>Loading...</p>;
	return content;
};

export default HomeContainer;
