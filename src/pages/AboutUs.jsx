import React from "react";
import { Link } from "react-router";
import HeroImg from "../assets/about hero section.jpg";
import Beagle from "../assets/Beagle.jpg";
import German from "../assets/German Shepherd.jpg";
import Golden from "../assets/Golden Retriever.jpg";
import Labrador from "../assets/Labrador.jpg";
import Persian from "../assets/Persian Cat.jpg";
import Poodle from "../assets/Poodle.jpg";
import Ragdoll from "../assets/Ragdoll Cat.jpg";
import Siamese from "../assets/Siamese Cat.jpg";

import {
  FaPaw,
  FaHeart,
  FaShieldAlt,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { GiDogHouse, GiFoodTruck, GiMedicines, GiBrain } from "react-icons/gi";
import { MdPets, MdLocalGroceryStore } from "react-icons/md";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="text-center mb-12 mt-5">
        <div className="inline-block relative">
          <h2 className="text-transparent font-extrabold text-4xl bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
            About Us
          </h2>
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-[#1C9B8E]/10 to-[#0F1E64]/10 rounded-lg blur-xl -z-10"></div>
        </div>
        <p className="text-[#0F1E64] mt-4 max-w-2xl mx-auto">
          Learn more about our mission, vision, and dedication to pet care
        </p>
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] p-3 rounded-2xl">
                  <FaPaw className="text-4xl text-white" />
                </div>
                <span className="text-lg font-semibold text-[#1C9B8E]">
                  Trusted Since 2018
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64]">
                  PawMart
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-[#1C9B8E] mb-8 leading-relaxed">
                Your one-stop destination for all pet needs - from adoption to
                premium care products
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                  <span className="text-lg text-[#0F1E64]">
                    Pet Adoption & Rescue Services
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                  <span className="text-lg text-[#0F1E64]">
                    Premium Food & Care Products
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                  <span className="text-lg text-[#0F1E64]">
                    Veterinary Consultation 24/7
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0 hover:opacity-90"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="relative">
              <div className="relative">
                {/* Main Image with shape */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-3 transition-transform duration-300 hover:rotate-0">
                  <img
                    src={HeroImg}
                    alt="Happy pets at PawMart"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1C9B8E]/20 to-[#0F1E64]/10"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#53DFD1] to-[#1C9B8E] rounded-2xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tr from-[#0F1E64] to-[#1C9B8E] rounded-3xl -z-10"></div>

                {/* Floating Stats Card 1 */}
                <div className="absolute -left-4 top-1/4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1C9B8E]">
                      1500+
                    </div>
                    <div className="text-sm text-white">Pets Adopted</div>
                  </div>
                </div>

                {/* Floating Stats Card 2 */}
                <div className="absolute -right-4 bottom-1/4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1C9B8E]">
                      24/7
                    </div>
                    <div className="text-sm text-white">Vet Support</div>
                  </div>
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute -z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#53DFD1]/10 to-[#0F1E64]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64] text-3xl md:text-4xl font-bold mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-[#0F1E64] max-w-2xl mx-auto">
              Everything your furry friend needs, all in one place
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Adoption Service */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MdPets className="text-2xl text-primary" />
                  </div>
                  <h3 className="card-title text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                    Pet Adoption
                  </h3>
                </div>
                <p className="text-[#1C9B8E]">
                  Find your perfect furry companion from our verified adoption
                  network. All pets are vaccinated and health-checked.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <FaShieldAlt className="text-green-500" />
                    <span className="text-[#0F1E64]">
                      Verified breeders & shelters
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaHeart className="text-red-500" />
                    <span className="text-[#0F1E64]">
                      Post-adoption support
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pet Food & Supplies */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <GiFoodTruck className="text-2xl text-secondary" />
                  </div>
                  <h3 className="card-title text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                    Food & Supplies
                  </h3>
                </div>
                <p className="text-[#1C9B8E]">
                  Premium quality food, toys, beds, and all essential supplies
                  for your pet's happiness.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-[#0F1E64]">
                      Organic & vet-approved food
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-[#0F1E64]">
                      Interactive toys & accessories
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Care Products */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <GiMedicines className="text-2xl text-accent" />
                  </div>
                  <h3 className="card-title text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                    Care Products
                  </h3>
                </div>
                <p className="text-[#1C9B8E]">
                  Professional-grade grooming, healthcare, and wellness products
                  for optimal pet health.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-[#0F1E64]">Grooming supplies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-[#0F1E64]">
                      Healthcare & supplements
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Consultation */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300 lg:col-span-3">
              <div className="card-body">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-xl">
                      <GiBrain className="text-3xl text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                        Veterinary Consultation
                      </h3>
                      <p className="text-[#0F1E64] mt-2">
                        24/7 online and in-person consultations with certified
                        veterinarians
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0F1E64]">
                          50+
                        </div>
                        <div className="text-sm text-[#1C9B8E]">
                          Certified Vets
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0F1E64]">
                          24/7
                        </div>
                        <div className="text-sm text-[#1C9B8E]">Available</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0F1E64]">
                          5000+
                        </div>
                        <div className="text-sm text-[#1C9B8E]">
                          Consultations
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0F1E64]">
                          99%
                        </div>
                        <div className="text-sm text-[#1C9B8E]">
                          Satisfaction
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Hours & Contact */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Working Hours */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-3xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                  Working Hours
                </h2>
                <div className="space-y-4 text-[#1C9B8E]">
                  {[
                    {
                      day: "Monday - Friday",
                      time: "9:00 AM - 8:00 PM",
                      note: "Full Services",
                    },
                    {
                      day: "Saturday",
                      time: "10:00 AM - 6:00 PM",
                      note: "Adoption & Store",
                    },
                    {
                      day: "Sunday",
                      time: "11:00 AM - 4:00 PM",
                      note: "Emergency Only",
                    },
                    {
                      day: "24/7 Available",
                      time: "Always Open",
                      note: "Online Consultation",
                    },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 hover:bg-base-200 rounded-lg transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold">{schedule.day}</h3>
                        <p className="text-sm text-[#1C9B8E]">
                          {schedule.note}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-[#0F1E64]" />
                        <span className="font-medium">{schedule.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="alert alert-info mt-6">
                  <FaShieldAlt />
                  <span>
                    Emergency services available 24/7 for registered members
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-3xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                  Get In Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FaPhone className="text-xl text-[#0F1E64]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1E64]">
                        Phone Number
                      </h3>
                      <p className="text-[#1C9B8E]">+1 (555) 123-PAWS</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FaEnvelope className="text-xl text-[#0F1E64]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1E64]">
                        Email Address
                      </h3>
                      <p className="text-[#1C9B8E]">hello@pawmart.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FaMapMarkerAlt className="text-xl text-[#0F1E64]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1E64]">
                        Our Location
                      </h3>
                      <p className="text-[#1C9B8E]">
                        123 Pet Street, Animal City
                        <br />
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4 text-[#0F1E64]">
                    Quick Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/services"
                      className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0 hover:opacity-90"
                    >
                      Browse Services
                    </Link>
                    <Link
                      to="/contact"
                      className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0 hover:opacity-90"
                    >
                      Contact Form
                    </Link>
                    <Link
                      to="/faq"
                      className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0 hover:opacity-90"
                    >
                      FAQ
                    </Link>
                    <Link
                      to="/our-team"
                      className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0 hover:opacity-90"
                    >
                      Meet Our Team
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
              Our Happy Family
            </h2>
            <p className="text-[#0F1E64]">
              Meet some of our beloved furry friends who found their forever
              homes through PawMart
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Buddy",
                type: "Golden Retriever",
                desc: "Adopted 2023",
                image: Golden,
              },
              {
                name: "Luna",
                type: "Siamese Cat",
                desc: "Adopted 2024",
                image: Siamese,
              },
              {
                name: "Rocky",
                type: "German Shepherd",
                desc: "Adopted 2023",
                image: German,
              },
              {
                name: "Milo",
                type: "Persian Cat",
                desc: "Adopted 2024",
                image: Persian,
              },
              {
                name: "Charlie",
                type: "Beagle",
                desc: "Adopted 2022",
                image: Beagle,
              },
              {
                name: "Bella",
                type: "Ragdoll Cat",
                desc: "Adopted 2023",
                image: Ragdoll,
              },
              {
                name: "Max",
                type: "Labrador",
                desc: "Adopted 2024",
                image: Labrador,
              },
              {
                name: "Daisy",
                type: "Poodle",
                desc: "Adopted 2023",
                image: Poodle,
              },
            ].map((pet, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={pet.image}
                    alt={`${pet.name} - ${pet.type}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#1C9B8E] text-white text-xs px-2 py-1 rounded-full">
                    Adopted
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-lg text-[#1C9B8E]">
                    {pet.name}
                  </h3>
                  <p className="text-[#53DFD1] text-sm">{pet.type}</p>
                  <p className="text-[#0F1E64] text-xs font-medium">
                    {pet.desc}
                  </p>
                  <div className="card-actions justify-end mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
