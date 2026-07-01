import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Maximize2, Trash2 } from 'lucide-react';
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
      <div className={styles.fabContainer}>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              className={styles.fabButton}
              onClick={toggleChat}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot size={24} />
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
