import { Layout } from "@/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
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
