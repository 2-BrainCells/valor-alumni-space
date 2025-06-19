
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ 
  questions, 
  onQuestionClick 
}) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 p-3 bg-gray-50 dark:bg-gray-900">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        Suggested questions:
      </div>
      <ScrollArea className="w-full">
        <motion.div 
          className="flex gap-2 pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {questions.map((question, index) => (
            <motion.div
              key={question}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onQuestionClick(question)}
                className="whitespace-nowrap text-xs px-3 py-1 h-7 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                {question}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default SuggestedQuestions;
