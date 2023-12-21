import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

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
                element: <Dashboard></Dashboard>
            },
            {
                path: "/Login",
                element: <Login></Login>
            },
            {
                path: "/Register",
                element: <Register></Register>
            }
        ]
    },
]);

export default router;