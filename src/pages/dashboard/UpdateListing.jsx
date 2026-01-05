import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSave, FiX, FiImage, FiMapPin, FiDollarSign, FiCalendar, FiMail, FiPackage } from "react-icons/fi";

const UpdateListing = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/services/${id}`);
      setService(response.data);
    } catch (error) {
      console.error('Error fetching service:', error);
      toast.error('Failed to load listing details');
      navigate('/dashboard/my-listings');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;

    const formData = {
      name: form.petName.value,
      category: form.category.value,
      price: parseInt(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: form.email.value,
      createDate: service?.createDate,
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, formData);
      if (response.data.modifiedCount === 1) {
        toast.success("Listing updated successfully!");
        navigate("/dashboard/my-listings");
      } else {
        toast.error("No changes were made");
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      toast.error("Failed to update listing");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/my-listings");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading loading-spinner loading-lg text-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Listing not found</h3>
        <p className="text-gray-600 mb-4">The listing you're trying to update doesn't exist.</p>
        <button 
          onClick={() => navigate('/dashboard/my-listings')}
          className="btn btn-primary"
        >
          Back to My Listings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Update Listing</h1>
        <p className="text-gray-600">Edit your listing information below</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Pet Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FiPackage className="w-4 h-4" />
                    Product/Pet Name
                  </span>
                </label>
                <input
                  defaultValue={service?.name}
                  type="text"
                  name="petName"
                  required
                  className="input input-bordered w-full"
                  placeholder="Enter name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  defaultValue={service?.category}
                  name="category"
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Pets">Pets</option>
                  <option value="Food">Food</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Care Products">Care Products</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />
                    Price
                  </span>
                </label>
                <input
                  defaultValue={service?.price}
                  type="number"
                  name="price"
                  className="input input-bordered w-full"
                  min="0"
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    Location
                  </span>
                </label>
                <input
                  defaultValue={service?.location}
                  type="text"
                  name="location"
                  required
                  className="input input-bordered w-full"
                  placeholder="Enter location"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Image URL */}
              <div>
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FiImage className="w-4 h-4" />
                    Image URL
                  </span>
                </label>
                <input
                  defaultValue={service?.image}
                  type="url"
                  name="image"
                  required
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.jpg"
                />
                {service?.image && (
                  <div className="mt-2">
                    <img 
                      src={service.image} 
                      alt="Current image" 
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    Available Date
                  </span>
                </label>
                <input
                  defaultValue={service?.date}
                  type="date"
                  name="date"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Contact Email
                  </span>
                </label>
                <input
                  value={user?.email || ''}
                  type="email"
                  name="email"
                  readOnly
                  className="input input-bordered w-full bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Description - Full Width */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              defaultValue={service?.description}
              name="description"
              required
              className="textarea textarea-bordered w-full h-32"
              placeholder="Enter detailed description..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={handleCancel}
              className="btn btn-outline"
            >
              <FiX className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={updating}
              className="btn btn-primary"
            >
              {updating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FiSave className="w-4 h-4 mr-2" />
              )}
              Update Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateListing;