import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "./route";
import PvtRoute from "./privateRoute";
import { useAuth } from "./../shared/hooks/auth-hooks";
import {
  HomeContainer,
  LoginContainer,
  PageNotFound,
  OrderManagementTable,
  PunchedOrders,
  RestaurantManagementTable,
  AddRestaurant,
  AddCategory,
  AddItem,
  AddOrderStatus,
  AddCuisine,
  AddAddons,
  CustomerManagementTable,
  AddAddonCategory,
  AddAddonItem,
} from "../containers";
const Router = (props) => {
  const { userId, token } = useAuth();
  let content;
  if (!token)
    content = (
      <Switch>
        <PvtRoute exact path="/" component={LoginContainer} />
        <Route component={PageNotFound} />
      </Switch>
    );
  else
    content = (
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route
          exact
          path="/order-management-table"
          component={OrderManagementTable}
        />
        <Route
          exact
          path="/restaurant-management-table"
          component={RestaurantManagementTable}
        />
        <Route
          exact
          path="/customer-management-table"
          component={CustomerManagementTable}
        />
        <Route exact path="/punched-orders" component={PunchedOrders} />
        <Route exact path="/add-restaurant" component={AddRestaurant} />
        <Route exact path="/add-category" component={AddCategory} />
        <Route exact path="/add-item" component={AddItem} />
        <Route exact path="/add-order-status" component={AddOrderStatus} />
        <Route exact path="/add-addon-category" component={AddAddonCategory} />
        <Route exact path="/add-addon-item" component={AddAddonItem} />
        <Route exact path="/add-cuisine" component={AddCuisine} />
        <Route exact path="/add-addons" component={AddAddons} />
        <PvtRoute exact path="/login" component={LoginContainer} />
        <Route exact path="/404" component={PageNotFound} />
        <Route exact path="/*" component={() => <Redirect to="/404" />} />
      </Switch>
    );
  return content;
};

export default Router;

// import React from "react";
// import { Switch, Redirect } from "react-router-dom";
// import Route from "./route";
// import PvtRoute from "./privateRoute";
// import {
//   HomeContainer,
//   LoginContainer,
//   PageNotFound,
//   OrderManagementTable,
//   PunchedOrders,
//   RestaurantManagementTable,
//   AddRestaurant,
//   AddCategory,
//   AddItem,
//   AddOrderStatus,
//   AddCuisine,
//   AddAddons,
// } from "../containers";
// const Router = (props) => {
//   return (
//     <Switch>
//       <Route exact path="/" component={HomeContainer} />
//       <Route
//         exact
//         path="/order-management-table"
//         component={OrderManagementTable}
//       />
//       <Route
//         exact
//         path="/restaurant-management-table"
//         component={RestaurantManagementTable}
//       />
//       <Route exact path="/punched-orders" component={PunchedOrders} />
//       <Route exact path="/add-restaurant" component={AddRestaurant} />
//       <Route exact path="/add-category" component={AddCategory} />
//       <Route exact path="/add-item" component={AddItem} />
//       <Route exact path="/add-order-status" component={AddOrderStatus} />
//       <Route exact path="/add-cuisine" component={AddCuisine} />
//       <Route exact path="/add-addons" component={AddAddons} />
//       <PvtRoute exact path="/login" component={LoginContainer} />
//       <Route exact path="/404" component={PageNotFound} />
//       <Route exact path="/*" component={() => <Redirect to="/404" />} />
//     </Switch>
//   );
// };

// export default Router;
