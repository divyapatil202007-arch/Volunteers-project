import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Video, MoreVertical, MessageSquare, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '@/components/ui/button';

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
    <div className="h-[calc(100vh-5rem)] flex overflow-hidden bg-[var(--surface)] text-[var(--text-main)] -mx-6 -mt-6">
      
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-[var(--border)] flex flex-col bg-[var(--background)]">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MOCK_CONTACTS.map((contact) => (
            <div 
              key={contact.id}
              className={cn(
                "flex gap-3 p-4 cursor-pointer transition-colors border-b border-[var(--border)] hover:bg-[var(--surface-hover)]",
                activeContactId === contact.id ? "bg-[var(--surface)] border-l-4 border-l-[var(--primary)]" : "border-l-4 border-l-transparent"
              )}
              onClick={() => setActiveContactId(contact.id)}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold shadow-sm">
                  {contact.avatar}
                </div>
                {contact.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--error)] text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-[var(--surface)]">
                    {contact.unread}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-semibold truncate pr-2">
                    {contact.name}
                  </h3>
                  <span className={cn(
                    "text-xs whitespace-nowrap",
                    contact.unread > 0 ? "text-[var(--primary)] font-medium" : "text-[var(--text-muted)]"
                  )}>
                    {contact.time}
                  </span>
                </div>
                <p className={cn(
                  "text-sm truncate",
                  contact.unread > 0 ? "font-medium" : "text-[var(--text-muted)]"
                )}>
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-[var(--surface)] relative">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-[var(--border)] flex items-center justify-between px-6 bg-[var(--surface)] z-10 absolute top-0 left-0 right-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold shadow-sm">
                  {activeContact.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{activeContact.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span> Online
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-full">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-full">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-full">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 pt-24 pb-24 bg-[var(--background)]">
              <div className="flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {activeChat.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex flex-col max-w-[75%]",
                        msg.sent ? "self-end items-end" : "self-start items-start"
                      )}
                    >
                      <div className={cn(
                        "px-4 py-2.5 rounded-2xl shadow-sm text-sm",
                        msg.sent 
                          ? "bg-[var(--primary)] text-white rounded-br-sm" 
                          : "bg-[var(--surface)] border border-[var(--border)] rounded-bl-sm"
                      )}>
                        {msg.text}
                      </div>
                      <span className="text-[11px] text-[var(--text-muted)] mt-1 px-1">{msg.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[var(--surface)] border-t border-[var(--border)]">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2 max-w-4xl mx-auto">
                <div className="flex-1 bg-[var(--background)] rounded-2xl border border-[var(--border)] focus-within:border-[var(--primary)] transition-colors flex items-end">
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full max-h-32 min-h-[44px] bg-transparent resize-none py-3 px-4 focus:outline-none"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={!inputText.trim()}
                  className="h-11 w-11 rounded-full p-0 bg-[var(--primary)] hover:opacity-90 shrink-0 text-white"
                >
                  <Send className="w-5 h-5 ml-1" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] bg-[var(--background)]">
            <div className="w-20 h-20 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-6 shadow-sm">
              <MessageSquare className="w-10 h-10 text-[var(--text-muted)] opacity-50" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[var(--text-main)]">Your Messages</h3>
            <p className="text-sm">Select a conversation from the sidebar to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
