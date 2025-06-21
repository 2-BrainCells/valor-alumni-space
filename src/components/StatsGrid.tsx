
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Coins } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    {
      icon: Briefcase,
      label: 'Available Jobs',
      value: '24',
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Users,
      label: 'Connections',
      value: '156',
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Coins,
      label: 'Coins',
      value: '320',
      gradient: 'from-yellow-500 to-yellow-600',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-600 dark:text-yellow-400',
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
      scale: 1
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card-theme p-6 interactive-glow"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg transition-theme ${stat.iconBg}`}>
              <stat.icon className={`h-6 w-6 transition-fast ${stat.textColor}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-theme transition-fast">{stat.label}</p>
              <p className="text-2xl font-bold text-primary-theme transition-fast">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
