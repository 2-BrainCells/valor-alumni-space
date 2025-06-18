
import React from 'react';
import CountUp from 'react-countup';
import { Coins, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

interface CoinBalanceWidgetProps {
  balance: number;
  dailyEarned: number;
  dailyGoal: number;
}

const CoinBalanceWidget: React.FC<CoinBalanceWidgetProps> = ({
  balance,
  dailyEarned,
  dailyGoal,
}) => {
  const progressPercentage = (dailyEarned / dailyGoal) * 100;

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border-yellow-200 dark:border-gray-700 w-full shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Coins className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-200 text-sm lg:text-base truncate">Coin Balance</span>
          </div>
          <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
        </div>
        
        <div className="mb-3 lg:mb-4">
          <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 break-all">
            <CountUp end={balance} duration={1.5} />
          </div>
          <div className="text-sm lg:text-base text-gray-600 dark:text-gray-300 mt-1">
            Daily earned: <span className="font-medium text-green-600 dark:text-green-400">{dailyEarned}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs lg:text-sm text-gray-600 dark:text-gray-300">
            <span>Daily Progress</span>
            <span className="font-medium">{dailyEarned}/{dailyGoal}</span>
          </div>
          <Progress value={progressPercentage} className="h-2 lg:h-3 bg-gray-200 dark:bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinBalanceWidget;
