
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
          className="absolute inset-0 rounded-full opacity-60"
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
            background: 'linear-gradient(135deg, hsl(var(--brand-primary)), hsl(var(--info)))',
            filter: 'blur(8px)',
          }}
        />
        
        {/* Main button */}
        <motion.button
          onClick={toggleChat}
          className="relative w-16 h-16 rounded-full shadow-2xl border-2 flex items-center justify-center ripple overflow-hidden bg-secondary-theme border-primary-theme"
          style={{
            boxShadow: `
              0 8px 32px rgba(59, 130, 246, 0.3),
              0 0 0 1px hsl(var(--border-primary)),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          {/* Inner gradient ring */}
          <div className="absolute inset-1 rounded-full" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))'
          }} />
          
          {/* Icon */}
          <MessageSquare className="w-7 h-7 text-blue-400 drop-shadow-lg relative z-10" />
          
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
              className={`fixed z-50 rounded-2xl shadow-2xl border transition-all duration-300 overflow-hidden modal-theme ${
                isMobile 
                  ? 'inset-x-4 inset-y-8' 
                  : 'bottom-24 right-6 w-[420px] h-[650px] max-w-[90vw] max-h-[80vh]'
              }`}
            >
              {/* Premium Header with Gradient */}
              <div 
                className="flex items-center justify-between p-4 border-b backdrop-blur-sm relative overflow-hidden border-primary-theme"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
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
              <div className="relative h-full bg-secondary-theme">
                <ChatWindow onClose={closeChat} />
                
                {/* Subtle bottom gradient for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
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
            className="fixed bottom-24 right-6 rounded-xl shadow-xl z-50 p-4 cursor-pointer transition-all duration-300 overflow-hidden bg-secondary-theme border border-primary-theme"
            onClick={() => setIsMinimized(false)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 text-primary-theme relative z-10">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-blue-400" />
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
