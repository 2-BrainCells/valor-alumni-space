
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Smile, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && message.length <= maxLength) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
      
      // Auto-resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
      }
    }
  };

  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const commonEmojis = ['😀', '😊', '👍', '❤️', '😂', '🤔', '👋', '🎉'];

  return (
    <div 
      className="border-t p-4 relative"
      style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderTopColor: 'rgba(59, 130, 246, 0.2)'
      }}
    >
      {/* Premium Emoji Picker */}
      {showEmojiPicker && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-3 p-3 rounded-xl border shadow-xl backdrop-blur-sm"
          style={{
            background: 'rgba(30, 41, 59, 0.95)',
            borderColor: 'rgba(59, 130, 246, 0.3)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="flex flex-wrap gap-2">
            {commonEmojis.map((emoji) => (
              <motion.button
                key={emoji}
                onClick={() => insertEmoji(emoji)}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}
              >
                <span className="text-lg">{emoji}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask about jobs, alumni, or anything..."
            className="min-h-[44px] max-h-[120px] resize-none pr-24 border-0 focus:ring-2 transition-all duration-300"
            rows={1}
            style={{
              background: 'rgba(51, 65, 85, 0.8)',
              color: '#F8FAFC',
              borderRadius: '12px',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = `
                inset 0 1px 3px rgba(0, 0, 0, 0.2),
                0 0 0 2px rgba(59, 130, 246, 0.4),
                0 0 20px rgba(59, 130, 246, 0.2)
              `;
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.2)';
            }}
          />
          
          {/* Premium Action Buttons */}
          <div className="absolute right-3 bottom-2 flex items-center gap-1">
            <motion.button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="h-8 w-8 p-0 rounded-lg transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              <Smile className="h-4 w-4 text-blue-400" />
            </motion.button>
            
            <motion.button
              type="button"
              className="h-8 w-8 p-0 rounded-lg transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              <Paperclip className="h-4 w-4 text-blue-400" />
            </motion.button>
            
            <motion.button
              type="submit"
              disabled={!message.trim() || message.length > maxLength}
              className="h-8 w-8 p-0 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
              whileHover={{ scale: message.trim() ? 1.05 : 1 }}
              whileTap={{ scale: message.trim() ? 0.95 : 1 }}
              style={{
                background: message.trim() 
                  ? 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)'
                  : 'rgba(75, 85, 99, 0.5)',
                boxShadow: message.trim() 
                  ? '0 0 20px rgba(59, 130, 246, 0.4)'
                  : 'none'
              }}
            >
              {message.trim() && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-300/20 to-blue-400/20"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
              <ArrowRight className="h-4 w-4 text-white relative z-10" />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Character Counter */}
        <div className="flex justify-between items-center text-xs">
          <span></span>
          <span 
            className={`px-2 py-1 rounded-full transition-colors duration-300 ${
              message.length > maxLength * 0.9 
                ? 'text-red-400 bg-red-900/20' 
                : 'text-slate-400 bg-slate-700/30'
            }`}
          >
            {message.length}/{maxLength}
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
