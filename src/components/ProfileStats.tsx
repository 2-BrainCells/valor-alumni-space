
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Activity } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const ProfileStats = () => {
  const stats = [
    {
      icon: TrendingUp,
      label: 'Coin Balance',
      value: '420',
      change: '+12 this week',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      icon: Users,
      label: 'Network',
      value: '156',
      change: '+8 connections',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Activity,
      label: 'Referrals Given',
      value: '23',
      change: '+3 this month',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
  ];

  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileStats;
