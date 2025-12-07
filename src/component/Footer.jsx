// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="footer sm:footer-horizontal bg-blue-50 text-gray-800 p-10">
      
//       <aside className="flex flex-col items-start sm:items-center">
//         <svg
//           width="50"
//           height="50"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//           fillRule="evenodd"
//           clipRule="evenodd"
//           className="fill-current text-blue-400 mb-2"
//         >
//           <path d="M12 2C8 2 4 6 4 10c0 4 4 10 8 12 4-2 8-8 8-12 0-4-4-8-8-8zm0 2c3 0 6 2.5 6 6 0 2-2 6-6 8-4-2-6-6-6-8 0-3 3-6 6-6z" />
//         </svg>
//         <p className="font-semibold">
//           Winter Pet Care
//           <br />
//           Keeping your pets warm & healthy
//         </p>
//       </aside>

      
//       <nav>
//         <h6 className="footer-title">Our Services</h6>
//         <a className="link link-hover">Pet Boarding</a>
//         <a className="link link-hover">Grooming</a>
//         <a className="link link-hover">Winter Health Tips</a>
//         <a className="link link-hover">Vaccinations</a>
//       </nav>

      
//       <nav>
//         <h6 className="footer-title">Company</h6>
//         <a className="link link-hover">About Us</a>
//         <a className="link link-hover">Contact</a>
//         <a className="link link-hover">Careers</a>
//         <a className="link link-hover">Testimonials</a>
//       </nav>

    
//       <nav>
//         <h6 className="footer-title">Legal</h6>
//         <a className="link link-hover">Terms of Service</a>
//         <a className="link link-hover">Privacy Policy</a>
//         <a className="link link-hover">Cookie Policy</a>
//       </nav>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import pawLogo from '../assets/logo.png'; // make sure you have your logo

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-blue-50 text-gray-800 p-10">
      
      {/* Logo + Site Name + Description */}
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

      {/* Useful Links */}
      <nav>
        <h6 className="footer-title">Useful Links</h6>
        <a href="/" className="link link-hover">Home</a>
        <a href="/contact" className="link link-hover">Contact</a>
        <a href="/terms" className="link link-hover">Terms</a>
      </nav>

    </footer>
  );
};

export default Footer;
