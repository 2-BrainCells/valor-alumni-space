
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Coins } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    {
      icon: Briefcase,
      label: 'Available Jobs',
      value: '24',
      color: 'bg-blue-50 text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      icon: Users,
      label: 'Connections',
      value: '156',
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100',
    },
    {
      icon: Coins,
      label: 'Coins',
      value: '320',
      color: 'bg-yellow-50 text-yellow-600',
      iconBg: 'bg-yellow-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.iconBg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color.split(' ')[1]}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;
