import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import pawLogo from '../assets/logo.png';

const Navbar = () => {
  const { user } = useContext(AuthContext);
 const [isChecked, setIsChecked] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark";
});



  //toggle
 
   useEffect(() => {
  const theme = isChecked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);

  localStorage.setItem("theme", theme);
}, [isChecked]);

 const handleThemeChange = ()=>{
    setIsChecked(prev => !prev);
  }


  const handleSignout = () => {
    signOut(auth);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Pets & Supplies</Link>
            </li>
           
           {
            user && (
              <>
               <li>
              <Link to={"/profile"}>My Profile</Link>
            </li>
            <li>
              <Link to={"/add-services"}>Add Services</Link>
            </li>
            <li>
              <Link to={"/my-services"}>My Services</Link>
          </li>
           <li>
              <Link to={"/my-orders"}>My Orders</Link>
          </li>
              </>
            )
           }
          </ul>
        </div>
       <div className="flex items-center gap-2">
        <img src={pawLogo} alt="" className="h-8 w-8" />
        <span className="text-xl font-bold">PawMart</span>
      </div>

      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Pets & Supplies</Link>
          </li>
         {
            user && (
              <>
               <li>
              <Link to={"/profile"}>My Profile</Link>
            </li>
            <li>
              <Link to={"/add-services"}>Add Services</Link>
            </li>
            <li>
              <Link to={"/my-services"}>My Services</Link>
          </li>
          <li>
              <Link to={"/my-orders"}>My Orders</Link>
          </li>
              </>
            )
           }
        </ul>
      </div>


      <div className="navbar-end gap-4">
       
      
        {user ? (


<>


              <div className="avatar cursor-pointer">
        <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={user.photoURL}
            alt="Profile"
          />
        </div>
      </div>


        
          <button onClick={handleSignout} className="btn">
            
            Logout
          </button>
          </>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div> 

       





      
         <div className='navbar-end'>
           <label className="flex cursor-pointer gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
  <input onClick={handleThemeChange} checked={isChecked} type="checkbox" value="synthwave" className="toggle theme-controller" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</label>

         </div>

    </div>
  );
};

export default Navbar;
