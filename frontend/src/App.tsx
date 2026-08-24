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
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Support } from "./pages/Support";
import { HelpCenters } from "./pages/HelpCenters";
import { History } from "./pages/History";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { CreateProducts } from "./pages/Dashboard/CreateProducts";
import { Customer } from "./pages/Dashboard/Customer";
import { Category } from "./pages/Dashboard/Category";
import { Order } from "./pages/Dashboard/Order";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "./context/AuthContext";
import { Profile } from "./pages/Profile";
import { AdminRoute } from "./pages/auth/AdminRoute";
import { ProtectedRoute } from "./pages/auth/ProtectedRoute";
import { OrderHistory } from "./pages/OrderHistory";
import { Error404 } from "./pages/Error404";

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
        path: "/about/history",
        element: <History />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/help-centers",
        element: <HelpCenters />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/create-products",
        element: (
          <AdminRoute>
            <CreateProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/customers",
        element: (
          <AdminRoute>
            <Customer />
          </AdminRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <AdminRoute>
            <Category />
          </AdminRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <AdminRoute>
            <Order />
          </AdminRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orderHistory",
        element: (
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);
export const App = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </>
  );
};
