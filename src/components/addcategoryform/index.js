import { ImageUpload } from "..";
import React, { Component, useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { Select } from "react-dropdown-select";

let AddCategoryForm;
export default AddCategoryForm = (props) => {
	const [categoryName, setCategoryName] = useState("");
	const [restaurant, setRestaurant] = useState("");
	const [itemDescription, setItemDescription] = useState("");
	const [itemPriority, setItemPriority] = useState("");
	const [itemStatus, setItemStatus] = useState(true);
	const [categoryNameError, setIategoryNameError] = useState("");
	const [itemDescriptionError, setItemDescriptionError] = useState("");
	const [itemPriorityError, setItemPriorityError] = useState("");
	const [categories, setCategories] = useState([]);

	const { userId, token } = useAuth();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [data, setData] = useState([]);

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

	const handleChangecategoryName = (event) => {
		setCategoryName(event.target.value);
		// categoryNameError: "",
	};
	const handleChangeItemDescription = (event) => {
		// setState({
		// itemDescription: event.target.value,
		// itemDescriptionError: "",
		// });
	};
	const handleChangeItemPriority = (event) => {
		setItemPriority(event.target.value);
		// itemPriorityError: "",
	};
	const handleChangeItemStatus = (event) => {
		setItemStatus(event.target.checked);
	};
	const validate = () => {
		// const { categoryName, itemDescription, itemPriority } = state;
		// let {
		//   categoryNameError,
		//   itemDescriptionError,
		//   itemPriorityError,
		// } = state;
		// if (!categoryName) {
		//   categoryNameError = "Please Enter Category Name";
		// } else {
		//   categoryNameError = "";
		// }
		// if (!itemDescription) {
		//   itemDescriptionError = "Please Enter Item Name";
		// } else {
		//   itemDescriptionError = "";
		// }
		// if (!itemPriority) {
		//   itemPriorityError = "Please Enter Item Name";
		// } else {
		//   itemPriorityError = "";
		// }
		// if (categoryNameError || itemPriorityError || itemDescriptionError) {
		//   setState({
		//     categoryNameError,
		//     itemPriorityError,
		//     itemDescriptionError,
		//   });
		//   return false;
		// }
		return true;
	};
	const handleSelectRestaurant = async (event) => {
		setRestaurant(event.target.value);
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/get-categories`,
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
      setCategories(responseData.existingCategories)
		} catch (err) {
			// console.log("err", err);
		}
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const isValid = validate();
		if (isValid) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/add-category`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
						categoryName: categoryName,
						priority: itemPriority,
						restaurantId: restaurant,
						status: itemStatus,
					})
				);
				console.log("responseData", responseData);
				setCategoryName("");
				setRestaurant(1);
				setItemPriority("");
				setItemStatus(true);
			} catch (err) {
				// console.log("err", err);
			}
		}
	};
	let content;
	if (!isLoading && data.length > 0)
		content = (
			<div className='row'>
				<div className='col-4 col-lg-3 col-md-3 updateVendorFormTitle'>
					Category Details
				</div>
				<div className='col-12 customerDetailFormMainDiv d-lg-flex d-md-flex'>
					<form className='col-12 col-md-6 col-lg-6 updateVendorForm'>
						<div className='row'>
							<div class='form-group col-12 col-md-6 col-lg-6'>
								<label for='exampleInputEmail1'>Category Name</label>
								<input
									type='text'
									class='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='Enter Category Name'
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
                  value={restaurant}
									onChange={handleSelectRestaurant}>
									<option>Select a Restaurant</option>
									{data.map((i) => (
										<option value={i._id}>{i.name}</option>
									))}
								</select>
							</div>
						</div>
						<div class='form-group'>
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
						<button
							type='submit'
							class='btn btn-primary mt-3'
							onClick={handleSubmit}>
							Add Item
						</button>
					</form>
					{/* <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
            <div className="row">
              <div class="form-group col-12 col-md-6 col-lg-6">
                <label for="exampleInputEmail1">Category Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Category Name"
                  onChange={handleChangecategoryName}
                  value={categoryName}
                />
                {categoryNameError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {categoryNameError}
                  </div>
                ) : null}
              </div>
              <div class="form-group col-12 col-md-6 col-lg-6">
                <label for="exampleFormControlSelect1">Select Restaurant</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  onChange={handleSelectRestaurant}
                >
                  <option>Select a Restaurant</option>
                  {data.map((i) => (
                    <option value={i._id}>{i.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Priority</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Priority"
                onChange={handleChangeItemPriority}
                value={itemPriority}
              />
              {itemPriorityError ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {itemPriorityError}
                </div>
              ) : null}
            </div>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customSwitch1"
                onChange={handleChangeItemStatus}
                checked={itemStatus}
              />
              <label class="custom-control-label" for="customSwitch1">
                Status
              </label>
            </div>
            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              Add Item
            </button>
          </form> */}
					<div className='col-12 col-md-6 col-lg-6 updateVendorForm'>
						{" "}
						<table class='table table-hover'>
							<thead style={{ backgroundColor: "gray", color: "#fff" }}>
								<tr>
									<th className='orderTableTH'>Category</th>
									<th className='orderTableTH'>Status</th>
									<th className='orderTableTH'>Action</th>
								</tr>
							</thead>
							<tbody>
								{categories.map((item) => {
									return (
										<tr>
											<td className='orderTableTD'>{item.categoryName}</td>
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
