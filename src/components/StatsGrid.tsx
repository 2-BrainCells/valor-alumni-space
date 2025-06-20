
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Coins } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    {
      icon: Briefcase,
      label: 'Available Jobs',
      value: '24',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-800/50',
    },
    {
      icon: Users,
      label: 'Connections',
      value: '156',
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-800/50',
    },
    {
      icon: Coins,
      label: 'Coins',
      value: '320',
      color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      iconBg: 'bg-yellow-100 dark:bg-yellow-800/50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 cascade-children"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-theme hover-glow card-elevated"
          style={{ '--row': Math.floor(index / 3) } as React.CSSProperties}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg transition-theme ${stat.iconBg}`}>
              <stat.icon className={`h-6 w-6 transition-fast ${stat.color.split(' ').slice(1, 3).join(' ')}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-fast">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-fast">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
