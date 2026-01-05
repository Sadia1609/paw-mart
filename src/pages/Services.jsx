import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { FaSearch, FaFilter, FaPaw, FaHeart } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch services based on category and search
  useEffect(() => {
    let url = `${API_BASE_URL}/services?category=${category}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

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
  }, [category, search, API_BASE_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#53DFD1]/5 to-[#1C9B8E]/5">
      <div className="px-4 sm:px-8 md:px-16 lg:px-36 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-2xl mb-6 shadow-lg">
            <FaPaw className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
              Premium Pets & Supplies
            </span>
          </h1>
          <p className="text-[#0F1E64] text-lg md:text-xl max-w-2xl mx-auto">
            Discover the finest collection of pets, food, accessories, and care products for your beloved companions 🐾
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1C9B8E] text-lg" />
              <input
                type="text"
                placeholder="Search pets, food, accessories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#53DFD1]/30 focus:border-[#1C9B8E] focus:outline-none text-[#0F1E64]"
              />
            </div>
            
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1C9B8E] text-lg" />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="select select-bordered pl-12 pr-8 py-3 rounded-xl border-2 border-[#53DFD1]/30 focus:border-[#1C9B8E] focus:outline-none text-[#0F1E64] bg-white min-w-[200px]"
              >
                <option value="">All Categories</option>
                <option value="pets">🐕 Adorable Pets</option>
                <option value="food">🍖 Premium Food</option>
                <option value="accessories">🎾 Fun Accessories</option>
                <option value="care-products">💊 Health & Care</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              key={service._id}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <figure className="relative overflow-hidden">
                <img
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  src={service?.image}
                  alt={service?.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <FaHeart className="text-[#1C9B8E] text-lg" />
                  </div>
                </div>
              </figure>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1]"></div>
                  <span className="text-xs font-medium text-[#53DFD1] uppercase tracking-wider">
                    {service?.category === 'pets' ? '🐕 Pet' : 
                     service?.category === 'food' ? '🍖 Food' :
                     service?.category === 'accessories' ? '🎾 Accessory' : '💊 Care Product'}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-[#0F1E64] mb-3 group-hover:text-[#1C9B8E] transition-colors duration-300 line-clamp-2">
                  {service?.name}
                </h2>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#1C9B8E]">
                      ${service?.price}
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-gradient-to-r from-[#53DFD1]/20 to-[#1C9B8E]/20 rounded-full">
                    <span className="text-sm font-medium text-[#0F1E64]">
                      {service?.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link to={`/details/${service?._id}`} className="flex-1">
                    <button className="btn w-full bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1] text-white border-0 hover:from-[#0F1E64] hover:to-[#1C9B8E] font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1] rounded-full flex items-center justify-center mx-auto mb-6">
              <FaPaw className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F1E64] mb-2">No Products Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;