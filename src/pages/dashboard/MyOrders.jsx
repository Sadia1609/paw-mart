import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AuthContext } from "../../Provider/AuthProvider";
import { FiDownload, FiShoppingCart, FiCalendar, FiMapPin, FiPhone } from "react-icons/fi";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch orders from backend
  useEffect(() => {
    fetchMyOrders();
  }, [user?.email]);

  const fetchMyOrders = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/orders/${user.email}`);
      setMyOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.text("My Orders Report", 14, 22);
      
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
      doc.text(`Customer: ${user?.displayName || user?.email}`, 14, 40);

      const tableColumn = [
        "No",
        "Product Name",
        "Price",
        "Phone",
        "Location",
        "Quantity",
        "Date",
      ];
      
      const tableRows = myOrders.map((order, index) => [
        index + 1,
        order.serviceName || order.productName || 'N/A',
        `$${order.price || 0}`,
        order.phone || 'N/A',
        order.address || 'N/A',
        order.quantity || 1,
        new Date(order.orderDate || order.date).toLocaleDateString(),
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 50,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [59, 130, 246] },
        alternateRowStyles: { fillColor: [245, 247, 250] },
      });

      // Footer
      const totalAmount = myOrders.reduce((sum, order) => sum + (order.price || 0), 0);
      doc.setFontSize(12);
      doc.text(`Total Orders: ${myOrders.length}`, 14, doc.lastAutoTable.finalY + 20);
      doc.text(`Total Amount: $${totalAmount}`, 14, doc.lastAutoTable.finalY + 30);

      doc.save("my_orders_report.pdf");
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading loading-spinner loading-lg text-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Error Loading Orders</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          className="btn btn-primary"
          onClick={fetchMyOrders}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your order history</p>
          </div>
          {myOrders.length > 0 && (
            <div className="flex gap-2">
              <button 
                className="btn btn-outline btn-sm"
                onClick={fetchMyOrders}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Refresh"
                )}
              </button>
              <button 
                className="btn btn-outline btn-sm"
                onClick={exportPDF}
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Export PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orders Summary */}
      {myOrders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <FiShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{myOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-green-600 font-bold text-xl">$</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${myOrders.reduce((sum, order) => sum + (order.price || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <FiCalendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Latest Order</p>
                <p className="text-lg font-bold text-gray-900">
                  {myOrders.length > 0 ? 
                    new Date(myOrders[0]?.orderDate || myOrders[0]?.date).toLocaleDateString() : 
                    'N/A'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {myOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FiShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left font-semibold text-gray-900">#</th>
                  <th className="text-left font-semibold text-gray-900">Product/Service</th>
                  <th className="text-left font-semibold text-gray-900">Price</th>
                  <th className="text-left font-semibold text-gray-900">Contact</th>
                  <th className="text-left font-semibold text-gray-900">Location</th>
                  <th className="text-left font-semibold text-gray-900">Quantity</th>
                  <th className="text-left font-semibold text-gray-900">Order Date</th>
                  <th className="text-left font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="font-medium text-gray-900">{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        {order.image && (
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img 
                                src={order.image} 
                                alt={order.serviceName || order.productName}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-gray-900">
                            {order.serviceName || order.productName || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.category || 'General'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-green-600">${order.price || 0}</td>
                    <td>
                      <div className="flex items-center gap-1 text-gray-600">
                        <FiPhone className="w-3 h-3" />
                        <span className="text-sm">{order.phone || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-gray-600">
                        <FiMapPin className="w-3 h-3" />
                        <span className="text-sm">{order.address || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="text-gray-600">{order.quantity || 1}</td>
                    <td className="text-gray-600">
                      {new Date(order.orderDate || order.date).toLocaleDateString()}
                    </td>
                    <td>
                      <span className="badge badge-success badge-sm">
                        {order.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;