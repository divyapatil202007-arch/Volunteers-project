import { useState } from 'react';
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
  LogOut
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

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout logic: redirect to login
    navigate('/login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
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

          <div className={styles.navRight}>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            <Button variant="ghost" size="sm" className={styles.bellBtn}>
              <Bell size={20} />
              <span className={cn(styles.bellBadge, "animate-pulse-glow")} />
            </Button>
            <div className={styles.profileAvatar}>
              DP
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
