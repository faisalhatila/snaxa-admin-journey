import React from "react";

const LeftMenu = () => {
  return (
    <div className="mt-4 col-12 col-lg-3 col-md-3">
      <div className="container leftMenuContainer">
        <div className="leftMenuMainDiv">
          <h2>
            <strong>
              <img src="assets/img/icons/leftMenu/logo.svg" />
            </strong>
          </h2>
          <div className="leftMenuMenuLinksMainDiv">
            <ul>
              <li className="mt-3">
                <div>
                  <img
                    src="assets/img/icons/leftMenu/dashboard.svg"
                    className="mr-2"
                  />
                  Dashboard
                </div>
              </li>

              <li className="mt-3 d-flex align-items-center justify-content-between">
                <div>
                  <img
                    src="assets/img/icons/leftMenu/customerManagement.svg"
                    className="mr-2"
                  />
                  Customer Management
                </div>
                <img
                  src="assets/img/icons/leftMenu/dropdown.svg"
                  className="mr-2"
                />
              </li>
              <li className="mt-3">
                <div>
                  <img
                    src="assets/img/icons/leftMenu/restaurantManagement.svg"
                    className="mr-2"
                  />
                  Restaurant Management
                </div>
              </li>
              <li className="mt-3">
                <div>
                  <img
                    src="assets/img/icons/leftMenu/orderManagement.svg"
                    className="mr-2"
                  />
                  Order Management
                </div>
              </li>
              <li className="mt-3 d-flex align-items-center justify-content-between">
                <div>
                  <img
                    src="assets/img/icons/leftMenu/kitchenManagement.svg"
                    className="mr-2"
                  />
                  Kitchen Management
                </div>
                <img
                  src="assets/img/icons/leftMenu/dropdown.svg"
                  className="mr-2"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
