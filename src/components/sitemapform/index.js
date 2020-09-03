import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import useForm from "./useform";
import validate from "./validate";
import Colors from "../../UI/constants/Colors";

const SitemapForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [orderStatusName, setOrderStatusName] = useState("");
  const [isCompletedStatus, setIsCompletedStatus] = useState(false);
  const [isCancelledStatus, setIsCancelledStatus] = useState(false);
  const [isAdctiveMenu, setIsActiveMenu] = useState("");
  const [isActiveSubMenu, setIsSubActiveMenu] = useState("");
  const [heading, setHeading] = useState("");
  const [para, setPara] = useState("");
  const [priority, setPriority] = useState();
  const [editing, setEditing] = useState(false);
  const [ftpDataId, setFtpDataId] = useState("");
  const headingChangeHandler = (event) => {
    setHeading(event.target.value);
  };
  const paraChangeHandler = (event) => {
    setPara(event.target.value);
  };
  const priorityChangeHandler = (event) => {
    const prty = parseInt(event.target.value);
    setPriority(prty);
  };
  const handleAddSiteMap = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/add-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          heading: heading,
          para: para,
          type: isAdctiveMenu,
          priority: priority,
        })
      );
      console.log("responseData", responseData);
      // setData(responseData.existingFtps);
      setHeading("");
      setPara("");
      setFtpDataId("");
      setHeading("");
      setPriority("");
      fetchSitemap();
    } catch (err) {}
    // setIsCompletedStatus(false);
  };
  const handleViewEditSitemap = async (id) => {
    setEditing(true);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/view-edit-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          ftpId: id,
        })
      );
      console.log("responseData", responseData);
      // setCategoryName(responseData.existingCategories.categoryName);
      // setItemPriority(responseData.existingCategories.priority);
      // setItemStatus(responseData.existingCategories.status);
      // setCategoryId(responseData.existingCategories._id);
      setHeading(responseData.editInfo.heading);
      setPara(responseData.editInfo.para);
      setPriority(responseData.editInfo.priority);
      setFtpDataId(responseData.editInfo._id);
    } catch (err) {}
  };
  const handleEditSitemap = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/edit-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          ftpId: ftpDataId,
          heading: heading,
          para: para,
          type: isAdctiveMenu,
          priority: priority,
        })
      );
      console.log("responseData", responseData);
      // setData(responseData.existingFtps);
      setHeading("");
      setPara("");
      setFtpDataId("");
      setHeading("");
      setPriority("");
      setEditing(false);
      fetchSitemap();
    } catch (err) {}
    // setIsCompletedStatus(false);
  };
  const handleCancelEdit = () => {
    setHeading("");
    setPriority("");
    setPara("");
    setFtpDataId("");
    setEditing(false);
    fetchSitemap();
  };
  const handleDeleteSitemap = async (itemIndex) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/delete-ftp`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          ftpId: itemIndex,
          userId,
          // orderStatus: itemIndex,
        })
      );
      console.log("responseData", responseData);
      // setData(responseData.orderStatuses);
      setHeading("");
      setPara("");
      setFtpDataId("");
      setHeading("");
      setPriority("");
      fetchSitemap();
    } catch (err) {}
  };
  const fetchSitemap = async () => {
    console.log("Dashboard");
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/view-ftps`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          type: isAdctiveMenu,
        })
      );
      console.log("#########################################");
      console.log("responseData", responseData.existingFtps);
      console.log("#########################################");
      setData(responseData.existingSiteMap);
    } catch (err) {}
  };
  useEffect(() => {
    if (!isAdctiveMenu) setIsActiveMenu("sob");
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/view-ftps`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            type: isActiveSubMenu || isAdctiveMenu,
          })
        );
        console.log("responseData", responseData);
        setData(responseData.existingSiteMap);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest, isAdctiveMenu, setIsSubActiveMenu]);

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
      menuId: "sob",
      menuTitle: "Our Branches",
      submenu: [],
      name: "ourbranches",
      isChecked: false,
    },
    {
      id: 1,
      menuId: "soma",
      menuTitle: "Members Area",
      submenu: [],
      name: "membersarea",
      isChecked: false,
    },
    {
      id: 2,
      menuId: "sats",
      menuTitle: "About",
      name: "aboutsnaxa",
      isChecked: false,
      submenu: [
        {
          id: 200,
          subMenuId: "sats",
          subMenuTitle: "About The Site",
          name: "aboutthesite",
          isChecked: false,
        },
        {
          id: 201,
          subMenuId: "sfr",
          subMenuTitle: "For Restaurants",
          name: "forrestaurant",
          isChecked: false,
        },
        {
          id: 202,
          subMenuId: "ssc",
          subMenuTitle: "Stay Connected",
          name: "stayconnected",
          isChecked: false,
        },
        {
          id: 203,
          subMenuId: "ssa",
          subMenuTitle: "Snaxa Apps",
          name: "snaxaapps",
          isChecked: false,
        },
      ],
    },
    {
      id: 3,
      menuId: "cd",
      menuTitle: "Areas",
      name: "areas",
      isChecked: false,
      submenu: [
        {
          id: 300,
          subMenuId: "cd",
          subMenuTitle: "Dubai",
          name: "dubai",
          isChecked: false,
        },
        {
          id: 301,
          subMenuId: "cad",
          subMenuTitle: "Abu Dhabi",
          name: "abudhabi",
          isChecked: false,
        },
        {
          id: 302,
          subMenuId: "cs",
          subMenuTitle: "Sharjah",
          name: "sharjah",
          isChecked: false,
        },
        {
          id: 303,
          subMenuId: "ca",
          subMenuTitle: "Ajman",
          name: "ajman",
          isChecked: false,
        },
        {
          id: 303,
          subMenuId: "caa",
          subMenuTitle: "Al Ain",
          name: "alain",
          isChecked: false,
        },
        {
          id: 304,
          subMenuId: "cf",
          subMenuTitle: "Fujairah",
          name: "fujairah",
          isChecked: false,
        },
        {
          id: 305,
          subMenuId: "crak",
          subMenuTitle: "Ras Al Khaima",
          name: "rasalkhaima",
          isChecked: false,
        },
        {
          id: 306,
          subMenuId: "cuaq",
          subMenuTitle: "Umm Al-Quwain",
          name: "ummalqueain",
          isChecked: false,
        },
      ],
    },
    {
      id: 4,
      menuId: "so",
      menuTitle: "Offers",
      name: "offers",
      submenu: [],
      isChecked: false,
    },
  ]);
  const handleMenuCheck = (item) => {
    if (item.submenu.length === 0) {
      setIsActiveMenu(item.menuId);
      setIsSubActiveMenu("");
    }
    // setIsActiveMenu(menu.menuId);
    else {
      setIsActiveMenu(item.menuId);
      const menu = item.id;
      let temp = sitemapArray;
      temp = temp.map((i) => {
        if (i.isChecked) {
          i.isChecked = !i.isChecked;
          return i;
        } else return i;
      });
      const tempObj = temp[menu];
      tempObj.isChecked = !temp[menu].isChecked;
      temp[menu] = tempObj;
      setSiteMapArray(temp);
      console.log(temp);
    }
  };
  const handleSubMenuCheck = (subMenu) => {
    setIsActiveMenu(subMenu.subMenuId);
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
                <label for="exampleInputEmail1">Heading</label>
                <div className="d-flex align-items-center">
                  <input
                    value={heading}
                    onChange={headingChangeHandler}
                    name="orderstatus"
                    type="text"
                    class="form-control"
                    placeholder="Enter Question"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Answer</label>
                <textarea
                  class="form-control"
                  rows="5"
                  value={para}
                  onChange={paraChangeHandler}
                ></textarea>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Priority</label>
                <div className="d-flex align-items-center">
                  <input
                    value={priority}
                    onChange={priorityChangeHandler}
                    name="orderstatus"
                    type="text"
                    class="form-control"
                    placeholder="Priority"
                  />
                </div>
              </div>
              {!editing && (
                <button
                  type="submit"
                  className="addOrderStatusButton"
                  onClick={handleAddSiteMap}
                >
                  Add
                </button>
              )}
              {editing && (
                <div className="d-flex align-items-center">
                  <button
                    type="submit"
                    className="addOrderStatusButton mr-3"
                    onClick={handleEditSitemap}
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    class="addOrderStatusButton"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}{" "}
              {/* <button
                type="submit"
                className="addOrderStatusButton"
                onClick={handleAddOrderStatusName}
              >
                Add
              </button> */}
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
                            onChange={() => handleMenuCheck(item)}
                            checked={item.menuId === isAdctiveMenu}
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
                                  onChange={() => handleSubMenuCheck(subMenu)}
                                  checked={subMenu.subMenuId === isAdctiveMenu}
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
                  <strong>Sitemap Table</strong>
                </label>
                <table class="table table-hover">
                  <thead
                    style={{ backgroundColor: Colors.tableHead, color: "#fff" }}
                  >
                    <tr>
                      <th className="orderTableTH">Sitemap</th>
                      <th className="orderTableTH">Priority</th>
                      <th className="orderTableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr>
                          <td className="orderTableTD">{item.heading}</td>
                          <td className="orderTableTD">{item.priority}</td>
                          <td className="orderTableTD">
                            <div className="d-flex align-items-center justify-content-center">
                              <i
                                style={{ cursor: "pointer" }}
                                class="far fa-edit mr-3 editButtonIcon"
                                onClick={() => handleViewEditSitemap(item._id)}
                              ></i>
                              <label
                                className="noMargin deleteOrderStatusButton"
                                onClick={() => handleDeleteSitemap(item._id)}
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
export default SitemapForm;
