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
  ChangePassword,
  Faqs,
  Sitemap,
  Newsletters,
  Termsandconditions,
  Privacy,
  ContactQueries,
  Reviews,
  Feedback,
  Siteinfo,
  SocialNetwork,
  ViewSalesContainer,
  ViewAllOrders,
} from "../containers";
const Router = (props) => {
  const { userId, token } = useAuth();
  let content;
  if (!token)
    content = (
      <Switch>
        <PvtRoute exact path="/" component={LoginContainer} />
        <PvtRoute exact path="/change-password" component={ChangePassword} />
        <PvtRoute exact path="/reset/:token/:date" component={ChangePassword} />
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
        <Route exact path="/view-all-orders" component={ViewAllOrders} />
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
        <Route exact path="/faqs" component={Faqs} />
        <Route
          exact
          path="/terms-and-conditions"
          component={Termsandconditions}
        />
        <Route exact path="/view-sales" component={ViewSalesContainer} />
        <Route exact path="/news-letters" component={Newsletters} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/contact-queries" component={ContactQueries} />
        <Route exact path="/reviews" component={Reviews} />
        <Route exact path="/feedback" component={Feedback} />
        <Route exact path="/site-info" component={Siteinfo} />
        <Route exact path="/social-network" component={SocialNetwork} />
        <Route path="/sitemap" component={Sitemap} />
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
