import React, { useEffect, useState } from 'react';

const PopularSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('./services.json')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="mt-8 px-4 md:px-10 lg:px-[130px]">
      <div>
        <h3 className="font-bold text-2xl md:text-3xl text-center">
          Popular Winter Care Services
        </h3>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 gap-8 md:gap-10">
        {services.slice(0,6).map(service => (
          <div key={service.serviceId} className="card bg-base-100 w-full shadow-sm">
            <figure>
              <img
                className="w-full h-[250px] md:h-[300px] object-cover"
                src={service?.image}
                alt={service?.serviceName}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service?.serviceName}</h2>
              <div className="flex justify-between">
                <p>Price: {service?.price}</p>
                <p>Rating: {service?.rating}</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSection;
