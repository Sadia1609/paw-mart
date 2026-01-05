import React from "react";
import { FaPaw, FaCalendar, FaUser } from "react-icons/fa";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "First-Time Dog Owner Tips",
      excerpt:
        "Bringing home a new dog? Learn the essential steps for a smooth transition, including crate training, potty training, and establishing routines.",
      category: "Care Guide",
      date: "Mar 15, 2024",
      author: "Dr. Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=500&fit=crop",
    },
    {
      id: 2,
      title: "Understanding Cat Behavior",
      excerpt:
        "Cats communicate through body language. Learn to interpret tail positions, ear movements, and vocalizations to better understand your feline friend's needs.",
      category: "Behavior",
      date: "Mar 10, 2024",
      author: "Emily Chen",
      image:
        "https://images.unsplash.com/photo-1514888286974-6d03bde4ba14?w=800&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Healthy Homemade Dog Treats",
      excerpt:
        "Make nutritious treats at home using simple ingredients like pumpkin, peanut butter, and oats. These recipes are vet-approved and easy to prepare.",
      category: "Nutrition",
      date: "Mar 5, 2024",
      author: "Michael Rodriguez",
      image:
        "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=800&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Regular Vet Checkups Matter",
      excerpt:
        "Preventive care through regular vet visits can catch health issues early. We discuss what to expect during checkups and why they're important.",
      category: "Health",
      date: "Feb 28, 2024",
      author: "Dr. Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Choosing Your Perfect Pet",
      excerpt:
        "Consider factors like living space, activity level, and time commitment when selecting a pet. We help match you with the right companion.",
      category: "Adoption",
      date: "Feb 20, 2024",
      author: "Jessica Miller",
      image:
        "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&h=500&fit=crop",
    },
    {
      id: 6,
      title: "Summer Pet Safety",
      excerpt:
        "Hot weather poses risks for pets. Learn about heatstroke prevention, proper hydration, and safe outdoor activities during summer months.",
      category: "Safety",
      date: "Feb 15, 2024",
      author: "Robert Brown",
      image:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&h=500&fit=crop",
    },
    {
      id: 7,
      title: "Essential Grooming Basics",
      excerpt:
        "Regular grooming keeps pets healthy and comfortable. Learn brushing techniques, nail trimming, and bathing tips for different coat types.",
      category: "Care Guide",
      date: "Feb 10, 2024",
      author: "David Wilson",
      image:
        "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=500&fit=crop",
    },
    {
      id: 8,
      title: "Pet-Proofing Your Home",
      excerpt:
        "Create a safe environment by securing hazardous items, choosing pet-safe plants, and setting up designated pet areas in your home.",
      category: "Safety",
      date: "Feb 5, 2024",
      author: "Jessica Miller",
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=500&fit=crop",
    },
    {
      id: 9,
      title: "Senior Pet Care Guide",
      excerpt:
        "Older pets need special attention. Learn about diet adjustments, exercise modifications, and common health issues in aging pets.",
      category: "Health",
      date: "Jan 30, 2024",
      author: "Dr. Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&h=500&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-xl mb-4">
              <FaPaw className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C9B8E] via-[#53DFD1] to-[#0F1E64]">
                PawMart Blog
              </span>
            </h1>
            <p className="text-lg text-[#0F1E64] max-w-2xl mx-auto">
              Helpful pet care advice and expert tips for happy, healthy pets
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#1C9B8E]/10 to-[#0F1E64]/10 text-white rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendar className="mr-1 text-[#53DFD1]" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt - More Detailed */}
                  <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] flex items-center justify-center text-white font-bold mr-3">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        <FaUser className="inline mr-1 text-[#53DFD1]" />
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500">PawMart Expert</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer Note */}
      <div className="py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">
            Need personalized advice? Visit our store or call{" "}
            <span className="text-[#0F1E64] font-medium">
              +1 (555) 123-PAWS
            </span>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            All advice provided by certified pet care professionals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
