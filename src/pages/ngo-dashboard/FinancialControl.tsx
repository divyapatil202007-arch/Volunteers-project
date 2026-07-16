import { useState } from 'react';
import { DollarSign, ShieldAlert, CheckCircle2, X, Plane, Package, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const PENDING_REIMBURSEMENTS = [
  { id: 1, user: 'Sarah Jenkins', type: 'Travel Expense', amount: 45.00, flag: 'Normal', icon: Plane },
  { id: 2, user: 'Michael Chen', type: 'Supplies', amount: 850.00, flag: 'High Risk: Unusual Amount', icon: Package },
  { id: 3, user: 'Emily Davis', type: 'Event Catering', amount: 320.00, flag: 'Normal', icon: ShoppingBag },
];

export function FinancialControl() {
  const [reimbursementStatus, setReimbursementStatus] = useState<Record<number, 'approved' | 'rejected'>>({});

  return (
    <Card className="border border-slate-200 dark:border-[#1F2937] shadow-sm bg-white dark:bg-[#111827] rounded-2xl overflow-hidden h-full flex flex-col relative group/card">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none" />
      
      <CardHeader className="border-b border-slate-100 dark:border-[#1F2937] bg-slate-50/50 dark:bg-[#0B1120]/50 p-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-500 shadow-sm ring-1 ring-inset ring-slate-900/5 dark:ring-white/5">
            <DollarSign size={20} /> 
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Financial Control</CardTitle>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Reimbursements & Grants</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar relative z-10">
        <div className="divide-y divide-slate-100 dark:divide-[#1F2937]">
          {PENDING_REIMBURSEMENTS.map(reimbursement => {
            const status = reimbursementStatus[reimbursement.id];
            const TypeIcon = reimbursement.icon;
            return (
              <div key={reimbursement.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-slate-50 dark:hover:bg-[#1F2937]/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                    <TypeIcon size={18} className="text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-none mb-1.5">{reimbursement.user}</h4>
                    <p className="text-xs font-medium text-slate-500 mb-2">{reimbursement.type} • ₹{reimbursement.amount.toFixed(2)}</p>
                    {reimbursement.flag !== 'Normal' && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                        <ShieldAlert size={12} /> {reimbursement.flag}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3 shrink-0 ml-14 sm:ml-0">
                  {status === 'approved' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                      <CheckCircle2 size={14} /> Approved
                    </span>
                  ) : status === 'rejected' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                      <X size={14} /> Rejected
                    </span>
                  ) : (
                    <>
                      <Button 
                        onClick={() => setReimbursementStatus({ ...reimbursementStatus, [reimbursement.id]: 'rejected' })}
                        size="sm" variant="outline" className="h-8 px-4 text-xs font-medium border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:border-rose-200 dark:hover:border-rose-500/30 rounded-lg transition-all"
                      >
                        Reject
                      </Button>
                      <Button 
                        onClick={() => setReimbursementStatus({ ...reimbursementStatus, [reimbursement.id]: 'approved' })}
                        size="sm" className="h-8 px-4 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-all"
                      >
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
