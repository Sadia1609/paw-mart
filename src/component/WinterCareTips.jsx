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
    <div className="py-12 bg-gradient-to-br from-[#53DFD1]/10 to-[#1C9B8E]/10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-xl mb-4">
            <span className="text-2xl text-white">🐾</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
              Why Adopt from PawMart?
            </span>
          </h2>
          <p className="text-[#0F1E64] text-lg">
            Give a loving home to pets in need 💕
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Reasons.map((reason) => (
            <div key={reason.id} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="card-body p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">
                    {reason.id === 1 ? '🏠' : reason.id === 2 ? '❤️' : '🩺'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1E64] mb-3 group-hover:text-[#1C9B8E] transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinterCareTips;
