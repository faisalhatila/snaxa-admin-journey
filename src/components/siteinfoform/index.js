import React, { useState, useEffect } from "react";
import { useAuth } from "./../../shared/hooks/auth-hooks";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import useForm from "./useform";
import validate from "./validate";
import Colors from "../../UI/constants/Colors";

const SiteinfoForm = (props) => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [orderStatusName, setOrderStatusName] = useState("");
  const [isCompletedStatus, setIsCompletedStatus] = useState(false);
  const [isCancelledStatus, setIsCancelledStatus] = useState(false);
  const [isAdctiveMenu, setIsActiveMenu] = useState("");
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

  const handleChangeOrderStatusName = (e) => {
    setOrderStatusName(e.target.value);
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
  const handleCompletedMarkCheck = (e) => {
    setIsCompletedStatus(e.target.checked);
    setIsCancelledStatus(false);
  };
  const handleCencelledMarkCheck = (e) => {
    setIsCompletedStatus(false);
    setIsCancelledStatus(e.target.checked);
  };
  const handleAddSiteInfo = async (e) => {
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
      fetchSiteinfo();
    } catch (err) {}
    // setIsCompletedStatus(false);
  };
  const handleViewEditSiteInfo = async (id) => {
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
  const handleEditSiteinfo = async (e) => {
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
      fetchSiteinfo();
    } catch (err) {}
    // setIsCompletedStatus(false);
  };
  const handleCancelEdit = () => {
    setHeading("");
    setPriority("");
    setPara(true);
    setFtpDataId("");
    setEditing(false);
    fetchSiteinfo();
  };
  const handleDeleteSiteinfo = async (itemIndex) => {
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
      fetchSiteinfo();
    } catch (err) {}
  };
  const fetchSiteinfo = async () => {
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
      setData(responseData.existingSiteInfos);
    } catch (err) {}
  };
  useEffect(() => {
    // setIsActiveMenu("sir")
    if (!isAdctiveMenu) setIsActiveMenu("sir");
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
            type: isAdctiveMenu,
          })
        );
        console.log("responseData", responseData);
        setData(responseData.existingSiteInfos);
      } catch (err) {}
    };
    if (token && userId) dashboard();
  }, [token, userId, sendRequest, isAdctiveMenu]);

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate
  );
  function submit() {
    console.log("success");
  }

  const [siteinfoArray, setSiteinfoArray] = useState([
    {
      id: 0,
      menuId: "sir",
      menuTitle: "Restaurant",
      isChecked: false,
      name: "restaurant",
      submenu: [],
    },
    {
      id: 1,
      menuId: "sipc",
      menuTitle: "Popular Cuisines",
      isChecked: false,
      name: "popularcuisines",
      submenu: [],
    },
    {
      id: 2,
      menuId: "sipa",
      menuTitle: "Popular Areas",
      isChecked: false,
      name: "popularareas",
      submenu: [],
    },
  ]);
  const handleMenuCheck = (menu) => {
    setIsActiveMenu(menu.menuId);
    // console.log("########################################");
    // console.log(menu.menuId);
    // console.log("########################################");
    // let temp = siteinfoArray;
    // temp = temp.map((i) => {
    //   if (i.isChecked) {
    //     i.isChecked = !i.isChecked;
    //     return i;
    //   } else return i;
    // });
    // const tempObj = temp[menu];
    // tempObj.isChecked = !temp[menu].isChecked;
    // temp[menu] = tempObj;
    // setSiteinfoArray(temp);
    // console.log(temp);
  };

  let content;
  if (!isLoading)
    content = (
      <div className="row">
        <div className="col-4 col-lg-3 col-md-3 updateVendorFormTitle">
          Siteinfo
        </div>
        <div className="col-12 customerDetailFormMainDiv d-lg-flex d-md-flex">
          <div className="row col-12">
            <form className="col-12 col-md-6 col-lg-6 updateVendorForm">
              {/* <div class="form-group">
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
                    placeholder="Enter Title"
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
              </div> */}
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
                  // style={{ resize: "none" }}
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
                  onClick={handleAddSiteInfo}
                >
                  Add
                </button>
              )}
              {editing && (
                <div className="d-flex align-items-center">
                  <button
                    type="submit"
                    className="addOrderStatusButton mr-3"
                    onClick={handleEditSiteinfo}
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
              )}
            </form>
            <div className="col-12 col-md-6 col-lg-6 updateVendorForm">
              <div class="form-group">
                <label>
                  <strong>Select Category</strong>
                </label>
                <div>
                  {siteinfoArray.map((item, i) => {
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
                  <strong>Siteinfo Table</strong>
                </label>
                <table class="table table-hover">
                  <thead
                    style={{ backgroundColor: Colors.tableHead, color: "#fff" }}
                  >
                    <tr>
                      <th className="orderTableTH">FAQ</th>
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
                                onClick={() => handleViewEditSiteInfo(item._id)}
                              ></i>
                              <label
                                className="noMargin deleteOrderStatusButton"
                                onClick={() => handleDeleteSiteinfo(item._id)}
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
export default SiteinfoForm;
