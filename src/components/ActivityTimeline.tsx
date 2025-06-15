
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import ActivitySkeleton from './ActivitySkeleton';

const ActivityTimeline = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const activities = [
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: '👩‍💼',
      action: 'posted a new job opportunity at Apple',
      time: '2 hours ago',
      type: 'job',
    },
    {
      id: 2,
      user: 'Mike Johnson',
      avatar: '👨‍💻',
      action: 'connected with 5 new alumni',
      time: '4 hours ago',
      type: 'connection',
    },
    {
      id: 3,
      user: 'Lisa Park',
      avatar: '👩‍🎓',
      action: 'shared an article about AI trends',
      time: '1 day ago',
      type: 'post',
    },
    {
      id: 4,
      user: 'David Kim',
      avatar: '👨‍🔬',
      action: 'joined the Data Science group',
      time: '2 days ago',
      type: 'group',
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <ActivitySkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg">{activity.avatar}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>{' '}
                <span className="text-gray-600">{activity.action}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityTimeline;
