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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not found</div>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/product-list/:category",
        element: <ProductList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
