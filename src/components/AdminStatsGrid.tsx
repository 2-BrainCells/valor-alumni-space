
import React from 'react';
import { Users, Briefcase, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminStatsGrid = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      title: 'Active Jobs',
      value: '134',
      change: '+8.2%',
      trend: 'up',
      icon: Briefcase,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
    {
      title: 'Monthly Signups',
      value: '428',
      change: '+23.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    },
    {
      title: 'Engagement Rate',
      value: '68.4%',
      change: '-2.3%',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStatsGrid;
