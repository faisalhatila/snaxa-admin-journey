import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import Colors from "../../UI/constants/Colors";
const AddAddonCategoryForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
  const [editing, setEditing] = useState(false);
  const [addOnId, setAddOnId] = useState();
  useEffect(() => {
    const dashboard = async () => {
      selectRestaurant(props.restaurantId);
      setRestaurantID(props.restaurantId);
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
            restaurant: props.restaurantId,
          })
        );
        console.log("responseData", responseData.addOns);
        const temp = responseData.addOns.map((i, index) => {
          return { index, value: i._id, label: i.addOnName };
        });
        console.log("Temp", temp);
        setCateogryData(temp);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  const handleChangeAddonItemName = (e) => {
    setaddOnItemName(e.target.value);
  };
  const handleChangeAddonPrice = (e) => {
    setAddonPrice(e.target.value);
  };
  const handleAddAddonItemName = async () => {
    let urlToAddAndEdit = "/add-addons-items";
    if (editing) urlToAddAndEdit = "/edit-addon-item";
    if (true) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}${urlToAddAndEdit}`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            addOn: categoryID,
            name: addOnItemName,
            price: addonPrice ? addonPrice : "",
            addOnId,
          })
        );
        console.log("responseData", responseData);
        cancelEditing();
      } catch (err) {}
      setAddonPrice("");
      setaddOnItemName("");
      setaddOnItemNameError(false);
      handleCategorySelect(cateogryData[category]);
    }
  };
  const handleEditViewAddonItem = async (id) => {
    console.log("categoryID", categoryID);
    setAddOnId(id);
    setEditing(true);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/edit-view-addon-item`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          addOn: categoryID,
          addOnItem: id,
        })
      );
      console.log("responseData", responseData);
      setAddonPrice(responseData.editingAddOn.price);
      setaddOnItemName(responseData.editingAddOn.name);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleDeleteAddonItemName = async (itemIndex) => {
    cancelEditing();
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
    } catch (err) {}
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
    } catch (err) {}
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
      console.log("responseData", responseData);
      setAddOnData(responseData.existingAddOn.items);
    } catch (err) {}
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
        const temp = responseData.allRestaurants.map((i, index) => {
          return { index, value: i.restaurant, label: i.name };
        });
        setColourOptions(temp);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);

  const cancelEditing = () => {
    setEditing(false);
    setAddonPrice(0);
    setaddOnItemName("");
  };

  let content;
  if (!isLoading)
    content = (
      <div className="row">
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div className="row">
                <div class="form-group col">
                  <label for="exampleInputEmail1">Select Addon Category</label>
                  <Select
                    defaultValue={cateogryData && cateogryData[category]}
                    options={cateogryData}
                    formatGroupLabel={formatGroupLabel}
                    onChange={handleCategorySelect}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Price</label>
                <input
                  type="number"
                  class="form-control mr-4"
                  placeholder="Enter Addon Price"
                  onChange={handleChangeAddonPrice}
                  value={addonPrice}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Add On Item</label>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    class="form-control mr-4"
                    placeholder="Enter Addon Item Name"
                    onChange={handleChangeAddonItemName}
                    value={addOnItemName}
                  />
                  <label
                    className="addOrderStatusButton"
                    onClick={handleAddAddonItemName}
                  >
                    {editing ? "Edit" : "Add"}
                  </label>
                  {editing && (
                    <label
                      className="addOrderStatusButton ml-3"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </label>
                  )}
                </div>
                {addOnItemNameError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {addOnItemNameError}
                  </div>
                ) : null}
              </div>
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>Addon Items</strong>
                </label>

                <table class="table table-hover">
                  <thead
                    style={{ backgroundColor: Colors.tableHead, color: "#fff" }}
                  >
                    <tr>
                      <th className="orderTableTH">Addon Category</th>
                      <th className="orderTableTH">Addon Item Name</th>
                      <th className="orderTableTH">Addon Price</th>
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addOnData.map((item) => {
                      return (
                        <tr>
                          <td className="orderTableTD">
                            {cateogryData[category].label}
                          </td>
                          <td className="orderTableTD">{item.name}</td>
                          <td className="orderTableTD">{item.price}</td>
                          <td className="orderTableTD">
                            <div className="d-flex align-items-center justify-content-center">
                              <i
                                style={{ cursor: "pointer" }}
                                class="far fa-edit mr-3 editButtonIcon"
                                onClick={() =>
                                  handleEditViewAddonItem(item._id)
                                }
                              ></i>
                              <label
                                className="noMargin deleteOrderStatusButton"
                                onClick={() =>
                                  handleDeleteAddonItemName(item._id)
                                }
                              >
                                Delete
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
export default AddAddonCategoryForm;
