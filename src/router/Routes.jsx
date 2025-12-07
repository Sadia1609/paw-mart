import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      { 
        path: "/services", 
        element: <Services /> 
      },
      { 
        path: "/login", 
        element: <Login /> 
      },
      { 
        path: "/signup", 
        element: <Register /> 
      },
      { 
        path: "/profile", 
        element: <PrivateRoute><Profile /></PrivateRoute> 
      },
      { 
        path: "/details/:id", 
        element: <PrivateRoute><ServiceDetails /></PrivateRoute> 
      },
      { 
        path: "/forget/:email", 
        element: <ForgetPass /> 
      },
      { 
        path: "/add-services", 
        element: <PrivateRoute><AddService /></PrivateRoute> 
      },
      { 
        path: "/my-services", 
        element: <PrivateRoute><MyServices /></PrivateRoute> 
      },
      { 
        path: "/my-orders", 
        element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute> 
      },
      { 
        path: "/update-services/:id", 
        element: <PrivateRoute><UpdateService /></PrivateRoute> 
      },
      { 
        path: "/contact", 
        element: <PrivateRoute><Contact /></PrivateRoute> 
      },
      { 
        path: "/terms", 
        element: <PrivateRoute><Terms /></PrivateRoute> 
      },

      
      { 
        path: "/category-filtered-product/:categoryName", 
        element: <CategoryFilteredProduct /> 
      },
    ],
  },
]);

export default router;
