import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import useForm from "./useform";
import validate from "./validate";
const AddCuisineForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [cuisineName, setcuisineName] = useState("");
  const [cuisineNameError, setCuisineNameError] = useState("");
  const handleChangeCuisineName = (e) => {
    setcuisineName(e.target.value);
  };
  const handleAddCuisineName = async (e) => {
    e.preventDefault();
    handleSubmit();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/add-cuisine`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          cuisine: cuisineName,
        })
      );
      console.log("responseData", responseData);
      setData(responseData.cuisines);
    } catch (err) {}
    setcuisineName("");
    setCuisineNameError(false);
  };
  const handleDeletecuisineName = async (itemIndex) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-cuisine`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          cuisine: itemIndex,
        })
      );
      setData(responseData.cuisines);
    } catch (err) {}
  };
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-cuisine`,
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
        setData(responseData.cuisines);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate
  );
  function submit() {
    console.log("success");
  }

  let content;
  if (!isLoading)
    content = (
      <div className="row">
        <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Cuisine Status
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">Cuisine Name</label>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    name="cuisinename"
                    class="form-control mr-4"
                    placeholder="Enter Cuisine Name"
                    onChange={handleChange}
                    value={values.cuisineName}
                  />
                  <button
                    type="submit"
                    className="addOrderStatusButton"
                    onClick={handleAddCuisineName}
                  >
                    Add
                  </button>
                </div>
                {errors.cuisineNameError ? (
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {errors.cuisineNameError}
                  </div>
                ) : null}
              </div>
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>Cuisines</strong>
                </label>
                <table class="table table-hover">
                  <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                    <tr>
                      <th className="orderTableTH">Cuisine Name</th>
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr>
                          <td className="orderTableTD">{item.cuisine}</td>
                          <div className="d-flex align-items-center justify-content-center">
                            <i
                              style={{ cursor: "pointer" }}
                              class="far fa-edit mr-3 editButtonIcon"
                            ></i>
                            <label
                              className="noMargin deleteOrderStatusButton"
                              onClick={() => handleDeletecuisineName(item._id)}
                            >
                              Delete
                            </label>
                          </div>
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
export default AddCuisineForm;
