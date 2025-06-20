
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
      <div className={`max-w-[85%] ${isBot ? 'mr-8' : 'ml-8'}`}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
            isBot
              ? 'rounded-bl-md shadow-lg'
              : 'rounded-br-md shadow-lg'
          } ${type === 'card' ? 'rounded-lg' : ''}`}
          style={{
            background: isBot
              ? `
                  linear-gradient(135deg, 
                    rgba(30, 41, 59, 0.95) 0%, 
                    rgba(51, 65, 85, 0.95) 100%
                  )
                `
              : `
                  linear-gradient(135deg, 
                    #2563EB 0%, 
                    #3B82F6 50%, 
                    #1D4ED8 100%
                  )
                `,
            borderLeft: isBot ? '3px solid #3B82F6' : 'none',
            boxShadow: isBot
              ? `
                  0 4px 14px rgba(59, 130, 246, 0.15),
                  0 0 0 1px rgba(59, 130, 246, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `
              : `
                  0 4px 14px rgba(37, 99, 235, 0.25),
                  0 0 20px rgba(59, 130, 246, 0.15),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `
          }}
        >
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {type === 'card' ? (
            <div className="space-y-3 relative z-10">
              <p className="text-sm font-medium leading-relaxed text-white">{text}</p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="backdrop-blur-sm rounded-lg p-3 space-y-2 border overflow-hidden relative"
                style={{
                  background: 'rgba(15, 23, 42, 0.3)',
                  borderColor: 'rgba(59, 130, 246, 0.2)'
                }}
              >
                {/* Card shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full animate-shimmer" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h4 className="font-semibold text-sm text-white">Senior React Developer</h4>
                    <p className="text-xs text-blue-200">TechCorp Inc.</p>
                  </div>
                  <motion.span 
                    className="text-xs px-2 py-1 rounded-full font-medium relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(16, 185, 129, 0.4)',
                        '0 0 30px rgba(16, 185, 129, 0.6)',
                        '0 0 20px rgba(16, 185, 129, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white relative z-10">New</span>
                  </motion.span>
                </div>
                <p className="text-xs text-blue-200 relative z-10">$120k - $150k • Remote</p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-white text-xs py-2 rounded-lg transition-all duration-200 font-medium ripple relative z-10 overflow-hidden"
                  style={{
                    background: 'rgba(59, 130, 246, 0.3)',
                    border: '1px solid rgba(59, 130, 246, 0.4)'
                  }}
                >
                  View Details
                </motion.button>
              </motion.div>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap leading-relaxed relative z-10 font-medium text-white">
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
          <span 
            className="text-xs px-2 py-1 rounded-full transition-colors duration-300"
            style={{
              background: 'rgba(51, 65, 85, 0.6)',
              color: '#94A3B8',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
          >
            {format(timestamp, 'HH:mm')}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
