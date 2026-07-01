import { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import styles from './AIChat.module.css';
import { useAI } from '../../hooks/useAI';

export function AIInput() {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isTyping } = useAI();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !isTyping) {
      sendMessage(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AI Assistant..."
          rows={1}
        />
        <button className={styles.sendButton} style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)' }}>
          <Mic size={18} />
        </button>
        <button 
          className={styles.sendButton} 
          onClick={handleSend}
          disabled={!text.trim() || isTyping}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
