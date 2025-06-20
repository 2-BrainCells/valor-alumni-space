
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-white dark:bg-gray-900 lg:border-r lg:border-gray-200 dark:border-gray-800 lg:pt-16 transition-theme nav-glass">
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div 
                key={item.label}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
                style={{ '--index': index } as React.CSSProperties}
              >
                <Link
                  to={item.path}
                  className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-lg group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600 dark:border-blue-400 glow-effect'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 hover-glow'
                  }`}
                >
                  <item.icon 
                    className={`h-5 w-5 transition-fast ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    }`} 
                  />
                  <span className="font-medium transition-fast">{item.label}</span>
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
        transition={{ type: 'tween', duration: 0.3, ease: "easeOut" }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 pt-16 lg:hidden transition-theme glass-effect"
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div 
                key={item.label}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
                style={{ '--index': index } as React.CSSProperties}
              >
                <Link
                  to={item.path}
                  className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-lg group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600 dark:border-blue-400 glow-effect'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 hover-glow'
                  }`}
                >
                  <item.icon 
                    className={`h-5 w-5 transition-fast ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    }`} 
                  />
                  <span className="font-medium transition-fast">{item.label}</span>
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
