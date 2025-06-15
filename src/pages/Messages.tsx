
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ConversationsList from '../components/ConversationsList';
import ChatArea from '../components/ChatArea';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

const Messages = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      lastMessage: 'Thanks for the referral! I got the interview.',
      timestamp: '2m ago',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Mike Johnson',
      lastMessage: 'Are you available for a quick call?',
      timestamp: '1h ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Alumni Group',
      lastMessage: 'New job posting at TechCorp',
      timestamp: '3h ago',
      unreadCount: 5,
      isOnline: true
    }
  ]);

  const [activeConversation, setActiveConversation] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! I saw your post about the software engineer position.',
      senderId: '1',
      timestamp: '10:30 AM',
      status: 'read'
    },
    {
      id: '2',
      text: 'Hi Sarah! Yes, we have an opening. Would you like me to refer you?',
      senderId: 'me',
      timestamp: '10:32 AM',
      status: 'read'
    },
    {
      id: '3',
      text: 'That would be amazing! I have 3 years of React experience.',
      senderId: '1',
      timestamp: '10:35 AM',
      status: 'read'
    },
    {
      id: '4',
      text: 'Perfect! I\'ll send your resume to our hiring manager today.',
      senderId: 'me',
      timestamp: '10:37 AM',
      status: 'delivered'
    },
    {
      id: '5',
      text: 'Thanks for the referral! I got the interview.',
      senderId: '1',
      timestamp: '2:15 PM',
      status: 'sent'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversations, setShowConversations] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowConversations(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        senderId: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setActiveConversation(conversationId);
    if (isMobileView) {
      setShowConversations(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
  };

  const activeConv = conversations.find(c => c.id === activeConversation);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversations Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isMobileView ? (showConversations ? '100%' : '0%') : '30%',
          opacity: isMobileView ? (showConversations ? 1 : 0) : 1
        }}
        className={`bg-white border-r border-gray-200 ${
          isMobileView && !showConversations ? 'hidden' : 'block'
        }`}
      >
        <ConversationsList
          conversations={conversations}
          activeConversation={activeConversation}
          onConversationSelect={handleConversationSelect}
        />
      </motion.div>

      {/* Chat Area */}
      <motion.div
        initial={false}
        animate={{
          width: isMobileView ? (showConversations ? '0%' : '100%') : '70%',
          opacity: isMobileView ? (showConversations ? 0 : 1) : 1
        }}
        className={`flex flex-col ${
          isMobileView && showConversations ? 'hidden' : 'block'
        }`}
      >
        {activeConv && (
          <ChatArea
            conversation={activeConv}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            isMobileView={isMobileView}
            onBackToConversations={handleBackToConversations}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Messages;
