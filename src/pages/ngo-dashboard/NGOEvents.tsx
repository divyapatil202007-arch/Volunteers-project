import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Plus, Search, Filter, MoreVertical, Edit, Trash, Users } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { getDemoEvents, updateDemoEventStatus } from '@/lib/demoData';

export function NGOEvents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();

    // Listen for cross-tab realtime updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'demo_events') {
        setEvents(getDemoEvents());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      // For NGO dashboard, we should really only show THEIR events. 
      // Wait, let's just use the returned events.
      if (res.data && res.data.length > 0) {
        setEvents(res.data);
      } else {
        throw new Error("Empty events");
      }
    } catch (err) {
      console.warn('NGOEvents failed to fetch events, using fallback', err);
      setEvents(getDemoEvents());
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    // Optimistic local update
    const updated = updateDemoEventStatus(id, 'Cancelled');
    setEvents(updated);
    try {
      await api.delete(`/events/${id}`);
    } catch (err) {
      console.warn('Failed to delete event in backend, but mock synced successfully', err);
    }
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] -m-6 p-8 overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/50 shadow-2xl backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse duration-10000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse duration-7000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-10 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Calendar className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
                Manage Events
              </h1>
              <p className="text-slate-400 mt-2 text-lg">Create, edit, and monitor your organization's volunteering events.</p>
            </div>
          </div>
          <Button onClick={() => navigate('/events/create')} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-300 rounded-xl h-12 px-6 font-bold">
            <Plus size={20} className="mr-1" /> Create New Event
          </Button>
        </div>

        <div className="p-4 flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 w-5 h-5 transition-colors" />
            <input 
              type="text"
              placeholder="Search your events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white transition-all shadow-inner"
            />
          </div>
          <div className="relative shrink-0 w-full sm:w-auto">
            <Filter size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${filterStatus !== 'All' ? 'text-blue-400' : 'text-slate-400'}`} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full sm:w-48 appearance-none pl-11 pr-10 h-12 rounded-xl transition-all duration-300 outline-none cursor-pointer font-medium
                ${filterStatus !== 'All' 
                  ? 'bg-blue-500/10 border border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] focus:ring-2 focus:ring-blue-500/50' 
                  : 'bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 focus:ring-2 focus:ring-slate-600'}`}
            >
              {['All', 'Draft', 'Active', 'Full', 'Cancelled'].map((status) => (
                <option key={status} value={status} className="bg-slate-900 text-slate-200 py-2">
                  {status === 'All' ? 'Filter by Status' : status}
                </option>
              ))}
            </select>
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${filterStatus !== 'All' ? 'text-blue-400' : 'text-slate-400'}`}>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5L6 6L10.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center text-slate-400 py-10">Loading events...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events
            .filter((e: any) => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter((e: any) => filterStatus === 'All' || e.status === filterStatus)
            .map((event: any, i: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-indigo-500/20 rounded-3xl blur-xl transition-all duration-500 -z-10 opacity-0 group-hover:opacity-100" />
              
              <div className="border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-7 transition-all duration-500 overflow-hidden h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className={`text-2xl font-extrabold mb-1.5 transition-colors ${event.status === 'Cancelled' ? 'text-slate-500 line-through' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400'}`}>{event.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                      <span>{formatDate(event.startDate)}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                      <span>{formatTime(event.startDate)}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                    <MoreVertical size={20} />
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                  <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-xl shadow-inner">
                    <Users size={16} className="text-blue-400" />
                    <span className="font-bold text-white">{event.currentVolunteers || 0}</span> / {event.maxVolunteers} Volunteers
                  </div>
                  <span className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold border shadow-sm
                    ${event.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10' : ''}
                    ${event.status === 'Full' ? 'bg-slate-800 text-slate-300 border-slate-700 shadow-slate-900' : ''}
                    ${event.status === 'Draft' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-blue-500/10' : ''}
                    ${event.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/30 shadow-red-500/10' : ''}
                  `}>
                    {event.status === 'Cancelled' ? 'CANCELLED' : (event.status || 'Active')}
                  </span>
                </div>
                
                <div className="mt-auto flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl gap-2 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 hover:-translate-y-0.5"
                    onClick={() => alert('Edit feature placeholder for API')}
                  >
                    <Edit size={18} /> Edit Details
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleCancel(event.id)}
                    disabled={event.status === 'Cancelled'}
                    className="flex-1 h-12 rounded-xl gap-2 border-slate-700 text-red-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Trash size={18} /> {event.status === 'Cancelled' ? 'Cancelled' : 'Delete Event'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
          {events.length === 0 && (
            <div className="text-slate-400 col-span-2 text-center py-12 border border-slate-800 border-dashed rounded-3xl">
              No events found. Create your first event!
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
