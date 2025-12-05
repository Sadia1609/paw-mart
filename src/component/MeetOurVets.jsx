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
        <div className='py-12 bg-base-100'>
            <h2 className='text-3xl font-bold text-center text-primary mb-8'>Meet Our Expert Vets</h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4'>
                {vets.map((vet) => (
                    <div key={vet.id} className='card bg-base-200 shadow-lg'>
                        <figure>
                            <img src={vet.image} alt={vet.name}
                            
                            className='h-48 w-full object-cover'

                            />

                        </figure>
                        <div className='card-body'>
                            <h3 className='card-title text-primary'>{vet.name}</h3>
                            <p className='text-sm font-semibold'>{vet.specialization}</p>
                            <p className='opacity-70 text-sm'>{vet.experience}</p>

                            <button className='btn btn-primary btn-sm mt-3'>Book Appointment</button>

                        </div>

                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default MeetOurVets;