import React, { useContext, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiPlus,
  FiList,
  FiShoppingCart,
  FiBarChart,
  FiUsers,
  FiPackage,
  FiChevronDown
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import pawLogo from '../assets/logo.png';

const DashboardLayout = () => {
  const { user, userRole, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const userMenuItems = [
    { path: '/dashboard/stats', label: 'Dashboard', icon: FiBarChart },
    { path: '/dashboard/add-listing', label: 'Add Listing', icon: FiPlus },
    { path: '/dashboard/my-listings', label: 'My Listings', icon: FiList },
    { path: '/dashboard/my-orders', label: 'My Orders', icon: FiShoppingCart },
  ];

  const adminMenuItems = [
    { path: '/dashboard/admin/statistics', label: 'Statistics', icon: FiBarChart },
    { path: '/dashboard/admin/manage-listings', label: 'Manage Listings', icon: FiPackage },
    { path: '/dashboard/admin/manage-orders', label: 'Manage Orders', icon: FiShoppingCart },
    { path: '/dashboard/admin/manage-users', label: 'Manage Users', icon: FiUsers },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Top Navbar - Mobile Only */}
      <nav className="bg-gradient-to-r from-[#1C9B8E] to-[#0F1E64] shadow-lg fixed w-full top-0 z-50 lg:hidden">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and Menu Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 transition-colors duration-200"
              >
                {sidebarOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
              
              <Link to="/" className="flex items-center ml-4 group">
                <div className="bg-white p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img src={pawLogo} alt="PawMart" className="h-8 w-8" />
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold text-white tracking-tight">
                    Paw<span className="text-[#53DFD1]">Mart</span>
                  </span>
                  <div className="text-xs text-blue-100 font-medium">
                    {userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                  </div>
                </div>
              </Link>
            </div>

            {/* Right side - Profile Dropdown */}
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 text-white"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
                    <img
                      alt="Profile"
                      src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user?.displayName || 'User'}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                            userRole === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {userRole === 'admin' ? 'Administrator' : 'User'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FiUser className="w-4 h-4" />
                        Profile Settings
                      </Link>
                      
                      <Link
                        to={userRole === 'admin' ? '/dashboard/admin/statistics' : '/dashboard/stats'}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FiHome className="w-4 h-4" />
                        Dashboard Home
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Click outside to close dropdown */}
      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdownOpen(false)}
        ></div>
      )}

      {/* Sidebar - Fixed positioned */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        fixed 
        top-0 
        left-0 
        z-50 
        h-full 
        w-64 lg:w-20 
        bg-[#53DFD1] text-white
        transition-transform duration-300 ease-in-out lg:transition-none 
        px-4 py-6 
        overflow-y-auto
        flex flex-col
      `}>
        {/* Logo Section - Desktop Only */}
        <div className="hidden lg:flex items-center justify-center mb-8 pt-4">
          <Link to="/" className="group">
            <div className="bg-white p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              <img src={pawLogo} alt="PawMart" className="h-8 w-8" />
            </div>
          </Link>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <div className="bg-white p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                <img src={pawLogo} alt="PawMart" className="h-8 w-8" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-white tracking-tight">
                  Paw<span className="text-white/80">Mart</span>
                </span>
                <div className="text-xs text-white/70 font-medium">
                  {userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                </div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-white hover:bg-white/20 transition-colors duration-200"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#556B2F] shadow-lg'
                      : 'text-white hover:bg-white/20 hover:text-white'
                  } ${isDesktop ? 'justify-center' : 'justify-start'}`}
                  onClick={() => setSidebarOpen(false)}
                  title={isDesktop ? item.label : ''}
                >
                  <Icon className={`${isActive ? 'text-[#556B2F]' : 'text-white'} h-5 w-5 ${isDesktop ? '' : 'mr-3'}`} />
                  {!isDesktop && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Back to Home */}
        <div className="border-t border-white/20 pt-4 mt-4">
          <Link
            to="/"
            className={`flex items-center w-full px-3 py-2 text-sm font-medium text-white rounded-xl hover:bg-white/20 hover:text-white transition-colors duration-200 ${isDesktop ? 'justify-center' : 'justify-start'}`}
            title={isDesktop ? "Back to Website" : ''}
          >
            <FiHome className={`h-5 w-5 ${isDesktop ? '' : 'mr-3'}`} />
            {!isDesktop && <span>Back to Website</span>}
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isDesktop ? 'ml-20' : 'ml-0'} ${!isDesktop ? 'pt-16' : 'pt-0'} min-h-screen overflow-hidden`}>
        <main className="p-6 h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;