
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
      {/* Floating Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-15 h-15 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center ripple glow-effect"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: isOpen ? 1 : [1, 1.1, 1],
          boxShadow: isOpen 
            ? "0 10px 25px rgba(59, 130, 246, 0.3)" 
            : [
                "0 10px 25px rgba(59, 130, 246, 0.2)",
                "0 15px 35px rgba(59, 130, 246, 0.4)",
                "0 10px 25px rgba(59, 130, 246, 0.2)"
              ]
        }}
        transition={{
          scale: {
            repeat: isOpen ? 0 : Infinity,
            duration: 2,
            ease: "easeInOut"
          },
          boxShadow: {
            repeat: isOpen ? 0 : Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
      >
        <MessageSquare className="w-6 h-6 text-white drop-shadow-sm" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <>
            {/* Mobile Overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={closeChat}
              />
            )}

            {/* Chat Window */}
            <motion.div
              initial={{ 
                opacity: 0, 
                y: isMobile ? "100%" : 50,
                scale: isMobile ? 1 : 0.9 
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                y: isMobile ? "100%" : 50,
                scale: isMobile ? 1 : 0.9 
              }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`fixed z-50 bg-card/95 dark:bg-card/95 backdrop-blur-xl rounded-lg shadow-2xl border border-border/50 transition-all duration-300 card-elevated glass-enhanced ${
                isMobile 
                  ? 'inset-x-4 inset-y-8' 
                  : 'bottom-24 right-6 w-[420px] h-[650px] max-w-[90vw] max-h-[80vh]'
              }`}
              style={{
                boxShadow: isMobile 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-blue-500/90 to-purple-600/90 dark:from-blue-400/90 dark:to-purple-500/90 rounded-t-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white drop-shadow-sm">Alumni Assistant</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={minimizeChat}
                    className="p-1.5 hover:bg-white/20 rounded-md transition-all duration-200 ripple"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={closeChat}
                    className="p-1.5 hover:bg-white/20 rounded-md transition-all duration-200 ripple"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="relative h-full">
                <ChatWindow onClose={closeChat} />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/10 pointer-events-none rounded-b-lg" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Minimized State */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 bg-gradient-to-r from-blue-500/90 to-purple-600/90 dark:from-blue-400/90 dark:to-purple-500/90 backdrop-blur-sm rounded-lg shadow-lg z-50 p-3 cursor-pointer transition-all duration-300 hover-glow"
            onClick={() => setIsMinimized(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2 text-white">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Alumni Assistant</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
