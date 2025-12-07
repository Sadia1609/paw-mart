import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import pawLogo from '../assets/logo.png';
import { motion } from "framer-motion";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const [isChecked, setIsChecked] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const theme = isChecked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isChecked]);

  const handleThemeChange = () => setIsChecked(prev => !prev);

  const handleSignout = () => signOut(auth);

  return (
    <nav className="bg-base-100 shadow-sm w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src={pawLogo} alt="PawMart Logo" className="h-8 w-8" />
            </Link>
            <span className="font-bold text-xl">PawMart</span>
          </div>

          
          <div className="hidden lg:flex items-center space-x-4">
            <Link className="hover:text-primary" to="/">Home</Link>
            <Link className="hover:text-primary" to="/services">Pets & Supplies</Link>
            {user && (
              <>
                <Link className="hover:text-primary" to="/add-services">Add Listing</Link>
                <Link className="hover:text-primary" to="/my-services">My Listings</Link>
                <Link className="hover:text-primary" to="/my-orders">My Orders</Link>
              </>
            )}
          </div>

          
          <div className="flex items-center gap-2">
            <label className="flex cursor-pointer gap-1 items-center">
              <input
                type="checkbox"
                className="toggle"
                checked={isChecked}
                onChange={handleThemeChange}
              />
              <span className="text-sm">{isChecked ? "Dark" : "Light"}</span>
            </label>
          </div>

          
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/profile" className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user.photoURL} alt="Profile" />
                  </div>
                </Link>
                <button className="btn btn-sm" onClick={handleSignout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm">Login</Link>
                <Link to="/signup" className="btn btn-neutral btn-sm">Register</Link>
              </>
            )}
          </div>

          
          <div className="lg:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

     
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-base-100 shadow-md"
        >
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
            </li>
            <li>
              <Link onClick={() => setMenuOpen(false)} to="/services">Pets & Supplies</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link onClick={() => setMenuOpen(false)} to="/add-services">Add Listing</Link>
                </li>
                <li>
                  <Link onClick={() => setMenuOpen(false)} to="/my-services">My Listings</Link>
                </li>
                <li>
                  <Link onClick={() => setMenuOpen(false)} to="/my-orders">My Orders</Link>
                </li>
                <li>
                  <Link onClick={() => setMenuOpen(false)} to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleSignout} className="btn w-full">Logout</button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link onClick={() => setMenuOpen(false)} to="/login" className="btn w-full">Login</Link>
                </li>
                <li>
                  <Link onClick={() => setMenuOpen(false)} to="/signup" className="btn w-full btn-neutral">Register</Link>
                </li>
              </>
            )}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
