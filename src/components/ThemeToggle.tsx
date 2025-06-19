
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { toggleTheme, actualTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 relative transition-all duration-300 hover:bg-accent/80 hover-glow focus-glow group"
      title={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: actualTheme === 'light' ? 1 : 0,
            rotate: actualTheme === 'light' ? 0 : 90,
            opacity: actualTheme === 'light' ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.3
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-4 w-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: actualTheme === 'dark' ? 1 : 0,
            rotate: actualTheme === 'dark' ? 0 : -90,
            opacity: actualTheme === 'dark' ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.3
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        </motion.div>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: actualTheme === 'light' 
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
        }}
      />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
