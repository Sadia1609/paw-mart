import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FiEdit2, FiSave, FiX, FiUser, FiMail, FiCalendar, FiShield } from 'react-icons/fi';

const Profile = () => {
  const { user, userRole } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information and preferences.</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-outline btn-sm"
              >
                <FiEdit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={formData.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    />
                  </div>
                  <div className="w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Photo URL</span>
                    </label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter photo URL"
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Display Name</span>
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter your display name"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Email Address</span>
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="input input-bordered w-full"
                      disabled
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500">Email cannot be changed</span>
                    </label>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Role</span>
                    </label>
                    <div className="flex items-center">
                      <span className={`badge ${userRole === 'admin' ? 'badge-error' : 'badge-primary'} badge-lg`}>
                        {userRole === 'admin' ? 'Administrator' : 'User'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <FiSave className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline"
                >
                  <FiX className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FiUser className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Display Name</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {user?.displayName || 'Not set'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FiMail className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Email Address</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {user?.email}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FiShield className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Account Role</span>
                      </div>
                      <span className={`badge ${userRole === 'admin' ? 'badge-error' : 'badge-primary'} badge-lg`}>
                        {userRole === 'admin' ? 'Administrator' : 'User'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FiCalendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Member Since</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {user?.metadata?.creationTime ? 
                          new Date(user.metadata.creationTime).toLocaleDateString() : 
                          'Unknown'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">Total Listings</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">$0</p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;