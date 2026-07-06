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
  Moon,
  Sun,
  X,
  LogOut,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import styles from './Layout.module.css';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
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

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'New Event Match!', desc: 'You have a 95% match for "Teaching Program for Underprivileged Youth".', time: '10 mins ago', type: 'success', unread: true },
  { id: '2', title: 'Certificate Approved', desc: 'Your "Summer Workshop" certificate was verified.', time: '2 hours ago', type: 'info', unread: true },
  { id: '3', title: 'Application Update', desc: 'Green Earth NGO viewed your application.', time: '1 day ago', type: 'info', unread: false },
];

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');
    if (storedEmail) setUserEmail(storedEmail);
    if (storedName) setUserName(storedName);
  }, []);

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Helper to get initials from name or email
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
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside 
        className={cn(
          styles.sidebar,
          isCollapsed && styles.sidebarCollapsed,
          isSidebarOpen && styles.sidebarOpen
        )}
      >
        <div className={styles.sidebarHeader}>
          <div className="flex-center">
            <div className="w-8 h-8 rounded-lg bg-primary flex-center text-white font-bold">
              V
            </div>
            {!isCollapsed && <span className={styles.logoText}>VolunteerAI</span>}
          </div>
          {isSidebarOpen && (
            <Button variant="ghost" size="sm" className={styles.mobileCloseBtn} onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </Button>
          )}
        </div>

        <nav className={styles.navMenu}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(styles.navItem, isActive && styles.active)}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} className={styles.navIcon} />
                {!isCollapsed && <span className={styles.navLabel}>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.navbar}>
          <div className={styles.navLeft}>
            <Button variant="ghost" size="sm" onClick={() => {
              if (window.innerWidth < 1024) {
                setSidebarOpen(true);
              } else {
                setCollapsed(!isCollapsed);
              }
            }}>
              <Menu size={20} />
            </Button>
            
            <div className={styles.searchWrapper}>
              <Input 
                placeholder="Search..." 
                icon={<Search size={16} />}
              />
            </div>
          </div>

          <div className={styles.navRight} ref={notificationsRef}>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className={styles.bellBtn}
                onClick={() => setNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className={cn(styles.bellBadge, "animate-pulse-glow")} />
                )}
              </Button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={styles.notificationsDropdown}
                  >
                    <div className={styles.notificationsHeader}>
                      <h3>Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className={styles.markReadBtn}>
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className={styles.notificationsList}>
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={cn(styles.notificationItem, notif.unread && styles.unread)}
                            onClick={() => {
                              setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                            }}
                          >
                            <div className={styles.notificationIcon}>
                              {notif.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                            </div>
                            <div className={styles.notificationContent}>
                              <div className={styles.notificationTitle}>
                                {notif.title}
                                {notif.unread && <span className={styles.unreadDot} />}
                              </div>
                              <p className={styles.notificationDesc}>{notif.desc}</p>
                              <span className={styles.notificationTime}>{notif.time}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.notificationsEmpty}>
                          No new notifications
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.profileAvatar} title={userName || userEmail}>
              {getInitials(userName, userEmail)}
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} title="Log out">
              <LogOut size={20} />
            </Button>
          </div>
        </header>

        <div className={styles.pageContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className={styles.sidebarOverlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
}
