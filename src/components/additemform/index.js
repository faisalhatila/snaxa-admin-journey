import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const AddItemForm = (props) => {
  const [categoryName, setCategoryName] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [itemPriority, setItemPriority] = useState();
  const [price, setPrice] = useState(0);
  const [itemStatus, setItemStatus] = useState(true);
  const [restaurant, setRestaurant] = useState();
  const [category, setCategory] = useState();
  const [addOnList, setAddOnList] = useState([]);
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [dataAddCat, setDataAddCat] = useState([]);
  const [colourOptions, setColourOptions] = useState([]);
  const [colourOptions2, setColourOptions2] = useState([]);
  const [priceoOnSelect, setPriceoOnSelect] = useState(false);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const [foodItemId, setFoodItemId] = useState(false);
  const [cateogryData, setCateogryData] = useState([]);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    const dashboard = async () => {
      setCategory();
      handleCancelEdit();
      setEditing(false);
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
            restaurantId: props.restaurantId,
          })
        );
        console.log("responseData", responseData);
        setDataAddCat(responseData);
        const temp = responseData.addons.map((i, index) => {
          return { index, value: i._id, label: i.addOnName };
        });
        setColourOptions2(temp);
      } catch (err) {
        console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
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
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  const handleChangecategoryName = (event) => {
    setCategoryName(event.target.value);
  };
  const handleChangeItemDescription = (event) => {
    setItemDescription(event.target.value);
  };
  const handleChangeItemPriority = (event) => {
    setItemPriority(event.target.value);
  };
  const handleChangeItemStatus = (event) => {
    setItemStatus(event.target.checked);
  };
  const handleChangeItemPrice = (event) => {
    setPrice(event.target.value);
  };
  const validate = () => {
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    let urltoEditandAdd = "/add-item";
    if (editing) urltoEditandAdd = "/edit-item";
    if (isValid) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}${urltoEditandAdd}`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            restaurantId: props.restaurantId,
            foodCategory: category,
            name: categoryName,
            description: itemDescription,
            priority: itemPriority,
            price: priceoOnSelect ? 0 : price,
            priceOnSelection: priceoOnSelect,
            addOnList:
              addOnList.length > 0 ? addOnList.map((i) => i.value) : undefined,
            foodItemId,
            status: itemStatus,
          })
        );
        console.log("responseData", responseData);
        setItems(responseData.existingItems);
        setCategoryName("");
        setItemPriority("");
        setItemDescription("");
        setItemStatus(true);
        setPrice(0);
        setPriceoOnSelect(false);
        setEditing(false);
      } catch (err) {}
    }
  };

  const handleChangePriceSelectStatus = async (event) => {
    setPriceoOnSelect(event.target.checked);
  };

  const handleSelectCategory = async (event) => {
    setCategory(event.target.value);
    handleCancelEdit();
    setEditing(false);
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
    } catch (err) {}
  };

  const handleEditView = async (id) => {
    setEditing(true);
    setFoodItemId(id);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/view-edit-item`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          foodItemId: id,
        })
      );
      console.log("responseData", responseData);
      setItemPriority(responseData.foodItem.priority);
      setCategoryName(responseData.foodItem.foodList.name);
      setPrice(responseData.foodItem.foodList.price);
      setItemDescription(responseData.foodItem.foodList.description);
      setItemStatus(responseData.foodItem.status);
      setPriceoOnSelect(responseData.foodItem.priceOnSelection);
      console.log(colourOptions);
      let temp = [];
      if (responseData.foodItem.addOnList)
        temp = responseData.foodItem.addOnList.map((i) =>
          colourOptions.filter((j) => j.value === i)
        );
      console.log(temp);
      setAddOnList(temp);
    } catch (err) {}
  };
  const handleDeleteItem = async (id) => {
    console.log(id);
    setEditing(false);
    handleCancelEdit();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-item`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          foodItemId: id,
          foodCategory: category,
        })
      );
      console.log("responseData", responseData);
      setItems(responseData.existingItems);
    } catch (err) {}
  };

  const handleCancelEdit = () => {
    setCategoryName("");
    setItemDescription("");
    setPriceoOnSelect(false);
    setItemPriority("");
    setItemStatus(true);
    setEditing(false);
    setPrice(0);
  };
  let content;
  if (!isLoading && data)
    content = (
      <div className="row">
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
            <div className="row">
              <div class="form-group col-12">
                <label for="exampleInputEmail1">Item Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Item Name"
                  onChange={handleChangecategoryName}
                  value={categoryName}
                />
              </div>
            </div>
            <div className="row">
              <div class="form-group col-12 col-md-6 col-lg-6">
                <label for="exampleFormControlSelect1">Select Category</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  onChange={handleSelectCategory}
                  value={category}
                >
                  <option disabled selected>
                    Select a Category
                  </option>
                  {dataAddCat &&
                    dataAddCat.categories &&
                    dataAddCat.categories.map((i) => (
                      <option value={i._id}>{i.categoryName}</option>
                    ))}
                </select>
              </div>
              <div class="form-group col-12 col-md-6 col-lg-6">
                <label for="exampleInputEmail1">Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Item Name"
                  onChange={handleChangeItemDescription}
                  value={itemDescription}
                />
              </div>
            </div>
            <div className="row">
              <div class="form-group col-12">
                <label for="exampleInputEmail1">Select Add Ons</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={colourOptions2}
                  onChange={(e) => setAddOnList(e)}
                />
              </div>
            </div>
            <div className="row">
              <div class="form-group col-12">
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
              </div>
            </div>
            <div className="row">
              {!priceoOnSelect && (
                <div class="form-group col-12 col-md-6 col-lg-6">
                  <label for="exampleInputPrice">Price</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPrice"
                    aria-describedby="emailHelp"
                    placeholder="Price"
                    onChange={handleChangeItemPrice}
                    value={price}
                  />
                </div>
              )}
              {!priceoOnSelect && (
                <div class="form-group col-12 col-md-6 col-lg-6">
                  <label for="exampleInputPrice">Discount Price</label>
                  <input type="text" class="form-control" placeholder="Price" />
                </div>
              )}
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
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customSwitch2"
                onChange={handleChangePriceSelectStatus}
                checked={priceoOnSelect}
              />
              <label class="custom-control-label" for="customSwitch2">
                Price on Select of Add Ons
              </label>
            </div>
            <button
              type="submit"
              class="btn btn-primary mt-3"
              onClick={handleSubmit}
              style={{ backgroundColor: "#b40008", border: "none" }}
            >
              {editing ? "Edit Item" : "Add Item"}
            </button>
            {editing && (
              <button
                type="submit"
                class="btn btn-primary mt-3"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
          <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
            {" "}
            <table class="table table-hover">
              <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                <tr>
                  <th className="orderTableTH">Item</th>
                  <th className="orderTableTH">Price</th>
                  <th className="orderTableTH">Status</th>
                  <th className="orderTableTH">Priority</th>
                  <th className="orderTableTH">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  return (
                    <tr>
                      <td className="orderTableTD">{item.name}</td>
                      <td className="orderTableTD">{item.price}</td>
                      <td className="orderTableTD">
                        {item.status ? "Active" : "Not Active"}
                      </td>
                      <td className="orderTableTD">{item.priority}</td>
                      <div className="d-flex align-items-center justify-content-center">
                        <i
                          onClick={() => handleEditView(item._id)}
                          style={{ cursor: "pointer" }}
                          class="far fa-edit mr-3 editButtonIcon"
                        ></i>
                        <label
                          onClick={() => handleDeleteItem(item._id)}
                          className="noMargin deleteOrderStatusButton"
                        >
                          Delete
                        </label>
                      </div>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>{" "}
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
export default AddItemForm;
