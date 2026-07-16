import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Activity, CheckCircle2, X, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const INITIAL_HOURS_DATA = [
  {
    id: 1,
    title: 'City Park Cleanup Drive',
    category: 'Environment',
    totalHours: 12,
    shiftsCompleted: 3,
    lastShift: 'Jul 15, 2026',
    status: 'Verified',
  },
  {
    id: 2,
    title: 'Senior Citizen Health Camp',
    category: 'Health',
    totalHours: 24,
    shiftsCompleted: 4,
    lastShift: 'Jun 20, 2026',
    status: 'Verified',
  },
  {
    id: 3,
    title: 'Tech Skills Workshop for Youth',
    category: 'Education',
    totalHours: 8,
    shiftsCompleted: 2,
    lastShift: 'May 05, 2026',
    status: 'Pending',
  },
  {
    id: 4,
    title: 'Neighborhood Food Drive',
    category: 'Community',
    totalHours: 16,
    shiftsCompleted: 2,
    lastShift: 'Apr 12, 2026',
    status: 'Verified',
  }
];

export function VolunteerHours() {
  const navigate = useNavigate();
  const [hoursData, setHoursData] = useState(INITIAL_HOURS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Community');
  const [newHours, setNewHours] = useState('');
  const [newDate, setNewDate] = useState('');

  const totalHours = hoursData.reduce((acc, curr) => acc + curr.totalHours, 0);
  const totalShifts = hoursData.reduce((acc, curr) => acc + curr.shiftsCompleted, 0);

  const handleExportCSV = () => {
    const headers = ['Event Title', 'Category', 'Shifts Completed', 'Total Hours', 'Last Shift Date', 'Status'];
    const rows = hoursData.map(log => [
      `"${log.title}"`,
      log.category,
      log.shiftsCompleted,
      log.totalHours,
      log.lastShift,
      log.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'volunteer_hours_export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitHours = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newHours || !newDate) return;

    const newEntry = {
      id: Date.now(),
      title: newEventTitle,
      category: newCategory,
      totalHours: parseInt(newHours, 10),
      shiftsCompleted: 1,
      lastShift: new Date(newDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Pending',
    };

    setHoursData([newEntry, ...hoursData]);
    setIsModalOpen(false);
    
    // Reset form
    setNewEventTitle('');
    setNewHours('');
    setNewDate('');
  };

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto py-8 font-sans">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-10">
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-slate-100 tracking-tight">Volunteer Hours Tracker</h1>
          <p className="text-[15px] text-slate-400">Track your completed shifts and log your impactful contributions.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Log New Hours Themed Card */}
        <motion.button 
          whileHover={{ scale: 0.99 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="h-full min-h-[160px] flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer group shadow-sm"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-3 group-hover:border-indigo-500/50 group-hover:text-indigo-400 text-slate-300 transition-colors">
            <Plus size={20} />
          </div>
          <h3 className="text-sm font-semibold text-slate-200">Log New Hours</h3>
          <p className="text-xs mt-1 text-slate-500">Submit a new shift</p>
        </motion.button>

        {/* Total Hours Card (Emerald Tint) */}
        <div className="bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-900/40 rounded-xl p-6 flex flex-col justify-center text-slate-100 shadow-sm">
          <p className="text-[10px] font-bold mb-2 uppercase tracking-wider text-emerald-400/80">Total Impact Hours</p>
          <div className="flex items-baseline gap-2 mb-2">
            <h2 className="text-4xl font-semibold font-mono tracking-tighter text-emerald-50">{totalHours}</h2>
            <span className="text-sm font-medium text-emerald-500/80">hrs</span>
          </div>
          <div className="inline-flex items-center text-[10px] font-mono text-emerald-300 bg-emerald-950/50 border border-emerald-900/50 px-2 py-1 rounded-md w-max shadow-inner">
            +12 hrs this month
          </div>
        </div>

        {/* Shifts Completed Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Shifts Completed</p>
              <h3 className="text-2xl font-semibold font-mono text-slate-100">{totalShifts}</h3>
            </div>
          </div>
          <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-1.5 overflow-hidden shadow-inner">
            <div className="bg-emerald-500 h-1.5 w-[85%] rounded-full" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2 text-right font-medium">3 shifts to next tier</p>
        </div>

        {/* Events Joined Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-purple-400">
              <Activity size={18} />
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Events Joined</p>
              <h3 className="text-2xl font-semibold font-mono text-slate-100">{hoursData.length}</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium">Across 4 distinct categories</p>
        </div>
      </div>

      {/* Flat Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-900/50 border-b border-slate-800 p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-sm font-semibold text-slate-100">Recent Shift Logs</h2>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 transition-colors shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400 bg-slate-900">
                <th className="p-5 font-semibold uppercase tracking-wider">Event Details</th>
                <th className="p-5 font-semibold uppercase tracking-wider">Category</th>
                <th className="p-5 font-semibold uppercase tracking-wider">Shifts Logged</th>
                <th className="p-5 font-semibold uppercase tracking-wider text-right">Total Hours</th>
                <th className="p-5 font-semibold uppercase tracking-wider">Status</th>
                <th className="p-5 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {hoursData.map((log) => (
                <tr key={log.id} className="bg-slate-900 hover:bg-slate-800/50 transition-colors group">
                  <td className="p-5">
                    <p className="font-medium text-sm text-slate-200">{log.title}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <Calendar size={12} /> {log.lastShift}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono tracking-wider uppercase text-slate-300">
                      {log.category}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs text-slate-200 shadow-inner">
                        {log.shiftsCompleted}
                      </div>
                      <span className="text-xs font-medium text-slate-500">Shifts</span>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <span className="text-lg font-semibold font-mono text-slate-200">{log.totalHours}</span>
                    <span className="text-xs font-medium text-slate-500 ml-1">hrs</span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      {log.status === 'Verified' ? (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-400">Verified</span>
                        </>
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="text-xs font-semibold text-amber-400">Pending</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      className="opacity-0 group-hover:opacity-100 flex items-center justify-end text-xs font-medium text-slate-400 hover:text-white transition-opacity"
                      onClick={() => navigate(`/events/${log.id}`)}
                    >
                      Details <ArrowRight size={14} className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Minimalist Log Hours Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-sans"
            >
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                <h3 className="text-sm font-semibold text-slate-200">Log New Hours</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-800 text-slate-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmitHours} className="p-6 flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Event Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Community Garden Maintenance"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/50 outline-none transition-colors shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:border-indigo-500/50 outline-none transition-colors shadow-inner"
                    >
                      <option>Environment</option>
                      <option>Health</option>
                      <option>Education</option>
                      <option>Community</option>
                      <option>Technology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Hours Logged</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      max="24"
                      placeholder="e.g. 4"
                      value={newHours}
                      onChange={(e) => setNewHours(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/50 outline-none transition-colors shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Shift Date</label>
                  <input 
                    type="date" 
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:border-indigo-500/50 outline-none transition-colors shadow-inner"
                  />
                </div>

                <div className="pt-5 mt-2 border-t border-slate-800/50 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg transition-colors active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    Submit Hours
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
