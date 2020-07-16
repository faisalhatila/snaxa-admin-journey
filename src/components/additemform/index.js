import { ImageUpload } from "..";
import React, { Component, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

let AddItemForm;
export default AddItemForm = (props) => {
	const [categoryName, setCategoryName] = useState();
	const [itemDescription, setItemDescription] = useState();
	const [itemPriority, setItemPriority] = useState();
	const [price, setPrice] = useState();
	const [itemStatus, setItemStatus] = useState(true);
	const [categoryNameError, setCategoryNameError] = useState();
	const [itemPriorityError, setItemPriorityError] = useState();
	const [restaurant, setRestaurant] = useState();
	const [category, setCategory] = useState();
	const [addOnList, setAddOnList] = useState([]);
	const { userId, token } = useAuth();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [data, setData] = useState([]);
	const [dataAddCat, setDataAddCat] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const [colourOptions, setColourOptions] = useState([]);
	const [priceoOnSelect, setPriceoOnSelect] = useState(false);
	const [items, setItems] = useState([]);

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
			} catch (err) {
				// console.log("err", err);
			}
		};
		if (token && userId) dashboard();
	}, [token, userId, sendRequest]);
	// setValues = (selectValues) => setState({ selectValues });

	const handleChangecategoryName = (event) => {
		setCategoryName(event.target.value);

		// categoryNameError: "",
	};
	const handleChangeItemDescription = (event) => {
		setItemDescription(event.target.value);
		// itemDescriptionError: "",
	};
	const handleChangeItemPriority = (event) => {
		setItemPriority(event.target.value);
		// itemPriorityError: "",
	};
	const handleChangeItemStatus = (event) => {
		setItemStatus(event.target.checked);
	};
	const handleChangeItemPrice = (event) => {
		setPrice(event.target.value);
	};
	const validate = () => {
		// const { categoryName, itemDescription, itemPriority } = state;
		// let {
		// 	categoryNameError,
		// 	itemDescriptionError,
		// 	itemPriorityError,
		// } = state;
		// if (!categoryName) {
		// 	categoryNameError = "Please Enter Category Name";
		// } else {
		// 	categoryNameError = "";
		// }
		// if (!itemDescription) {
		// 	itemDescriptionError = "Please Enter Item Name";
		// } else {
		// 	itemDescriptionError = "";
		// }
		// if (!itemPriority) {
		// 	itemPriorityError = "Please Enter Item Name";
		// } else {
		// 	itemPriorityError = "";
		// }
		// if (categoryNameError || itemPriorityError || itemDescriptionError) {
		// 	setState({
		// 		categoryNameError,
		// 		itemPriorityError,
		// 		itemDescriptionError,
		// 	});
		// 	return false;
		// }
		return true;
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const isValid = validate();
		if (isValid) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/add-item`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
						restaurantId: restaurant,
						foodCategory: category,
						name: categoryName,
						description: itemDescription,
						price: priceoOnSelect ? 0 : price,
						priceOnSelection: priceoOnSelect,
						addOnList: addOnList.map((i) => i.value),
					})
				);
				console.log("responseData", responseData);
				setCategoryName("");
				setRestaurant(1);
				setItemPriority("");
				setItemDescription("");
				setItemStatus(true);
				setPrice(0);
				setPriceoOnSelect(false);
			} catch (err) {
				// console.log("err", err);
			}
		}
	};

	const handleSelectCategory = async (event) => {
		setCategory(event.target.value);
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/get-items`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({
					userId,
					foodCategory: event.target.value,
				})
			);
			console.log("responseData", responseData);
			setItems(responseData.existingItems);
		} catch (err) {
			// console.log("err", err);
		}
	};
	const handleChangePriceSelectStatus = async (event) => {
		setPriceoOnSelect(event.target.checked);
	};
	const handleSelectRestaurant = async (event) => {
		setRestaurant(event.target.value);
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/get-addons-categories`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({
					userId,
					restaurantId: event.target.value,
				})
			);
			console.log("responseData", responseData);
			setDataAddCat(responseData);
			const temp = responseData.addons.map((i, index) => {
				return { index, value: i._id, label: i.addOnName };
			});
			setColourOptions(temp);
		} catch (err) {
			// console.log("err", err);
		}
	};
	const handleChange = (selectedOption) => {
		setSelectedOption({ selectedOption });
		console.log(`Option selected:`, selectedOption);
	};
	let content;
	if (!isLoading && data)
		content = (
			<div className='row'>
				<div className='col-4 col-lg-3 col-md-3 updateVendorFormTitle'>
					Item Details
				</div>
				<div className='col-12 customerDetailFormMainDiv d-lg-flex d-md-flex'>
					<form className='col-12 col-md-6 col-lg-6 updateVendorForm'>
						<div className='row'>
							<div class='form-group col-12 col-md-6 col-lg-6'>
								<label for='exampleInputEmail1'>Item Name</label>
								<input
									type='text'
									class='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='Enter Item Name'
									onChange={handleChangecategoryName}
									value={categoryName}
								/>
								{categoryNameError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{categoryNameError}
									</div>
								) : null}
							</div>
							<div class='form-group col-12 col-md-6 col-lg-6'>
								<label for='exampleFormControlSelect1'>Select Restaurant</label>
								<select
									class='form-control'
									id='exampleFormControlSelect1'
									onChange={handleSelectRestaurant}
									value={restaurant}>
									<option>Select a Restaurant</option>
									{data.map(
										(i) => (
											<option value={i._id}>{i.name}</option>
										)
										// console.log(restaurantName)
									)}
								</select>
							</div>
						</div>
						<div className='row'>
							<div class='form-group col-12 col-md-6 col-lg-6'>
								<label for='exampleFormControlSelect1'>Select Category</label>
								<select
									class='form-control'
									id='exampleFormControlSelect1'
									onChange={handleSelectCategory}
									value={category}>
									<option>Select a Category</option>
									{dataAddCat &&
										dataAddCat.categories &&
										dataAddCat.categories.map(
											(i) => <option value={i._id}>{i.categoryName}</option>
											// console.log(restaurantName)
										)}
								</select>
							</div>
							<div class='form-group col-12 col-md-6 col-lg-6'>
								<label for='exampleInputEmail1'>Description</label>
								<input
									type='text'
									class='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='Enter Item Name'
									onChange={handleChangeItemDescription}
									value={itemDescription}
								/>
							</div>
						</div>
						<div className='row'>
							{/* <div class="form-group col-6">
                <div
                  style={{ boxShadow: "0px 0px 5px 2px #ccc" }}
                  className="col"
                >
                  <ImageUpload />
                </div>
              </div> */}
							<div class='form-group col-12'>
								<label for='exampleInputEmail1'>Select Add Ons</label>
								{/* <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Item Name"
                  onChange={handleChangeItemDescription}
                  value={itemDescription}
                /> */}
								<Select
									closeMenuOnSelect={false}
									components={animatedComponents}
									//   defaultValue={[colourOptions[4], colourOptions[5]]}
									isMulti
									options={colourOptions}
									onChange={(e) => setAddOnList(e)}
								/>
							</div>
						</div>
						<div className='row'>
							<div class='form-group col-12 col-md-6 col-lg-6'>
								<label for='exampleInputEmail1'>Priority</label>
								<input
									type='text'
									class='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='Priority'
									onChange={handleChangeItemPriority}
									value={itemPriority}
								/>
								{itemPriorityError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{itemPriorityError}
									</div>
								) : null}
							</div>
							{!priceoOnSelect && (
								<div class='form-group col-12 col-md-6 col-lg-6'>
									<label for='exampleInputPrice'>Price</label>
									<input
										type='text'
										class='form-control'
										id='exampleInputPrice'
										aria-describedby='emailHelp'
										placeholder='Price'
										onChange={handleChangeItemPrice}
										value={price}
									/>
									{/* {itemPriorityError ? (
								<div
									style={{
										textAlign: "center",
										color: "red",
										fontWeight: "bold",
									}}>
									{itemPriorityError}
								</div>
							) : null} */}
								</div>
							)}
						</div>
						<div class='custom-control custom-switch'>
							<input
								type='checkbox'
								class='custom-control-input'
								id='customSwitch1'
								onChange={handleChangeItemStatus}
								checked={itemStatus}
							/>
							<label class='custom-control-label' for='customSwitch1'>
								Status
							</label>
						</div>
						<div class='custom-control custom-switch'>
							<input
								type='checkbox'
								class='custom-control-input'
								id='customSwitch2'
								onChange={handleChangePriceSelectStatus}
								checked={priceoOnSelect}
							/>
							<label class='custom-control-label' for='customSwitch2'>
								Price on Select of Add Ons
							</label>
						</div>
						<button
							type='submit'
							class='btn btn-primary mt-3'
							onClick={handleSubmit}>
							Add Item
						</button>
					</form>
					<div className='col-12 col-md-6 col-lg-6 updateVendorForm'>
						{" "}
						<table class='table table-hover'>
							<thead style={{ backgroundColor: "gray", color: "#fff" }}>
								<tr>
									<th className='orderTableTH'>Item</th>
									<th className='orderTableTH'>Price</th>
									<th className='orderTableTH'>Action</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item) => {
									return (
										<tr>
											<td className='orderTableTD'>{item.name}</td>
											<td className='orderTableTD'>
												{item.status ? "Active" : "Not Active"}
											</td>
											<div className='d-flex align-items-center justify-content-center'>
												<i
													style={{ cursor: "pointer" }}
													class='far fa-edit mr-3 editButtonIcon'></i>
												<label className='noMargin deleteOrderStatusButton'>
													Delete
												</label>
											</div>
										</tr>
									);
								})}
								{/* );
                })} */}
							</tbody>
						</table>
					</div>{" "}
				</div>
			</div>
		);
	else content = <p>Loading...</p>;

	return content;
};

const StyledSelect = styled(Select)`
	${({ dropdownRenderer }) =>
		dropdownRenderer &&
		`
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;

const SearchAndToggle = styled.div`
	display: flex;
	flex-direction: column;

	input {
		margin: 10px 10px 0;
		line-height: 30px;
		padding: 0 20px;
		border: 1px solid #ccc;
		border-radius: 3px;
		:focus {
			outline: none;
			border: 1px solid ${({ color }) => color};
		}
	}
`;

const Items = styled.div`
	overflow: auto;
	min-height: 10px;
	max-height: 200px;
`;

const Item = styled.div`
	display: flex;
	margin: 10px;
	align-items: baseline;
	cursor: pointer;
	border-bottom: 1px dotted transparent;

	:hover {
		border-bottom: 1px dotted #ccc;
	}

	${({ disabled }) =>
		disabled
			? `
  	opacity: 0.5;
  	pointer-events: none;
  	cursor: not-allowed;
  `
			: ""}
`;

const ItemLabel = styled.div`
	margin: 5px 10px;
`;

const Buttons = styled.div`
	display: flex;
	justify-content: space-between;

	& div {
		margin: 10px 0 0 10px;
		font-weight: 600;
	}
`;

const Button = styled.button`
	background: none;
	border: 1px solid #555;
	color: #555;
	border-radius: 3px;
	margin: 10px 10px 0;
	padding: 3px 5px;
	font-size: 10px;
	text-transform: uppercase;
	cursor: pointer;
	outline: none;

	&.clear {
		color: tomato;
		border: 1px solid tomato;
	}

	:hover {
		border: 1px solid deepskyblue;
		color: deepskyblue;
	}
`;

const StyledHtmlSelect = styled.select`
	padding: 0;
	margin: 0 0 0 10px;
	height: 23px !important;
	color: #0071dc;
	background: #fff;
	border: 1px solid #0071dc;
`;

const StyledInput = styled.input`
	margin: 0 0 0 10px;
	height: 23px !important;
	color: #0071dcimport { useAuth } from './../../shared/hooks/auth-hooks';
;import { useHttpClient } from './../../shared/hooks/http-hook';

	background: #fff;
	border: 1px solid #0071dc;
	border-radius: 3px;
	padding: 13px 10px;
	width: 70px;
`;
