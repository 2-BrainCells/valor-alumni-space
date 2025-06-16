
import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import JobPostsFeed from '../components/JobPostsFeed';

const Jobs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
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
          <JobPostsFeed />
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

export default Jobs;
