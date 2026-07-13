import { Search, SlidersHorizontal, Download, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FiltersBar() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-800/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
      
      {/* Search & Filter Buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search skills, languages..." 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" size="sm" className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
          <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
        </Button>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <Button variant="secondary" size="sm" className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white border-0">
          Invite All (28)
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
          <Download className="w-4 h-4 mr-2" /> PDF / CSV
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
          <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
          <Mail className="w-4 h-4 mr-2" /> Email
        </Button>
      </div>

    </div>
  );
}
