import React, { useState, useContext } from "react";
import { AuthContext } from "./../../shared/context/index";
import { useHistory } from "react-router-dom";

const TopMenu = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isOpenLogoutBtn, setIsOpenLogoutBtn] = useState(false);
  const handleDisplayLogoutBtn = () => {
    if (!isOpenLogoutBtn) {
      setIsOpenLogoutBtn(true);
    } else {
      setIsOpenLogoutBtn(false);
    }
  };
  const logout = () => {
    auth.logout();
    history.push("/");
    history.go("/");
    // history.replace("/");
  };
  return (
    <div className="topMenuMainDiv d-none d-md-block">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <p>
            <i class="far fa-question-circle"></i> Help
          </p>
          <p>
            <b>Dashboard</b>
          </p>
          <div>
            <div
              className="userInfoDiv d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={handleDisplayLogoutBtn}
            >
              <div className="mr-2">
                <i class="far fa-user"></i>
              </div>
              <div>
                <p className="userName">Admin</p>
                {/* <p className="userJoiningStartDate">User Since 2019</p> */}
              </div>
              {!isOpenLogoutBtn ? <i class="fas fa-caret-down ml-2"></i> : null}
              {isOpenLogoutBtn ? <i class="fas fa-sort-up ml-2"></i> : null}
            </div>
            <hr className="noMargin" />
            {isOpenLogoutBtn ? (
              <div
                style={{ cursor: "pointer" }}
                className="logoutDiv d-flex align-items-center position-absolute"
                onClick={() => logout()}
              >
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
