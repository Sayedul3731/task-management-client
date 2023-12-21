/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivetRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <div className="flex justify-center items-center min-h-[300px]"> <span className="loading loading-ball loading-lg"></span></div>
    }
    if(user){
        return children
    }
    return <Navigate to="/Login" state={{from : location}} replace></Navigate>
};

export default PrivetRoutes;