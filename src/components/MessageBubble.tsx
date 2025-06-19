
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`max-w-[80%] ${isBot ? 'mr-8' : 'ml-8'}`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isBot
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-bl-md'
              : 'bg-blue-500 text-white rounded-br-md'
          } ${type === 'card' ? 'rounded-lg' : ''}`}
        >
          {type === 'card' ? (
            <div className="space-y-3">
              <p className="text-sm">{text}</p>
              <div className="bg-white bg-opacity-10 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">Senior React Developer</h4>
                    <p className="text-xs opacity-90">TechCorp Inc.</p>
                  </div>
                  <span className="text-xs bg-green-400 text-green-900 px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
                <p className="text-xs opacity-80">$120k - $150k • Remote</p>
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs py-2 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{text}</p>
          )}
        </div>
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mt-1`}>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {format(timestamp, 'HH:mm')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
