import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const PopularSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('https://paw-mart-two.vercel.app/recent-services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.log(err));
  }, []);

  

  return (
    <div className="mt-8 px-4 md:px-10 lg:px-[130px]">
      <div>
        <h3 className="font-bold text-2xl md:text-3xl text-center">
          Recent Listings
        </h3>
        <p className='text-center'>Freshly Added pets and supplies</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 gap-8 md:gap-10">
        {services.map(service => (
          <div key={service._id} className="card bg-base-100 w-full shadow-sm">
            <figure>
              <img
                className="w-full h-[250px] md:h-[300px] object-cover"
                src={service.image}
                alt={service.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.name}</h2>
              <div className="flex justify-between">
                <p>Price: {service.price}</p>
                <p>Category: {service.category}</p>
              </div>
              <div className="card-actions justify-end">
                <Link to={`/details/${service._id}`}>
                  <button className="btn btn-primary btn-sm sm:btn-md">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSection;
