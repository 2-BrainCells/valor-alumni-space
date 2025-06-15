
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Network, 
  MessageSquare, 
  User 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Briefcase, label: 'Jobs', active: false },
    { icon: Network, label: 'Network', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
    { icon: User, label: 'Profile', active: false },
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
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon 
                className={`h-5 w-5 transition-colors ${
                  item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} 
              />
              <span className="font-medium">{item.label}</span>
            </motion.a>
          ))}
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
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon 
                className={`h-5 w-5 transition-colors ${
                  item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} 
              />
              <span className="font-medium">{item.label}</span>
            </motion.a>
          ))}
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
