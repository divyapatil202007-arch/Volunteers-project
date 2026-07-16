import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Video, MoreVertical, MessageSquare, Search, CheckCheck, Smile, Image as ImageIcon, Paperclip } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '@/components/ui/Button';

// --- MOCK DATA ---
const MOCK_CONTACTS = [
  { 
    id: '1', 
    name: 'Green Earth NGO', 
    type: 'ngo', 
    avatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150&h=150', 
    lastMessage: 'Thank you for your application!', 
    time: '10:42 AM', 
    unread: 2,
    online: true
  },
  { 
    id: '2', 
    name: 'Global Health Initiative', 
    type: 'ngo', 
    avatar: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=150&h=150', 
    lastMessage: 'The orientation is tomorrow at 10 AM.', 
    time: 'Yesterday', 
    unread: 0,
    online: false
  },
  { 
    id: '3', 
    name: 'Sarah Jenkins', 
    type: 'volunteer', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150', 
    lastMessage: 'Are you going to the beach cleanup?', 
    time: 'Tuesday', 
    unread: 0,
    online: true
  },
  { 
    id: '4', 
    name: 'Code for Good', 
    type: 'ngo', 
    avatar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=150&h=150', 
    lastMessage: 'We merged your pull request. Great work!', 
    time: 'Monday', 
    unread: 0,
    online: false
  },
];

const MOCK_CHAT_HISTORY: Record<string, { id: string, text: string, sent: boolean, time: string, read?: boolean }[]> = {
  '1': [
    { id: 'm1', text: 'Hi! I submitted my application for the Tree Plantation Drive.', sent: true, time: '10:30 AM', read: true },
    { id: 'm2', text: 'Hello! Yes, we received it. Thank you for your application!', sent: false, time: '10:42 AM' },
    { id: 'm3', text: 'We will be reviewing all profiles by tomorrow evening and will let you know the schedule.', sent: false, time: '10:42 AM' },
  ],
  '2': [
    { id: 'm4', text: 'Hello, could you confirm the orientation time?', sent: true, time: 'Yesterday 3:00 PM', read: true },
    { id: 'm5', text: 'The orientation is tomorrow at 10 AM.', sent: false, time: 'Yesterday 3:45 PM' },
  ],
  '3': [
    { id: 'm6', text: 'Hey there! I saw you registered for the event this weekend.', sent: true, time: 'Tuesday 1:15 PM', read: true },
    { id: 'm7', text: 'Are you going to the beach cleanup?', sent: false, time: 'Tuesday 2:30 PM' },
  ],
  '4': [
    { id: 'm8', text: 'Hi team, I just opened a PR for the new dashboard feature.', sent: true, time: 'Monday 9:00 AM', read: true },
    { id: 'm9', text: 'Thanks! Let me review it today.', sent: false, time: 'Monday 11:30 AM' },
    { id: 'm10', text: 'We merged your pull request. Great work!', sent: false, time: 'Monday 4:00 PM' },
  ]
};

export function Messages() {
  const location = useLocation();
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [messages, setMessages] = useState(MOCK_CHAT_HISTORY);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = contacts.find(c => c.id === activeContactId);
  const activeChat = activeContactId ? (messages[activeContactId] || []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeContactId]);

  useEffect(() => {
    if (location.state?.contactId) {
      const cid = location.state.contactId.toString();
      setActiveContactId(cid);
      
      setContacts(prev => {
        if (prev.find(c => c.id === cid)) return prev;
        return [{
          id: cid,
          name: location.state.contactName || 'Volunteer',
          avatar: location.state.avatar || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop',
          type: 'volunteer',
          lastMessage: 'Chat initialized from Matches.',
          time: 'Just now',
          unread: 0,
          online: true
        }, ...prev];
      });

      // Clear state so it doesn't trigger on refresh
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeContactId) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }));
    setInputText('');

    // Simulate an auto-reply from the receiver
    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for reaching out! I've received your message and will respond shortly.",
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), replyMessage]
      }));
    }, 1500);
  };

  return (
    <div className="relative h-[calc(100vh-5rem)] flex overflow-hidden rounded-[2rem] border border-white/20 dark:border-slate-700/30 shadow-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl mt-2 mb-6 -mx-2">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse duration-10000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse duration-7000" />
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col bg-slate-50/30 dark:bg-slate-950/30 z-10">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Messages</h2>
            <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-colors">
              <MoreVertical size={16} />
            </Button>
          </div>
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button 
              onClick={() => setFilterType('all')} 
              variant={filterType === 'all' ? 'primary' : 'outline'} 
              size="sm" 
              className={`flex-1 rounded-full text-xs h-8 ${filterType === 'all' ? 'shadow-sm' : ''}`}
            >
              All
            </Button>
            <Button 
              onClick={() => setFilterType('volunteer')} 
              variant={filterType === 'volunteer' ? 'primary' : 'outline'} 
              size="sm" 
              className={`flex-1 rounded-full text-xs h-8 ${filterType === 'volunteer' ? 'shadow-sm' : ''}`}
            >
              Volunteers
            </Button>
            <Button 
              onClick={() => setFilterType('ngo')} 
              variant={filterType === 'ngo' ? 'primary' : 'outline'} 
              size="sm" 
              className={`flex-1 rounded-full text-xs h-8 ${filterType === 'ngo' ? 'shadow-sm' : ''}`}
            >
              NGOs
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contacts
            .filter(c => 
              (filterType === 'all' || c.type === filterType) && 
              (c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            ).map((contact) => (
            <div 
              key={contact.id}
              className={cn(
                "flex gap-4 p-3.5 mx-2 mb-1 rounded-2xl cursor-pointer transition-all duration-300 relative group overflow-hidden",
                activeContactId === contact.id 
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 shadow-sm border border-blue-500/20 dark:border-blue-400/20" 
                  : "hover:bg-white/40 dark:hover:bg-slate-800/40 border border-transparent"
              )}
              onClick={() => setActiveContactId(contact.id)}
            >
              {activeContactId === contact.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              )}
              <div className="relative flex-shrink-0">
                <img 
                  src={contact.avatar} 
                  alt={contact.name}
                  className={cn(
                    "w-14 h-14 rounded-full object-cover shadow-md transition-all duration-300 group-hover:scale-105",
                    activeContactId === contact.id ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900" : "ring-2 ring-white/50 dark:ring-slate-800/50"
                  )}
                />
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
                )}
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[15px] font-bold truncate pr-2 text-slate-800 dark:text-slate-100">
                    {contact.name}
                  </h3>
                  <span className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    contact.unread > 0 ? "text-primary" : "text-slate-400"
                  )}>
                    {contact.time}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className={cn(
                    "text-[13px] truncate flex-1",
                    contact.unread > 0 ? "font-semibold text-slate-700 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"
                  )}>
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <div className="w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm shadow-primary/30 flex-shrink-0">
                      {contact.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-transparent relative z-10">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="h-20 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-8 bg-white/40 dark:bg-slate-950/40 backdrop-blur-2xl z-20 absolute top-0 left-0 right-0 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={activeContact.avatar} 
                    alt={activeContact.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                  />
                  {activeContact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{activeContact.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {activeContact.online ? 'Active Now' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10">
                  <Phone size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10">
                  <Video size={20} />
                </Button>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>
                <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <MoreVertical size={20} />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 pt-28 pb-32 bg-transparent" >
              <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <span className="text-[11px] font-bold text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">TODAY</span>
                </div>
                <AnimatePresence initial={false}>
                  {activeChat.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex flex-col max-w-[70%]",
                        msg.sent ? "self-end items-end" : "self-start items-start"
                      )}
                    >
                      <div className="flex items-end gap-2">
                        {!msg.sent && (
                          <img src={activeContact.avatar} className="w-6 h-6 rounded-full object-cover mb-1 opacity-70" alt="avatar" />
                        )}
                        <div className={cn(
                          "px-5 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed relative overflow-hidden",
                          msg.sent 
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-sm shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)]" 
                            : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-bl-sm shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)]"
                        )}>
                          {msg.text}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5 px-8">
                        <span className="text-[11px] font-medium text-slate-400">{msg.time}</span>
                        {msg.sent && (
                          <CheckCheck size={14} className={cn("ml-1", msg.read ? "text-emerald-500" : "text-slate-300")} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/40 dark:bg-slate-950/40 backdrop-blur-2xl border-t border-slate-200/50 dark:border-slate-800/50">
              <form onSubmit={handleSendMessage} className="flex items-end gap-3 max-w-4xl mx-auto">
                <div className="flex items-center gap-1 pb-1">
                  <Button type="button" variant="ghost" size="sm" className="w-10 h-10 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10">
                    <Paperclip size={20} />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="w-10 h-10 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10">
                    <ImageIcon size={20} />
                  </Button>
                </div>
                
                <div className="flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-200/50 dark:border-slate-700/50 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all flex items-end shadow-inner">
                  <Button type="button" variant="ghost" size="sm" className="h-12 w-12 rounded-full text-slate-400 hover:text-blue-500 pb-1">
                    <Smile size={20} />
                  </Button>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Write your message..."
                    className="w-full max-h-32 min-h-[48px] bg-transparent resize-none py-3.5 pr-4 text-[15px] focus:outline-none placeholder:text-slate-400"
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
                  className={cn(
                    "h-12 w-12 rounded-full p-0 flex items-center justify-center shrink-0 transition-all duration-300",
                    inputText.trim() 
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-110 hover:-rotate-12" 
                      : "bg-slate-200/50 dark:bg-slate-800/50 text-slate-400"
                  )}
                >
                  <Send className={cn("w-5 h-5 ml-0.5", inputText.trim() && "animate-pulse-once")} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/5 pointer-events-none" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative w-32 h-32 rounded-full flex items-center justify-center mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse duration-3000" />
              <div className="relative w-24 h-24 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 flex items-center justify-center shadow-2xl">
                <MessageSquare className="w-10 h-10 text-blue-500" />
              </div>
            </motion.div>
            <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Your Inbox</h3>
            <p className="text-lg max-w-sm text-center text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Select a conversation from the sidebar to start chatting with NGOs and Volunteers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
