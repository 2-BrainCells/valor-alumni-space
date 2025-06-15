
import React from 'react';
import { motion } from 'framer-motion';

const ActivitySkeleton = () => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="flex items-start space-x-3"
    >
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </motion.div>
  );
};

export default ActivitySkeleton;
