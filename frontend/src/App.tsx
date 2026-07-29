import { Layout } from "@/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Products } from "@/pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { Cart } from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/dash",
        element: <Dashboard />,
      },
    ],
  },
]);
export const App = () => {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
};
