import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import useForm from "./useform";
import validate from "./validate";

const SocialNetworkForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [orderStatusName, setOrderStatusName] = useState("");
  const [isCompletedStatus, setIsCompletedStatus] = useState(false);
  const [isCancelledStatus, setIsCancelledStatus] = useState(false);
  const handleChangeOrderStatusName = (e) => {
    setOrderStatusName(e.target.value);
  };
  const handleCompletedMarkCheck = (e) => {
    setIsCompletedStatus(e.target.checked);
    setIsCancelledStatus(false);
  };
  const handleCencelledMarkCheck = (e) => {
    setIsCompletedStatus(false);
    setIsCancelledStatus(e.target.checked);
  };
  const handleAddOrderStatusName = async (e) => {
    e.preventDefault();
    handleSubmit();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/add-order-status`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          orderStatus: orderStatusName,
          active: isCompletedStatus,
        })
      );
      console.log("responseData", responseData);
      setData(responseData.orderStatuses);
    } catch (err) {}
    setOrderStatusName("");
    setIsCompletedStatus(false);
  };
  const handleDeleteOrderStatusName = async (itemIndex) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-order-status`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          orderStatus: itemIndex,
        })
      );
      console.log("responseData", responseData);
      setData(responseData.orderStatuses);
    } catch (err) {}
  };
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/get-order-status`,
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
        setData(responseData.orderStatuses);
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
  const [sitemapArray, setSiteMapArray] = useState([
    {
      id: 0,
      menuId: "OB",
      menuTitle: "Our Branches",
      submenu: [],
      name: "ourbranches",
      isChecked: false,
    },
    {
      id: 1,
      menuId: "MA",
      menuTitle: "Members Area",
      submenu: [],
      name: "membersarea",
      isChecked: false,
    },
    {
      id: 2,
      menuId: "AB",
      menuTitle: "About",
      name: "aboutsnaxa",
      isChecked: false,
      submenu: [
        {
          id: 200,
          subMenuId: "ATS",
          subMenuTitle: "About The Site",
          name: "aboutthesite",
          isChecked: false,
        },
        {
          id: 201,
          subMenuId: "FR",
          subMenuTitle: "For Restaurants",
          name: "forrestaurant",
          isChecked: false,
        },
        {
          id: 202,
          subMenuId: "SC",
          subMenuTitle: "Stay Connected",
          name: "stayconnected",
          isChecked: false,
        },
        {
          id: 203,
          subMenuId: "SA",
          subMenuTitle: "Snaxa Apps",
          name: "snaxaapps",
          isChecked: false,
        },
      ],
    },
    {
      id: 3,
      menuId: "Ar",
      menuTitle: "Areas",
      name: "areas",
      isChecked: false,
      submenu: [
        {
          id: 300,
          subMenuId: "Du",
          subMenuTitle: "Dubai",
          name: "dubai",
          isChecked: false,
        },
        {
          id: 301,
          subMenuId: "AD",
          subMenuTitle: "Abu Dhabi",
          name: "abudhabi",
          isChecked: false,
        },
        {
          id: 302,
          subMenuId: "Sh",
          subMenuTitle: "Sharjah",
          name: "sharjah",
          isChecked: false,
        },
        {
          id: 303,
          subMenuId: "Aj",
          subMenuTitle: "Ajman",
          name: "ajman",
          isChecked: false,
        },
        {
          id: 303,
          subMenuId: "AA",
          subMenuTitle: "Al Ain",
          name: "alain",
          isChecked: false,
        },
        {
          id: 304,
          subMenuId: "Fu",
          subMenuTitle: "Fujairah",
          name: "fujairah",
          isChecked: false,
        },
        {
          id: 305,
          subMenuId: "RAK",
          subMenuTitle: "Ras Al Khaima",
          name: "rasalkhaima",
          isChecked: false,
        },
        {
          id: 306,
          subMenuId: "UAQ",
          subMenuTitle: "Umm Al-Quwain",
          name: "ummalqueain",
          isChecked: false,
        },
      ],
    },
    {
      id: 4,
      menuId: "Of",
      menuTitle: "Offers",
      name: "offers",
      submenu: [],
      isChecked: false,
    },
  ]);
  const [siteinfoArray, setSiteinfoArray] = useState([
    {
      id: 0,
      menuId: "R",
      menuTitle: "Restaurant",
      isChecked: false,
      name: "restaurant",
    },
    {
      id: 1,
      menuId: "PC",
      menuTitle: "Popular Cuisines",
      isChecked: false,
      name: "popularcuisines",
    },
    {
      id: 1,
      menuId: "PA",
      menuTitle: "Popular Areas",
      isChecked: false,
      name: "popularareas",
    },
  ]);
  const handleMenuCheck = (menu) => {
    let temp = siteinfoArray;
    temp = temp.map((i) => {
      if (i.isChecked) {
        i.isChecked = !i.isChecked;
        return i;
      } else return i;
    });
    const tempObj = temp[menu];
    tempObj.isChecked = !temp[menu].isChecked;
    temp[menu] = tempObj;
    setSiteinfoArray(temp);
    console.log(temp);
  };

  let content;
  if (!isLoading)
    content = (
      <div className="row">
        <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Social Network
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 updateVendorForm">
              <div className="row">
                <div class="form-group col">
                  <label>Facebook</label>
                  <div className="d-flex align-items-center">
                    <input
                      onChange={handleChange}
                      value={values.orderStatusName}
                      name="orderstatus"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter URL"
                    />
                  </div>
                </div>
                <div class="form-group col">
                  <label>Twitter</label>
                  <div className="d-flex align-items-center">
                    <input
                      onChange={handleChange}
                      value={values.orderStatusName}
                      name="orderstatus"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter URL"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="form-group col">
                  <label>Linkedin</label>
                  <div className="d-flex align-items-center">
                    <input
                      onChange={handleChange}
                      value={values.orderStatusName}
                      name="orderstatus"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Url"
                    />
                  </div>
                </div>
                <div class="form-group col">
                  <label>Instagram</label>
                  <div className="d-flex align-items-center">
                    <input
                      onChange={handleChange}
                      value={values.orderStatusName}
                      name="orderstatus"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Url"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="addOrderStatusButton"
                onClick={handleAddOrderStatusName}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  else content = <p>Loading...</p>;
  return content;
};
export default SocialNetworkForm;
