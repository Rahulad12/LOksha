import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";

import { Provider } from "react-redux";
import Store from "./store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./components/PrivateRoute";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";
import Cartscreen from "./screens/Cartscreen";
import Loginscreen from "./screens/Loginscreen";
import RegisterScreen from "./screens/Registerscreen";
import Shippingscreen from "./screens/Shippingscreen";
import Paymentscreen from "./screens/Paymentscreen";
import OrderScreen from "./screens/Ordescreen";

import Placeorderscreen from "./screens/Placeorderscreen";
import Profilescreen from "./screens/Profilescreen";
import AdminRoute from "./components/AdminRoute";
import Productlistscreen from "./screens/admin/Productlistscreen";
import Producteditscreen from "./screens/admin/Producteditscreen";
import Orderlistscreen from "./screens/admin/Orderlistscreen";
import Userlistscreen from "./screens/admin/Userlistscreen";
import Usereditscreen from "./screens/admin/Usereditscreen";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homescreen />} />
      <Route path="/search/:keyword" element={<Homescreen />} />
      <Route path="/page/:pageNumber" element={<Homescreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<Homescreen />}
      />
      <Route path="/products/:id" element={<Productscreen />} />
      <Route path="/cart" element={<Cartscreen />} />
      <Route path="/login" element={<Loginscreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shippingscreen />} />
        <Route path="/payment" element={<Paymentscreen />} />
        <Route path="/placeorder" element={<Placeorderscreen />} />
        <Route path="/orders/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<Profilescreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="admin/orderlist" element={<Orderlistscreen />} />
        <Route path="admin/productlist" element={<Productlistscreen />} />
        <Route
          path="admin/productlist/:pageNumber"
          element={<Productlistscreen />}
        />
        <Route path="admin/product/:id/edit" element={<Producteditscreen />} />
        <Route path="admin/userlist" element={<Userlistscreen />} />
        <Route path="admin/user/:id/edit" element={<Usereditscreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={Store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
