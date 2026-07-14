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
    <div className="h-[calc(100vh-6rem)] flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mx-auto max-w-7xl">
      
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-900/50">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MOCK_CONTACTS.map((contact) => (
            <div 
              key={contact.id}
              className={cn(
                "flex gap-3 p-4 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800",
                activeContactId === contact.id ? "bg-blue-50/50 dark:bg-slate-800 relative" : ""
              )}
              onClick={() => setActiveContactId(contact.id)}
            >
              {activeContactId === contact.id && (
                <motion.div layoutId="active-indicator" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
              )}
              
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                  {contact.avatar}
                </div>
                {contact.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                    {contact.unread}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate pr-2">
                    {contact.name}
                  </h3>
                  <span className={cn(
                    "text-xs whitespace-nowrap",
                    contact.unread > 0 ? "text-blue-600 dark:text-blue-400 font-medium" : "text-slate-500"
                  )}>
                    {contact.time}
                  </span>
                </div>
                <p className={cn(
                  "text-sm truncate",
                  contact.unread > 0 ? "text-slate-800 dark:text-slate-300 font-medium" : "text-slate-500 dark:text-slate-400"
                )}>
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-white dark:bg-slate-900 relative">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 absolute top-0 left-0 right-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                  {activeContact.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">{activeContact.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-full">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-full">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-full">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 pt-24 pb-24 bg-slate-50/50 dark:bg-[#0B1120]">
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
                        "px-4 py-2.5 rounded-2xl shadow-sm",
                        msg.sent 
                          ? "bg-blue-600 text-white rounded-br-sm" 
                          : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm"
                      )}>
                        {msg.text}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 px-1">{msg.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2 max-w-4xl mx-auto">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-transparent focus-within:border-blue-500/50 focus-within:bg-white dark:focus-within:bg-slate-900 transition-colors flex items-end">
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Message..."
                    className="w-full max-h-32 min-h-[44px] bg-transparent resize-none py-3 px-4 focus:outline-none text-slate-700 dark:text-slate-200"
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
                  className="h-11 w-11 rounded-full p-0 bg-blue-600 hover:bg-blue-700 shrink-0"
                >
                  <Send className="w-5 h-5 ml-1" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Your Messages</h3>
            <p className="text-sm">Select a conversation from the sidebar to start chatting.</p>
          </div>
        )}
      </div>

    </div>
  );
}
