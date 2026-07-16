import { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
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

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ message: content, history: messages })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get response');
      }

      const aiResponse: AIMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: data.data.response,
        createdAt: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error: any) {
      const errorMsg: AIMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `Error: ${error.message}. Please make sure you have added your GEMINI_API_KEY to the Vercel dashboard or local .env file.`,
        createdAt: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AIContext.Provider value={{ isOpen, toggleChat, messages, isTyping, sendMessage, clearHistory }}>
      {children}
    </AIContext.Provider>
  );
}
