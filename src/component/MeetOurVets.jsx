import React from 'react';

const vets = [
    {
    id: 1,
    name: "Dr. Alicia Snow",
    specialization: "Winter Dermatology & Paw Care",
    experience: "8 years Exp.",
    image: "https://i.ibb.co.com/DH2nk7zV/alicia.jpg"
  },
  {
    id: 2,
    name: "Dr. Marcus Frost",
    specialization: "Cold-Weather Respiratory Care",
    experience: "10 years Exp.",
    image: "https://i.ibb.co.com/zWc67BFm/marcus.jpg"
  },
  {
    id: 3,
    name: "Dr. Helena Arctic",
    specialization: "Winter Nutrition & Coat Health",
    experience: "6 years Exp.",
    image: "https://i.ibb.co.com/dwHjpzhr/helena.jpg"
  }

]


const MeetOurVets = () => {
    return (
        <div className='py-12 bg-gradient-to-br from-[#1C9B8E]/10 to-[#0F1E64]/10'>
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-xl mb-4">
                        <span className="text-2xl text-white">👨‍⚕️</span>
                    </div>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                            Meet Our Pet Heroes
                        </span>
                    </h2>
                    <p className="text-[#0F1E64] text-lg">
                        Expert veterinarians dedicated to your pet's health 🩺
                    </p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {vets.map((vet) => (
                        <div key={vet.id} className='bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group'>
                            <figure className="relative overflow-hidden">
                                <img src={vet.image} alt={vet.name}
                                    className='h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500'
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </figure>
                            <div className='p-6'>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1]"></div>
                                    <span className="text-xs font-medium text-[#53DFD1] uppercase tracking-wider">Veterinarian</span>
                                </div>
                                <h3 className='text-xl font-bold text-[#0F1E64] mb-2 group-hover:text-[#1C9B8E] transition-colors duration-300'>
                                    {vet.name}
                                </h3>
                                <p className='text-sm font-semibold text-gray-700 mb-2'>{vet.specialization}</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                                    <p className='text-sm text-gray-600'>{vet.experience}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MeetOurVets;