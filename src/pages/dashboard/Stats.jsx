import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { FiPackage, FiShoppingCart, FiDollarSign, FiTrendingUp, FiCalendar, FiPieChart } from 'react-icons/fi';
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

const Stats = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    myListings: 0,
    myOrders: 0,
    totalSpent: 0,
    recentActivity: 0
  });
  const [myListings, setMyListings] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchUserStats();
  }, [user]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      
      // Fetch user's listings
      const listingsResponse = await axios.get(`${API_BASE_URL}/my-services?email=${user.email}`);
      const listings = listingsResponse.data;
      setMyListings(listings);

      // Fetch user's orders
      const ordersResponse = await axios.get(`${API_BASE_URL}/orders/${user.email}`);
      const orders = ordersResponse.data;
      setMyOrders(orders);

      // Calculate stats
      const totalSpent = orders.reduce((sum, order) => sum + (order.price || 0), 0);
      const totalRevenue = listings.reduce((sum, listing) => {
        // Calculate potential revenue from orders for this user's listings
        const listingOrders = orders.filter(order => order.productId === listing._id);
        return sum + listingOrders.reduce((orderSum, order) => orderSum + (order.price || 0), 0);
      }, 0);
      
      setStats({
        myListings: listings.length,
        myOrders: orders.length,
        totalSpent: totalSpent,
        totalRevenue: totalRevenue,
        recentActivity: listings.length + orders.length
      });

    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chart configurations with your color theme
  const chartColors = {
    primary: '#1C9B8E',
    secondary: '#0F1E64',
    accent: '#53DFD1',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  };

  // 1. Bar Chart - Activity Overview
  const activityBarData = {
    labels: ['My Listings', 'My Orders', 'Total Activities'],
    datasets: [
      {
        label: 'Count',
        data: [stats.myListings, stats.myOrders, stats.recentActivity],
        backgroundColor: [
          `${chartColors.primary}CC`,
          `${chartColors.secondary}CC`,
          `${chartColors.accent}CC`
        ],
        borderColor: [
          chartColors.primary,
          chartColors.secondary,
          chartColors.accent
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const activityBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'My Activity Overview',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#374151'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#6B7280'
        },
        grid: {
          color: '#E5E7EB'
        }
      },
      x: {
        ticks: {
          color: '#6B7280'
        },
        grid: {
          display: false
        }
      }
    },
  };

  // 2. Pie Chart - Listings by Category
  const getCategoryData = () => {
    const categories = ['Pets', 'Food', 'Accessories', 'Care Products'];
    const categoryData = categories.map(category => 
      myListings.filter(item => item.category === category).length
    );
    
    return {
      labels: categories,
      datasets: [
        {
          data: categoryData,
          backgroundColor: [
            `${chartColors.primary}E6`,
            `${chartColors.secondary}E6`,
            `${chartColors.accent}E6`,
            `${chartColors.success}E6`
          ],
          borderColor: [
            chartColors.primary,
            chartColors.secondary,
            chartColors.accent,
            chartColors.success
          ],
          borderWidth: 2,
          hoverOffset: 4
        },
      ],
    };
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#374151'
        }
      },
      title: {
        display: true,
        text: 'My Listings by Category',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#374151'
      },
    },
  };

  // 3. Line Chart - Monthly Activity Trend (simulated data based on actual data)
  const getMonthlyTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    // Simulate monthly data based on actual totals
    const listingsData = months.map((_, index) => 
      Math.floor((stats.myListings / 6) * (1 + Math.sin(index) * 0.3))
    );
    const ordersData = months.map((_, index) => 
      Math.floor((stats.myOrders / 6) * (1 + Math.cos(index) * 0.4))
    );

    return {
      labels: months,
      datasets: [
        {
          label: 'Listings Created',
          data: listingsData,
          borderColor: chartColors.primary,
          backgroundColor: `${chartColors.primary}20`,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: chartColors.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
        },
        {
          label: 'Orders Placed',
          data: ordersData,
          borderColor: chartColors.secondary,
          backgroundColor: `${chartColors.secondary}20`,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: chartColors.secondary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
        },
      ],
    };
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          color: '#374151'
        }
      },
      title: {
        display: true,
        text: 'Monthly Activity Trend',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#374151'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#6B7280'
        },
        grid: {
          color: '#E5E7EB'
        }
      },
      x: {
        ticks: {
          color: '#6B7280'
        },
        grid: {
          color: '#E5E7EB'
        }
      }
    },
  };

  // 4. Doughnut Chart - Financial Overview
  const getFinancialData = () => {
    return {
      labels: ['Total Spent', 'Potential Revenue', 'Savings'],
      datasets: [
        {
          data: [
            stats.totalSpent,
            stats.totalRevenue,
            Math.max(0, stats.totalRevenue - stats.totalSpent)
          ],
          backgroundColor: [
            `${chartColors.error}E6`,
            `${chartColors.success}E6`,
            `${chartColors.warning}E6`
          ],
          borderColor: [
            chartColors.error,
            chartColors.success,
            chartColors.warning
          ],
          borderWidth: 2,
          cutout: '60%',
          hoverOffset: 4
        },
      ],
    };
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#374151'
        }
      },
      title: {
        display: true,
        text: 'Financial Overview',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#374151'
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1C9B8E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <FiPieChart className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-blue-100">Welcome back, {user?.displayName || 'User'}! Here's your activity summary.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">My Listings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.myListings}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                <FiTrendingUp className="w-4 h-4" />
                Active
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#1C9B8E] to-[#53DFD1] rounded-xl flex items-center justify-center">
              <FiPackage className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">My Orders</p>
              <p className="text-3xl font-bold text-gray-900">{stats.myOrders}</p>
              <p className="text-sm text-blue-600 flex items-center gap-1 mt-2">
                <FiCalendar className="w-4 h-4" />
                Total
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#0F1E64] to-[#1C9B8E] rounded-xl flex items-center justify-center">
              <FiShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900">${stats.totalSpent}</p>
              <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                <FiDollarSign className="w-4 h-4" />
                Expenses
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#EF4444] to-[#F59E0B] rounded-xl flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Activity</p>
              <p className="text-3xl font-bold text-gray-900">{stats.recentActivity}</p>
              <p className="text-sm text-purple-600 flex items-center gap-1 mt-2">
                <FiTrendingUp className="w-4 h-4" />
                Combined
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-xl flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="h-80">
            <Bar data={activityBarData} options={activityBarOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="h-80">
            <Pie data={getCategoryData()} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="h-80">
            <Line data={getMonthlyTrendData()} options={lineOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="h-80">
            <Doughnut data={getFinancialData()} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FiCalendar className="w-5 h-5" />
            Recent Orders
          </h3>
        </div>
        <div className="p-6">
          {myOrders.length === 0 ? (
            <div className="text-center py-8">
              <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders yet</p>
              <p className="text-gray-400">Start shopping to see your orders here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="border-gray-200">
                    <th className="text-left font-semibold text-gray-700">Service</th>
                    <th className="text-left font-semibold text-gray-700">Price</th>
                    <th className="text-left font-semibold text-gray-700">Date</th>
                    <th className="text-left font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.slice(0, 5).map((order, index) => (
                    <tr key={index} className="border-gray-100 hover:bg-gray-50">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img 
                                src={order.image || '/placeholder.jpg'} 
                                alt={order.serviceName || order.productName}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{order.serviceName || order.productName}</div>
                            <div className="text-sm text-gray-500">{order.category || 'General'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold text-green-600">${order.price}</td>
                      <td className="text-gray-600">{new Date(order.orderDate || order.date).toLocaleDateString()}</td>
                      <td>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
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
    </div>
  );
};

export default Stats;