import { Bot, User } from 'lucide-react';
import styles from './AIChat.module.css';
import type { AIMessage as AIMessageType } from '../../context/AIContext';
import { AIEventCard } from './AIActionCards';

export function AIMessage({ message }: { message: AIMessageType }) {
  const isUser = message.role === 'user';

  return (
    <div className={`${styles.message} ${isUser ? styles.messageUser : styles.messageAssistant}`}>
      <div className={styles.avatar} style={{ background: isUser ? 'rgba(255,255,255,0.1)' : '' }}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className={styles.messageBubble}>
        <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
        
        {/* Render dynamic UI cards based on message type */}
        {message.type === 'event-card' && message.metadata && (
          <AIEventCard data={message.metadata} />
        )}
      </div>
    </div>
  );
}
