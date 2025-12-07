import React from 'react';

const Reasons = [
  {
    id: 1,
    title: "Give a Homeless Pet a Second Chance",
    description:
      "Thousands of pets are abandoned or left without proper care. Adopting from PawMart gives them the loving home they deserve."
  },
  {
    id: 2,
    title: "Adoption Is More Ethical Than Buying",
    description:
      "Buying pets often fuels unhealthy breeding practices. Adoption helps reduce overpopulation and promotes responsible pet ownership."
  },
  {
    id: 3,
    title: "Healthy, Vet-Checked & Ready for Love",
    description:
      "Every adopted pet from PawMart is health-checked, vaccinated, and cared for—ensuring they are safe, happy, and ready to join your family."
  }
];

const WinterCareTips = () => {
  return (
    <div className="py-12 bg-base-100">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Why Adopt from PawMart?
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {Reasons.map((reason) => (
          <div key={reason.id} className="card bg-base-200 shadow-lg p-6">
            <div className="card-body">
              <h3 className="card-title text-primary">{reason.title}</h3>
              <p className="text-sm opacity-80">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinterCareTips;
