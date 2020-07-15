import { ImageUpload } from "..";
import React, { Component, useState, useEffect } from "react";
import { set } from "lodash";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

let itemIndex = 0;
let AddAddonCategoryForm;
export default AddAddonCategoryForm = (props) => {
	const { userId, token } = useAuth();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [data, setData] = useState([]);
	const [addOnItemName, setaddOnItemName] = useState("");
	const [addonPrice, setAddonPrice] = useState();
	const [addOnItemNameError, setaddOnItemNameError] = useState("");
	const [addOnData, setAddOnData] = useState([]);
	const [cateogryData, setCateogryData] = useState([]);
	const [category, selectCategory] = useState();
	const [colourOptions, setColourOptions] = useState([]);
	const [restaurant, selectRestaurant] = useState();
	const [restaurantID, setRestaurantID] = useState();
	const [categoryID, setCategoryID] = useState();
	const validate = () => {
		// const { cuisineName } = state;
		// let { cuisineNameError } = state;
		// if (!cuisineName) {
		//   cuisineNameError = "Please Enter Cuisine Name";
		// } else {
		//   cuisineNameError = "";
		// }
		// if (cuisineNameError) {
		//   setState({
		//     cuisineNameError,
		//   });
		//   return false;
		// }
		return true;
	};
	const handleChangeAddonItemName = (e) => {
		setaddOnItemName(e.target.value);
		// cuisineNameError: "",
	};
	const handleChangeAddonPrice = (e) => {
		setAddonPrice(e.target.value);
		// cuisineNameError: "",
	};
	const handleAddAddonItemName = async () => {
		// const isValid = validate();
		if (true) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/add-addons-items`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
						addOn: categoryID,
						name: addOnItemName,
						price: addonPrice,
					})
				);
				console.log("responseData", responseData);
				// setData(responseData);
			} catch (err) {
				// console.log("err", err);
			}
			setAddonPrice("");
			setaddOnItemName("");
			setaddOnItemNameError(false);
			handleCategorySelect(cateogryData[category]);
		}
	};
	const handleDeleteAddonItemName = async (itemIndex) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/delete-addons-items`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({
					userId,
					addOn: categoryID,
					addOnItem: itemIndex,
				})
			);
			handleCategorySelect(cateogryData[category]);
		} catch (err) {
			// console.log("err", err);
		}
	};

	const handleRestaurantSelect = async (e) => {
		selectRestaurant(e.index);
		setRestaurantID(e.value);
		selectCategory();
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/get-all-addons`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({
					userId,
					restaurant: e.value,
				})
			);
			console.log("responseData", responseData.addOns);
			const temp = responseData.addOns.map((i, index) => {
				return { index, value: i._id, label: i.addOnName };
			});
			console.log("Temp", temp);
			setCateogryData(temp);
			// selectCategory(cateogryData[responseData.addOns[0].]);
		} catch (err) {
			// console.log("err", err);
		}
	};

	const handleCategorySelect = async (e) => {
		selectCategory(e.index);
		setCategoryID(e.value);
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/get-all-addons-items`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({
					userId,
					addOn: e.value,
				})
			);
			// console.log("responseData", responseData.addOns);
			// const temp = responseData.addOns.map((i, index) => {
			// 	return { index, value: i._id, label: i.addOnName };
			// });
			// setCateogryData(temp);
			console.log("responseData", responseData);
			setAddOnData(responseData.existingAddOn.items);
		} catch (err) {
			// console.log("err", err);
		}
	};

	useEffect(() => {
		const dashboard = async () => {
			console.log("Dashboard");
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/get-all-restaurants`,
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
				setData(responseData.allRestaurants);
				const temp = responseData.allRestaurants.map((i, index) => {
					return { index, value: i.restaurant, label: i.name };
				});
				setColourOptions(temp);
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
					Add Addon Item
				</div>
				<div className='col-12 customerDetailFormMainDiv d-lg-flex d-md-flex'>
					<div className='row col-12'>
						<form className='col-12 col-md-6 col-lg-6 updateVendorForm'>
							<div className='row'>
								<div class='form-group col'>
									<label for='exampleInputEmail1'>Select Restaurant</label>
									<Select
										defaultValue={colourOptions[restaurant]}
										options={colourOptions}
										formatGroupLabel={formatGroupLabel}
										onChange={handleRestaurantSelect}
									/>
								</div>
								<div class='form-group col'>
									<label for='exampleInputEmail1'>Select Addon Category</label>
									<Select
										defaultValue={cateogryData && cateogryData[category]}
										options={cateogryData}
										formatGroupLabel={formatGroupLabel}
										onChange={handleCategorySelect}
									/>
								</div>
							</div>
							<div class='form-group'>
								<label for='exampleInputEmail1'>Price</label>
								<input
									type='number'
									class='form-control mr-4'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='Enter Addon Price'
									onChange={handleChangeAddonPrice}
									value={addonPrice}
								/>
							</div>
							<div class='form-group'>
								<label for='exampleInputEmail1'>Add On Item</label>
								<div className='d-flex align-items-center'>
									<input
										type='text'
										class='form-control mr-4'
										id='exampleInputEmail1'
										aria-describedby='emailHelp'
										placeholder='Enter Addon Item Name'
										onChange={handleChangeAddonItemName}
										value={addOnItemName}
									/>
									<label
										className='addOrderStatusButton'
										onClick={handleAddAddonItemName}>
										Add
									</label>
								</div>
								{addOnItemNameError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{addOnItemNameError}
									</div>
								) : null}
							</div>
							{/* <button type="submit" class="btn btn-primary mt-3">
                Add Item
              </button> */}
						</form>
						<div className='col-12 col-md-6 col-lg-6 updateVendorForm'>
							<div class='form-group'>
								<label for='exampleInputEmail1'>
									<strong>Addon Items</strong>
								</label>

								<table class='table table-hover'>
									<thead style={{ backgroundColor: "gray", color: "#fff" }}>
										<tr>
											<th className='orderTableTH'>Restaurant</th>
											<th className='orderTableTH'>Addon Category</th>
											<th className='orderTableTH'>Addon Item Name</th>
											<th className='orderTableTH'>Addon Price</th>
											<th className='orderTableTH'>Action</th>
										</tr>
									</thead>
									<tbody>
										{addOnData.map((item) => {
											return (
												<tr>
													<td className='orderTableTD'>
														{colourOptions[restaurant].label}
													</td>
													<td className='orderTableTD'>
														{cateogryData[category].label}
													</td>
													<td className='orderTableTD'>{item.name}</td>
													<td className='orderTableTD'>{item.price}</td>
													<td className='orderTableTD'>
														<label
															className='noMargin deleteOrderStatusButton'
															onClick={() =>
																handleDeleteAddonItemName(item._id)
															}>
															Delete
														</label>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	else content = <p>Loading...</p>;
	return content;
};

const formatGroupLabel = (data) => (
	<div style={groupStyles}>
		<span>{data.label}</span>
		<span style={groupBadgeStyles}>{data.options.length}</span>
	</div>
);
const groupStyles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
};
const groupBadgeStyles = {
	backgroundColor: "#EBECF0",
	borderRadius: "2em",
	color: "#172B4D",
	display: "inline-block",
	fontSize: 12,
	fontWeight: "normal",
	lineHeight: "1",
	minWidth: 1,
	padding: "0.16666666666667em 0.5em",
	textAlign: "center",
};
