import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiTrash2, FiEye, FiSearch, FiFilter, FiPackage, FiDollarSign, FiMapPin, FiCalendar } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ManageListings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [listings, searchTerm, categoryFilter]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/services`);
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const filterListings = () => {
    let filtered = listings;

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(listing => listing.category === categoryFilter);
    }

    setFilteredListings(filtered);
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
          if (response.data.deletedCount === 1) {
            setListings(listings.filter(listing => listing._id !== id));
            toast.success("Listing deleted successfully!");
          }
        } catch (error) {
          console.error('Error deleting listing:', error);
          toast.error("Failed to delete listing");
        }
      }
    });
  };

  const categories = ['Pets', 'Food', 'Accessories', 'Care Products'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1C9B8E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <FiPackage className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Manage Listings</h1>
            <p className="text-blue-100">Monitor and manage all platform listings</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 bg-white text-sm sm:text-base"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{listings.length}</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1] rounded-lg sm:rounded-xl flex items-center justify-center">
              <FiPackage className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Pets</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">
                {listings.filter(l => l.category === 'Pets').length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-lg sm:rounded-xl flex items-center justify-center">
              <span className="text-white text-sm sm:text-lg">🐕</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Food</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">
                {listings.filter(l => l.category === 'Food').length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-lg sm:rounded-xl flex items-center justify-center">
              <span className="text-white text-sm sm:text-lg">🍖</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Access.</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">
                {listings.filter(l => l.category === 'Accessories').length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-lg sm:rounded-xl flex items-center justify-center">
              <span className="text-white text-sm sm:text-lg">🎾</span>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {filteredListings.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FiFilter className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria</p>
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
                    <th className="text-left font-semibold py-4 px-6">Owner</th>
                    <th className="text-left font-semibold py-4 px-6">Location</th>
                    <th className="text-left font-semibold py-4 px-6">Date</th>
                    <th className="text-center font-semibold py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing, index) => (
                    <tr key={listing._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                            <img 
                              src={listing.image} 
                              alt={listing.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/64x64?text=No+Image";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-lg">{listing.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                              {listing.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] text-white">
                          {listing.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <FiDollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-600 text-lg">${listing.price}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 font-medium">{listing.email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-600">
                          <FiMapPin className="w-4 h-4" />
                          <span>{listing.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-600">
                          <FiCalendar className="w-4 h-4" />
                          <span>
                            {listing.createDate ? 
                              new Date(listing.createDate).toLocaleDateString() : 
                              'N/A'
                            }
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
                            title="View Details"
                            onClick={() => window.open(`/details/${listing._id}`, '_blank')}
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(listing._id, listing.name)}
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
                {filteredListings.map((listing, index) => (
                  <div key={listing._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                        <img 
                          src={listing.image} 
                          alt={listing.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{listing.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{listing.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#53DFD1] to-[#1C9B8E] text-white">
                            {listing.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <FiDollarSign className="w-3 h-3 text-green-600" />
                            <span className="font-bold text-green-600">${listing.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4" />
                        <span className="truncate">{listing.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4" />
                        <span>
                          {listing.createDate ? 
                            new Date(listing.createDate).toLocaleDateString() : 
                            'N/A'
                          }
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        Owner: {listing.email}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                      <button
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200 text-sm"
                        onClick={() => window.open(`/details/${listing._id}`, '_blank')}
                      >
                        <FiEye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(listing._id, listing.name)}
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

      {/* Summary */}
      {filteredListings.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing {filteredListings.length} of {listings.length} listings
            </p>
            <div className="text-xs sm:text-sm text-gray-500">
              {searchTerm && `Filtered by: "${searchTerm}"`}
              {categoryFilter && ` | Category: ${categoryFilter}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListings;