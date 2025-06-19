
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface QuickReplyButtonsProps {
  replies: string[];
  onReply: (reply: string) => void;
}

const QuickReplyButtons: React.FC<QuickReplyButtonsProps> = ({ replies, onReply }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap gap-2 mt-2 ml-2"
    >
      {replies.map((reply, index) => (
        <motion.div
          key={reply}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * index }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReply(reply)}
            className="rounded-full text-xs px-3 py-1 h-7 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            {reply}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickReplyButtons;
