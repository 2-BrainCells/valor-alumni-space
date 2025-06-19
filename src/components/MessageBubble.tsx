
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'card';
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { text, isBot, timestamp, type } = message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`max-w-[80%] ${isBot ? 'mr-8' : 'ml-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
            isBot
              ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 text-white rounded-bl-md shadow-lg hover:shadow-xl hover:shadow-blue-500/25'
              : 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white rounded-br-md shadow-lg hover:shadow-xl hover:shadow-blue-500/25'
          } ${type === 'card' ? 'rounded-lg' : ''}`}
          style={{
            boxShadow: isBot
              ? '0 4px 14px 0 rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              : '0 4px 14px 0 rgba(59, 130, 246, 0.2)'
          }}
        >
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {type === 'card' ? (
            <div className="space-y-3 relative z-10">
              <p className="text-sm font-medium leading-relaxed">{text}</p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg p-3 space-y-2 border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm">Senior React Developer</h4>
                    <p className="text-xs opacity-90">TechCorp Inc.</p>
                  </div>
                  <span className="text-xs bg-emerald-400 dark:bg-emerald-500 text-emerald-900 dark:text-emerald-100 px-2 py-1 rounded-full font-medium pulse-glow">
                    New
                  </span>
                </div>
                <p className="text-xs opacity-80">$120k - $150k • Remote</p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/30 dark:bg-white/30 hover:bg-white/40 dark:hover:bg-white/40 text-white text-xs py-2 rounded-lg transition-all duration-200 font-medium ripple"
                >
                  View Details
                </motion.button>
              </motion.div>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap leading-relaxed relative z-10 font-medium">
              {text}
            </p>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`flex ${isBot ? 'justify-start' : 'justify-end'} mt-2`}
        >
          <span className="text-xs text-muted-foreground transition-colors duration-300 bg-muted/50 px-2 py-1 rounded-full">
            {format(timestamp, 'HH:mm')}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
