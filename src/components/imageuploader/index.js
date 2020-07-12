import React from "react";

export default class ImageUploade extends React.Component {
  render() {
    return (
      <div
        style={{
          background: "url(assets/img/icons/insertImage.png)",
          minHeight: "150px",
          minWidth: "150px",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );
  }
}
