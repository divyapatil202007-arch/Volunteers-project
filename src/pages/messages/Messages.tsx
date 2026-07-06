import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Video, MoreVertical, MessageSquare } from 'lucide-react';
import styles from './Messages.module.css';
import { cn } from '../../lib/utils';

// --- MOCK DATA ---
const MOCK_CONTACTS = [
  { id: '1', name: 'Green Earth NGO', type: 'ngo', avatar: 'GE', lastMessage: 'Thank you for your application!', time: '10:42 AM', unread: 2 },
  { id: '2', name: 'Global Health Initiative', type: 'ngo', avatar: 'GH', lastMessage: 'The orientation is tomorrow at 10 AM.', time: 'Yesterday', unread: 0 },
  { id: '3', name: 'Sarah Jenkins', type: 'volunteer', avatar: 'SJ', lastMessage: 'Are you going to the beach cleanup?', time: 'Tuesday', unread: 0 },
  { id: '4', name: 'Code for Good', type: 'ngo', avatar: 'CG', lastMessage: 'We merged your pull request. Great work!', time: 'Monday', unread: 0 },
];

const MOCK_CHAT_HISTORY: Record<string, { id: string, text: string, sent: boolean, time: string }[]> = {
  '1': [
    { id: 'm1', text: 'Hi! I submitted my application for the Tree Plantation Drive.', sent: true, time: '10:30 AM' },
    { id: 'm2', text: 'Hello! Yes, we received it. Thank you for your application!', sent: false, time: '10:42 AM' },
    { id: 'm3', text: 'We will be reviewing all profiles by tomorrow evening and will let you know the schedule.', sent: false, time: '10:42 AM' },
  ],
  '2': [
    { id: 'm4', text: 'Hello, could you confirm the orientation time?', sent: true, time: 'Yesterday 3:00 PM' },
    { id: 'm5', text: 'The orientation is tomorrow at 10 AM.', sent: false, time: 'Yesterday 3:45 PM' },
  ]
};

export function Messages() {
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(MOCK_CHAT_HISTORY);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = MOCK_CONTACTS.find(c => c.id === activeContactId);
  const activeChat = activeContactId ? (messages[activeContactId] || []) : [];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeContactId) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }));
    setInputText('');
  };

  return (
    <div className={styles.messagesContainer}>
      {/* Sidebar: Contacts List */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Messages</h2>
          {/* We could put a search bar here later */}
        </div>
        <div className={styles.contactsList}>
          {MOCK_CONTACTS.map((contact) => (
            <div 
              key={contact.id}
              className={cn(styles.contactItem, activeContactId === contact.id && styles.active)}
              onClick={() => setActiveContactId(contact.id)}
            >
              <div className={styles.avatar}>{contact.avatar}</div>
              <div className={styles.contactInfo}>
                <div className={styles.contactName}>
                  {contact.name}
                  <span className={styles.contactTime}>{contact.time}</span>
                </div>
                <div className={styles.contactPreview}>{contact.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.chatPane}>
        {activeContact ? (
          <>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <div className={styles.avatar}>{activeContact.avatar}</div>
                <div>
                  <div className="font-bold text-white">{activeContact.name}</div>
                  <div className={styles.chatStatus}>
                    <span className={styles.statusDot}></span> Online
                  </div>
                </div>
              </div>
              <div className="flex gap-3 text-slate-400">
                <button className="hover:text-white transition-colors p-2"><Phone size={20} /></button>
                <button className="hover:text-white transition-colors p-2"><Video size={20} /></button>
                <button className="hover:text-white transition-colors p-2"><MoreVertical size={20} /></button>
              </div>
            </div>

            <div className={styles.messagesArea}>
              <AnimatePresence initial={false}>
                {activeChat.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(styles.messageWrapper, msg.sent ? styles.sent : styles.received)}
                  >
                    <div className="flex flex-col">
                      <div className={styles.messageBubble}>{msg.text}</div>
                      <span className={styles.messageTime}>{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.chatInputArea}>
              <form onSubmit={handleSendMessage} className={styles.inputForm}>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..." 
                  className={styles.inputField}
                />
                <button 
                  type="submit" 
                  disabled={!inputText.trim()}
                  className={styles.sendBtn}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Your Messages</h3>
            <p>Select a conversation from the sidebar to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
