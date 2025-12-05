import React from 'react';

const Tips = [
  {
    id: 1,
    title: "Keep Your Pet Warm Indoors",
    description: "Avoid letting pets sleep on cold floors. Use warm bedding, blankets, or insulated pet beds to maintain body heat.",
    image: "https://i.ibb.co.com/7N0j3pc5/pet-warm.jpg"
  },
  {
    id: 2,
    title: "Protect Their Paws",
    description: "Snow, ice, and salt can cause irritation. Clean paws after walks and use paw balm or booties for extra protection.",
    image: "https://i.ibb.co.com/kVyc8VLY/protect.jpg"
  },
  {
    id: 3,
    title: "Maintain Proper Hydration",
    description: "Pets may drink less in winter. Ensure they have access to fresh water and monitor for signs of dehydration.",
    image: "https://i.ibb.co.com/99XdXXSD/hydration.jpg"
  },
 
];

const WinterCareTips = () => {
  return (
    <div className="py-12 bg-base-100">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Winter Care Tips for Your Pets
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {Tips.map((tip) => (
          <div key={tip.id} className="card bg-base-200 shadow-lg">
            <figure>
              <img
                src={tip.image}
                alt={tip.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title text-primary">{tip.title}</h3>
              <p className="text-sm opacity-80">{tip.description}</p>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinterCareTips;
