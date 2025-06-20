
import React from 'react';
import { motion } from 'framer-motion';
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

  const isDark = actualTheme === 'dark';

  const handleToggle = () => {
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    toggleTheme();
  };

  const toggleButton = (
    <motion.button
      onClick={handleToggle}
      className={`
        relative flex items-center justify-center w-10 h-10 rounded-lg
        transition-all duration-300 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        ${isDark 
          ? 'bg-gray-800 hover:bg-gray-700 text-blue-400' 
          : 'bg-gray-100 hover:bg-gray-200 text-orange-500'
        }
        shadow-md hover:shadow-lg
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
      >
        {isDark ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
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
