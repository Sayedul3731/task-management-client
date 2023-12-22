import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivetRoutes from "./PrivetRoutes";
import Profile from "../components/Profile/Profile";
import Blogs from "../Pages/Blogs/Blogs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/Dashboard",
                element: <PrivetRoutes><Dashboard></Dashboard></PrivetRoutes>
            },
            {
                path: "/Login",
                element: <Login></Login>
            },
            {
                path: "/Register",
                element: <Register></Register>
            },
            {
                path: "/Profile",
                element: <Profile></Profile>
            },
            {
                path: "/Blogs",
                element: <Blogs></Blogs>
            }
        ]
    },
]);

export default router;