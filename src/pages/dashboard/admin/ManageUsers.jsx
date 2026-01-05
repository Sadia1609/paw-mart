import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiSearch, FiShield, FiTrash2, FiUser, FiMail, FiCalendar } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleMakeAdmin = async (userId, userName) => {
    Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make "${userName}" an administrator?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(`${API_BASE_URL}/users/admin/${userId}`);
          if (response.data.modifiedCount === 1) {
            setUsers(users.map(user => 
              user._id === userId ? { ...user, role: 'admin' } : user
            ));
            toast.success(`${userName} is now an administrator!`);
          }
        } catch (error) {
          console.error('Error making user admin:', error);
          toast.error('Failed to update user role');
        }
      }
    });
  };

  const handleDeleteUser = (userId, userName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete user "${userName}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete user!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
          if (response.data.deletedCount === 1) {
            setUsers(users.filter(user => user._id !== userId));
            toast.success("User deleted successfully!");
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          toast.error("Failed to delete user");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading loading-spinner loading-lg text-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Users</h1>
        <p className="text-gray-600">Monitor and manage platform users and their roles</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 bg-white text-sm sm:text-base"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{users.length}</p>
            <p className="text-xs sm:text-sm text-gray-600">Total Users</p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              {users.filter(u => u.role === 'user').length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Regular Users</p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-red-600">
              {users.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Administrators</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FiUser className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] text-white">
                  <tr>
                    <th className="text-left font-semibold py-4 px-6">#</th>
                    <th className="text-left font-semibold py-4 px-6">User</th>
                    <th className="text-left font-semibold py-4 px-6">Email</th>
                    <th className="text-left font-semibold py-4 px-6">Role</th>
                    <th className="text-left font-semibold py-4 px-6">Joined</th>
                    <th className="text-center font-semibold py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="font-medium text-gray-900 py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img 
                                src={user.photo || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                alt={user.name || 'User'}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{user.name || 'No Name'}</div>
                            <div className="text-sm text-gray-500">
                              {user.role === 'admin' ? 'Administrator' : 'Regular User'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FiMail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{user.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`badge ${user.role === 'admin' ? 'badge-error' : 'badge-primary'}`}>
                          {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiCalendar className="w-4 h-4" />
                          <span className="text-sm">
                            {user.createdAt ? 
                              new Date(user.createdAt).toLocaleDateString() : 
                              'Unknown'
                            }
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => handleMakeAdmin(user._id, user.name || user.email)}
                              className="btn btn-ghost btn-sm text-blue-600"
                              title="Make Admin"
                            >
                              <FiShield className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(user._id, user.name || user.email)}
                            className="btn btn-ghost btn-sm text-red-600"
                            title="Delete User"
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
                {filteredUsers.map((user, index) => (
                  <div key={user._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden shadow-md flex-shrink-0">
                        <img 
                          src={user.photo || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                          alt={user.name || 'User'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{user.name || 'No Name'}</h3>
                        <p className="text-sm text-gray-500 mb-2 truncate">{user.email}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role === 'admin' ? 'Administrator' : 'User'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4" />
                        <span>
                          Joined: {user.createdAt ? 
                            new Date(user.createdAt).toLocaleDateString() : 
                            'Unknown'
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleMakeAdmin(user._id, user.name || user.email)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200 text-sm"
                        >
                          <FiShield className="w-4 h-4" />
                          Make Admin
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user._id, user.name || user.email)}
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

      {/* User Activity Summary */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {users.slice(0, 5).map((user, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <img 
                  src={user.photo || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                  alt={user.name || 'User'}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.name || 'No Name'}</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`badge ${user.role === 'admin' ? 'badge-error' : 'badge-primary'} badge-sm`}>
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {user.createdAt ? 
                    new Date(user.createdAt).toLocaleDateString() : 
                    'Unknown'
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;