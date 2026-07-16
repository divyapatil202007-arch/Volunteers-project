import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, FileText, TrendingUp, TrendingDown, 
  DollarSign, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FinancialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_TRANSACTIONS = [
  { id: 'TRX-001', date: '2026-07-14', desc: 'City Park Cleanup Supplies', amount: -450.00, type: 'Expense' },
  { id: 'TRX-002', date: '2026-07-12', desc: 'Global Green Foundation Grant', amount: 25000.00, type: 'Grant' },
  { id: 'TRX-003', date: '2026-07-10', desc: 'Volunteer Reimbursement (Sarah J.)', amount: -45.50, type: 'Reimbursement' },
  { id: 'TRX-004', date: '2026-07-08', desc: 'Tech Skills Workshop Venue', amount: -1200.00, type: 'Expense' },
  { id: 'TRX-005', date: '2026-07-05', desc: 'Community Donor Drive', amount: 4350.00, type: 'Donation' },
];

export function FinancialReportModal({ isOpen, onClose }: FinancialReportModalProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPDF = () => {
    setIsExporting(true);
    
    // Trigger the browser's native print-to-pdf dialog
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Q3 Financial Report</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* AI Insights Banner */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-start gap-4">
              <div className="p-2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                <Activity size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">AI Financial Health Check: Optimal</h4>
                <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80 leading-relaxed">
                  Your current burn rate is 12% below projected levels. At this pace, you have secured runway for the next 18 months. No unusual fraudulent reimbursement patterns detected in the last 30 days.
                </p>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                  <TrendingUp size={16} className="text-emerald-500" /> Total Inflow
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">₹124,500.00</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                  <TrendingDown size={16} className="text-rose-500" /> Total Outflow
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">₹42,850.00</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                  <DollarSign size={16} className="text-blue-500" /> Net Balance
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">₹81,650.00</div>
              </div>
            </div>

            {/* Transaction Ledger */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Recent Ledger Entries</h3>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                      <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Description</th>
                      <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Type</th>
                      <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {MOCK_TRANSACTIONS.map((trx) => (
                      <tr key={trx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{trx.date}</td>
                        <td className="px-6 py-4 text-slate-800 dark:text-slate-200 font-medium">{trx.desc}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            trx.amount > 0 
                              ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}>
                            {trx.type}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-right font-bold ${
                          trx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {trx.amount > 0 ? '+' : ''}{trx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 min-w-[160px]"
            >
              {isExporting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Download size={18} />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
