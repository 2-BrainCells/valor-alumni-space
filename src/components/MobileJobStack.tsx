
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeableJobCard from './SwipeableJobCard';
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

interface MobileJobStackProps {
  jobs: Job[];
  onJobLiked: (job: Job) => void;
  onJobPassed: (job: Job) => void;
  onJobBookmarked: (job: Job) => void;
  onJobShared: (job: Job) => void;
}

const MobileJobStack = ({ 
  jobs, 
  onJobLiked, 
  onJobPassed, 
  onJobBookmarked, 
  onJobShared 
}: MobileJobStackProps) => {
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [swipedJobs, setSwipedJobs] = useState<Set<number>>(new Set());

  const handleSwipeLeft = useCallback((job: Job) => {
    setSwipedJobs(prev => new Set(prev).add(job.id));
    setCurrentJobIndex(prev => prev + 1);
    onJobPassed(job);
    
    try {
      Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  }, [onJobPassed]);

  const handleSwipeRight = useCallback((job: Job) => {
    setSwipedJobs(prev => new Set(prev).add(job.id));
    setCurrentJobIndex(prev => prev + 1);
    onJobLiked(job);
    
    try {
      Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  }, [onJobLiked]);

  const visibleJobs = jobs.slice(currentJobIndex, currentJobIndex + 3);

  if (currentJobIndex >= jobs.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-3xl">🎉</span>
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            All caught up!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You've reviewed all available jobs. Check back later for new opportunities!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 p-4">
      <div className="relative h-full max-w-sm mx-auto">
        <AnimatePresence>
          {visibleJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ 
                scale: 0.95 - index * 0.05,
                y: index * 8,
                opacity: 1 - index * 0.2 
              }}
              animate={{ 
                scale: 1 - index * 0.05,
                y: index * 8,
                opacity: 1 - index * 0.2,
                zIndex: visibleJobs.length - index
              }}
              exit={{ 
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.2 }
              }}
              className="absolute inset-0"
              style={{ zIndex: visibleJobs.length - index }}
            >
              {index === 0 && (
                <SwipeableJobCard
                  job={job}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onBookmark={onJobBookmarked}
                  onShare={onJobShared}
                />
              )}
              {index > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 h-full pointer-events-none">
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
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {currentJobIndex + 1} / {jobs.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileJobStack;
