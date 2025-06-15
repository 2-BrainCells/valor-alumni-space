
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DailyCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
  todayCheckedIn: boolean;
  onCheckIn: () => void;
}

const DailyCheckInModal: React.FC<DailyCheckInModalProps> = ({
  isOpen,
  onClose,
  streakDays,
  todayCheckedIn,
  onCheckIn,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCheckIn = () => {
    setIsAnimating(true);
    
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onCheckIn();
      setIsAnimating(false);
    }, 1000);
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const isCheckedIn = i <= streakDays - 1;
      const isToday = i === 0;
      
      days.push({
        date: date.getDate(),
        isCheckedIn,
        isToday,
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Check-In
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {streakDays} Day{streakDays !== 1 ? 's' : ''}
            </div>
            <p className="text-gray-600">Current Streak</p>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                  ${day.isCheckedIn 
                    ? 'bg-green-500 text-white' 
                    : day.isToday 
                      ? 'bg-blue-100 text-blue-600 border-2 border-blue-500' 
                      : 'bg-gray-100 text-gray-400'
                  }
                `}
              >
                {day.date}
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            {!todayCheckedIn ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Gift className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Today's Reward: 50 coins</span>
                </div>
                <Button
                  onClick={handleCheckIn}
                  disabled={isAnimating}
                  className={`w-full ${isAnimating ? 'animate-pulse' : ''}`}
                >
                  {isAnimating ? 'Claiming...' : 'Claim Reward'}
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓ Already checked in today
                </Badge>
                <p className="text-sm text-gray-600">Come back tomorrow for your next reward!</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyCheckInModal;
