import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate()
  const navLinks = <>
    <li>
      <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-xl md:font-medium mr-4 underline" : "lg:text-xl md:font-medium mr-4"} to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-xl md:font-medium mr-4 underline" : "lg:text-xl md:font-medium mr-4"} to="/Dashboard">
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-xl md:font-medium mr-4 underline" : "lg:text-xl md:font-medium mr-4"} to="/Blogs">
        Blogs
      </NavLink>
    </li>
    {
      user?.email ? '' : <li>
        <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-xl md:font-medium mr-4 underline" : "lg:text-xl md:font-medium mr-4"} to="/Register">
          Jon Now
        </NavLink>
      </li>
    }
  </>

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log out successfully!",
          showConfirmButton: false,
          timer: 1000
        });
        navigate("/")
      })
      .catch()
  }
  console.log(user);
  return (
    <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm text-black dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <div className="flex justify-center items-center gap-2 hidden lg:flex">
          <img src="logo (4).png" className="w-[50px]" alt="" />
          <p className=" text-xl">My-Task</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>{
            user ? <img className="w-[50px] h-[50px] rounded-full" src={user?.photoURL} alt="" /> : ''
          }</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-[#6C0A0F] rounded-box w-52">
            <li>{user?.displayName}</li>
            <li onClick={handleLogOut} className="cursor-pointer mt-2">LogOut</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;