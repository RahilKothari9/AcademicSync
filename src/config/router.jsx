import { createBrowserRouter, Outlet } from "react-router-dom";
import Signup from "../components/Signup";
import Details from "../components/Details";
import UserDetails from "../components/UserDetails";
import Dashboard from "../components/Dashboard";

const router = createBrowserRouter([
    {
        path: "/signup",
        element: <Signup/>,
        exact: true,
    },
    {
        path: "/details",
        element: <Details/>,
        exact: true,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        exact: true,
    },
    {
        path: "/",
        element: <Dashboard/>,
        exact: true,
    },
    {
        path: "/profile",
        element: <UserDetails/>,
        exact: true,
    },
    
]);

export default router;