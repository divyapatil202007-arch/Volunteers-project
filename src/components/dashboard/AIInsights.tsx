import { motion } from 'framer-motion';
import { Brain, TrendingUp, CloudSun, Heart, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock data with added metrics for the rich UI
const INSIGHTS = [
  { 
    label: 'Attendance Prediction', 
    value: '94%', 
    icon: TrendingUp, 
    color: 'text-emerald-500 dark:text-emerald-400', 
    bg: 'bg-emerald-100 dark:bg-emerald-500/10',
    type: 'progress',
    trend: '+2.1%',
    confidence: 'High'
  },
  { 
    label: 'Weather Impact', 
    value: 'Minimal', 
    icon: CloudSun, 
    color: 'text-blue-500 dark:text-blue-400', 
    bg: 'bg-blue-100 dark:bg-blue-500/10',
    type: 'badge',
    status: 'optimal'
  },
  { 
    label: 'Volunteer Retention', 
    value: '91%', 
    icon: Heart, 
    color: 'text-purple-500 dark:text-purple-400', 
    bg: 'bg-purple-100 dark:bg-purple-500/10',
    type: 'sparkline',
    data: [40, 45, 60, 50, 70, 85, 91]
  },
  { 
    label: 'Overall Risk Level', 
    value: 'Low', 
    icon: ShieldAlert, 
    color: 'text-emerald-500 dark:text-emerald-400', 
    bg: 'bg-emerald-100 dark:bg-emerald-500/10',
    type: 'badge',
    status: 'safe'
  },
];

import { ShieldAlert } from 'lucide-react';

export function AIInsights() {
  return (
    <Card className="border border-slate-200 dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-sm relative overflow-hidden group rounded-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none" />
      
      <CardHeader className="border-b border-slate-100 dark:border-[#1F2937] pb-4 relative z-10 flex flex-row items-center justify-between">
        <CardTitle className="text-[15px] font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
            <Brain size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          AI Predictive Insights
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <ChevronRight size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-[#1F2937]">
          {INSIGHTS.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div 
                key={insight.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 flex flex-col hover:bg-slate-50 dark:hover:bg-[#1F2937]/30 transition-colors cursor-default group/item"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${insight.bg} ${insight.color} flex items-center justify-center shrink-0 shadow-sm ring-1 ring-inset ring-slate-900/5 dark:ring-white/5 group-hover/item:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                  {insight.confidence && (
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                      {insight.confidence} Confidence
                    </span>
                  )}
                </div>
                
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white leading-none tracking-tight mb-1 flex items-baseline gap-2">
                    {insight.value}
                    {insight.trend && (
                      <span className="text-xs font-semibold text-emerald-500 flex items-center">
                        <TrendingUp size={10} className="mr-0.5" /> {insight.trend}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{insight.label}</div>
                </div>

                {/* Dynamic Visualization based on insight type */}
                <div className="mt-4 h-8 flex items-end">
                  {insight.type === 'progress' && (
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] mb-1.5 text-slate-400 font-medium">
                        <span>Current Projection</span>
                        <span className="text-emerald-500 font-semibold">94%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
                      </div>
                    </div>
                  )}

                  {insight.type === 'sparkline' && insight.data && (
                    <div className="w-full flex items-end gap-1 h-full opacity-60 group-hover/item:opacity-100 transition-opacity">
                      {insight.data.map((val, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-purple-400 dark:bg-purple-500 rounded-t-sm"
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>
                  )}

                  {insight.type === 'badge' && (
                    <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {insight.status === 'optimal' && <CheckCircle2 size={12} className="text-blue-500" />}
                      {insight.status === 'safe' && <ShieldAlert size={12} className="text-emerald-500" />}
                      Status: {insight.status ? insight.status.charAt(0).toUpperCase() + insight.status.slice(1) : ''}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
