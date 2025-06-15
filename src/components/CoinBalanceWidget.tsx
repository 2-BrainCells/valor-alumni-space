
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
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Coins className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">Coin Balance</span>
          </div>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
        
        <div className="mb-3">
          <div className="text-2xl font-bold text-gray-900">
            <CountUp end={balance} duration={1.5} />
          </div>
          <div className="text-sm text-gray-600">
            Daily earned: <span className="font-medium text-green-600">{dailyEarned}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Daily Progress</span>
            <span>{dailyEarned}/{dailyGoal}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinBalanceWidget;
