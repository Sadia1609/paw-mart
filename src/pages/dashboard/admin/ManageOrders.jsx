import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiTrash2, FiSearch, FiShoppingCart, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        (order.serviceName || order.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.phone || '').includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(order => (order.status || 'Completed') === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/admin/orders/${orderId}`, {
        status: newStatus
      });
      
      if (response.data.modifiedCount === 1) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        toast.success('Order status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteOrder = (orderId, productName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the order for "${productName}". This action cannot be undone!`,
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
          const response = await axios.delete(`${API_BASE_URL}/admin/orders/${orderId}`);
          if (response.data.deletedCount === 1) {
            setOrders(orders.filter(order => order._id !== orderId));
            toast.success("Order deleted successfully!");
          }
        } catch (error) {
          console.error('Error deleting order:', error);
          toast.error("Failed to delete order");
        }
      }
    });
  };

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled'];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1C9B8E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading orders...</p>
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
            <FiShoppingCart className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Manage Orders</h1>
            <p className="text-blue-100">Monitor and manage all customer orders</p>
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
                placeholder="Search orders..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1C9B8E] focus:ring-4 focus:ring-[#1C9B8E]/20 transition-all duration-200 bg-white text-sm sm:text-base"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
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
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1] rounded-lg sm:rounded-xl flex items-center justify-center">
              <FiShoppingCart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Revenue</p>
              <p className="text-lg sm:text-3xl font-bold text-gray-900">
                ${orders.reduce((sum, order) => sum + (order.price || 0), 0)}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-lg sm:rounded-xl flex items-center justify-center">
              <FiDollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">
                {orders.filter(o => (o.status || 'Completed') === 'Pending').length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-lg sm:rounded-xl flex items-center justify-center">
              <FiCalendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Complete</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">
                {orders.filter(o => (o.status || 'Completed') === 'Completed').length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-lg sm:rounded-xl flex items-center justify-center">
              <FiUser className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FiSearch className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No orders found</h3>
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
                    <th className="text-left font-semibold py-4 px-6">Product/Service</th>
                    <th className="text-left font-semibold py-4 px-6">Customer</th>
                    <th className="text-left font-semibold py-4 px-6">Price</th>
                    <th className="text-left font-semibold py-4 px-6">Contact</th>
                    <th className="text-left font-semibold py-4 px-6">Date</th>
                    <th className="text-left font-semibold py-4 px-6">Status</th>
                    <th className="text-center font-semibold py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-4 px-6 font-medium text-gray-900">{index + 1}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          {order.image && (
                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                              <img 
                                src={order.image} 
                                alt={order.serviceName || order.productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/64x64?text=No+Image";
                                }}
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-gray-900 text-lg">
                              {order.serviceName || order.productName || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              Qty: {order.quantity || 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">{order.buyerName || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{order.buyerEmail}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <FiDollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-600 text-lg">${order.price || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div className="flex items-center gap-1 mb-1">
                            <FiUser className="w-3 h-3 text-gray-400" />
                            <span>{order.phone || 'N/A'}</span>
                          </div>
                          <div className="text-gray-500 line-clamp-2">{order.address || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-600">
                          <FiCalendar className="w-4 h-4" />
                          <span>{new Date(order.orderDate || order.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <select
                            value={order.status || 'Completed'}
                            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${getStatusBadgeClass(order.status || 'Completed')}`}
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
                            title="Delete Order"
                            onClick={() => handleDeleteOrder(order._id, order.serviceName || order.productName)}
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
                {filteredOrders.map((order, index) => (
                  <div key={order._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      {order.image && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                          <img 
                            src={order.image} 
                            alt={order.serviceName || order.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                          {order.serviceName || order.productName || 'N/A'}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">Qty: {order.quantity || 1}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <FiDollarSign className="w-3 h-3 text-green-600" />
                          <span className="font-bold text-green-600">${order.price || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">Customer: </span>
                        <span className="text-gray-600">{order.buyerName || 'N/A'}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">Email: </span>
                        <span className="text-gray-600 truncate">{order.buyerEmail}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">Phone: </span>
                        <span className="text-gray-600">{order.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4" />
                        <span>{new Date(order.orderDate || order.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex-1 mr-2">
                        <select
                          value={order.status || 'Completed'}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg text-sm font-medium border-0 cursor-pointer ${getStatusBadgeClass(order.status || 'Completed')}`}
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => handleDeleteOrder(order._id, order.serviceName || order.productName)}
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
      {filteredOrders.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
            <div className="text-xs sm:text-sm text-gray-500">
              {searchTerm && `Filtered by: "${searchTerm}"`}
              {statusFilter && ` | Status: ${statusFilter}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;