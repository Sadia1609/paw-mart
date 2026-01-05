import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import pawLogo from "../assets/logo.png";
import { motion } from "framer-motion";
import Pages from "../pages/Pages";
import { FaMoon, FaSun, FaUser, FaShoppingCart } from "react-icons/fa";

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

  const handleThemeChange = () => setIsChecked((prev) => !prev);

  const handleSignout = () => signOut(auth);

  return (
    <nav className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white shadow-lg w-full z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white p-1 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                <img src={pawLogo} alt="PawMart Logo" className="h-8 w-8" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                Paw<span className="text-[#53DFD1]">Mart</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              className="hover:text-[#53DFD1] font-medium transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:text-[#53DFD1] font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10 text-white"
              to="/services"
            >
              Pets & Supplies
            </Link>
           
            <Link
              className="hover:text-[#53DFD1] font-medium transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10"
              to="/blog"
            >
              Blog
            </Link>
            {user && (
              <>
                <Link
                  className="hover:text-[#53DFD1] font-medium transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                
              </>

            )}
             <Pages></Pages>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <label className="flex cursor-pointer gap-2 items-center bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors duration-200">
              <div className="flex items-center">
                {isChecked ? (
                  <FaMoon className="text-[#53DFD1] text-lg" />
                ) : (
                  <FaSun className="text-yellow-300 text-lg" />
                )}
              </div>
              <input
                type="checkbox"
                className="toggle toggle-sm bg-[#0F1E64] border-[#53DFD1]"
                checked={isChecked}
                onChange={handleThemeChange}
              />
            </label>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Link to="/profile" className="avatar group">
                    <div className="w-10 h-10 rounded-full ring-2 ring-[#53DFD1] ring-offset-2 ring-offset-[#0F1E64] overflow-hidden group-hover:ring-4 transition-all duration-300">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] flex items-center justify-center">
                          <FaUser className="text-white text-lg" />
                        </div>
                      )}
                    </div>
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="btn btn-sm bg-white text-[#0F1E64] hover:bg-[#53DFD1] hover:text-white border-0 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-sm bg-white/10 text-white hover:bg-white/20 border border-white/30 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-sm bg-[#53DFD1] text-[#0F1E64] hover:bg-[#1C9B8E] hover:text-white border-0 font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-gradient-to-b from-[#1C9B8E] to-[#0F1E64] shadow-lg"
        >
          <ul className="flex flex-col p-4 space-y-1">
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/"
                className="block px-4 py-3 rounded-lg hover:bg-white/10 text-white font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/services"
                className="block px-4 py-3 rounded-lg bg-[#0F1E64] text-white hover:bg-[#1C9B8E] font-medium mx-2 mb-2"
              >
                Pets & Supplies
              </Link>
            </li>

            {/* Pages Dropdown Items */}
            <li className="px-4 py-2 text-[#53DFD1] font-bold text-sm uppercase tracking-wider">
              Pages
            </li>
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/about"
                className="block px-6 py-2 rounded-lg bg-[#0F1E64] text-white hover:bg-[#1C9B8E] ml-2 mb-1"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/contact"
                className="block px-6 py-2 rounded-lg bg-[#0F1E64] text-white hover:bg-[#1C9B8E] ml-2 mb-1"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/faq"
                className="block px-6 py-2 rounded-lg bg-[#0F1E64] text-white hover:bg-[#1C9B8E] ml-2 mb-1"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/team"
                className="block px-6 py-2 rounded-lg bg-[#0F1E64] text-white hover:bg-[#1C9B8E] ml-2 mb-1"
              >
                Our Team
              </Link>
            </li>

            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/blog"
                className="block px-4 py-3 rounded-lg hover:bg-white/10 text-white font-medium"
              >
                Blog
              </Link>
            </li>

            {user && (
              <>
                <li className="px-4 py-2 text-[#53DFD1] font-bold text-sm uppercase tracking-wider">
                  My Account
                </li>
                <li>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to="/dashboard"
                    className="block px-6 py-2 rounded-lg hover:bg-white/10 text-white ml-2"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to="/profile"
                    className="block px-6 py-2 rounded-lg hover:bg-white/10 text-white ml-2"
                  >
                    <FaUser className="inline mr-2" />
                    Profile
                  </Link>
                </li>
                <li className="pt-4">
                  <button
                    onClick={() => {
                      handleSignout();
                      setMenuOpen(false);
                    }}
                    className="btn w-full bg-white text-[#0F1E64] hover:bg-[#53DFD1] hover:text-white border-0 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li className="pt-4 space-y-3">
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to="/login"
                    className="btn w-full bg-white/10 text-white hover:bg-white/20 border border-white/30 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to="/signup"
                    className="btn w-full bg-[#53DFD1] text-[#0F1E64] hover:bg-[#1C9B8E] hover:text-white border-0 font-medium"
                  >
                    Register
                  </Link>
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
