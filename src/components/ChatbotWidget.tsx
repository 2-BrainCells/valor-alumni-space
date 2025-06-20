
import React, { useState } from 'react';
import { MessageSquare, X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const isMobile = useIsMobile();

  const toggleChat = () => {
    if (isOpen && !isMinimized) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Premium Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            filter: 'blur(8px)',
          }}
        />
        
        {/* Main button */}
        <motion.button
          onClick={toggleChat}
          className="relative w-16 h-16 bg-gradient-to-br from-slate-800 via-slate-900 to-black dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 rounded-full shadow-2xl border-2 border-blue-500/30 dark:border-blue-400/40 flex items-center justify-center ripple overflow-hidden"
          style={{
            boxShadow: `
              0 8px 32px rgba(59, 130, 246, 0.3),
              0 0 0 1px rgba(59, 130, 246, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          {/* Inner gradient ring */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-400/30 dark:to-purple-500/30" />
          
          {/* Icon */}
          <MessageSquare className="w-7 h-7 text-blue-400 dark:text-blue-300 drop-shadow-lg relative z-10" />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0"
            animate={{
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.button>
      </motion.div>

      {/* Premium Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <>
            {/* Mobile Overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
                onClick={closeChat}
              />
            )}

            {/* Chat Window with Glass Morphism */}
            <motion.div
              initial={{ 
                opacity: 0, 
                y: isMobile ? "100%" : 50,
                scale: isMobile ? 1 : 0.85 
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                y: isMobile ? "100%" : 50,
                scale: isMobile ? 1 : 0.85 
              }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`fixed z-50 rounded-2xl shadow-2xl border transition-all duration-300 overflow-hidden ${
                isMobile 
                  ? 'inset-x-4 inset-y-8' 
                  : 'bottom-24 right-6 w-[420px] h-[650px] max-w-[90vw] max-h-[80vh]'
              }`}
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(15, 23, 42, 0.95) 0%, 
                    rgba(30, 41, 59, 0.95) 50%, 
                    rgba(51, 65, 85, 0.95) 100%
                  )
                `,
                backdropFilter: 'blur(20px) saturate(180%)',
                borderColor: 'rgba(59, 130, 246, 0.3)',
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(59, 130, 246, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `
              }}
            >
              {/* Premium Header with Gradient */}
              <div 
                className="flex items-center justify-between p-4 border-b backdrop-blur-sm relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  borderBottomColor: 'rgba(59, 130, 246, 0.3)'
                }}
              >
                {/* Header gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20" />
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                    Alumni Assistant
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 relative z-10">
                  <motion.button
                    onClick={minimizeChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 ripple group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Minus className="w-4 h-4 text-white/80 group-hover:text-white" />
                  </motion.button>
                  <motion.button
                    onClick={closeChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 ripple group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4 text-white/80 group-hover:text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Chat Content with Dark Theme */}
              <div className="relative h-full bg-slate-900/50">
                <ChatWindow onClose={closeChat} />
                
                {/* Subtle bottom gradient for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Premium Minimized State */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 rounded-xl shadow-xl z-50 p-4 cursor-pointer transition-all duration-300 overflow-hidden"
            onClick={() => setIsMinimized(false)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              boxShadow: `
                0 10px 25px rgba(37, 99, 235, 0.3),
                0 0 0 1px rgba(59, 130, 246, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `
            }}
          >
            <div className="flex items-center gap-3 text-white relative z-10">
              <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageSquare className="w-3 h-3" />
              </div>
              <span className="text-sm font-medium">Alumni Assistant</span>
            </div>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-transparent to-purple-400/20 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
