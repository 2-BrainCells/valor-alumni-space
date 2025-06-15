
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, Star, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  reward: number;
}

const AchievementSystem: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Connection',
      description: 'Connect with your first alumni',
      icon: Users,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      reward: 100,
    },
    {
      id: '2',
      title: 'Networking Pro',
      description: 'Build a network of 50 connections',
      icon: TrendingUp,
      progress: 23,
      maxProgress: 50,
      unlocked: false,
      reward: 500,
    },
    {
      id: '3',
      title: 'Helper',
      description: 'Give 10 referrals to fellow students',
      icon: Star,
      progress: 3,
      maxProgress: 10,
      unlocked: false,
      reward: 300,
    },
    {
      id: '4',
      title: 'Community Leader',
      description: 'Earn 1000 coins through activities',
      icon: Award,
      progress: 750,
      maxProgress: 1000,
      unlocked: false,
      reward: 200,
    },
  ];

  const progressPercentage = (progress: number, max: number) => (progress / max) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Award className="h-5 w-5 text-yellow-600" />
        <h3 className="text-lg font-semibold">Achievements</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {achievement.unlocked ? (
                      <achievement.icon className="h-5 w-5" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {achievement.title}
                      </h4>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {achievement.description}
                    </p>
                    
                    {!achievement.unlocked && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress
                          value={progressPercentage(achievement.progress, achievement.maxProgress)}
                          className="h-1.5"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedAchievement && (
        <Dialog open={true} onOpenChange={() => setSelectedAchievement(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <selectedAchievement.icon className="h-5 w-5" />
                {selectedAchievement.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-gray-600">{selectedAchievement.description}</p>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-yellow-600">
                  Reward: {selectedAchievement.reward} coins
                </div>
              </div>

              {!selectedAchievement.unlocked && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{selectedAchievement.progress}/{selectedAchievement.maxProgress}</span>
                  </div>
                  <Progress
                    value={progressPercentage(selectedAchievement.progress, selectedAchievement.maxProgress)}
                    className="h-2"
                  />
                </div>
              )}

              {selectedAchievement.unlocked && (
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800">
                    Achievement Unlocked! 🎉
                  </Badge>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AchievementSystem;
