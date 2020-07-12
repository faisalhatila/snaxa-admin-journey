import React from "react";

const DataCounter = () => {
  return (
    <div className="">
      <div className="row dataCounterRow">
        <div className="col-6 col-lg-3 col-md-3">
          <div className="counterRowDataCols">
            <img src="assets/img/icons/dataCounter/totalSales.svg" />
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <p className="counterRowDataValues totalSales">$10,275</p>
            <p className="counterRowDataType totalSales">Total Sales</p>
          </div>
        </div>
        <div className="col-6 col-lg-3 col-md-3">
          <div className="counterRowDataCols">
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <img src="assets/img/icons/dataCounter/totalCustomers.svg" />
            <p className="counterRowDataValues totalCustomers">$10,275</p>
            <p className="counterRowDataType totalCustomers">Total Customers</p>
          </div>
        </div>
        <div className="col-6 col-lg-3 col-md-3">
          <div className="counterRowDataCols">
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <img src="assets/img/icons/dataCounter/totalOrders.svg" />
            <p className="counterRowDataValues totalOrders">$10,275</p>
            <p className="counterRowDataType totalOrders">Total Orders</p>
          </div>
        </div>
        <div className="col-6 col-lg-3 col-md-3">
          <div className="counterRowDataCols">
            {/* <i class="fas fa-hand-holding-usd counterRowDataIcons"></i> */}
            <img src="assets/img/icons/dataCounter/totalRestaurants.svg" />
            <p className="counterRowDataValues totalRestaurants">$10,275</p>
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
