import { motion } from 'framer-motion';
import { Medal, MapPin, CheckCircle, ExternalLink, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const volunteers = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    role: 'Medical Lead',
    matchScore: 98,
    rank: '🥇 Best Match',
    rankColor: 'text-yellow-400',
    distance: '2.4 km',
    skills: ['First Aid', 'Leadership', 'Medical'],
    reliability: 99,
    hours: 340,
    aiReason: '✔ Perfect skill match  ✔ Nearby  ✔ Excellent attendance  ✔ Leadership'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
    role: 'Event Coordinator',
    matchScore: 94,
    rank: '🥈 Strong Match',
    rankColor: 'text-slate-300',
    distance: '5.1 km',
    skills: ['Management', 'Communication', 'Logistics'],
    reliability: 95,
    hours: 210,
    aiReason: '✔ Highly experienced  ✔ Available  ✔ Logistics expert'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'Teacher',
    matchScore: 89,
    rank: '🥉 Good Match',
    rankColor: 'text-amber-600',
    distance: '8.0 km',
    skills: ['Teaching', 'Mentoring', 'Languages'],
    reliability: 92,
    hours: 156,
    aiReason: '✔ Bilingual  ✔ Teaching experience  ✔ High reliability'
  }
];

export function VolunteerList() {
  return (
    <div className="space-y-6">
      {volunteers.map((vol, index) => (
        <motion.div
          key={vol.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-glass transition-all duration-300"
        >
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={vol.avatar} alt={vol.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700" />
                <div className="absolute -bottom-2 -right-2 bg-slate-800 rounded-full p-1 border border-slate-600">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">{vol.name}</h3>
                  <span className={`text-xs font-bold ${vol.rankColor}`}>{vol.rank}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Medal className="w-4 h-4" /> {vol.hours} hrs</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {vol.distance}</span>
                </div>
              </div>
            </div>

            {/* Score Ring */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-400">{vol.matchScore}%</div>
                <div className="text-xs text-slate-400 uppercase">Match Score</div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-emerald-500"
                    strokeDasharray={`${vol.matchScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="currentColor" strokeWidth="3"
                  />
                </svg>
              </div>
            </div>

          </div>

          {/* Middle Section (Skills & AI) */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {vol.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-500/20">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-sm text-slate-300">
              <span className="font-semibold text-violet-400 mr-2">Why AI Selected:</span>
              {vol.aiReason}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="w-4 h-4 mr-2" /> Invite to Event
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
              <MessageCircle className="w-4 h-4 mr-2" /> Message
            </Button>
            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white ml-auto">
              View Profile <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </motion.div>
      ))}
    </div>
  );
}
