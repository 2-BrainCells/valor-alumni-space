
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
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
  const { toggleTheme, actualTheme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);

  const isDark = actualTheme === 'dark';

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

  const toggleButton = (
    <motion.button
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`
        relative flex items-center justify-center w-14 h-8 rounded-full
        transition-all duration-300 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        ${isDark 
          ? 'bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg' 
          : 'bg-gradient-to-r from-slate-200 to-slate-300 shadow-md'
        }
      `}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Sliding thumb */}
      <motion.div
        className={`
          absolute w-6 h-6 rounded-full flex items-center justify-center
          ${isDark 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/40' 
            : 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-amber-500/40'
          }
          shadow-lg
        `}
        animate={{
          x: isDark ? 22 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        {/* Icon container */}
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
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Moon className="w-3 h-3 text-white" />
            ) : (
              <Sun className="w-3 h-3 text-white" />
            )}
          </motion.div>
        </AnimatePresence>
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
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return toggleButton;
};

export default PremiumThemeToggle;
