import { motion } from 'framer-motion';
import styles from './AIChat.module.css';
import { Bot } from 'lucide-react';

export function AITyping() {
  return (
    <div className={`${styles.message} ${styles.messageAssistant}`}>
      <div className={styles.avatar}>
        <Bot size={16} />
      </div>
      <div className={`${styles.messageBubble} flex items-center`}>
        <div className={styles.typingIndicator}>
          <motion.div
            className={styles.typingDot}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className={styles.typingDot}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className={styles.typingDot}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}
