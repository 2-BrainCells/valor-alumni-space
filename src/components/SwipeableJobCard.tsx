
import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Heart, X, Bookmark, Share } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/core';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  techStack: string[];
  description: string;
  alumni: {
    name: string;
    avatar: string;
  };
  logo?: string;
}

interface SwipeableJobCardProps {
  job: Job;
  onSwipeLeft: (job: Job) => void;
  onSwipeRight: (job: Job) => void;
  onBookmark: (job: Job) => void;
  onShare: (job: Job) => void;
}

const SwipeableJobCard = ({ job, onSwipeLeft, onSwipeRight, onBookmark, onShare }: SwipeableJobCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const [{ x, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
    scale: 1,
  }));

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = Math.abs(mx) > 100;
      const shouldSwipe = !active && trigger;

      if (shouldSwipe) {
        const dir = xDir > 0 ? 1 : -1;
        api.start({
          x: dir * window.innerWidth,
          rotate: dir * 10,
          scale: 0.8,
          config: { tension: 200, friction: 20 },
        });
        
        setTimeout(() => {
          if (dir > 0) {
            onSwipeRight(job);
          } else {
            onSwipeLeft(job);
          }
        }, 200);

        // Haptic feedback
        try {
          Haptics.impact({ style: ImpactStyle.Medium });
        } catch (error) {
          if (navigator.vibrate) {
            navigator.vibrate(100);
          }
        }
      } else {
        api.start({
          x: active ? mx : 0,
          rotate: active ? mx / 10 : 0,
          scale: active ? 1.05 : 1,
          config: { tension: 200, friction: 20 },
        });
      }
    },
    { axis: 'x' }
  );

  const handleLongPress = () => {
    setShowActions(true);
    try {
      Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(job);
    try {
      Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <animated.div
        {...bind()}
        style={{
          x,
          rotate: rotate.to(r => `${r}deg`),
          scale,
        }}
        className="absolute inset-0 touch-none"
      >
        <motion.div
          onLongPress={handleLongPress}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 h-full overflow-hidden relative"
        >
          {/* Swipe Indicators */}
          <div className="absolute top-4 left-4 opacity-0 transition-opacity duration-200">
            <div className="bg-red-500 text-white p-2 rounded-full">
              <X className="h-4 w-4" />
            </div>
          </div>
          <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-200">
            <div className="bg-green-500 text-white p-2 rounded-full">
              <Heart className="h-4 w-4" />
            </div>
          </div>

          {/* Job Content */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                {job.company.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">
                {job.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                {job.company} • {job.location}
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Bookmark className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {job.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
            {job.techStack.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                +{job.techStack.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {job.alumni.avatar}
                </span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                via {job.alumni.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {job.salary}
            </span>
          </div>
        </motion.div>
      </animated.div>

      {/* Action Menu */}
      {showActions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"
          onClick={() => setShowActions(false)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 m-4 space-y-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onShare(job);
                setShowActions(false);
              }}
              className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Share className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-gray-100">Share Job</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBookmark}
              className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bookmark className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-gray-100">
                {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SwipeableJobCard;
