import React, { useState } from "react";
import { FaPaw, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import {
  MdPets,
  MdLocalGroceryStore,
  MdHealthAndSafety,
  MdHome,
} from "react-icons/md";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "Pet Adoption",
      icon: <MdPets className="text-[#1C9B8E] text-xl" />,
      bgColor: "bg-[#1C9B8E]/10",
      faqs: [
        {
          question: "How does the adoption process work?",
          answer:
            "Our adoption process involves three simple steps: 1) Browse available pets online, 2) Schedule a meet & greet session, 3) Complete adoption paperwork and home check. Our team guides you through each step to ensure a perfect match.",
        },
        {
          question: "Are all pets vaccinated before adoption?",
          answer:
            "Yes, all pets available for adoption receive complete vaccinations, deworming, and a thorough health check by our veterinary team before joining their new families.",
        },
        {
          question: "What is the adoption fee?",
          answer:
            "Adoption fees range from $50-$300 depending on the pet's age, breed, and medical needs. This fee covers vaccinations, spay/neuter surgery, microchipping, and initial health check.",
        },
        {
          question: "Can I return a pet if it doesn't work out?",
          answer:
            "We have a 30-day trial period for all adoptions. If things don't work out, we accept returns and will help find a better match for both you and the pet.",
        },
      ],
    },
    {
      title: "Products & Supplies",
      icon: <MdLocalGroceryStore className="text-[#53DFD1] text-xl" />,
      bgColor: "bg-[#53DFD1]/10",
      faqs: [
        {
          question: "Do you offer same-day delivery?",
          answer:
            "Yes! Orders placed before 3 PM are eligible for same-day delivery within a 15-mile radius. Standard delivery takes 2-3 business days.",
        },
        {
          question: "What is your return policy?",
          answer:
            "Unopened products can be returned within 30 days with original receipt. Opened food items can be returned within 7 days if your pet doesn't like it. Grooming products have a 14-day return window.",
        },
        {
          question: "Do you carry prescription diets?",
          answer:
            "Yes, we stock a wide range of veterinary-prescribed diets. You'll need a valid prescription from your vet, which can be uploaded to your account or emailed to us.",
        },
        {
          question: "Are your products organic and eco-friendly?",
          answer:
            "We prioritize eco-friendly and organic products. Look for our 'PawGreen' label which identifies products meeting our sustainability standards.",
        },
      ],
    },
    {
      title: "Veterinary Services",
      icon: <MdHealthAndSafety className="text-[#0F1E64] text-xl" />,
      bgColor: "bg-[#0F1E64]/10",
      faqs: [
        {
          question: "Is 24/7 veterinary support available?",
          answer:
            "Yes, our emergency hotline (+1-555-123-EMER) is available 24/7 for urgent medical concerns. Non-emergency consultations are available during business hours.",
        },
        {
          question: "Do you offer telemedicine consultations?",
          answer:
            "Absolutely! We provide video consultations with licensed veterinarians. Book online and receive expert advice from the comfort of your home.",
        },
        {
          question: "What vaccinations do you provide?",
          answer:
            "We offer all core vaccinations (rabies, distemper, parvo) and optional vaccines (kennel cough, Lyme disease). Our vets will recommend a schedule based on your pet's lifestyle.",
        },
        {
          question: "Do you perform surgeries?",
          answer:
            "Yes, we perform routine surgeries (spay/neuter, dental) and some specialized procedures. Complex cases may be referred to our partner specialty hospitals.",
        },
      ],
    },
    {
      title: "General Questions",
      icon: <MdHome className="text-[#1C9B8E] text-xl" />,
      bgColor: "bg-gradient-to-r from-[#1C9B8E]/10 to-[#0F1E64]/10",
      faqs: [
        {
          question: "What are your business hours?",
          answer:
            "Monday-Friday: 9 AM - 8 PM, Saturday: 10 AM - 6 PM, Sunday: 11 AM - 4 PM. Emergency services available 24/7.",
        },
        {
          question: "Do you offer pet grooming services?",
          answer:
            "Yes! We have certified groomers for all breeds. Services include bathing, haircuts, nail trimming, ear cleaning, and teeth brushing. Book online or call to schedule.",
        },
        {
          question: "Can I volunteer at PawMart?",
          answer:
            "We welcome volunteers! Opportunities include helping with adoption events, socializing pets, and administrative support. Fill out our volunteer application on the website.",
        },
        {
          question: "Do you offer pet training classes?",
          answer:
            "We offer puppy kindergarten, basic obedience, and specialized behavior training. Both group classes and private sessions are available with certified trainers.",
        },
      ],
    },
  ];

  // Filter FAQs based on search
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#1C9B8E]/10 via-[#53DFD1]/5 to-[#0F1E64]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-2xl mb-6">
              <FaPaw className="text-3xl text-[#1C9B8E]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-xl text-[#0F1E64] max-w-3xl mx-auto">
              Find answers to common questions about our services, adoption
              process, and pet care
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              className="input input-bordered w-full pl-12 focus:border-[#1C9B8E] focus:ring-2 focus:ring-[#53DFD1]/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn btn-xs"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          {searchTerm && (
            <p className="text-center mt-4 text-gray-600">
              Found{" "}
              {filteredCategories.reduce(
                (total, cat) => total + cat.faqs.length,
                0
              )}{" "}
              results for "{searchTerm}"
            </p>
          )}
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className={`${category.bgColor} p-3 rounded-xl`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  {category.title}
                </h2>
                <span className="bg-[#53DFD1] text-white px-3 py-1 rounded-full text-sm">
                  {category.faqs.length} questions
                </span>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const index = `${catIndex}-${faqIndex}`;
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={index}
                      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="card-body p-6">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="flex justify-between items-center w-full text-left"
                        >
                          <h3 className="text-lg font-semibold text-[#1C9B8E] pr-8">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0 ml-4">
                            {isOpen ? (
                              <FaChevronUp className="text-[#53DFD1] text-xl" />
                            ) : (
                              <FaChevronDown className="text-[#1C9B8E] text-xl" />
                            )}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-[#0F1E64] leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-[#1C9B8E]/10 to-[#0F1E64]/10 p-8 rounded-2xl max-w-2xl mx-auto">
                <FaSearch className="text-5xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQs matching "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white"
                >
                  View All FAQs
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-base-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[#1C9B8E]/10 via-[#53DFD1]/10 to-[#0F1E64]/10 p-8 md:p-12 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0F1E64]">
              Still have questions?
            </h2>
            <p className="text-[#0F1E64] mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0 hover:opacity-90 text-lg"
              >
                Contact Support
              </a>
              <a
                href="tel:+15551234567"
                className="btn btn-outline border-[#53DFD1] text-[#53DFD1] hover:bg-[#53DFD1] hover:text-white"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
