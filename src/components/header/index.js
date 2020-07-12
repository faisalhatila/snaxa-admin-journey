import React from "react";
import { TopMenu, Navbar } from "..";

const Header = (props) => {
  return (
    <div>
      <div>
        <TopMenu name={props.name} />
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
