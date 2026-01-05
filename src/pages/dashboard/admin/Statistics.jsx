import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      
      // Fetch admin statistics
      const statsResponse = await axios.get(`${API_BASE_URL}/admin/stats`);
      setStats(statsResponse.data);

      // Fetch all services for category analysis
      const servicesResponse = await axios.get(`${API_BASE_URL}/services`);
      setServices(servicesResponse.data);

      // Fetch all orders for trend analysis
      const ordersResponse = await axios.get(`${API_BASE_URL}/orders`);
      setOrders(ordersResponse.data);

    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chart data
  const categoryData = {
    labels: ['Pets', 'Food', 'Accessories', 'Care Products'],
    datasets: [
      {
        data: [
          services.filter(item => item.category === 'Pets').length,
          services.filter(item => item.category === 'Food').length,
          services.filter(item => item.category === 'Accessories').length,
          services.filter(item => item.category === 'Care Products').length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const monthlyOrdersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Revenue',
        data: [1200, 1900, 1500, 2500, 2200, 3000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const revenueData = {
    labels: ['Pets', 'Food', 'Accessories', 'Care Products'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [5000, 3000, 2000, 1500],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderColor: ['#2563EB', '#059669', '#D97706', '#DC2626'],
        borderWidth: 1,
      },
    ],
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Statistics</h1>
        <p className="text-gray-600">Overview of platform performance and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FiPackage className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Listings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.services}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FiShoppingCart className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <FiDollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.revenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Listings by Category</h3>
          <div className="h-80">
            <Pie data={categoryData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h3>
          <div className="h-80">
            <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <div className="h-80">
          <Line data={monthlyOrdersData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.serviceName || order.productName}</p>
                  <p className="text-sm text-gray-600">{order.buyerEmail}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${order.price}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.orderDate || order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Users</span>
              <span className="font-semibold text-green-600">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Order Success Rate</span>
              <span className="font-semibold text-green-600">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Order Value</span>
              <span className="font-semibold text-blue-600">
                ${orders.length > 0 ? Math.round(stats.revenue / stats.orders) : 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Platform Growth</span>
              <span className="font-semibold text-green-600 flex items-center gap-1">
                <FiTrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;