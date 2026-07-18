import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, MapPin, Calendar, Clock, ArrowLeft, 
  Search, CheckCircle2, Users, Zap
} from 'lucide-react';
import { api } from '@/lib/api';
import { useResume } from '@/context/ResumeContext';
import { getDemoEvents } from '@/lib/demoData';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  startDate: string;
  endDate?: string;
  maxVolunteers: number;
  currentVolunteers: number;
  images: string[];
  status?: string;
  requiredSkills: string;
  ngo?: {
    organizationName: string;
  };
  matchScore: number;
  matchReasons: string[];
}

import { Button } from '@/components/ui/Button';

export function AIRecommendations() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  // Prevent NGOs from accessing this page
  if (userRole === 'ngo') {
    navigate('/ngo-dashboard');
    return null;
  }

  const { resumeData } = useResume();
  const [events, setEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'match' | 'date' | 'distance'>('match');
  const [appliedEvents, setAppliedEvents] = useState<Set<string | number>>(new Set());

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
      }
    };
    fetchEvents();

    // Listen for cross-tab realtime updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'demo_events_v3') {
        setEvents(getDemoEvents());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleApply = async (eventId: string | number) => {
    try {
      await api.post('/applications', { eventId });
      setAppliedEvents(prev => new Set(prev).add(eventId));
    } catch (err) {
      console.error('Failed to apply', err);
      alert('Failed to apply. You might have already applied.');
    }
  };

  // AI Matching Engine
  const recommendations: Recommendation[] = useMemo(() => {
    const userSkills = resumeData?.skills?.map((s: any) => s.name.toLowerCase()) || 
      ['environment', 'community', 'teamwork', 'communication', 'sustainability', 'teaching', 'code'];
    const userLocation = 'NY';

    return events.map(event => {
      let score = 0;
      let reasons: string[] = [];

      // Category Match
      score += 10; // Baseline

      // Skills Match
      const eventSkills = (event.requiredSkills || '').toLowerCase().split(',').map((s: string) => s.trim());
      eventSkills.push((event.category || '').toLowerCase());
      
      const matchedSkills = userSkills.filter((s: string) => eventSkills.some((es: string) => es.includes(s) || s.includes(es)));
      
      if (matchedSkills.length > 0) {
        score += (matchedSkills.length * 20);
        reasons.push(`Matches your skills: ${matchedSkills.slice(0, 3).join(', ')}`);
      }

      // Location Match (Simplified)
      if (event.location && event.location.includes(userLocation)) {
        score += 20;
        reasons.push('Location is highly convenient for you');
      }

      // Randomize slightly for variety if score is low
      if (score < 40) {
        score = Math.floor(Math.random() * 20) + 40;
        reasons.push('A great opportunity to build new skills');
      }

      // Cap at 99%
      score = Math.min(score, 99);

      // Boost if it's highly matched
      if (score > 60) {
        score = Math.min(score + 15, 98);
      }

      return {
        ...event,
        images: event.images && event.images.length > 0 ? event.images : ['https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200&h=600'],
        matchScore: score,
        matchReasons: reasons
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [events, resumeData]);

  // Apply Filters & Sorting
  const filteredRecommendations = useMemo(() => {
    let result = recommendations;

    if (searchTerm) {
      result = result.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (r.ngo?.organizationName || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(r => r.category === selectedCategory);
    }

    if (minMatchScore > 0) {
      result = result.filter(r => r.matchScore >= minMatchScore);
    }

    switch (sortBy) {
      case 'date':
        result = result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case 'match':
      default:
        result = result.sort((a, b) => b.matchScore - a.matchScore);
        break;
    }

    return result;
  }, [recommendations, searchTerm, selectedCategory, minMatchScore, sortBy]);

  const categories = ['All', ...new Set(events.map(e => e.category))];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      {/* Premium Header */}
      <div className="bg-card text-foreground pt-24 pb-32 px-6 relative overflow-hidden border-b border-border">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 text-primary p-2 rounded-lg border border-primary/20 shadow-sm">
              <Sparkles size={24} className="animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">AI Recommended Opportunities</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Your personal AI career advisor. We've analyzed your skills, experience, and interests to find the highest impact opportunities where you are most likely to succeed.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* Filters and Search Bar */}
        <div className="glass-card p-4 flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search roles or NGOs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-foreground"
            />
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-foreground min-w-[140px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-foreground min-w-[160px]"
            >
              <option value="match">Best Match</option>
              <option value="date">Upcoming Dates</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-8">
          <AnimatePresence>
            {filteredRecommendations.length > 0 ? (
              filteredRecommendations.map((rec, idx) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="glass-card overflow-hidden flex flex-col md:flex-row group hover:border-primary/50 transition-colors"
                >
                  {/* Left: Image & AI Score */}
                  <div className="md:w-[320px] relative shrink-0 overflow-hidden">
                    <img 
                      src={rec.images[0]} 
                      alt={rec.title} 
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    
                    {/* Match Score Badge - EXTREMELY PROMINENT */}
                    <div className="absolute -left-4 top-8 z-20 shadow-xl">
                      <div className={`px-6 py-4 rounded-r-2xl border-y border-r flex flex-col items-center gap-1
                        ${rec.matchScore >= 90 ? 'bg-gradient-to-r from-primary to-accent border-primary/50 text-primary-foreground' : 
                          rec.matchScore >= 70 ? 'bg-gradient-to-r from-secondary to-secondary/80 border-secondary/50 text-secondary-foreground' : 
                          'bg-gradient-to-r from-amber-600 to-amber-500 border-amber-400 text-white'}`}
                      >
                        <Zap size={24} className={rec.matchScore >= 90 ? 'animate-pulse text-yellow-300' : ''} />
                        <span className="font-black text-4xl tracking-tight">{rec.matchScore}%</span>
                        <span className="font-bold text-sm uppercase tracking-widest opacity-90">Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col bg-card/50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <img src={'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150&h=150'} alt={rec.ngo?.organizationName || 'NGO'} className="w-8 h-8 rounded-full border border-border object-cover" />
                          <span className="text-sm font-semibold text-muted-foreground">{rec.ngo?.organizationName || 'Local NGO'}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">{rec.category}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{rec.title}</h2>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                      {rec.description}
                    </p>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-4 border-y border-border">
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium">{rec.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium">{new Date(rec.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Users size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium">{rec.currentVolunteers}/{rec.maxVolunteers} Needed</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium">Full Day</span>
                      </div>
                    </div>

                    {/* Why this matches you */}
                    <div className="mb-8 flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={16} className="text-primary" />
                        <h4 className="text-sm font-bold text-foreground">Why this matches you</h4>
                      </div>
                      <ul className="space-y-2">
                        {rec.matchReasons.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-auto pt-4">
                      {rec.status === 'Cancelled' ? (
                        <Button disabled className="flex-1 bg-slate-800 text-slate-500 border border-slate-700 rounded-xl py-6 text-lg font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                          Event Cancelled
                        </Button>
                      ) : appliedEvents.has(rec.id) ? (
                        <Button disabled className="flex-1 bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30 rounded-xl py-6 text-lg font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                          <CheckCircle2 size={24} /> Applied Successfully
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleApply(rec.id)}
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 shadow-lg shadow-primary/20 text-lg font-bold transition-all hover:scale-[1.02]">
                          Apply Now
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 glass-card"
              >
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No Exact Matches Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  We couldn't find an exact match for your current filters, but here's a tip to improve your eligibility:
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 max-w-lg mx-auto text-left flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-xl text-primary shrink-0">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">AI Career Advice</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Consider adding <strong className="font-bold text-foreground">First Aid Certification</strong> or <strong className="font-bold text-foreground">Project Management</strong> to your profile. Many upcoming events in your area are prioritizing these skills.
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setMinMatchScore(0);}} className="mt-8 border-border text-foreground hover:bg-accent/10">
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
