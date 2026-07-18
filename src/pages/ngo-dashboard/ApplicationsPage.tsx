import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, Sparkles, X, Activity, Mail, MapPin, Clock, Award, Phone, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/Button';

import { fetchApi } from '@/lib/api';
import { cn } from '@/lib/utils';

const MOCK_PROFILE = {
  skills: ['Community Outreach', 'First Aid', 'Event Planning'],
  bio: 'Passionate volunteer dedicated to making a positive impact in the community. Experienced in organizing local events and helping those in need.',
  location: 'San Francisco, CA',
  experience: '3+ years',
  availability: 'Weekends',
  phone: '+1 (555) 123-4567',
  email: 'volunteer@example.com'
};

const RECENT_APPLICATIONS = [
  { id: 1, name: 'Sarah Jenkins', event: 'City Park Cleanup Drive', date: '2 hours ago', matchScore: 94, ...MOCK_PROFILE, email: 'sarah.j@example.com' },
  { id: 2, name: 'Michael Chen', event: 'Tech Skills Workshop', date: '5 hours ago', matchScore: 88, ...MOCK_PROFILE, email: 'm.chen@example.com', skills: ['Web Development', 'Teaching', 'JavaScript'] },
  { id: 3, name: 'Emma Watson', event: 'Senior Citizen Health Camp', date: '1 day ago', matchScore: 76, ...MOCK_PROFILE, email: 'emma.w@example.com', skills: ['Healthcare', 'Elderly Care', 'Patience'] },
];

const ALL_APPLICATIONS = [
  ...RECENT_APPLICATIONS,
  { id: 4, name: 'David Miller', event: 'City Park Cleanup Drive', date: '2 days ago', matchScore: 91, ...MOCK_PROFILE },
  { id: 5, name: 'Jessica Lee', event: 'Neighborhood Food Drive', date: '2 days ago', matchScore: 85, ...MOCK_PROFILE },
  { id: 6, name: 'Marcus Johnson', event: 'Tech Skills Workshop', date: '3 days ago', matchScore: 72, ...MOCK_PROFILE },
  { id: 7, name: 'Sophia Martinez', event: 'Senior Citizen Health Camp', date: '4 days ago', matchScore: 89, ...MOCK_PROFILE },
  { id: 8, name: 'Liam Wilson', event: 'City Park Cleanup Drive', date: '4 days ago', matchScore: 68, ...MOCK_PROFILE },
];

export function ApplicationsPage() {

  const [applications, setApplications] = useState<any[]>(ALL_APPLICATIONS);
  const [approvedApps, setApprovedApps] = useState<any[]>([]);
  const [reviewApp, setReviewApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApps() {
      try {
        const data = await fetchApi('/applications');
        if (data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            name: d.volunteer?.name || 'Unknown Volunteer',
            event: d.event?.title || 'Unknown Event',
            date: new Date(d.createdAt).toLocaleDateString(),
            matchScore: Math.floor(Math.random() * 20) + 75,
            status: d.status,
            ...MOCK_PROFILE,
            email: d.volunteer?.email || 'volunteer@example.com'
          }));
          setApplications(mapped);
          setApprovedApps(mapped.filter((a: any) => a.status === 'Approved').map((a: any) => a.id));
        }
      } catch (e) {
        console.error('Failed to load apps, falling back to mock:', e);
      } finally {
        setLoading(false);
      }
    }
    loadApps();
  }, []);

  const handleApprove = async (appId: any) => {
    if (typeof appId === 'number') {
      setApprovedApps(prev => [...prev, appId]);
      return;
    }
    try {
      await fetchApi(`/applications/${appId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'Approved' })
      });
      setApprovedApps(prev => [...prev, appId]);
    } catch (e) {
      console.error('Error approving:', e);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] -m-6 p-8 overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/50 shadow-2xl backdrop-blur-xl">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse duration-10000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse duration-7000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-10 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Users className="text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
                Applications Management
              </h1>
              <p className="text-slate-400 mt-2 text-lg">Review and approve volunteer applications.</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
        {loading ? <p className="text-slate-500">Loading applications...</p> : applications.map((app) => {
          const isApproved = approvedApps.includes(app.id);
          return (
            <motion.div 
              key={`all-${app.id}`} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative p-6 border border-slate-700/50 rounded-[2rem] flex flex-col sm:flex-row gap-6 justify-between bg-slate-900/60 backdrop-blur-xl hover:bg-slate-800/80 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden"
            >
              {/* Subtle hover glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 transition-colors duration-500" />
              
              <div className="flex items-start gap-6 relative z-10">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {app.name.charAt(0)}
                  </div>
                  {/* Glowing ping indicator behind avatar */}
                  <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping opacity-0 group-hover:opacity-100 duration-1000" />
                </div>
                
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-extrabold text-white text-xl tracking-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-colors">{app.name}</h4>
                  <p className="text-sm text-slate-400 mb-3">Applied for: <span className="font-semibold text-slate-200">{app.event}</span></p>
                  <div className="flex gap-3 items-center">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-1.5">
                      <Sparkles size={12} />
                      {app.matchScore}% AI Match
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                      <Clock size={12} />
                      {app.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col gap-3 shrink-0 items-center justify-center relative z-10">
                <Button 
                  onClick={() => handleApprove(app.id)}
                  disabled={isApproved}
                  className={cn(
                    "w-36 h-11 transition-all duration-300 rounded-xl font-bold shadow-lg",
                    isApproved 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 disabled:opacity-100 cursor-default shadow-none" 
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                  )}
                >
                  {isApproved ? <><CheckCircle2 size={18} className="mr-2" /> Approved</> : 'Approve'}
                </Button>
                <Button 
                  onClick={() => setReviewApp(app)} 
                  variant="outline" 
                  className="w-36 h-11 rounded-xl border-slate-600 hover:border-slate-400 hover:bg-slate-800/50 text-slate-300 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Review Profile
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {reviewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setReviewApp(null)} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
              <button onClick={() => setReviewApp(null)} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors z-10">
                <X size={20} />
              </button>
            </div>
            
            <div className="px-8 pb-8 relative">
              {/* Avatar overlaying banner */}
              <div className="absolute -top-16 left-8 z-20">
                <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                  {reviewApp.name.charAt(0)}
                </div>
                <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shadow-sm" title="Online"></div>
              </div>

              {/* Profile Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-8 pt-20 lg:pt-0 lg:pl-40 relative z-10">
                <div className="mt-2 lg:mt-0">
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{reviewApp.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {reviewApp.location}</span>
                    <span className="flex items-center gap-1.5"><Mail size={16} /> {reviewApp.email}</span>
                    <span className="flex items-center gap-1.5"><Phone size={16} /> {reviewApp.phone}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold border border-emerald-200 dark:border-emerald-800/50">
                  <Sparkles size={16} /> {reviewApp.matchScore}% AI Match
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">About Me</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                      {reviewApp.bio}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                      <Award size={18} className="text-purple-500" /> Top Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {reviewApp.skills.map((skill: string, idx: number) => (
                        <span key={idx} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-500/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">Application Context</h3>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Applying for event</p>
                        <p className="font-semibold text-slate-800 dark:text-white">{reviewApp.event}</p>
                        <p className="text-xs text-slate-400 mt-1">Submitted {reviewApp.date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Quick Stats */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock size={18} className="text-amber-500" />
                      <h4 className="font-semibold text-slate-800 dark:text-white">Experience</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{reviewApp.experience}</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity size={18} className="text-emerald-500" />
                      <h4 className="font-semibold text-slate-800 dark:text-white">Availability</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{reviewApp.availability}</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Users size={18} className="text-indigo-500" />
                      <h4 className="font-semibold text-slate-800 dark:text-white">Past Events</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Completed 12 events successfully with a 4.9/5 rating.</p>
                  </div>
                </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button onClick={() => setReviewApp(null)} variant="outline" className="flex-1 py-6 text-base">Close Profile</Button>
                <Button 
                  onClick={() => {
                    handleApprove(reviewApp.id);
                    setReviewApp(null);
                  }} 
                  className="flex-1 bg-primary hover:bg-primary/90 py-6 text-base shadow-xl shadow-primary/20"
                >
                  Approve Application
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
