import React from "react";
import {
  FaPaw,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";
import {
  MdPets,
  MdLocalGroceryStore,
  MdHealthAndSafety,
  MdStar,
} from "react-icons/md";

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Head Veterinarian",
      experience: "12 years",
      specialty: "Pet Surgery & Emergency Care",
      quote: "Every pet deserves the best medical care possible.",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", // Replace with your image
      social: { linkedin: "#", twitter: "#", instagram: "#" },
      color: "from-[#1C9B8E] to-[#53DFD1]",
      icon: <MdHealthAndSafety />,
    },
    {
      name: "Michael Rodriguez",
      role: "Adoption Specialist",
      experience: "8 years",
      specialty: "Pet Behavior & Matching",
      quote:
        "Finding the perfect match between pets and families is my passion.",
      image:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop", // Replace with your image
      social: { linkedin: "#", twitter: "#", instagram: "#" },
      color: "from-[#53DFD1] to-[#0F1E64]",
      icon: <MdPets />,
    },
    {
      name: "Emily Chen",
      role: "Product Manager",
      experience: "10 years",
      specialty: "Pet Nutrition & Supplies",
      quote: "Quality products mean healthier, happier pets.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w-400&h=400&fit=crop", // Replace with your image
      social: { linkedin: "#", twitter: "#", instagram: "#" },
      color: "from-[#0F1E64] to-[#1C9B8E]",
      icon: <MdLocalGroceryStore />,
    },
    {
      name: "David Wilson",
      role: "Grooming Expert",
      experience: "15 years",
      specialty: "Breed-Specific Grooming",
      quote: "A well-groomed pet is a happy, confident pet.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", // Replace with your image
      social: { linkedin: "#", twitter: "#", instagram: "#" },
      color: "from-[#1C9B8E] to-[#0F1E64]",
      icon: <FaPaw />,
    },
    {
      name: "Jessica Miller",
      role: "Customer Care Manager",
      experience: "7 years",
      specialty: "Pet Owner Support & Education",
      quote: "Supporting pet parents is as important as caring for pets.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop", // Replace with your image
      social: { linkedin: "#", twitter: "#", instagram: "#" },
      color: "from-[#53DFD1] to-[#1C9B8E]",
      icon: <FaHeart />,
    },
    {
      name: "Robert Brown",
      role: "Training Specialist",
      experience: "14 years",
      specialty: "Behavior Modification",
      quote: "Patience and positive reinforcement create amazing bonds.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      social: { linkedin: "#", twitter: "#", instagram: "#" },
      color: "from-[#0F1E64] to-[#53DFD1]",
      icon: <MdStar />,
    },
  ];

  const stats = [
    {
      label: "Team Members",
      value: "25+",
      description: "Dedicated professionals",
    },
    {
      label: "Years Combined Experience",
      value: "150+",
      description: "In pet care",
    },
    { label: "Pets Helped", value: "10,000+", description: "And counting" },
    {
      label: "Certifications",
      value: "50+",
      description: "Professional credentials",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#1C9B8E]/10 via-[#53DFD1]/5 to-[#0F1E64]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-2xl mb-6">
              <FaPaw className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                Meet Our Team
              </span>
            </h1>
            <p className="text-xl text-[#0F1E64] max-w-3xl mx-auto">
              Passionate professionals dedicated to the well-being of your furry
              family members
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="card-body text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64]">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-[#0F1E64]">
                    {stat.label}
                  </div>
                  <div className="text-sm text-[#0F1E64]">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F1E64]">
              Our Expert Team
            </h2>
            <p className="text-[#1C9B8E] max-w-2xl mx-auto">
              Meet the dedicated professionals who make PawMart exceptional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
              >
                {/* Image Section */}
                <figure className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-20`}
                  ></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <div className="text-[#0F1E64]">{member.icon}</div>
                  </div>
                </figure>

                {/* Content Section */}
                <div className="card-body p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="card-title text-xl text-gray-800 dark:text-white">
                        {member.name}
                      </h3>
                      <div className="badge badge-lg mt-1 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  {/* Experience & Specialty */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                      <span className="text-sm font-medium text-[#0F1E64]">
                        {member.experience} experience
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                      <span className="text-sm text-[#0F1E64]">
                        Specialty: {member.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mb-6">
                    <p className="text-[#0F1E64] italic">"{member.quote}"</p>
                  </div>

                  {/* Social Links */}
                  <div className="card-actions justify-between items-center">
                    <div className="flex gap-2">
                      <a
                        href={member.social.linkedin}
                        className="btn btn-circle btn-sm bg-[#1C9B8E] text-white hover:bg-[#0F1E64]"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="btn btn-circle btn-sm bg-[#53DFD1] text-white hover:bg-[#1C9B8E]"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={member.social.instagram}
                        className="btn btn-circle btn-sm bg-[#0F1E64] text-white hover:bg-[#1C9B8E]"
                      >
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
