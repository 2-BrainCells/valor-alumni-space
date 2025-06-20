
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface PremiumThemeToggleProps {
  variant?: 'compact' | 'full';
  showLabel?: boolean;
  showTooltip?: boolean;
}

const PremiumThemeToggle = ({ 
  variant = 'compact', 
  showLabel = false, 
  showTooltip = true 
}: PremiumThemeToggleProps) => {
  const { toggleTheme, actualTheme, theme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const isDark = actualTheme === 'dark';
  const isSystem = theme === 'system';

  const handleToggle = async () => {
    setIsChanging(true);
    
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    // Trigger toggle
    toggleTheme();

    // Reset changing state after animation
    setTimeout(() => setIsChanging(false), 500);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  const handleMouseEnter = () => {
    if (showTooltip) {
      setShowPreview(true);
    }
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  const toggleButton = (
    <motion.div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {variant === 'compact' ? (
        // Compact Switch Version
        <motion.button
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className="relative flex items-center justify-center w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            boxShadow: isDark
              ? '0 4px 14px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 4px 14px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          }}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          role="switch"
          aria-checked={isDark}
        >
          {/* Track gradient overlay */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)'
            }}
          />

          {/* Sliding thumb */}
          <motion.div
            className="absolute w-6 h-6 rounded-full flex items-center justify-center"
            animate={{
              x: isDark ? 22 : 2,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              boxShadow: isDark
                ? '0 2px 8px rgba(59, 130, 246, 0.4)'
                : '0 2px 8px rgba(245, 158, 11, 0.4)'
            }}
          >
            {/* Icon container */}
            <div className="relative w-4 h-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 90, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {isDark ? (
                    <Moon className="w-3 h-3 text-white" />
                  ) : (
                    <Sun className="w-3 h-3 text-white" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Click ripple effect */}
          <AnimatePresence>
            {isChanging && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: isDark
                    ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)'
                }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      ) : (
        // Full Version with Label and System Indicator
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Sun className={`w-4 h-4 transition-colors ${!isDark ? 'text-amber-500' : 'text-gray-400'}`} />
            <Switch
              checked={isDark}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-amber-500"
            />
            <Moon className={`w-4 h-4 transition-colors ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
          </div>
          
          {showLabel && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {isDark ? 'Dark' : 'Light'} Mode
              </span>
              {isSystem && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  System preference
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Preview flash effect */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {toggleButton}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              {isSystem && ' (System)'}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return toggleButton;
};

export default PremiumThemeToggle;
