import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Clock, 
  TrendingUp, TrendingDown, ChevronRight, 
  CheckCircle2, FileText, DollarSign, History, Activity, CreditCard, Filter, Search
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FinancialReportModal } from './FinancialReportModal';
import { useNavigate } from 'react-router-dom';
import { Hero } from '@/components/dashboard/Hero';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { FinancialControl } from './FinancialControl';
import { WorkforceIntelligence } from './WorkforceIntelligence';

// Mock data for the NGO dashboard
const STATS = [
  { title: 'Total Funding', value: '₹124,500', icon: DollarSign, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', trend: '+12.5%', trendIcon: TrendingUp, trendColor: 'text-emerald-500' },
  { title: 'Total Expenses', value: '₹42,850', icon: CreditCard, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', trend: '-2.4%', trendIcon: TrendingDown, trendColor: 'text-emerald-500' },
  { title: 'Active Volunteers', value: '1,284', icon: Users, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10', trend: '+8.1%', trendIcon: TrendingUp, trendColor: 'text-emerald-500' },
  { title: 'Hours Contributed', value: '8,450', icon: Clock, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-500/10', trend: '+15.2%', trendIcon: TrendingUp, trendColor: 'text-emerald-500' },
];

const RECENT_EVENTS = [
  { id: 1, title: 'City Park Cleanup Drive', date: 'Jul 21, 2026', volunteers: 45, capacity: 50, status: 'Active' },
  { id: 2, title: 'Tech Skills Workshop for Youth', date: 'Jul 24, 2026', volunteers: 20, capacity: 20, status: 'Active' },
  { id: 3, title: 'Senior Citizen Health Camp', date: 'Aug 02, 2026', volunteers: 100, capacity: 100, status: 'Completed' },
  { id: 4, title: 'Neighborhood Food Drive', date: 'Aug 10, 2026', volunteers: 30, capacity: 30, status: 'Completed' },
];

export function NGODashboard() {
  const navigate = useNavigate();
  const [userName] = useState(localStorage.getItem('userName') || 'NGO Admin');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Organization Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, {userName}. Track your impact and financials.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setIsReportModalOpen(true)}>
            <FileText size={16} /> Financial Report
          </Button>
        </div>
      </div>

      <Hero />
      <AIInsights />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-[#1F2937] bg-white dark:bg-[#111827] relative overflow-hidden group rounded-2xl h-full flex flex-col justify-between">
              <CardContent className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} shadow-sm ring-1 ring-inset ring-slate-900/5 dark:ring-white/5`}>
                    <stat.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold ${stat.trendColor} bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800`}>
                    <stat.trendIcon size={12} />
                    {stat.trend}
                  </div>
                </div>
                <div className="mt-auto">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight truncate mb-1">{stat.value}</h3>
                  <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="w-full">
        {/* Recent Events */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <History size={20} className="text-primary" /> 
              Event History
            </h2>
            <Button onClick={() => navigate('/ngo-events')} variant="ghost" className="text-sm text-primary hover:text-primary/80">View All Events <ChevronRight size={16} /></Button>
          </div>
          
          <Card className="border border-slate-200 dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-sm overflow-hidden rounded-2xl">
            <div className="p-4 border-b border-slate-100 dark:border-[#1F2937] flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50 dark:bg-[#0B1120]/50">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search events..." 
                  className="w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] focus:border-blue-500 dark:focus:border-blue-500/50 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all shadow-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2 border-slate-200 dark:border-[#1F2937] text-slate-600 dark:text-slate-300">
                <Filter size={14} /> Filter
              </Button>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#1F2937]/30 border-b border-slate-200 dark:border-[#1F2937]">
                    <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap sticky left-0 z-10 bg-slate-50 dark:bg-[#111827]">Event Name</th>
                    <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Date</th>
                    <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Volunteers</th>
                    <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1F2937]">
                  {RECENT_EVENTS.map((event, idx) => (
                    <tr key={event.id} className={`hover:bg-slate-50 dark:hover:bg-[#1F2937]/20 transition-colors ${idx % 2 === 0 ? 'bg-white dark:bg-[#111827]' : 'bg-slate-50/30 dark:bg-[#0B1120]/10'}`}>
                      <td className="p-4 font-semibold text-slate-900 dark:text-white text-sm whitespace-nowrap sticky left-0 z-10 bg-inherit">{event.title}</td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{event.date}</td>
                      <td className="p-4 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${event.volunteers === event.capacity ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                              style={{ width: `${(event.volunteers / event.capacity) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 shrink-0">
                            {event.volunteers} / {event.capacity}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                          ${event.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30' : ''}
                          ${event.status === 'Completed' ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' : ''}
                          ${event.status === 'Recruiting' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/30' : ''}
                        `}>
                          {event.status === 'Active' && <Activity size={10} />}
                          {event.status === 'Completed' && <CheckCircle2 size={10} />}
                          {event.status === 'Recruiting' && <Users size={10} />}
                          {event.status}
                        </span>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <Button 
                          onClick={() => navigate(`/events/${event.id}`)}
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <FinancialControl />
        <WorkforceIntelligence />
      </div>

      <FinancialReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </div>
  );
}
