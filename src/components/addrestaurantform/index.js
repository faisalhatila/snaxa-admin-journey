import { ImageUpload } from "..";
import React, { Component, useState } from "react";
let itemIndex = 0;

let AddRestaurantForm;
export default AddRestaurantForm = (props) => {
	console.log("id", props.restaurantId);
	const [categoryName, setCategoryName] = useState("");
	const [itemDescription, setItemDescription] = useState("");
	const [itemPriority, setItemPriority] = useState("");
	const [itemStatus, setItemStatus] = useState(false);
	const [categoryNameError, setCategoryNameError] = useState("");
	const [itemDescriptionError, setItemDescriptionError] = useState("");
	const [itemPriorityError, setItemPriorityError] = useState("");
	const [data, setData] = useState([]);
	const [workingDays, setWorkingDays] = useState([
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	]);
	const [cuisineName, setCuisineName] = useState("");
	const [cuisines, setCuisines] = useState([]);
	const [currentStep, setCurrentStep] = useState(1);

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

	let validate = () => {
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
	const handleSubmit = (event) => {
		event.preventDefault();
		const isValid = validate();
		if (isValid) {
		}
	};
	const handleAddCuisine = () => {
		const itemObj = {
			itemIndex: itemIndex,
			cuisineName: cuisineName,
			//   price: state.number,
			//   description: state.desc,
			isDisable: true,
		};
		itemIndex++;
		cuisines.push(itemObj);
		setCuisines(cuisines);
		setCuisineName("");
	};
	const handleDeleteCuisine = (itemIndex) => {
		// console.log(props);
		// alert("hi");
		cuisines = cuisines.filter((item) => {
			return item.itemIndex !== itemIndex;
		});
		setCuisines(cuisines);
		console.log(cuisines);
	};
	const handleNext = () => {
		setCurrentStep(2);
	};
	return (
		<div className='row'>
			<div className='col-8 col-lg-3 col-md-3 updateVendorFormTitle'>
				Restaurant Details
			</div>
			<div className='col-12 customerDetailFormMainDiv d-lg-flex d-md-flex'>
				<form className='col-12 updateVendorForm'>
					<div className={`row ${currentStep === 2 ? "d-none" : null}`}>
						<div className='col-12 col-md-6 col-lg-6'>
							<div class='form-group'>
								<label for='exampleInputEmail1'>Restaurant Name</label>
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
							<div class='form-group'>
								<label for='exampleFormControlTextarea1'>
									Short Description
								</label>
								<textarea
									class='form-control'
									id='exampleFormControlTextarea1'
									rows='3'
									placeholder='Enter Item Description'
									value={itemDescription}
									onChange={handleChangeItemDescription}></textarea>
								{itemDescriptionError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{itemDescriptionError}
									</div>
								) : null}
							</div>
							<div className='row'>
								<div class='form-group col-6'>
									<label for='exampleInputEmail1'>Min Delivery Order</label>
									<input
										type='number'
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
								<div class='form-group col-6'>
									<label for='exampleInputEmail1'>Delivery Charges</label>
									<input
										type='number'
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
							</div>
							<div class='form-group row col align-items-center'>
								<label
									className='mr-4'
									for='exampleInputEmail1'
									style={{ marginBottom: 0 }}>
									Pre Order
								</label>
								<input type='checkbox' />
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
							<div class='custom-control custom-switch'>
								<input
									type='checkbox'
									class='custom-control-input'
									id='customSwitch1'
									onChange={handleChangeItemStatus}
									checked={itemStatus}
								/>
								<label class='custom-control-label' for='customSwitch1'>
									Active Status
								</label>
							</div>
						</div>
						<div
							className='col-12 col-md-6 col-lg-6'
							style={{ overflowX: "auto" }}>
							<table class='table table-hover'>
								<thead>
									<tr>
										<th></th>
										<th>Days</th>
										<th>From</th>
										<th>To</th>
									</tr>
								</thead>
								<tbody>
									{workingDays.map((days, index) => {
										return (
											<tr key={index}>
												<th scope='row'>
													<input type='checkbox' />
												</th>
												<td>{days}</td>
												<td>
													<input type='time' id='appt' name='appt' />
												</td>
												<td>
													<input type='time' id='appt' name='appt' />
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
					<div className={`${currentStep === 1 ? "d-none" : null}`}>
						<div className='addCuisineForm'>
							<h3>Add Cuisine</h3>
							<div class='form-group'>
								<label for='exampleInputEmail1'>Cousine Name</label>
								<input
									type='text'
									class='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='Enter Cuisine Name'
									onChange={(e) => setCuisineName(e.target.value)}
									value={cuisineName}
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
							<div>
								<ul>
									{cuisines.map((item, index) => {
										return (
											<div className='row mb-3' key={index}>
												<li>{item.cuisineName}</li>
												<label
													style={{ margin: 0 }}
													className='deleteCuisine ml-4'
													onClick={() => handleDeleteCuisine(item.itemIndex)}>
													Delete
												</label>
											</div>
										);
									})}
								</ul>
							</div>
							<button
								type='button'
								class='btn btn-primary mt-3'
								onClick={handleAddCuisine}>
								Add Cuisine
							</button>
						</div>
					</div>
					{/* <div
              class="form-group"
              style={{ boxShadow: "0px 0px 5px 2px #ccc" }}
            >
              <ImageUpload />{" "}
            </div> */}
					{/* <div class="form-group">
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
            </div> */}
					{currentStep === 1 ? (
						<button
							type='button'
							class='btn btn-primary mt-3'
							onClick={handleNext}>
							Next
						</button>
					) : null}
					{currentStep === 2 ? (
						<button
							type='submit'
							class='btn btn-primary mt-3'
							onClick={handleSubmit}>
							Submit
						</button>
					) : null}
				</form>
			</div>
		</div>
	);
};
