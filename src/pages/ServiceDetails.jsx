import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ServiceDetails = () => {
     const [service, setService] = useState([]);
    const {id} = useParams()
    
        
          useEffect(() => {
            fetch(`http://localhost:3000/services/${id}`)
              .then(res => res.json())
              .then(data => setService(data))
              .catch(err => console.log(err));
          }, [id]);

         
    return (
        <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-8 space-y-6 text-center">
  <img
    className="w-full max-w-md rounded-lg shadow-md object-cover"
    src={service?.image}
    alt=""
  />
  <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl">
    {service?.description}
  </p>
</div>

    );
};

export default ServiceDetails;