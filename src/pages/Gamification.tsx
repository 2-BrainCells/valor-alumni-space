
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, History, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CoinBalanceWidget from '../components/CoinBalanceWidget';
import DailyCheckInModal from '../components/DailyCheckInModal';
import AchievementSystem from '../components/AchievementSystem';
import Leaderboard from '../components/Leaderboard';
import TransactionHistory from '../components/TransactionHistory';
import ReferralPurchaseFlow from '../components/ReferralPurchaseFlow';

const Gamification = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gamification Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your progress and earn rewards</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsDailyCheckInOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Daily Check-in
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsReferralFlowOpen(true)}
              >
                <Gift className="h-4 w-4 mr-2" />
                Buy Referral
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coin Balance Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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
            >
              <AchievementSystem />
            </motion.div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TransactionHistory />
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
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
  );
};

export default Gamification;
