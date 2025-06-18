
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ProfileActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      icon: Briefcase,
      title: 'Posted a job opportunity',
      description: 'Senior Frontend Developer at Meta',
      timestamp: '2 hours ago',
      color: 'bg-blue-500 dark:bg-blue-600',
    },
    {
      id: 2,
      icon: Users,
      title: 'Connected with 3 alumni',
      description: 'From Computer Science batch 2022',
      timestamp: '1 day ago',
      color: 'bg-green-500 dark:bg-green-600',
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Earned 25 coins',
      description: 'For successful job referral',
      timestamp: '3 days ago',
      color: 'bg-yellow-500 dark:bg-yellow-600',
    },
    {
      id: 4,
      icon: User,
      title: 'Updated profile',
      description: 'Added new skills and experience',
      timestamp: '1 week ago',
      color: 'bg-purple-500 dark:bg-purple-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
            
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-4"
                >
                  {/* Activity dot */}
                  <div className={`w-12 h-12 rounded-full ${activity.color} flex items-center justify-center relative z-10`}>
                    <activity.icon className="h-5 w-5 text-white" />
                  </div>
                  
                  {/* Activity content */}
                  <div className="flex-1 pb-6">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileActivityTimeline;
