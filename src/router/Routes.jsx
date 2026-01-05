import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ServiceDetails from "../pages/ServiceDetails";
import ForgetPass from "../pages/ForgetPass";
import Error from "../pages/Error";
import AddService from "../pages/AddService";
import MyServices from "../pages/MyServices";
import UpdateService from "../pages/UpdateService";
import MyOrders from "../pages/MyOrders";
import Contact from "../pages/Contact";
import Terms from "../pages/Terms";
import CategoryFilteredProduct from "../pages/CategoryFilteredProduct";
import Pages from "../pages/Pages";
import Blog from "../pages/Blog";
import AboutUs from "../pages/AboutUs";
import FAQ from "../pages/FAQ";
import OurTeam from "../pages/OurTeam";

// Dashboard Pages
import Stats from "../pages/dashboard/Stats";
import DashboardProfile from "../pages/dashboard/Profile";
import AddListing from "../pages/dashboard/AddListing";
import MyListings from "../pages/dashboard/MyListings";
import DashboardMyOrders from "../pages/dashboard/MyOrders";
import UpdateListing from "../pages/dashboard/UpdateListing";

// Admin Dashboard Pages
import AdminStatistics from "../pages/dashboard/admin/Statistics";
import ManageListings from "../pages/dashboard/admin/ManageListings";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/pages",
        element: <Pages></Pages>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/faq",
        element: <FAQ></FAQ>,
      },
      {
        path: "/our-team",
        element: <OurTeam></OurTeam>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
         
            <ServiceDetails />
         
        ),
      },
      {
        path: "/forget/:email",
        element: <ForgetPass />,
      },
      // Legacy routes - keeping for backward compatibility
      {
        path: "/add-services",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-services",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-services/:id",
        element: (
          <PrivateRoute>
            <UpdateService />
          </PrivateRoute>
        ),
      },
      {
        path: "/terms",
        element: (
          <PrivateRoute>
            <Terms />
          </PrivateRoute>
        ),
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryFilteredProduct />,
      },
    ],
  },
  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard",
        element: <Stats />,
      },
      {
        path: "/dashboard/stats",
        element: <Stats />,
      },
      {
        path: "/dashboard/profile",
        element: <DashboardProfile />,
      },
      {
        path: "/dashboard/add-listing",
        element: <AddListing />,
      },
      {
        path: "/dashboard/my-listings",
        element: <MyListings />,
      },
      {
        path: "/dashboard/my-orders",
        element: <DashboardMyOrders />,
      },
      {
        path: "/dashboard/update-listing/:id",
        element: <UpdateListing />,
      },
      // Admin Routes
      {
        path: "/dashboard/admin/statistics",
        element: (
          <AdminRoute>
            <AdminStatistics />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-listings",
        element: (
          <AdminRoute>
            <ManageListings />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
