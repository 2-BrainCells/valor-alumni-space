
import React, { useState, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

const PullToRefresh = ({ onRefresh, children, className = '' }: PullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const handlePanStart = useCallback(() => {
    if (window.scrollY > 10) return;
  }, []);

  const handlePan = useCallback((event: any, info: PanInfo) => {
    if (window.scrollY > 10) return;
    if (info.delta.y > 0) {
      setPullDistance(Math.min(info.point.y, 100));
    }
  }, []);

  const handlePanEnd = useCallback(async (event: any, info: PanInfo) => {
    if (window.scrollY > 10) {
      setPullDistance(0);
      return;
    }

    if (info.point.y > 80 && !isRefreshing) {
      setIsRefreshing(true);
      
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (error) {
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
      }

      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
  }, [isRefreshing, onRefresh]);

  const refreshOpacity = Math.min(pullDistance / 80, 1);
  const refreshRotation = isRefreshing ? 360 : pullDistance * 2;

  return (
    <div className={`relative ${className}`}>
      {/* Pull to Refresh Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10"
        style={{
          height: Math.max(pullDistance, 0),
          opacity: refreshOpacity,
        }}
      >
        <motion.div
          animate={{ rotate: refreshRotation }}
          transition={{ duration: isRefreshing ? 1 : 0, repeat: isRefreshing ? Infinity : 0 }}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isRefreshing ? 'Refreshing...' : pullDistance > 80 ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ y: Math.max(pullDistance, 0) }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
