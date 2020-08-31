import React from "react";

const DataCounter = (props) => {
  // Object { Object { totalSales: 259.35, totalOrders: 3, totalCustomers: 1, existingRestaurants: 9 }
  return (
    <div className="">
      <div className="row dataCounterRow">
        <div className="col-6 col-lg col-md">
          <div className="counterRowDataCols">
            <img
              alt="Total Sales"
              src="assets/img/icons/dataCounter/totalSales.svg"
            />
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <p className="counterRowDataValues totalSales">
              AED {parseFloat(`${props.data.totalSales}`).toFixed(2)}
            </p>
            <p className="counterRowDataType totalSales">Total Sales</p>
          </div>
        </div>
        <div className="col-6 col-lg col-md">
          <div className="counterRowDataCols">
            <img
              alt="Total Sales"
              src="assets/img/icons/dataCounter/totalSales.svg"
            />
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <p className="counterRowDataValues totalSales">
              AED {parseFloat(`${props.data.totalSales}`).toFixed(2)}
            </p>
            <p className="counterRowDataType totalSales">Amounts To Clear</p>
          </div>
        </div>
        <div className="col-6 col-lg col-md">
          <div className="counterRowDataCols">
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <img
              alt="Total Customers"
              src="assets/img/icons/dataCounter/totalCustomers.svg"
            />
            <p className="counterRowDataValues totalCustomers">
              {props.data.totalCustomers}
            </p>
            <p className="counterRowDataType totalCustomers">Total Customers</p>
          </div>
        </div>
        <div className="col-6 col-lg col-md">
          <div className="counterRowDataCols">
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <img
              alt="Total Orders"
              src="assets/img/icons/dataCounter/totalOrders.svg"
            />
            <p className="counterRowDataValues totalOrders">
              {props.data.totalOrders}
            </p>
            <p className="counterRowDataType totalOrders">Total Orders</p>
          </div>
        </div>
        <div className="col-6 col-lg col-md">
          <div className="counterRowDataCols">
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <img
              alt="Total Restaurants"
              src="assets/img/icons/dataCounter/totalRestaurants.svg"
            />
            <p className="counterRowDataValues totalRestaurants">
              {props.data.existingRestaurants}
            </p>
            <p className="counterRowDataType totalRestaurants">
              Total Restaurants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCounter;
