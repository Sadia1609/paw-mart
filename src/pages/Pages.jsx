import { Link } from "react-router";

const Pages = () => {
  return (
    <div className="relative">
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="text-white hover:bg-[#1C9B8E] font-medium transition-colors duration-200 px-3 py-2 rounded-lg cursor-pointer">
          More
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white dark:bg-gray-800 rounded-2xl z-50 w-52 p-3 shadow-2xl border border-gray-100 dark:border-gray-700 "
        >
          <li className="mb-1">
            <Link 
              to="/about-us" 
              className="bg-[#0F1E64] text-white hover:bg-[#1C9B8E] rounded-lg px-4 py-2 transition-all duration-200 font-medium block"
            >
              About Us
            </Link>
          </li>
          <li className="mb-1">
            <Link 
              to="/contact" 
              className="bg-[#0F1E64] text-white hover:bg-[#1C9B8E] rounded-lg px-4 py-2 transition-all duration-200 font-medium block"
            >
              Contact Us
            </Link>
          </li>
          <li className="mb-1">
            <Link 
              to="/faq" 
              className="bg-[#0F1E64] text-white hover:bg-[#1C9B8E] rounded-lg px-4 py-2 transition-all duration-200 font-medium block"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link 
              to="/our-team" 
              className="bg-[#0F1E64] text-white hover:bg-[#1C9B8E] rounded-lg px-4 py-2 transition-all duration-200 font-medium block"
            >
              Our Team
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pages;
