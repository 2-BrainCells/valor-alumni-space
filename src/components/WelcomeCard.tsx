
import React from 'react';
import { motion } from 'framer-motion';

const WelcomeCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-blue-100 mb-4">
            Stay connected with your alumni network and discover new opportunities.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-sm font-semibold">MIT</span>
            </div>
            <span className="text-blue-100">Class of 2020 • Computer Science</span>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
