import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import useForm from "./useform";
import validate from "./validate";

const SitemapForm = (props) => {
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
  const handleMenuCheck = (menu) => {
    let temp = sitemapArray;
    temp = temp.map((i) => {
      if (i.isChecked) {
        i.isChecked = !i.isChecked;
        // i.submenu.map((j) => {
        //   if (j.isChecked) {
        //     j.isChecked = !j.isChecked;
        //     return j;
        //   } else return j;
        // });
        return i;
      } else return i;
    });
    const tempObj = temp[menu];
    tempObj.isChecked = !temp[menu].isChecked;
    temp[menu] = tempObj;
    setSiteMapArray(temp);
    console.log(temp);
  };
  const handleSubMenuCheck = (subMenu) => {
    console.log(subMenu);
    // //   let temp = sitemapArray;
    // //   temp = temp.map((i) => {

    // //   })
    // let temp = sitemapArray;
    // const tempObj = sitemapArray[subMenu];
    // tempObj.isChecked = !tempObj.isChecked;
    // temp[subMenu] = tempObj;
    // setSiteMapArray(temp);
    // console.log(temp);
  };
  let content;
  if (!isLoading)
    content = (
      <div className="row">
        <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Sitemap
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label>Title</label>
                <div className="d-flex align-items-center">
                  <input
                    onChange={handleChange}
                    value={values.orderStatusName}
                    name="orderstatus"
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Question"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>URL</label>
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
              <button
                type="submit"
                className="addOrderStatusButton"
                onClick={handleAddOrderStatusName}
              >
                Add
              </button>
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label>
                  <strong>Select Menu</strong>
                </label>
                <div>
                  {sitemapArray.map((item, i) => {
                    return (
                      <div key={i}>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="menuRadios"
                            id={item.name}
                            onChange={() => handleMenuCheck(item.id)}
                          />
                          <label class="form-check-label" for={item.name}>
                            {item.menuTitle}
                          </label>
                        </div>
                        {item.submenu &&
                          item.isChecked &&
                          item.submenu.map((subMenu, i) => {
                            return (
                              <div class="form-check  ml-4">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="submenuRadios"
                                  id={subMenu.name}
                                  onChange={() =>
                                    handleSubMenuCheck(subMenu.id)
                                  }
                                />
                                <label
                                  class="form-check-label"
                                  for={subMenu.name}
                                >
                                  {subMenu.subMenuTitle}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div class="form-group">
                <label>
                  <strong>Faqs Table</strong>
                </label>
                <table class="table table-hover">
                  <thead style={{ backgroundColor: "gray", color: "#fff" }}>
                    <tr>
                      <th className="orderTableTH">Faq</th>
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return item.active === false ? (
                        <tr>
                          <td className="orderTableTD">{item.orderstatus}</td>
                          <div className="d-flex align-items-center justify-content-center">
                            <i
                              style={{ cursor: "pointer" }}
                              class="far fa-edit mr-3 editButtonIcon"
                            ></i>
                            <label
                              className="noMargin deleteOrderStatusButton"
                              //   onClick={() =>
                              //     handleDeleteOrderStatusName(item._id)
                              //   }
                            >
                              Delete
                            </label>
                          </div>
                        </tr>
                      ) : null;
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
export default SitemapForm;
