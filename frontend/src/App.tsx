import { Layout } from "@/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Products } from "@/pages/Products";
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
    ],
  },
]);
export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
