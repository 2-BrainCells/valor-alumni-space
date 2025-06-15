
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Search } from 'lucide-react';
import { Button } from './ui/button';

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <Briefcase className="h-10 w-10 text-gray-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Search className="h-4 w-4 text-blue-600" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No jobs found
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        We couldn't find any job opportunities matching your current filters. 
        Try adjusting your search criteria or clearing the filters.
      </p>
      
      <Button variant="outline">
        Clear All Filters
      </Button>
    </motion.div>
  );
};

export default EmptyState;
