
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import WelcomeCard from '../components/WelcomeCard';
import StatsGrid from '../components/StatsGrid';
import JobFeed from '../components/JobFeed';
import ActivityTimeline from '../components/ActivityTimeline';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <DashboardHeader 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Welcome Card */}
            <WelcomeCard />
            
            {/* Stats Grid */}
            <StatsGrid />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Job Feed */}
              <div className="xl:col-span-2">
                <JobFeed />
              </div>
              
              {/* Activity Timeline */}
              <div className="xl:col-span-1">
                <ActivityTimeline />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
