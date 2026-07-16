import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Award, 
  Clock, 
  MessageSquare, 
  Settings, 
  Menu, 
  Bell, 
  Search,
  FileText,
  Zap,
  X,
  LogOut,
  Users
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '@/components/ui/Button';
import { AIChat } from '../ai/AIChat';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/certificates', label: 'Certificates', icon: Award },
  { path: '/analyzer', label: 'AI Analyzer', icon: FileText },
  { path: '/hours', label: 'Volunteer Hours', icon: Clock },
  { path: '/messages', label: 'Messages', icon: MessageSquare },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const NGO_NAV_ITEMS = [
  { path: '/ngo-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/ngo-events', label: 'Manage Events', icon: Calendar },
  { path: '/messages', label: 'Messages', icon: MessageSquare },
  { path: '/live-activity', label: 'Live Activity', icon: Zap },
  { path: '/applications', label: 'Applications', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'New Event Match!', desc: 'You have a 95% match for "Teaching Program for Underprivileged Youth".', time: '10 mins ago', type: 'success', unread: true },
  { id: '2', title: 'Certificate Approved', desc: 'Your "Summer Workshop" certificate was verified.', time: '2 hours ago', type: 'info', unread: true },
  { id: '3', title: 'Application Update', desc: 'Green Earth NGO viewed your application.', time: '1 day ago', type: 'info', unread: false },
];

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const userEmail = localStorage.getItem('userEmail') || '';
  const userName = localStorage.getItem('userName') || '';
  const userRole = localStorage.getItem('userRole') || 'volunteer';
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Force dark mode for professional minimalist aesthetic
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Enforce strict route separation based on role
  useEffect(() => {
    if (!userRole) return;
    if (userRole === 'ngo') {
      const volunteerRoutes = ['/dashboard', '/events', '/certificates', '/analyzer', '/hours'];
      if (volunteerRoutes.includes(location.pathname)) {
        navigate('/ngo-dashboard', { replace: true });
      }
    }
    if (userRole === 'volunteer') {
      const ngoRoutes = ['/ngo-dashboard', '/ngo-events', '/events/create'];
      if (ngoRoutes.includes(location.pathname)) {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [location.pathname, userRole, navigate]);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationsOpen]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getInitials = (name: string, email: string) => {
    if (name) {
      const parts = name.trim().split(' ');
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (!email) return 'U';
    const namePart = email.split('@')[0];
    if (namePart.includes('.')) {
      const parts = namePart.split('.');
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return namePart.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Background ambient glow for attractiveness */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Structural Sidebar */}
      <aside 
        className={cn(
          "h-full bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/80 flex flex-col z-40 fixed lg:relative shrink-0 overflow-hidden transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.2)]",
          isCollapsed ? "w-20" : "w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80 shrink-0">
          <div className={cn("flex items-center gap-3 transition-all", isCollapsed && "justify-center w-full")}>
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg tracking-tighter shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.4)]">
              V
            </div>
            {!isCollapsed && <span className="font-semibold text-sm text-slate-100 tracking-wide uppercase">VolunteerAI</span>}
          </div>
          {isSidebarOpen && (
            <Button variant="ghost" size="icon" className="ml-auto lg:hidden text-slate-400 rounded-sm hover:bg-slate-800" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {(userRole === 'ngo' ? NGO_NAV_ITEMS : NAV_ITEMS).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors relative group",
                  isCollapsed ? "justify-center" : "",
                  isActive 
                    ? "text-indigo-400 bg-indigo-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={cn("shrink-0", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Flat Topbar */}
        <header className="h-16 shrink-0 bg-slate-950/50 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 rounded-md hover:bg-slate-800/80" onClick={() => {
              if (window.innerWidth < 1024) {
                setSidebarOpen(true);
              } else {
                setCollapsed(!isCollapsed);
              }
            }}>
              <Menu size={18} />
            </Button>
            
            <div className="hidden md:flex items-center relative w-64 lg:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text"
                placeholder="Search command..." 
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-indigo-500/50 rounded-lg py-1.5 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none transition-colors shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">⌘K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4" ref={notificationsRef}>
            <div className="relative">
              <Button 
                variant="ghost" 
                className="text-slate-400 hover:text-slate-200 rounded-md w-8 h-8 hover:bg-slate-800/80 flex items-center justify-center relative"
                onClick={() => setNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={18} strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
              </Button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden z-50 shadow-2xl"
                  >
                    <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-950/50">
                      <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Inbox</h3>
                      {unreadCount > 0 && (
                         <button onClick={markAllAsRead} className="text-[10px] uppercase font-medium text-indigo-400 hover:text-indigo-300">
                           Mark Read
                         </button>
                      )}
                    </div>
                    
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={cn(
                              "p-3 border-b border-slate-800/50 flex gap-3 cursor-pointer transition-colors",
                              notif.unread ? "bg-indigo-500/5" : "hover:bg-slate-800/50"
                            )}
                            onClick={() => {
                              setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                            }}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <h4 className={cn("text-[13px] truncate", notif.unread ? "font-semibold text-slate-200" : "font-medium text-slate-400")}>{notif.title}</h4>
                                {notif.unread && <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />}
                              </div>
                              <p className="text-[12px] text-slate-500 line-clamp-2">{notif.desc}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-xs text-slate-500">
                          Inbox zero.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/50 px-2 py-1.5 rounded-lg transition-colors">
              <div className="w-6 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 text-[10px] font-bold shadow-inner">
                {getInitials(userName, userEmail)}
              </div>
              <span className="hidden sm:block text-xs font-medium text-slate-200">{userName || 'User'}</span>
            </div>
            
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-400 hover:text-slate-200 rounded-md w-8 h-8 hover:bg-slate-800/80">
              <LogOut size={16} />
            </Button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <AIChat />
    </div>
  );
}
