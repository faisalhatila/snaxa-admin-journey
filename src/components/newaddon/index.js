import React, { useState } from "react";
let itemIndex = 0;

// let NewAddon;
const NewAddon = (props) => {
  const [addOnName, setAddOnName] = useState("");
  const [addOnIsRequired, setAddOnIsRequired] = useState(false);
  const [addOnIsMultipleSelect, setAddOnIsMultipleSelect] = useState(true);
  const [addOnQuantity, setAddOnQuantity] = useState(1);
  // const [addOnMinQuantity, setAddOnMinQuantity] = useState(1);
  // const [addOnMaxQuantity, setAddOnMaxQuantity] = useState(1);
  let [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [desc, setDesc] = useState("");
  const [isDisplayAddForm, setIsDisplayAddForm] = useState(true);
  // const [priceOnSelectOfAddons, setpriceOnSelectOfAddons] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  // const [updatedDescription, setUpdatedDescription] = useState("");
  // const [updatedPrice, setUpdatedPrice] = useState("");
  const handleAddOnNameChange = (event) => {
    setAddOnName(event.target.value);
  };
  const handleAddOnQuantityChange = (event) => {
    setAddOnQuantity(event.target.value);
  };
  const handleAddItemCard = () => {
    const itemObj = {
      itemIndex: itemIndex,
      name: name,
      price: number,
      description: desc,
      isDisable: true,
    };
    itemIndex++;
    setItems(...items, itemObj);
    setName("");
    setNumber("");
    setDesc("");
  };
  const handleDeleteItemCard = (itemIndex) => {
    // console.log(props);
    // alert("hi");
    items = items.filter((item) => {
      return item.itemIndex !== itemIndex;
    });
    setItems(items);
    console.log(items);
  };
  const updateItem = (itemIndex) => {
    const newItem = items.map((item) => {
      if (item.itemIndex === itemIndex) {
        const updatedItem = {
          ...item,
          isDisable: false,
        };
        return updatedItem;
      }
      return item;
    });
    setItems(newItem);
    // console.log(itemIndex);
  };
  const handleUpdatedName = (itemIndex, event) => {
    const newItem = items.map((item) => {
      if (item.itemIndex === itemIndex) {
        const updatedItem = {
          ...item,
          name: event,
        };
        return updatedItem;
      }
      return item;
    });
    setItems(newItem);
    setUpdatedName(newItem);
    // setState({
    //   updatedName:event.target.value
    // })
  };
  const handleUpdatedPrice = (itemIndex, event) => {
    const newItem = items.map((item) => {
      if (item.itemIndex === itemIndex) {
        const updatedItem = {
          ...item,
          price: event,
        };
        return updatedItem;
      }
      return item;
    });
    setItems(newItem);
    // updatedNumber: newItem,
  };
  const handleUpdatedDescription = (itemIndex, event) => {
    const newItem = items.map((item) => {
      if (item.itemIndex === itemIndex) {
        const updatedItem = {
          ...item,
          description: event,
        };
        return updatedItem;
      }
      return item;
    });
    setItems(newItem);
    // updatedDesc: newItem,
  };
  const handleSaveUpdate = (itemIndex) => {
    const newItem = items.map((item) => {
      if (item.itemIndex === itemIndex) {
        const updatedItem = {
          ...item,
          isDisable: true,
        };
        return updatedItem;
      }
      return item;
    });
    setItems(newItem);

    console.log(newItem);
  };

  const handleDisplayAddItemForm = () => {
    setIsDisplayAddForm(!isDisplayAddForm);
  };
  // const handlePriceOnSelectAddon = (e) => {
  // 	// setState({
  // 	// priceOnSelectOfAddons: e.target.checked,
  // 	// });
  // };

  return (
    <div className="row">
      <div className="col-4 col-lg-3 col-md-3 customerDetailFormTitle">
        Add Addon
      </div>
      <div className="col-12 customerDetailFormMainDiv">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Addon Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleAddOnNameChange}
              value={addOnName}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Required</label>
            <div
              className="d-flex"
              onChange={(e) => setAddOnIsRequired(e.target.value)}
            >
              <div class="form-check mr-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value={true}
                />
                <label class="form-check-label" for="exampleRadios1">
                  Yes
                </label>
              </div>
              <div class="form-check mr-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value={false}
                />
                <label class="form-check-label" for="exampleRadios2">
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div class="form-group mr-5">
              <label for="exampleInputEmail1">Is Multiple Select</label>
              <div
                className="d-flex"
                onChange={(e) => setAddOnIsMultipleSelect(e.target.value)}
              >
                <div class="form-check mr-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadiosSec"
                    id="exampleRadios3"
                    value="true"
                  />
                  <label class="form-check-label" for="exampleRadios3">
                    Yes
                  </label>
                </div>
                <div class="form-check mr-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadiosSec"
                    id="exampleRadios4"
                    value="false"
                  />
                  <label class="form-check-label" for="exampleRadios4">
                    No
                  </label>
                </div>
              </div>
            </div>
            {addOnIsMultipleSelect === "true" ? (
              <div class="form-group mr-3">
                <label for="exampleInputEmail1">Min Quantity</label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={handleAddOnQuantityChange}
                  value={addOnQuantity}
                  style={{ maxWidth: "70px" }}
                />
              </div>
            ) : null}
            {addOnIsMultipleSelect === "true" ? (
              <div class="form-group">
                <label for="exampleInputEmail1">Max Quantity</label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={handleAddOnQuantityChange}
                  value={addOnQuantity}
                  style={{ maxWidth: "70px" }}
                />
              </div>
            ) : null}
          </div>
          <div className="addItemForm">
            <div className="d-flex justify-content-between">
              <p className="snaxaRedFont noMargin" style={{ fontWeight: 600 }}>
                Enter Item Form
              </p>
              <i
                className="fa fa-bars snaxaRedFont"
                onClick={handleDisplayAddItemForm}
              ></i>
            </div>
            {isDisplayAddForm ? (
              <div>
                <div className="row flex-column flex-md-row flex-lg-row">
                  <div class="col form-group">
                    <label for="exampleInputEmail1">Item Name</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Enter Item Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div class="form-group col">
                    <label for="exampleInputEmail1">Item Description</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Item Description"
                      onChange={(e) => setDesc(e.target.value)}
                      value={desc}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center flex-column flex-md-row flex-lg-row">
                  <div class="form-group mr-4">
                    <label for="exampleInputEmail1">Item Price</label>
                    <input
                      class="form-control"
                      type="number"
                      placeholder="Enter Quantity"
                      onChange={(e) => setNumber(e.target.value)}
                      value={number}
                      // disabled={priceOnSelectOfAddons}
                    />
                  </div>
                  {/* <div class='form-check'>
										<input
											class='form-check-input'
											type='checkbox'
											value=''
											id='defaultCheck1'
											onChange={handlePriceOnSelectAddon}
										/>
										<label class='form-check-label' for='defaultCheck1'>
											Price On Select Of Addons
										</label>
									</div> */}
                </div>
                <button
                  type="button"
                  onClick={handleAddItemCard}
                  class="btn btn-primary mt-3 mr-4"
                >
                  Add another item
                </button>
              </div>
            ) : null}
          </div>
          {items.map((item, i) => {
            return (
              <div key={i} className="d-flex flex-column addonItemDiv mt-4">
                <div className="d-flex justify-content-between">
                  <p className="snaxaRedFont" style={{ fontWeight: 600 }}>
                    Addon Item
                  </p>
                  <i
                    className="fa fa-times snaxaRedFont"
                    onClick={() => handleDeleteItemCard(item.itemIndex)}
                  ></i>
                </div>
                <div className="d-flex">
                  <div class="form-group mr-5">
                    <label for="exampleInputEmail1">Item Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled={item.isDisable}
                      value={item.name}
                      onChange={(event) =>
                        handleUpdatedName(item.itemIndex, event.target.value)
                      }
                    />
                  </div>
                  <div class="form-group mr-5">
                    <label for="exampleInputEmail1">Item Description</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled={item.isDisable}
                      value={item.description}
                      onChange={(event) =>
                        handleUpdatedDescription(
                          item.itemIndex,
                          event.target.value
                        )
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Item Price</label>
                    <input
                      type="number"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      disabled={item.isDisable}
                      value={item.price}
                      onChange={(event) =>
                        handleUpdatedPrice(item.itemIndex, event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <button
                    type="button"
                    class="btn btn-primary mt-3 mr-4"
                    onClick={() => {
                      handleSaveUpdate(item.itemIndex);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary mt-3 mr-4"
                    onClick={() => updateItem(item.itemIndex)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
          <button type="submit" class="btn btn-primary mt-3 disabled">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewAddon;
