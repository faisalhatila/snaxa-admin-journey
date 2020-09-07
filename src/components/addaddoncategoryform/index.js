import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import Select from "react-select";
import Colors from "../../UI/constants/Colors";
const AddAddonCategoryForm = (props) => {
  const [addOnIsRequired, setAddOnIsRequired] = useState(false);
  const [addOnIsMultipleSelect, setAddOnIsMultipleSelect] = useState(false);
  const [addOnMinQuantity, setAddOnMinQuantity] = useState(1);
  const [addOnMaxQuantity, setAddOnMaxQuantity] = useState(null);
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [restaurant, selectRestaurant] = useState();
  const [restaurantID, setRestaurantID] = useState();
  const [data, setData] = useState([]);
  const [addOnData, setAddOnData] = useState([]);
  const [colourOptions, setColourOptions] = useState([]);
  const [addOnCategoryName, setaddOnCategoryName] = useState("");
  const [editing, setEditing] = useState(false);
  const [addOnId, setAddOnId] = useState();
  useEffect(() => {
    const dashboard = async () => {
      cancelEditing();
      selectRestaurant(props.restaurantId);
      setRestaurantID(props.restaurantId);
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
        setAddOnData(responseData.addOns);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  const handleChangeAddonCategoryName = (e) => {
    setaddOnCategoryName(e.target.value);
  };
  const handleAddAddonCategoryName = async () => {
    let urlToAddAndEdit = "/add-addon-category";
    if (editing) urlToAddAndEdit = "/edit-addon-category";
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
            restaurantId: restaurantID,
            addOnName: addOnCategoryName,
            requiredStatus: addOnIsRequired,
            multiSelection: addOnIsMultipleSelect,
            howMany: addOnIsMultipleSelect ? addOnMinQuantity : 1,
            howManyMaximum: addOnIsMultipleSelect ? addOnMaxQuantity : null,
            addOnId,
          })
        );
        console.log("responseData", responseData);
        handleRestaurantSelect(colourOptions[restaurant]);
        setaddOnCategoryName("");
        setAddOnMinQuantity(1);
        setAddOnMaxQuantity(null);
        cancelEditing();
        setAddOnData(responseData.addOns);
      } catch (err) {}
    }
  };
  const handleDeleteAddonCategoryName = async (itemIndex) => {
    cancelEditing();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-addon-category`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          addOn: itemIndex,
          restaurantId: props.restaurantId,
        })
      );
      handleRestaurantSelect(colourOptions[restaurant]);
      setAddOnData(responseData.addOns);
    } catch (err) {}
  };

  const cancelEditing = () => {
    setEditing(false);
    setaddOnCategoryName("");
    setAddOnMinQuantity(1);
    setAddOnIsRequired(false);
    setAddOnMaxQuantity(null);
    setAddOnIsMultipleSelect(false);
  };

  const handleEditViewCategory = async (id) => {
    setAddOnId(id);
    setEditing(true);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/edit-view-addon-category`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          addOn: id,
        })
      );
      setaddOnCategoryName(responseData.existingAddOn.addOnName);
      setAddOnMinQuantity(responseData.existingAddOn.howMany);
      setAddOnIsRequired(responseData.existingAddOn.requiredStatus);
      setAddOnMaxQuantity(
        responseData.existingAddOn.howManyMaximum
          ? responseData.existingAddOn.howManyMaximum
          : null
      );
      setAddOnIsMultipleSelect(responseData.existingAddOn.multiSelection);
    } catch (err) {}
  };
  console.log(addOnIsMultipleSelect);

  const handleAddOnMinQuantityChange = (event) => {
    setAddOnMinQuantity(event.target.value);
  };
  const handleAddOnMaxQuantityChange = (event) => {
    setAddOnMaxQuantity(event.target.value);
  };

  const handleRestaurantSelect = async (e) => {
    cancelEditing();
    setRestaurantID(props.restaurantId);
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
      setAddOnData(responseData.addOns);
    } catch (err) {}
  };

  console.log(addOnIsMultipleSelect);
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

  let content;
  if (!isLoading && data)
    content = (
      <div className="row">
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div className="form-group">
                <label for="exampleInputEmail1">Add On Category</label>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control mr-4"
                    placeholder="Enter Addon Category Name"
                    onChange={handleChangeAddonCategoryName}
                    value={addOnCategoryName}
                  />
                  <label
                    className="addOrderStatusButton"
                    onClick={handleAddAddonCategoryName}
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
                <div className="form-group">
                  <label>Required</label>
                  <div className="d-flex">
                    <div className="form-check mr-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="yesRequired"
                        checked={addOnIsRequired}
                        onChange={(e) => setAddOnIsRequired(true)}
                      />
                      <label className="form-check-label" for="yesRequired">
                        Yes
                      </label>
                    </div>
                    <div className="form-check mr-3">
                      <input
                        className="form-check-input"
                        checked={!addOnIsRequired}
                        type="radio"
                        name="exampleRadios"
                        id="notRequired"
                        onChange={(e) => setAddOnIsRequired(false)}
                      />
                      <label className="form-check-label" for="notRequired">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="form-group mr-5">
                    <label for="exampleInputEmail1">Is Multiple Select</label>
                    <div className="d-flex">
                      <div className="form-check mr-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="addOnIsMultipleSelect"
                          checked={addOnIsMultipleSelect}
                          onChange={(e) => setAddOnIsMultipleSelect(true)}
                          id="yesMultipleSelect"
                        />
                        <label
                          className="form-check-label"
                          for="yesMultipleSelect"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check mr-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          // value={false}
                          checked={!addOnIsMultipleSelect}
                          name="addOnIsMultipleSelect"
                          onChange={(e) => setAddOnIsMultipleSelect(false)}
                          id="noMultipleSelect"
                        />
                        <label
                          className="form-check-label"
                          for="noMultipleSelect"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  {addOnIsMultipleSelect === true ? (
                    <div className="form-group mr-3">
                      <label for="exampleInputEmail1">Min Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={handleAddOnMinQuantityChange}
                        value={addOnMinQuantity}
                        style={{ maxWidth: "70px" }}
                      />
                    </div>
                  ) : null}
                  {addOnIsMultipleSelect === true ? (
                    <div className="form-group">
                      <label for="exampleInputEmail1">Max Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={handleAddOnMaxQuantityChange}
                        value={addOnMaxQuantity}
                        style={{ maxWidth: "70px" }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div className="form-group">
                <label for="exampleInputEmail1">
                  <strong>Addon Categories</strong>
                </label>

                <table className="table table-hover">
                  <thead
                    style={{ backgroundColor: Colors.tableHead, color: "#fff" }}
                  >
                    <tr>
                      <th className="orderTableTH">Addon Category Name</th>
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addOnData.map((item) => {
                      return (
                        <tr>
                          <td className="orderTableTD">{item.addOnName}</td>
                          <td className="orderTableTD">
                            <div className="d-flex align-items-center justify-content-center">
                              <i
                                style={{ cursor: "pointer" }}
                                className="far fa-edit mr-3 editButtonIcon"
                                onClick={() => handleEditViewCategory(item._id)}
                              ></i>
                              <label
                                className="noMargin deleteOrderStatusButton"
                                onClick={() =>
                                  handleDeleteAddonCategoryName(item._id)
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
