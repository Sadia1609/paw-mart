// import React, { useEffect, useState } from "react";
// import { Link } from "react-router";

// const PopularSection = () => {
//   const [services, setServices] = useState([]);

//   // useEffect(() => {
//   //   axios.get('https://paw-mart-two.vercel.app/recent-services')
//   //     .then(res=>{
//   //       setServices(res.data)
//   //       console.log(res.data);

//   //     })
//   //     .catch(err => {
//   //       console.log(err);

//   //     })
//   // }, []);

//   // API base URL
//   const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//   // Fetch services based on category and search
//   useEffect(() => {
//     let url = `/api/services?recent-services`;

//     fetch(url)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => setServices(data))
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         // Optionally show error message to user
//       });
//   }, [API_BASE_URL]);

//   return (
//     <div className="mt-8 px-4 md:px-10 lg:px-[130px]">
//       <div>
//         <h3 className="font-bold text-2xl md:text-3xl text-center">
//           Recent Listings
//         </h3>
//         <p className="text-center">Freshly Added pets and supplies</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 gap-8 md:gap-10">
//         {services.map((service) => (
//           <div key={service._id} className="card bg-base-100 w-full shadow-sm">
//             <figure>
//               <img
//                 className="w-full h-[250px] md:h-[300px] object-cover"
//                 src={service.image}
//                 alt={service.name}
//               />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{service.name}</h2>
//               <div className="flex justify-between">
//                 <p>Price: {service.price}</p>
//                 <p>Category: {service.category}</p>
//               </div>
//               <div className="card-actions justify-end">
//                 <Link to={`/details/${service._id}`}>
//                   <button className="btn btn-primary btn-sm sm:btn-md">
//                     View Details
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularSection;

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaTag, FaPaw, FaHeart, FaEye } from "react-icons/fa";

const PopularSection = () => {
  const [services, setServices] = useState([]);

  // useEffect(() => {
  //   axios.get('https://paw-mart-two.vercel.app/recent-services')
  //     .then(res=>{
  //       setServices(res.data)
  //       console.log(res.data);

  //     })
  //     .catch(err => {
  //       console.log(err);

  //     })
  // }, []);

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch services based on category and search
  useEffect(() => {
    let url = `${API_BASE_URL}/services?recent-services`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setServices(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        // Optionally show error message to user
      });
  }, [API_BASE_URL]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-xl mb-4">
            <FaPaw className="text-2xl text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
              Recent Listings
            </span>
          </h3>
          <p className="text-[#0F1E64] text-lg">
            Just in! Adorable new pets and top-notch supplies 🐾
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={service.image}
                  alt={service.name}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <FaTag className="text-xs" />
                    {service.category}
                  </span>
                </div>
                {/* Like Button */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#53DFD1] hover:text-white transition-colors">
                  <FaHeart className="text-[#1C9B8E]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-[#1C9B8E] transition-colors line-clamp-1">
                  {service.name}
                </h2>

                {/* Price and Category */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Price
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64]">
                      ${service.price}
                    </p>
                  </div>
                </div>

                {/* Category Info */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#1C9B8E]/5 to-[#0F1E64]/5 rounded-lg mb-6">
                  <div className="flex items-center gap-2">
                    <FaPaw className="text-[#53DFD1]" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Category
                    </span>
                  </div>
                  <span className="text-[#0F1E64] dark:text-[#53DFD1] font-semibold">
                    {service.category}
                  </span>
                </div>

                {/* View Details Button */}
                <div className="card-actions">
                  <Link to={`/details/${service._id}`} className="w-full">
                    <button className="btn w-full bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0 hover:opacity-90 transition-all duration-300 group/btn">
                      <FaEye className="mr-2" />
                      View Details
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
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
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link - Optional */}
        {services.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#1C9B8E] hover:text-[#0F1E64] font-medium text-lg transition-colors px-6 py-3 rounded-full hover:bg-gradient-to-r from-[#1C9B8E]/10 to-[#0F1E64]/10"
            >
              View All Listings
              <svg
                className="w-5 h-5"
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
        )}
      </div>
    </div>
  );
};

export default PopularSection;
