import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, Smile, Paperclip, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatAreaProps {
  conversation: Conversation;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  isMobileView: boolean;
  onBackToConversations: () => void;
}

const ChatArea = ({
  conversation,
  messages,
  newMessage,
  setNewMessage,
  onSendMessage,
  isTyping,
  isMobileView,
  onBackToConversations
}: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [newMessage]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Convert ChatArea Message to MessageBubble Message format
  const convertMessage = (message: Message) => {
    // Create a proper Date object for the timestamp
    const today = new Date();
    const timeString = message.timestamp;
    
    let timestamp: Date;
    try {
      const [time, period] = timeString.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      
      let adjustedHours = hours;
      if (period === 'PM' && hours !== 12) {
        adjustedHours += 12;
      } else if (period === 'AM' && hours === 12) {
        adjustedHours = 0;
      }
      
      timestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), adjustedHours, minutes);
    } catch (error) {
      timestamp = new Date();
    }

    return {
      id: message.id,
      text: message.text,
      isBot: message.senderId !== 'me',
      timestamp: timestamp,
      type: 'text' as const
    };
  };

  return (
    <div className="flex flex-col h-full bg-surface-theme transition-theme">
      {/* Chat Header */}
      <div className="p-4 border-b border-primary-theme bg-surface-theme flex-shrink-0">
        <div className="flex items-center space-x-3">
          {isMobileView && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToConversations}
              className="mr-2 text-primary-theme hover:bg-elevated-theme"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={conversation.avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {getInitials(conversation.name)}
              </AvatarFallback>
            </Avatar>
            {conversation.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-surface-theme rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-primary-theme">{conversation.name}</h3>
            <p className="text-sm text-secondary-theme">
              {conversation.isOnline ? 'Online' : 'Last seen 2h ago'}
            </p>
          </div>
          
          <Button variant="ghost" size="icon" className="text-primary-theme hover:bg-elevated-theme">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
        <div className="py-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={convertMessage(message)}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-primary-theme bg-surface-theme flex-shrink-0">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="icon" className="mb-2 text-primary-theme hover:bg-elevated-theme">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none min-h-[40px] max-h-[120px] pr-12 input-theme"
              rows={1}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2 text-primary-theme hover:bg-elevated-theme"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          
          <Button
            onClick={onSendMessage}
            disabled={!newMessage.trim()}
            className="mb-2 btn-primary-theme"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
