import React from 'react';
import pawLogo from '../assets/logo.png'; 
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-blue-50 text-gray-800 p-10">
      
      
      <aside className="flex flex-col items-start sm:items-center">
        <div className="flex items-center gap-2 mb-2">
          <img src={pawLogo} alt="PawMart Logo" className="h-10 w-10" />
          <span className="text-xl font-bold">PawMart</span>
        </div>
        <p className="text-gray-700 text-sm text-left sm:text-center max-w-xs">
          PawMart connects local pet owners and buyers for adoption and pet care products.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          &copy; {new Date().getFullYear()} PawMart. All rights reserved.
        </p>
      </aside>

     
      <nav>
        <h6 className="footer-title">Useful Links</h6>
        <div className='flex gap-2'>
          
        <FaSquareXTwitter />
        <FaFacebookSquare />
        </div>
        <a href="/" className="link link-hover">Home</a>
        <a href="/contact" className="link link-hover">Contact</a>
        <a href="/terms" className="link link-hover">Terms</a>
      </nav>

    </footer>
  );
};

export default Footer;
