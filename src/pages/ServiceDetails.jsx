import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  FiArrowLeft, 
  FiShoppingCart, 
  FiMapPin, 
  FiCalendar, 
  FiTag,
  FiUser,
  FiPhone,
  FiHome,
  FiMessageSquare,
  FiPackage,
  FiHeart,
  FiShare2,
  FiStar
} from "react-icons/fi";

const ServiceDetails = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/services/${id}`);
      setService(response.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
      toast.error("Failed to load service details");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setOrderLoading(true);
    
    const form = e.target;
    const formData = {
      productId: id,
      serviceName: service?.name,
      productName: service?.name, // Add this for compatibility
      image: service?.image,
      category: service?.category,
      buyerName: form.buyerName.value,
      buyerEmail: form.buyerEmail.value,
      email: form.buyerEmail.value, // Add this field for MyOrders query
      quantity: parseInt(form.quantity.value),
      price: parseInt(form.price.value) * parseInt(form.quantity.value),
      address: form.address.value,
      phone: form.phone.value,
      note: form.note.value,
      orderDate: new Date(),
      status: "Pending", // Add default status
    };

    try {
      await axios.post(`${API_BASE_URL}/orders`, formData);
      toast.success("Order placed successfully!");
      document.getElementById("order_modal").close();
      form.reset();
      
      // Refresh the page after a short delay to show the new order
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order!");
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1C9B8E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate(-1)}
            className="btn bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white border-0"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <title>{service?.name} - Product Details | PawMart</title>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-[#53DFD1] transition-colors duration-200 mb-3 sm:mb-4"
          >
            <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back to Listings</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FiPackage className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Product Details</h1>
              <p className="text-blue-100 text-sm sm:text-base">View complete information about this listing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              <img
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                src={service?.image}
                alt={service?.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-[#1C9B8E] transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Save</span>
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-[#1C9B8E] transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                <FiShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-4 sm:space-y-6">
            {/* Main Info Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{service?.name}</h1>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] text-white">
                      <FiTag className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {service?.category}
                    </span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] bg-clip-text text-transparent">
                    ${service?.price}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    <FiStar className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    <FiStar className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    <FiStar className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    <FiStar className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    <FiStar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-gray-500 text-xs sm:text-sm ml-1">(4.0)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C9B8E]" />
                  Description
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                  {service?.description || "No description available."}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-[#53DFD1]/10 to-[#1C9B8E]/10 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-[#53DFD1]/20">
                  <div className="flex items-center gap-2 text-[#1C9B8E] mb-1">
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-semibold text-xs sm:text-sm">Location</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">{service?.location || "Not specified"}</p>
                </div>
                <div className="bg-gradient-to-r from-[#53DFD1]/10 to-[#1C9B8E]/10 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-[#53DFD1]/20">
                  <div className="flex items-center gap-2 text-[#1C9B8E] mb-1">
                    <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-semibold text-xs sm:text-sm">Available Date</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    {service?.date ? new Date(service.date).toLocaleDateString() : "Immediately"}
                  </p>
                </div>
              </div>

              {/* Order Button */}
              <button
                className="w-full bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] hover:from-[#0F1E64] hover:to-[#1C9B8E] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base"
                onClick={() => document.getElementById("order_modal").showModal()}
                disabled={!user}
              >
                <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {user ? "Order Now" : "Login to Order"}
              </button>

              {!user && (
                <p className="text-center text-gray-500 mt-3 text-xs sm:text-sm">
                  Please <button onClick={() => navigate('/login')} className="text-[#1C9B8E] hover:underline font-medium">login</button> to place an order
                </p>
              )}
            </div>

            {/* Seller Info Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C9B8E]" />
                Seller Information
              </h3>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] rounded-full flex items-center justify-center">
                  <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{service?.email}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Verified Seller</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <dialog id="order_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white max-h-[90vh] overflow-y-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700 z-10">
              ✕
            </button>
          </form>

          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] -m-6 mb-6 p-4 sm:p-6 text-white">
            <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
              <FiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              Complete Your Order
            </h3>
            <p className="text-blue-100 mt-1 text-sm sm:text-base">Fill in the details below to place your order</p>
          </div>

          <form onSubmit={handleOrder} className="space-y-4 sm:space-y-6">
            {/* Product Summary */}
            <div className="bg-gradient-to-r from-[#53DFD1]/10 to-[#1C9B8E]/10 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-[#53DFD1]/20">
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src={service?.image} 
                  alt={service?.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{service?.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{service?.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg sm:text-2xl font-bold text-[#1C9B8E]">${service?.price}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Personal Information */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C9B8E]" />
                  Personal Information
                </h4>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    name="buyerName"
                    defaultValue={user?.displayName || ""}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    name="buyerEmail"
                    defaultValue={user?.email || ""}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 text-gray-600 text-sm sm:text-base"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiPhone className="w-3 h-3 sm:w-4 sm:h-4" />
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-sm sm:text-base"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C9B8E]" />
                  Order Details
                </h4>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    name="productName"
                    defaultValue={service?.name}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 text-gray-600 text-sm sm:text-base"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      name="quantity"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Unit Price</label>
                    <input
                      name="price"
                      defaultValue={service?.price}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl bg-gray-50 text-gray-600 text-sm sm:text-base"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiHome className="w-3 h-3 sm:w-4 sm:h-4" />
                Delivery Address
              </label>
              <textarea
                name="address"
                rows="3"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 resize-none text-sm sm:text-base"
                placeholder="Enter your complete delivery address"
                required
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiMessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                Additional Notes (Optional)
              </label>
              <textarea
                name="note"
                rows="2"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 resize-none text-sm sm:text-base"
                placeholder="Any special instructions or requests?"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="button"
                className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base"
                onClick={() => document.getElementById("order_modal").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={orderLoading}
                className="w-full sm:flex-1 bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] hover:from-[#0F1E64] hover:to-[#1C9B8E] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {orderLoading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    Confirm Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
