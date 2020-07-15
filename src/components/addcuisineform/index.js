import { ImageUpload } from "..";
import React, { Component, useState, useEffect } from "react";
import { set } from "lodash";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
let itemIndex = 0;
let AddCuisineForm;
export default AddCuisineForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [cuisineName, setcuisineName] = useState("");
  const [cuisineNameError, setCuisineNameError] = useState("");
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
  const handleChangeCuisineName = (e) => {
    setcuisineName(e.target.value);
    // cuisineNameError: "",
  };
  const handleAddCuisineName = async () => {
    // const isValid = validate();
    if (true) {
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
      } catch (err) {
        // console.log("err", err);
      }
      setcuisineName("");
      setCuisineNameError(false);
    }
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
    } catch (err) {
      // console.log("err", err);
    }
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
      } catch (err) {
        // console.log("err", err);
      }
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest]);
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
                    class="form-control mr-4"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Cuisine Name"
                    onChange={handleChangeCuisineName}
                    value={cuisineName}
                  />
                  <label
                    className="addOrderStatusButton"
                    onClick={handleAddCuisineName}
                  >
                    Add
                  </label>
                </div>
                {cuisineNameError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {cuisineNameError}
                  </div>
                ) : null}
              </div>
              <button type="submit" class="btn btn-primary mt-3">
                Add Item
              </button>
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label for="exampleInputEmail1">
                  <strong>Cuisines</strong>
                </label>
                {/* <ul>
									{data.map((item, index) => {
										return (
											<li key={item._id} className='mb-2'>
												<div className='d-flex align-items-center'>
													<label className='mr-4 noMargin'>
														{item.cuisine}
													</label>
													<label
														className='noMargin deleteOrderStatusButton'
														onClick={() => handleDeletecuisineName(item._id)}>
														Delete
													</label>
												</div>
											</li>
										);
									})}
								</ul> */}
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
                          <td className="orderTableTD">
                            <label
                              className="noMargin deleteOrderStatusButton"
                              onClick={() => handleDeletecuisineName(item._id)}
                            >
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
