import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Calendar as CalendarIcon, Filter, ArrowRight, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDemoEvents } from '@/lib/demoData';

export function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        if (res.data && res.data.length > 0) {
          setEvents(res.data);
        } else {
          throw new Error("Empty events from API");
        }
      } catch (err) {
        console.warn('Failed to fetch events or empty, using emergency fallback', err);
        setEvents(getDemoEvents());
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const CATEGORIES = ['All', 'Environment', 'Education', 'Health', 'Community', 'Animal Welfare', 'Technology'];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environment': return 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50';
      case 'education': return 'text-blue-400 bg-blue-950/30 border-blue-900/50';
      case 'health': return 'text-rose-400 bg-rose-950/30 border-rose-900/50';
      case 'community': return 'text-amber-400 bg-amber-950/30 border-amber-900/50';
      case 'animal welfare': return 'text-purple-400 bg-purple-950/30 border-purple-900/50';
      case 'technology': return 'text-indigo-400 bg-indigo-950/30 border-indigo-900/50';
      default: return 'text-slate-200 bg-slate-900 border-slate-800';
    }
  };

  const displayEvents = events.filter((ev: any) => {
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (ev.location && ev.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (ev.category && ev.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto font-sans pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-8 pt-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-slate-100 tracking-tight">Events</h1>
          <p className="text-[15px] text-slate-400">Discover and manage professional volunteer opportunities.</p>
        </div>
      </div>

      <div className="flex gap-4 relative">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text"
            placeholder="Search events by name, location, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none transition-colors shadow-inner"
          />
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 text-sm font-medium transition-colors ${showFilters ? 'bg-slate-800 text-slate-200' : 'bg-slate-900 text-slate-300 hover:bg-slate-800/80 shadow-sm'}`}
          >
            <Filter size={16} /> Filters
          </button>
          
          {showFilters && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl overflow-hidden z-50">
              <div className="p-2">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2 pt-1">Category</h3>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-slate-800 text-slate-200 font-medium' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayEvents.map((event: any, i: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-full flex flex-col border border-slate-800 rounded-xl overflow-hidden bg-slate-900 group hover:border-slate-700 transition-colors shadow-sm hover:shadow-md">
                <div className="relative w-full h-48 overflow-hidden border-b border-slate-800">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${event.title === 'City Park Cleanup Drive' ? '/city_park_cleanup.png' : event.images?.[0] || event.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400&h=200'})` }}
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md border shadow-sm backdrop-blur-sm ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    {event.status === 'Cancelled' && (
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md border border-red-900/50 bg-red-950/80 text-red-400 shadow-sm backdrop-blur-sm flex items-center gap-1">
                        <XCircle size={10} /> Cancelled
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4 text-slate-100 line-clamp-2">{event.title}</h3>
                  
                  <div className="flex flex-col gap-3 text-sm text-slate-400 mb-6">
                    <div className="flex items-center gap-3">
                      <kbd className="p-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                        <CalendarIcon size={14} />
                      </kbd>
                      <span className="font-mono text-xs">{new Date(event.startDate || event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <kbd className="p-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                        <MapPin size={14} />
                      </kbd>
                      <span className="truncate text-xs">{event.location}</span>
                    </div>
                    <div className="flex items-start gap-3 mt-1">
                      <kbd className="p-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                        <Users size={14} />
                      </kbd>
                      <div className="w-full pt-1">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs font-mono">{event.currentVolunteers ?? event.volunteers} / {event.maxVolunteers ?? 50} Vol.</span>
                          <span className="text-xs font-mono text-slate-200">{Math.round(((event.currentVolunteers ?? event.volunteers) / (event.maxVolunteers ?? 50)) * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-indigo-500 rounded-full" 
                            style={{ width: `${((event.currentVolunteers ?? event.volunteers) / (event.maxVolunteers ?? 50)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-800/50">
                    <button 
                      onClick={() => navigate(`/events/${event.id}`)}
                      disabled={event.status === 'Cancelled'}
                      className={`w-full flex items-center justify-between px-4 py-2.5 bg-slate-950 border border-slate-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm ${event.status === 'Cancelled' ? 'text-slate-600 cursor-not-allowed' : 'text-slate-200 hover:bg-slate-800 active:scale-[0.98]'}`}
                    >
                      {event.status === 'Cancelled' ? 'Event Cancelled' : 'View Details'}
                      {event.status !== 'Cancelled' && <ArrowRight size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
