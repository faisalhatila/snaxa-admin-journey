import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "./route";
import PvtRoute from "./privateRoute";
import {
  HomeContainer,
  LoginContainer,
  PageNotFound,
  OrderManagementTable,
  PunchedOrders,
  RestaurantManagementTable,
} from "../containers";
const Router = (props) => {
  return (
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
      <Route exact path="/punched-orders" component={PunchedOrders} />
      <PvtRoute exact path="/login" component={LoginContainer} />
      <Route exact path="/404" component={PageNotFound} />
      <Route exact path="/*" component={() => <Redirect to="/404" />} />
    </Switch>
  );
};

export default Router;
