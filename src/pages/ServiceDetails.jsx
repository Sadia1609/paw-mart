import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ServiceDetails = () => {
     const [services, setServices] = useState([]);
    const {id} = useParams()
    
        
          useEffect(() => {
            fetch('/services.json')
              .then(res => res.json())
              .then(data => setServices(data))
              .catch(err => console.log(err));
          }, []);

         const findResult = services.find(service=> service.serviceId == id)
         console.log(findResult)
    return (
        <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-8 space-y-6 text-center">
  <img
    className="w-full max-w-md rounded-lg shadow-md object-cover"
    src={findResult?.image}
    alt={findResult?.serviceName || "Service Image"}
  />
  <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl">
    {findResult?.description}
  </p>
</div>

    );
};

export default ServiceDetails;