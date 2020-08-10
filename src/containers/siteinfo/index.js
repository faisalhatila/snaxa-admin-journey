import React from "react";
import { SiteinfoForm, SocialNetworkForm } from "../../components";
// let OrderDetails;
const SiteInfo = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <SiteinfoForm />
          <SocialNetworkForm />
        </div>
      </div>
    </div>
  );
};
export default SiteInfo;
