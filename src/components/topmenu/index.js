import React from "react";

const TopMenu = (props) => {
  return (
    <div className="topMenuMainDiv d-none d-md-block">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <p>
            <i class="far fa-question-circle"></i>Help
          </p>
          <p>Dashboard</p>
          <div className="userInfoDiv d-flex align-items-center">
            <div className="mr-2">
              <i class="far fa-user"></i>
            </div>
            <div>
              <p className="userName">Alaska Restaurant</p>
              <p className="userJoiningStartDate">User Since 2019</p>
            </div>
            <i class="fas fa-caret-down ml-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
