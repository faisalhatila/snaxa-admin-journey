import React from "react";
import { AddAddonItemForm } from "../../components";
// let AddAddonItem;
const AddAddonItem = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <AddAddonItemForm />
        </div>
      </div>
    </div>
  );
};
export default AddAddonItem