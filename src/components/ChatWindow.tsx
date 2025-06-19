
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickReplyButtons from './QuickReplyButtons';
import SuggestedQuestions from './SuggestedQuestions';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'card';
  quickReplies?: string[];
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Welcome to Alumni Assistant! I'm here to help you with jobs, connections, and more. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
      type: 'quick-reply',
      quickReplies: ['Find Jobs', 'Connect Alumni', 'Check Coin Balance']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const getBotResponse = (userText: string): Message => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('job') || lowerText.includes('find jobs')) {
      return {
        id: Date.now().toString(),
        text: "🔍 I found some great job opportunities for you! Here are the latest openings in your field:",
        isBot: true,
        timestamp: new Date(),
        type: 'card'
      };
    } else if (lowerText.includes('alumni') || lowerText.includes('connect')) {
      return {
        id: Date.now().toString(),
        text: "🤝 Let me help you connect with alumni in your area of interest. What field or company are you looking to connect with?",
        isBot: true,
        timestamp: new Date(),
      };
    } else if (lowerText.includes('coin') || lowerText.includes('balance')) {
      return {
        id: Date.now().toString(),
        text: "💰 Your current coin balance is 250 coins! You can earn more by completing your profile, referring friends, or engaging with job posts.",
        isBot: true,
        timestamp: new Date(),
      };
    } else {
      return {
        id: Date.now().toString(),
        text: "I understand you're asking about that. Let me help you find the right information. Could you be more specific about what you're looking for?",
        isBot: true,
        timestamp: new Date(),
        type: 'quick-reply',
        quickReplies: ['Browse Jobs', 'Find Alumni', 'Help Center']
      };
    }
  };

  const suggestedQuestions = [
    "What jobs are available in tech?",
    "How do I connect with alumni?",
    "What's my current coin balance?",
    "How can I improve my profile?"
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <MessageBubble message={message} />
              {message.quickReplies && (
                <QuickReplyButtons 
                  replies={message.quickReplies} 
                  onReply={handleQuickReply} 
                />
              )}
            </div>
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      <SuggestedQuestions 
        questions={suggestedQuestions} 
        onQuestionClick={handleSuggestedQuestion} 
      />

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
