import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState(''); // <-- search state

  // Fetch services based on category and search
  useEffect(() => {
    let url = `http://localhost:3000/services?category=${category}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`; // add search query param
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.log(err));
  }, [category, search]);

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-36 py-8 sm:py-12">
      <div>
        <h3 className="font-bold text-center text-3xl text-blue-400">Fresh Pet & Supplies</h3>
      </div>

      
      <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
      
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="select"
        >
          <option value="">All Categories</option>
          <option value="pets">Pets</option>
          <option value="food">Food</option>
          <option value="accessories">Accessories</option>
          <option value="care-products">Care Products</option>
        </select>

       
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered"
        />
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-6 sm:gap-8 md:gap-10">
        {services.map(service => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 1 } }}
            key={service._id}
            className="card bg-base-100 w-full shadow-sm"
          >
            <figure>
              <img
                className="w-full h-56 sm:h-64 md:h-72 object-cover"
                src={service?.image}
                alt={service?.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service?.name}</h2>
              <div className="flex justify-between text-sm sm:text-base">
                <p>Price: {service?.price}</p>
                <p>Category: {service?.category}</p>
              </div>
              <div className="card-actions justify-end mt-2">
                <Link to={`/details/${service?._id}`}>
                  <button className="btn btn-primary btn-sm sm:btn-md">View Details</button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;


