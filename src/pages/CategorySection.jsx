// import React from 'react';
// import { Link } from 'react-router';

// const categories = [
//   {
//     name: 'Pets',
//     category: 'Pets',
//     icon: '🐾',
//   },
//   {
//     name: 'Pet Food',
//     category: 'Food',
//     icon: '🍖',
//   },
//   {
//     name: 'Accessories',
//     category: 'Accessories',
//     icon: '🎀',
//   },
//   {
//     name: 'Pet Care Products',
//     category: 'Care-products',
//     icon: '🧴',
//   },
// ];

// const CategoryCards = () => {
//   return (
//     <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-36">
//       <h2 className="text-3xl font-bold text-center text-primary mb-8">
//         Browse by Category
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {categories.map((cat) => (
//           <Link
//             key={cat.name}
//             to={`/category-filtered-product/${encodeURIComponent(cat.category)}`}
//           >
//             <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all p-6 flex flex-col items-center justify-center h-40 text-center">
//               <span className="text-4xl mb-2">{cat.icon}</span>
//               <h3 className="font-semibold text-lg">{cat.category}</h3>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryCards;
import React from "react";
import { Link } from "react-router";
import { FaPaw, FaHamburger, FaShoppingBag, FaShieldAlt } from "react-icons/fa";

const categories = [
  {
    name: "Pets",
    category: "Pets",
    icon: <FaPaw className="text-3xl" />,
    gradient: "from-[#1C9B8E] to-[#53DFD1]",
    bg: "bg-gradient-to-br from-[#1C9B8E]/10 to-[#53DFD1]/10",
  },
  {
    name: "Pet Food",
    category: "Food",
    icon: <FaHamburger className="text-3xl" />,
    gradient: "from-[#53DFD1] to-[#0F1E64]",
    bg: "bg-gradient-to-br from-[#53DFD1]/10 to-[#0F1E64]/10",
  },
  {
    name: "Accessories",
    category: "Accessories",
    icon: <FaShoppingBag className="text-3xl" />,
    gradient: "from-[#0F1E64] to-[#1C9B8E]",
    bg: "bg-gradient-to-br from-[#0F1E64]/10 to-[#1C9B8E]/10",
  },
  {
    name: "Pet Care Products",
    category: "Care-products",
    icon: <FaShieldAlt className="text-3xl" />,
    gradient: "from-[#1C9B8E] to-[#0F1E64]",
    bg: "bg-gradient-to-br from-[#1C9B8E]/10 to-[#0F1E64]/10",
  },
];

const CategoryCards = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
              Browse by Category
            </span>
          </h2>
          <p className="text-[#0F1E64] max-w-2xl mx-auto">
            Explore our wide range of pet products and services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category-filtered-product/${encodeURIComponent(
                cat.category
              )}`}
              className="group"
            >
              <div
                className={`${cat.bg} border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center justify-center h-48 text-center transform hover:-translate-y-2`}
              >
                {/* Icon Container */}
                <div
                  className={`mb-4 p-4 rounded-xl bg-gradient-to-r ${cat.gradient}`}
                >
                  <div className="text-white">{cat.icon}</div>
                </div>

                {/* Category Name */}
                <h3 className="font-bold text-xl text-[#0F1E64] mb-2 group-hover:text-[#1C9B8E] transition-colors">
                  {cat.category}
                </h3>

                {/* Description */}
                <p className="text-[#0F1E64] text-sm">{cat.name}</p>

                {/* Hover Indicator */}
                <div className="mt-4 w-0 group-hover:w-10 h-1 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-full transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#1C9B8E] hover:text-[#0F1E64] font-medium transition-colors"
          >
            View all categories
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCards;
