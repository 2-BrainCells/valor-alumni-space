
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import CoinBalanceWidget from '../components/CoinBalanceWidget';
import DailyCheckInModal from '../components/DailyCheckInModal';
import AchievementSystem from '../components/AchievementSystem';
import Leaderboard from '../components/Leaderboard';
import TransactionHistory from '../components/TransactionHistory';
import ReferralPurchaseFlow from '../components/ReferralPurchaseFlow';
import MobileBottomNav from '../components/MobileBottomNav';
import NetworkStatusIndicator from '../components/NetworkStatusIndicator';
import PullToRefresh from '../components/PullToRefresh';

const Gamification = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isDailyCheckInOpen, setIsDailyCheckInOpen] = useState(false);
  const [isReferralFlowOpen, setIsReferralFlowOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(1420);
  const [streakDays, setStreakDays] = useState(5);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setUserBalance(prev => prev + 50);
    setStreakDays(prev => prev + 1);
    setTodayCheckedIn(true);
    setIsDailyCheckInOpen(false);
  };

  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NetworkStatusIndicator />
      
      {/* Desktop Header */}
      {!isMobile && (
        <DashboardHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && <Sidebar isOpen={sidebarOpen} />}
        
        {/* Main Content */}
        <main className={`flex-1 flex flex-col overflow-hidden ${!isMobile ? 'lg:ml-64' : ''}`}>
          <PullToRefresh onRefresh={handleRefresh}>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 lg:p-6 max-w-full">
                <div className="max-w-7xl mx-auto w-full">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 lg:mb-6"
                  >
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                      <div className="text-center lg:text-left">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                          Gamification Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1 text-sm lg:text-base">Track your progress and earn rewards</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <Button
                          onClick={() => setIsDailyCheckInOpen(true)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 flex-1 sm:flex-none"
                          size={isMobile ? "sm" : "default"}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Daily Check-in
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsReferralFlowOpen(true)}
                          className="flex-1 sm:flex-none"
                          size={isMobile ? "sm" : "default"}
                        >
                          <Gift className="h-4 w-4 mr-2" />
                          Buy Referral
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Main Grid Layout */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                    {/* Main Content Column */}
                    <div className="xl:col-span-2 space-y-4 lg:space-y-6 min-w-0">
                      {/* Coin Balance Widget */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-full"
                      >
                        <CoinBalanceWidget
                          balance={userBalance}
                          dailyEarned={150}
                          dailyGoal={200}
                        />
                      </motion.div>

                      {/* Achievement System */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full"
                      >
                        <AchievementSystem />
                      </motion.div>

                      {/* Transaction History */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full"
                      >
                        <TransactionHistory />
                      </motion.div>
                    </div>

                    {/* Sidebar Column - Leaderboard */}
                    <div className="xl:col-span-1 min-w-0">
                      <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full"
                      >
                        <Leaderboard />
                      </motion.div>
                    </div>
                  </div>

                  {/* Modals */}
                  <DailyCheckInModal
                    isOpen={isDailyCheckInOpen}
                    onClose={() => setIsDailyCheckInOpen(false)}
                    streakDays={streakDays}
                    todayCheckedIn={todayCheckedIn}
                    onCheckIn={handleCheckIn}
                  />

                  <ReferralPurchaseFlow
                    isOpen={isReferralFlowOpen}
                    onClose={() => setIsReferralFlowOpen(false)}
                    referralCost={200}
                    userBalance={userBalance}
                    companyName="Google"
                    positionTitle="Software Engineer"
                  />
                </div>
              </div>
              
              {/* Mobile Bottom Padding */}
              {isMobile && <div className="h-20" />}
            </div>
          </PullToRefresh>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileBottomNav />}
      
      {/* Desktop Sidebar Overlay */}
      {!isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Gamification;
