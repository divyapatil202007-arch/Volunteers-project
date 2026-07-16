import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-[#111827] border border-[#1F2937] shadow-sm"
    >
      {/* Subtle Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 animate-gradient-xy opacity-70" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      <div className="relative px-8 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
        <div className="flex-1 space-y-5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={12} className="text-blue-400" />
            VolunteerAI Engine v2.0
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            AI-Powered <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              NGO Intelligence
            </span>
          </h1>
          
          <p className="text-[15px] text-slate-400 max-w-xl leading-relaxed">
            Manage events smarter, predict attendance, and build perfect volunteer teams using state-of-the-art Artificial Intelligence.
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button 
              onClick={() => navigate('/events/create')}
              className="bg-white text-slate-900 hover:bg-slate-100 shadow-sm gap-2 font-medium transition-all"
            >
              Publish Event
              <ArrowRight size={16} className="text-slate-600" />
            </Button>
            <Button 
              onClick={() => navigate('/matches')}
              className="bg-blue-600 hover:bg-blue-700 text-white border-transparent gap-2 font-medium shadow-sm transition-all"
            >
              <Users size={16} />
              AI Match Volunteers
            </Button>
            <Button 
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white gap-2 font-medium transition-all"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText size={16} />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Cleaner Metric Element */}
        <div className="hidden lg:flex shrink-0 relative pr-4">
          <motion.div 
            animate={{ y: [0, -8, 0] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="w-56 h-56 relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl" />
            <div className="relative w-48 h-48 bg-[#111827] rounded-full border border-[#1F2937] flex flex-col items-center justify-center shadow-2xl ring-1 ring-white/5">
              <Sparkles size={32} className="mb-2 text-blue-400" />
              <div className="text-4xl font-bold text-white tracking-tight">98%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-medium">Accuracy</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
