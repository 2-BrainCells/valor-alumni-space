
import React from 'react';
import { motion } from 'framer-motion';

const JobCardSkeleton = () => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="border border-gray-200 rounded-lg p-4"
    >
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCardSkeleton;
