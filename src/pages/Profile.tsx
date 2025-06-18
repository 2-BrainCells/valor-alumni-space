
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import UserInfoCard from '../components/UserInfoCard';
import SkillsSection from '../components/SkillsSection';
import ProfileStats from '../components/ProfileStats';
import ProfileActivityTimeline from '../components/ProfileActivityTimeline';
import EditProfileModal from '../components/EditProfileModal';

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
        <main className="flex-1 lg:ml-64">
          {/* Cover Photo Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-64 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800"
          >
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 dark:hover:bg-white/10"
            >
              <Camera className="h-5 w-5" />
            </Button>
            
            {/* Profile Picture Overlay */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-700 shadow-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">JS</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
                >
                  <Camera className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="pt-20 px-4 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <UserInfoCard onEdit={() => setIsEditModalOpen(true)} />
                <SkillsSection />
                <ProfileActivityTimeline />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <ProfileStats />
              </div>
            </div>
          </div>

          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
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

export default Profile;
