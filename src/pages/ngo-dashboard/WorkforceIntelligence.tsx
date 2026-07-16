import { Activity, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const BURNOUT_GRID = [
  { id: 1, name: 'Sarah Jenkins', tasks: 12, reliability: 98, burnoutRisk: 'Low', status: 'Active', workload: 35 },
  { id: 2, name: 'Michael Chen', tasks: 28, reliability: 94, burnoutRisk: 'High', status: 'Burnout_Risk', workload: 92 },
  { id: 3, name: 'Emma Watson', tasks: 18, reliability: 88, burnoutRisk: 'Medium', status: 'Active', workload: 65 },
];

export function WorkforceIntelligence() {
  return (
    <Card className="border border-slate-200 dark:border-[#1F2937] shadow-sm bg-white dark:bg-[#111827] rounded-2xl overflow-hidden h-full flex flex-col relative group/card">
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -ml-20 -mt-20 opacity-50 pointer-events-none" />
      
      <CardHeader className="border-b border-slate-100 dark:border-[#1F2937] bg-slate-50/50 dark:bg-[#0B1120]/50 p-5 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-100 dark:bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-500 shadow-sm ring-1 ring-inset ring-slate-900/5 dark:ring-white/5">
              <Activity size={20} /> 
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Workforce Intelligence</CardTitle>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Burnout & Risk Prediction</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-[#1F2937]/30 border-b border-slate-100 dark:border-[#1F2937]">
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Volunteer</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Workload</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Reliability</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#1F2937]">
            {BURNOUT_GRID.map(volunteer => (
              <tr key={volunteer.id} className="hover:bg-slate-50 dark:hover:bg-[#1F2937]/30 transition-colors">
                <td className="p-4 font-semibold text-slate-900 dark:text-white text-sm whitespace-nowrap">
                  {volunteer.name}
                  <div className="text-[11px] font-medium text-slate-500 mt-0.5">{volunteer.tasks} Active Tasks</div>
                </td>
                <td className="p-4">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${volunteer.workload > 80 ? 'bg-rose-500' : volunteer.workload > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${volunteer.workload}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-medium">{volunteer.workload}% Capacity</div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-500">{volunteer.reliability}%</span>
                </td>
                <td className="p-4 text-right">
                  <span className={`inline-flex items-center justify-center min-w-[70px] gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border
                    ${volunteer.burnoutRisk === 'High' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20' : 
                      volunteer.burnoutRisk === 'Medium' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' : 
                      'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'}
                  `}>
                    {volunteer.burnoutRisk === 'High' && <ShieldAlert size={12} />}
                    {volunteer.burnoutRisk === 'Medium' && <AlertTriangle size={12} />}
                    {volunteer.burnoutRisk === 'Low' && <CheckCircle2 size={12} />}
                    {volunteer.burnoutRisk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
