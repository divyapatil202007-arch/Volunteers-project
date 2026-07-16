import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Maximize2, Trash2, Sparkles } from 'lucide-react';
import styles from './AIChat.module.css';
import { useAI } from '../../hooks/useAI';
import { AIMessage } from './AIMessage';
import { AIInput } from './AIInput';
import { AITyping } from './AITyping';
import { AIPromptCards } from './AIPromptCards';

export function AIChat() {
  const { isOpen, toggleChat, messages, isTyping, clearHistory } = useAI();
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              className="relative w-16 h-16 rounded-full flex items-center justify-center outline-none cursor-pointer group shadow-[0_10px_40px_-10px_rgba(99,102,241,0.8)]"
              onClick={toggleChat}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing glow behind */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
              
              {/* Main vibrant gradient background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 border border-white/20 shadow-inner overflow-hidden">
                {/* Shine reflection effect */}
                <div className="absolute -inset-1/2 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -skew-x-12" />
              </div>
              
              {/* Icons */}
              <div className="relative z-10 flex items-center justify-center">
                <Bot size={28} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110" />
                <Sparkles size={14} className="text-yellow-300 absolute -top-1 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatPanel}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>
                  <div className={styles.avatarGlow} />
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className={styles.title}>AI Assistant</h3>
                  <div className={styles.status}>
                    <div className={styles.statusDot} />
                    Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className={styles.closeButton} onClick={clearHistory} title="Clear Chat">
                  <Trash2 size={16} />
                </button>
                <button className={styles.closeButton} title="Maximize">
                  <Maximize2 size={16} />
                </button>
                <button className={styles.closeButton} onClick={toggleChat} title="Close">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className={styles.messageArea}>
              {messages.map(msg => (
                <AIMessage key={msg.id} message={msg} />
              ))}
              {isTyping && <AITyping />}
              <div ref={messageEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 bg-slate-900/50">
              <AIPromptCards />
            </div>
            <AIInput />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
