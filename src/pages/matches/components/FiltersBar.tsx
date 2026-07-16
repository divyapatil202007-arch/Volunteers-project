import { useState } from 'react';
import { Search, SlidersHorizontal, Download, Mail, MessageSquare, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FiltersBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  
  const [isInviting, setIsInviting] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  
  const [isExporting, setIsExporting] = useState(false);
  
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [isWhatsAppSent, setIsWhatsAppSent] = useState(false);
  
  const [isEmailing, setIsEmailing] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleInviteAll = () => {
    setIsInviting(true);
    setTimeout(() => {
      setIsInviting(false);
      setIsInvited(true);
      setTimeout(() => setIsInvited(false), 3000);
    }, 1500);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 1500);
  };

  const handleWhatsApp = () => {
    setIsWhatsApp(true);
    setTimeout(() => {
      setIsWhatsApp(false);
      setIsWhatsAppSent(true);
      setTimeout(() => setIsWhatsAppSent(false), 3000);
    }, 1500);
  };

  const handleEmail = () => {
    setIsEmailing(true);
    setTimeout(() => {
      setIsEmailing(false);
      setIsEmailSent(true);
      setTimeout(() => setIsEmailSent(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-800/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
      
      {/* Search & Filter Buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search skills, languages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        
        <div className="relative">
          <Button 
            variant={filterType === 'All' ? 'outline' : 'primary'} 
            size="sm" 
            className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" /> 
            {filterType === 'All' ? 'Filters' : filterType}
          </Button>

          {isFilterOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
              <div className="absolute left-0 mt-2 w-48 bg-slate-900 rounded-xl shadow-xl border border-slate-800 z-50 overflow-hidden py-1">
                {['All', 'High Match', 'Nearby', 'Available', 'Skilled'].map((type) => (
                  <button
                    key={type}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-slate-800 ${filterType === type ? 'font-bold text-blue-400 bg-blue-500/10' : 'text-slate-300'}`}
                    onClick={() => {
                      setFilterType(type);
                      setIsFilterOpen(false);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleInviteAll}
          disabled={isInviting || isInvited}
          className={`whitespace-nowrap border-0 transition-colors ${isInvited ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {isInviting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Inviting...</>
          ) : isInvited ? (
            <><Check className="w-4 h-4 mr-2" /> Invited All (28)</>
          ) : (
            'Invite All (28)'
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExport}
          disabled={isExporting}
          className="whitespace-nowrap bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          {isExporting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Exporting...</>
          ) : (
            <><Download className="w-4 h-4 mr-2" /> PDF / CSV</>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleWhatsApp}
          disabled={isWhatsApp || isWhatsAppSent}
          className={`whitespace-nowrap transition-colors ${isWhatsAppSent ? 'bg-emerald-600/20 border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/30' : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'}`}
        >
          {isWhatsApp ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
          ) : isWhatsAppSent ? (
            <><Check className="w-4 h-4 mr-2" /> Sent to All</>
          ) : (
            <><MessageSquare className="w-4 h-4 mr-2" /> WhatsApp</>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleEmail}
          disabled={isEmailing || isEmailSent}
          className={`whitespace-nowrap transition-colors ${isEmailSent ? 'bg-emerald-600/20 border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/30' : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'}`}
        >
          {isEmailing ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
          ) : isEmailSent ? (
            <><Check className="w-4 h-4 mr-2" /> Sent to All</>
          ) : (
            <><Mail className="w-4 h-4 mr-2" /> Email</>
          )}
        </Button>
      </div>

    </div>
  );
}
