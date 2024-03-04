import { createBrowserRouter, Outlet } from "react-router-dom";
import Signup from "../components/Signup";
import Details from "../components/Details";

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
        path: "/",
        element: <Signup/>,
        exact: true,
    },
    
]);

export default router;