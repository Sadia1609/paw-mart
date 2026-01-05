import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiEye, FiPlus, FiPackage, FiDollarSign, FiList } from "react-icons/fi";
import Swal from "sweetalert2";

const MyListings = () => {
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchMyServices();
  }, [user?.email]);

  const fetchMyServices = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/my-services?email=${user.email}`);
      const data = await response.json();
      setMyServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load your listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_BASE_URL}/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              const filterData = myServices.filter(
                (service) => service._id !== id
              );
              setMyServices(filterData);
              toast.success("Listing deleted successfully!");
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to delete listing");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#1C9B8E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-lg">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">My Listings</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your pet and product listings</p>
          </div>
          <Link 
            to="/dashboard/add-listing" 
            className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] hover:from-[#0F1E64] hover:to-[#1C9B8E] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FiPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New Listing</span>
            <span className="sm:hidden">Add Listing</span>
          </Link>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {myServices.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FiPackage className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">Start by creating your first listing</p>
            <Link 
              to="/dashboard/add-listing" 
              className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] hover:from-[#0F1E64] hover:to-[#1C9B8E] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <FiPlus className="w-4 h-4" />
              Create First Listing
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white">
                  <tr>
                    <th className="text-left font-semibold py-4 px-6">Product/Pet</th>
                    <th className="text-left font-semibold py-4 px-6">Category</th>
                    <th className="text-left font-semibold py-4 px-6">Price</th>
                    <th className="text-left font-semibold py-4 px-6">Location</th>
                    <th className="text-left font-semibold py-4 px-6">Date</th>
                    <th className="text-center font-semibold py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myServices.map((service, index) => (
                    <tr key={service._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                            <img 
                              src={service.image} 
                              alt={service.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/64x64?text=No+Image";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-lg">{service.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] text-white">
                          {service.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-green-600 text-lg">${service.price}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-600">{service.location}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-600">
                          {service.date ? new Date(service.date).toLocaleDateString() : 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link 
                            to={`/details/${service._id}`}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <Link 
                            to={`/dashboard/update-listing/${service._id}`}
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
                            title="Edit"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden">
              <div className="space-y-4 p-4">
                {myServices.map((service) => (
                  <div key={service._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{service.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{service.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] text-white">
                            {service.category}
                          </span>
                          <span className="font-bold text-green-600">${service.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span> {service.location}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Date:</span> {service.date ? new Date(service.date).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                      <Link 
                        to={`/details/${service._id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200 text-sm"
                      >
                        <FiEye className="w-4 h-4" />
                        View
                      </Link>
                      <Link 
                        to={`/dashboard/update-listing/${service._id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200 text-sm"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200 text-sm"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Statistics */}
      {myServices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100">
                <FiPackage className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{myServices.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-green-100">
                <FiDollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Average Price</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  ${Math.round(myServices.reduce((sum, service) => sum + service.price, 0) / myServices.length)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-purple-100">
                <FiList className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Categories</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {new Set(myServices.map(service => service.category)).size}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;