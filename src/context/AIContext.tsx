import { createContext, useState, ReactNode, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageType = 'text' | 'event-card' | 'volunteer-card' | 'chart';

export interface AIMessage {
  id: string;
  role: MessageRole;
  content: string;
  type?: MessageType;
  metadata?: any;
  createdAt: Date;
}

interface AIContextType {
  isOpen: boolean;
  toggleChat: () => void;
  messages: AIMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
}

export const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI Project Manager. How can I assist you with your NGO tasks today?',
      createdAt: new Date(),
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);

  const clearHistory = useCallback(() => {
    setMessages([{
      id: uuidv4(),
      role: 'assistant',
      content: 'Conversation history cleared. How can I help?',
      createdAt: new Date(),
      type: 'text'
    }]);
  }, []);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMsg: AIMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      createdAt: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // TODO: Connect to real backend API here
    // For now, simulate network delay and fake response
    setTimeout(() => {
      let aiResponse: AIMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `I received your request: "${content}". I am simulating an AI response!`,
        createdAt: new Date(),
        type: 'text'
      };

      // Mock Intent Detection for UI demonstration
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes('event')) {
        aiResponse.content = 'Here is the event you asked about:';
        aiResponse.type = 'event-card';
        aiResponse.metadata = {
          title: 'Tree Plantation Drive',
          date: 'Aug 15, 2026',
          location: 'Pune Central',
          volunteers: '0/50'
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AIContext.Provider value={{ isOpen, toggleChat, messages, isTyping, sendMessage, clearHistory }}>
      {children}
    </AIContext.Provider>
  );
}
