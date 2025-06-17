
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Briefcase, Network, MessageSquare, User } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/core';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: Network, label: 'Network', path: '/network' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handleNavClick = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      // Fallback for web
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 safe-area-pb z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className="flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 relative"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-100 dark:bg-blue-900/50' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon 
                  className={`h-5 w-5 ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`} 
                />
              </motion.div>
              <span className={`text-xs mt-1 font-medium ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
