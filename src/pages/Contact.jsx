import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPaw,
} from "react-icons/fa";
import { MdPets, MdLocalGroceryStore, MdHealthAndSafety } from "react-icons/md";

const Contact = () => {
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
                Contact Us
              </span>
            </h1>
            <p className="text-xl text-[#0F1E64] max-w-3xl mx-auto">
              We're here to help you and your furry friends! Reach out anytime
              for support.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1C9B8E]">
                  Get in Touch
                </h2>
                <p className="text-[#0F1E64] mb-8 text-lg">
                  Have questions about pet adoption, products, or services? Our
                  team is ready to assist you with expert guidance and support.
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="card-body">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1] p-4 rounded-2xl mb-4">
                        <FaPhone className="text-2xl text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">Call Us</h3>
                      <p className="text-gray-600 text-[#0F1E64] mb-4">
                        Available 9AM - 8PM
                      </p>
                      <a
                        href="tel:+15551234567"
                        className="text-[#0F1E64] font-bold text-xl hover:text-[#1C9B8E] transition-colors"
                      >
                        +1 (555) 123-PAWS
                      </a>
                      <p className="text-sm text-[#0F1E64] mt-2">
                        Direct line for quick assistance
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="card-body">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-r from-[#53DFD1] to-[#0F1E64] p-4 rounded-2xl mb-4">
                        <FaEnvelope className="text-2xl text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">Email Us</h3>
                      <p className="text-gray-600 text-[#0F1E64] mb-4">
                        We respond within 24 hours
                      </p>
                      <a
                        href="mailto:contact@pawmart.com"
                        className="text-[#0F1E64] font-bold text-lg hover:text-[#1C9B8E] transition-colors break-all"
                      >
                        hello@pawmart.com
                      </a>
                      <p className="text-sm text-gray-500 mt-2">
                        For detailed inquiries
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="card-body">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] p-4 rounded-2xl mb-4">
                        <FaMapMarkerAlt className="text-2xl text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">
                        Visit Our Store
                      </h3>
                      <p className="text-[#0F1E64] mb-4">
                        123 Pet Street
                        <br />
                        Animal City, PA 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="card-body">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-r from-[#0F1E64] to-[#1C9B8E] p-4 rounded-2xl mb-4">
                        <FaClock className="text-2xl text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">Business Hours</h3>
                      <div className="text-[#0F1E64] mb-4 space-y-1">
                        <p className="flex justify-between">
                          <span>Mon-Fri:</span>
                          <span className="font-semibold text-[#1C9B8E]">
                            9 AM - 8 PM
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span>Saturday:</span>
                          <span className="font-semibold text-[#1C9B8E]">
                            10 AM - 6 PM
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span>Sunday:</span>
                          <span className="font-semibold text-[#1C9B8E]">
                            11 AM - 4 PM
                          </span>
                        </p>
                      </div>
                      <div className="badge badge-lg bg-[#53DFD1]/20 text-[#0F1E64] border-0">
                        24/7 Emergency Support
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links & Services */}
            <div className="lg:col-span-1">
              <div className="card bg-base-100 shadow-lg sticky top-24">
                <div className="card-body">
                  <h2 className="text-2xl font-bold mb-6 text-[#0F1E64]">
                    Quick Services
                  </h2>

                  <div className="space-y-4">
                    <a
                      href="#"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#1C9B8E]/10 transition-colors group"
                    >
                      <div className="bg-[#1C9B8E]/10 p-3 rounded-lg group-hover:bg-[#1C9B8E] transition-colors">
                        <MdPets className="text-xl text-[#1C9B8E] group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold">Pet Adoption</h3>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#53DFD1]/10 transition-colors group"
                    >
                      <div className="bg-[#53DFD1]/10 p-3 rounded-lg group-hover:bg-[#53DFD1] transition-colors">
                        <MdLocalGroceryStore className="text-xl text-[#53DFD1] group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold">Products & Supplies</h3>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#0F1E64]/10 transition-colors group"
                    >
                      <div className="bg-[#0F1E64]/10 p-3 rounded-lg group-hover:bg-[#0F1E64] transition-colors">
                        <MdHealthAndSafety className="text-xl text-[#0F1E64] group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold">Vet Consultation</h3>
                      </div>
                    </a>
                  </div>

                  <div className="divider"></div>

                  <div>
                    <h3 className="font-bold mb-4 text-[#1C9B8E]">Follow Us</h3>
                    <div className="flex justify-center gap-4">
                      <a
                        href="#"
                        className="btn btn-circle bg-[#1C9B8E] text-white hover:bg-[#0F1E64]"
                      >
                        <FaFacebook className="text-xl" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-circle bg-[#53DFD1] text-white hover:bg-[#1C9B8E]"
                      >
                        <FaInstagram className="text-xl" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-circle bg-[#0F1E64] text-white hover:bg-[#1C9B8E]"
                      >
                        <FaTwitter className="text-xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-gradient-to-r from-[#1C9B8E]/10 to-[#0F1E64]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-2xl mb-6">
              <MdHealthAndSafety className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F1E64]">
              Emergency Veterinary Support
            </h2>
            <p className="text-xl text-[#0F1E64] mb-8 max-w-2xl mx-auto">
              For urgent pet medical concerns, our emergency hotline is
              available 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+15551234567"
                className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0 hover:opacity-90 text-lg px-8 py-4 min-h-0 h-auto"
              >
                <FaPhone className="mr-3" />
                <div className="text-left">
                  <div className="text-sm">Emergency Hotline</div>
                  <div className="font-bold text-xl">+1 (555) 123-EMER</div>
                </div>
              </a>
              <div className="text-center">
                <div className="badge badge-lg bg-[#53DFD1] text-white border-0 mb-2">
                  Available 24/7
                </div>
                <p className="text-sm text-gray-600">
                  Licensed veterinarians on call
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Directions Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C9B8E]">
              Find Our Location
            </h2>
            <p className="text-[#0F1E64] max-w-2xl mx-auto">
              Visit our store to meet our team and explore our pet products in
              person
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#1C9B8E]/20 to-[#0F1E64]/20 rounded-2xl p-8 h-full">
                <div className="flex items-center justify-center h-64 bg-base-100 rounded-xl shadow-inner">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-6xl text-[#53DFD1] mb-4" />
                    <h3 className="text-2xl font-bold text-[#0F1E64] mb-2">
                      PawMart Store
                    </h3>
                    <p className="text-gray-600">123 Pet Street, Animal City</p>
                    <p className="text-gray-600">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <h3 className="font-bold text-lg mb-4">Store Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                      <span>Live Pet Adoption Area</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                      <span>Pet Grooming Station</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                      <span>Vet Consultation Room</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#53DFD1]"></div>
                      <span>Free Parking Available</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <h3 className="font-bold text-lg mb-4">Best Time to Visit</h3>
                  <p className="text-[#0F1E64] mb-3">
                    For personalized attention, visit during weekdays 10AM-3PM
                  </p>
                  <div className="badge badge-outline border-[#1C9B8E] text-[#1C9B8E]">
                    Less Crowded Hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
