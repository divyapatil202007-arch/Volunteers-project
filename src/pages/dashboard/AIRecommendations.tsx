import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Filter, MapPin, Calendar, Clock, ArrowLeft, 
  ChevronDown, Search, CheckCircle2, Bookmark, Share2, Users, Star, 
  Zap, Heart, Award
} from 'lucide-react';
import { MOCK_EVENTS, type MockEvent } from '@/data/mockEvents';
import { Button } from '@/components/ui/Button';

// Simulated Volunteer Profile for matching (in a real app, this would come from a Context or API)
const VOLUNTEER_PROFILE = {
  skills: ['environment', 'community', 'teamwork', 'communication', 'sustainability', 'teaching', 'code'],
  interests: ['Environment', 'Education', 'Technology'],
  location: 'NY',
  availability: ['weekend', 'evening']
};

interface Recommendation extends MockEvent {
  matchScore: number;
  matchReasons: string[];
}

export function AIRecommendations() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  // Prevent NGOs from accessing this page
  if (userRole === 'ngo') {
    navigate('/ngo-dashboard');
    return null;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'match' | 'date' | 'distance'>('match');

  // AI Matching Engine
  const recommendations: Recommendation[] = useMemo(() => {
    return MOCK_EVENTS.map(event => {
      let score = 0;
      let reasons: string[] = [];

      // Category Match
      if (VOLUNTEER_PROFILE.interests.includes(event.category)) {
        score += 30;
        reasons.push(`Aligns with your interest in ${event.category}`);
      }

      // Skills Match
      const eventSkills = [...event.skills.map(s => s.toLowerCase()), event.category.toLowerCase()];
      const matchedSkills = VOLUNTEER_PROFILE.skills.filter(s => eventSkills.includes(s));
      
      if (matchedSkills.length > 0) {
        score += (matchedSkills.length * 15);
        reasons.push(`Matches your skills: ${matchedSkills.join(', ')}`);
      }

      // Location Match (Simplified)
      if (event.location.includes(VOLUNTEER_PROFILE.location)) {
        score += 20;
        reasons.push('Location is highly convenient for you');
      }

      // Randomize slightly for variety if score is low
      if (score === 0) {
        score = Math.floor(Math.random() * 20) + 10;
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
        matchScore: score,
        matchReasons: reasons
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, []);

  // Apply Filters & Sorting
  const filteredRecommendations = useMemo(() => {
    let result = recommendations;

    if (searchTerm) {
      result = result.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.organizer.toLowerCase().includes(searchTerm.toLowerCase())
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

  const categories = ['All', ...new Set(MOCK_EVENTS.map(e => e.category))];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Premium Header */}
      <div className="bg-slate-900 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg border border-blue-500/30">
              <Sparkles size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Recommended Opportunities</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Your personal AI career advisor. We've analyzed your skills, experience, and interests to find the highest impact opportunities where you are most likely to succeed.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-20">
        
        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-4 border border-slate-100 flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search roles or NGOs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-800"
            />
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700 min-w-[140px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700 min-w-[160px]"
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
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col md:flex-row group hover:border-indigo-200 transition-colors"
                >
                  {/* Left: Image & AI Score */}
                  <div className="md:w-[320px] relative shrink-0">
                    <img 
                      src={rec.images[0]} 
                      alt={rec.title} 
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                    
                    {/* Match Score Badge - EXTREMELY PROMINENT */}
                    <div className="absolute -left-4 top-8 z-20 shadow-2xl">
                      <div className={`px-6 py-4 rounded-r-2xl border-y border-r flex flex-col items-center gap-1
                        ${rec.matchScore >= 90 ? 'bg-gradient-to-r from-blue-700 to-blue-500 border-blue-400 text-white' : 
                          rec.matchScore >= 70 ? 'bg-gradient-to-r from-emerald-700 to-emerald-500 border-emerald-400 text-white' : 
                          'bg-gradient-to-r from-amber-700 to-amber-500 border-amber-400 text-white'}`}
                      >
                        <Zap size={24} className={rec.matchScore >= 90 ? 'animate-pulse text-yellow-300' : ''} />
                        <span className="font-black text-4xl tracking-tight">{rec.matchScore}%</span>
                        <span className="font-bold text-sm uppercase tracking-widest opacity-90">Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <img src={rec.organizerAvatar} alt={rec.organizer} className="w-8 h-8 rounded-full border border-slate-200" />
                          <span className="text-sm font-semibold text-slate-600">{rec.organizer}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{rec.category}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">{rec.title}</h2>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
                      {rec.description}
                    </p>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-4 border-y border-slate-100">
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin size={16} className="text-slate-400" />
                        <span className="text-sm font-medium">{rec.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-sm font-medium">{new Date(rec.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Users size={16} className="text-slate-400" />
                        <span className="text-sm font-medium">{rec.currentVolunteers}/{rec.maxVolunteers} Needed</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Clock size={16} className="text-slate-400" />
                        <span className="text-sm font-medium">Full Day</span>
                      </div>
                    </div>

                    {/* Why this matches you */}
                    <div className="mb-8 flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={16} className="text-indigo-600" />
                        <h4 className="text-sm font-bold text-slate-900">Why this matches you</h4>
                      </div>
                      <ul className="space-y-2">
                        {rec.matchReasons.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-auto pt-4">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 shadow-xl shadow-blue-600/20 text-lg font-bold">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Exact Matches Found</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                  We couldn't find an exact match for your current filters, but here's a tip to improve your eligibility:
                </p>
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 max-w-lg mx-auto text-left flex items-start gap-4">
                  <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600 shrink-0">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 mb-1">AI Career Advice</h4>
                    <p className="text-sm text-indigo-700 leading-relaxed">
                      Consider adding <strong className="font-bold">First Aid Certification</strong> or <strong className="font-bold">Project Management</strong> to your profile. Many upcoming events in your area are prioritizing these skills.
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setMinMatchScore(0);}} className="mt-8">
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
