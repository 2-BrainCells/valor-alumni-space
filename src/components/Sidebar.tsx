
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Network, 
  MessageSquare, 
  User,
  Trophy,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Trophy, label: 'Gamification', path: '/gamification' },
    { icon: Settings, label: 'Admin', path: '/admin' },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-white lg:border-r lg:border-gray-200 lg:pt-16">
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div key={item.label}>
                <Link
                  to={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon 
                    className={`h-5 w-5 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 pt-16 lg:hidden"
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div key={item.label}>
                <Link
                  to={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon 
                    className={`h-5 w-5 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
