import React, { useState } from "react";

const TopMenu = (props) => {
  const [isOpenLogoutBtn, setIsOpenLogoutBtn] = useState(false);
  const handleDisplayLogoutBtn = () => {
    if (!isOpenLogoutBtn) {
      setIsOpenLogoutBtn(true);
    } else {
      setIsOpenLogoutBtn(false);
    }
  };
  return (
    <div className="topMenuMainDiv d-none d-md-block">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <p>
            <i class="far fa-question-circle"></i>Help
          </p>
          <p>Dashboard</p>
          <div>
            <div className="userInfoDiv d-flex align-items-center">
              <div className="mr-2">
                <i class="far fa-user"></i>
              </div>
              <div>
                <p className="userName">Alaska Restaurant</p>
                <p className="userJoiningStartDate">User Since 2019</p>
              </div>
              {!isOpenLogoutBtn ? (
                <i
                  class="fas fa-caret-down ml-2"
                  onClick={handleDisplayLogoutBtn}
                ></i>
              ) : null}
              {isOpenLogoutBtn ? (
                <i
                  class="fas fa-sort-up ml-2"
                  onClick={handleDisplayLogoutBtn}
                ></i>
              ) : null}
            </div>
            <hr className="noMargin" />
            {isOpenLogoutBtn ? (
              <div className="logoutDiv d-flex align-items-center position-absolute">
                <div className="mr-2">
                  <i class="fas fa-power-off"></i>
                </div>
                <div>
                  <p className="noMargin userName">Logout</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
