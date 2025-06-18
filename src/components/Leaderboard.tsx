
import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface LeaderboardUser {
  id: string;
  name: string;
  initials: string;
  coins: number;
  rank: number;
  isCurrentUser?: boolean;
}

const Leaderboard: React.FC = () => {
  const leaderboardData: LeaderboardUser[] = [
    { id: '1', name: 'Sarah Chen', initials: 'SC', coins: 2450, rank: 1 },
    { id: '2', name: 'Mike Johnson', initials: 'MJ', coins: 2100, rank: 2 },
    { id: '3', name: 'Emily Davis', initials: 'ED', coins: 1850, rank: 3 },
    { id: '4', name: 'Alex Rodriguez', initials: 'AR', coins: 1600, rank: 4 },
    { id: '5', name: 'John Smith', initials: 'JS', coins: 1420, rank: 5, isCurrentUser: true },
    { id: '6', name: 'Lisa Wang', initials: 'LW', coins: 1350, rank: 6 },
    { id: '7', name: 'David Kim', initials: 'DK', coins: 1200, rank: 7 },
    { id: '8', name: 'Anna Wilson', initials: 'AW', coins: 1150, rank: 8 },
    { id: '9', name: 'Chris Lee', initials: 'CL', coins: 1050, rank: 9 },
    { id: '10', name: 'Maria Garcia', initials: 'MG', coins: 950, rank: 10 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />;
      case 3:
        return <Award className="h-4 w-4 lg:h-5 lg:w-5 text-orange-500" />;
      default:
        return (
          <div className="w-4 h-4 lg:w-5 lg:h-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{rank}</span>
          </div>
        );
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 2:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 3:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2 lg:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Trophy className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-600 dark:text-yellow-500" />
          <span className="truncate">Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] lg:h-[500px]">
          <div className="space-y-0">
            {leaderboardData.map((user, index) => (
              <div
                key={user.id}
                className={`
                  flex items-center gap-2 lg:gap-3 p-3 lg:p-4 border-b last:border-b-0 transition-colors
                  border-gray-200 dark:border-gray-700
                  ${user.isCurrentUser 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <div className="flex items-center gap-2 flex-shrink-0">
                  {getRankIcon(user.rank)}
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getRankBadgeColor(user.rank)}`}
                  >
                    #{user.rank}
                  </Badge>
                </div>
                
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="text-xs lg:text-sm">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm lg:text-base truncate text-gray-900 dark:text-gray-100">
                      {user.name}
                    </p>
                    {user.isCurrentUser && (
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        You
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-sm lg:text-base text-yellow-600 dark:text-yellow-500">
                    {user.coins.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">coins</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
