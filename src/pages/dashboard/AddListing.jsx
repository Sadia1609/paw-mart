import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  FiPlus, 
  FiImage, 
  FiMapPin, 
  FiDollarSign, 
  FiCalendar, 
  FiMail, 
  FiPackage,
  FiFileText,
  FiTag,
  FiSave,
  FiX
} from "react-icons/fi";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    petName: "",
    category: "",
    price: "",
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || ""
  });

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle image preview
    if (name === 'image' && value) {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = {
      name: formData.petName,
      category: formData.category,
      price: parseInt(formData.price),
      location: formData.location,
      description: formData.description,
      image: formData.image,
      date: formData.date,
      email: formData.email,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/services`, submitData);
      
      if (res.data.acknowledged) {
        toast.success("Listing created successfully!");
        // Reset form
        setFormData({
          petName: "",
          category: "",
          price: "",
          location: "",
          description: "",
          image: "",
          date: "",
          email: user?.email || ""
        });
        setImagePreview("");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create listing!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      petName: "",
      category: "",
      price: "",
      location: "",
      description: "",
      image: "",
      date: "",
      email: user?.email || ""
    });
    setImagePreview("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
            <FiPlus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] bg-clip-text text-transparent mb-2">
            Create New Listing
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
            Share your pets, products, or services with the PawMart community
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <FiPackage className="w-5 h-5 sm:w-6 sm:h-6" />
              Listing Details
            </h2>
            <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">Fill in the information below to create your listing</p>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">1</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Product/Pet Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <FiPackage className="w-3 h-3 sm:w-4 sm:h-4 text-[#1C9B8E]" />
                      Product/Pet Name
                    </label>
                    <input
                      type="text"
                      name="petName"
                      value={formData.petName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                      placeholder="Enter a descriptive name"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <FiTag className="w-3 h-3 sm:w-4 sm:h-4 text-[#1C9B8E]" />
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-gray-800 bg-white text-sm sm:text-base"
                    >
                      <option value="">Select Category</option>
                      <option value="Pets">🐕 Pets</option>
                      <option value="Food">🍖 Food</option>
                      <option value="Accessories">🎾 Accessories</option>
                      <option value="Care Products">💊 Care Products</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-[#1C9B8E]" />
                      Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#1C9B8E]" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                      placeholder="City, State or Address"
                    />
                  </div>
                </div>
              </div>

              {/* Media & Details Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">2</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Media & Details</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Image URL */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <FiImage className="w-3 h-3 sm:w-4 sm:h-4 text-[#1C9B8E]" />
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                      placeholder="https://example.com/image.jpg"
                    />
                    {imagePreview && (
                      <div className="mt-3 sm:mt-4">
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Preview:</p>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-md"
                          onError={() => setImagePreview("")}
                        />
                      </div>
                    )}
                  </div>

                  {/* Available Date */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#1C9B8E]" />
                      Available Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-gray-800 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    <FiFileText className="w-3 h-3 sm:w-4 sm:h-4 text-[#1C9B8E]" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none text-sm sm:text-base"
                    placeholder="Provide a detailed description of your listing. Include important details like age, breed, condition, features, etc."
                  ></textarea>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">3</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Contact Information</h3>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    <FiMail className="w-3 h-3 sm:w-4 sm:h-4 text-[#1C9B8E]" />
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed text-sm sm:text-base"
                  />
                  <p className="text-xs sm:text-sm text-gray-500">This is your account email and cannot be changed.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={handleReset}
                  className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-transparent hover:border-gray-300 text-sm sm:text-base"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                  Reset Form
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full sm:flex-1 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] hover:from-[#0F1E64] hover:to-[#1C9B8E] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Listing...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />
                      Create Listing
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#53DFD1]/10 to-[#1C9B8E]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#53DFD1]/20">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] rounded-full flex items-center justify-center">
              <span className="text-white text-xs">💡</span>
            </div>
            Tips for a Great Listing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-[#1C9B8E] font-bold">•</span>
              <span>Use high-quality, clear images that show your item from multiple angles</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#1C9B8E] font-bold">•</span>
              <span>Write detailed descriptions including age, breed, condition, and special features</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#1C9B8E] font-bold">•</span>
              <span>Set competitive prices by researching similar listings in your area</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#1C9B8E] font-bold">•</span>
              <span>Be honest about any issues or special requirements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;