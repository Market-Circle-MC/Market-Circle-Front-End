import { StrictMode } from "react";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProductList from "./pages/ProductList.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CartProvider } from "./context/cartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not found</div>,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "product-list/:category",
        element: <ProductList />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "orderhistory",
        element: <OrderHistory />,
      },
      {
        path: "userdashboard",
        element: <UserDashboard />,
      },
      {
        path: "admindashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
