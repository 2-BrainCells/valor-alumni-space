
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Menu, ChevronDown } from 'lucide-react';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }: DashboardHeaderProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AN</span>
            </div>
            <span className="hidden sm:block text-xl font-semibold text-gray-800">
              AlumniNet
            </span>
          </Link>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-lg mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, alumni, companies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                John Doe
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Admin Settings
                </Link>
                <hr className="my-2" />
                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
