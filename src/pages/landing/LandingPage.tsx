import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, HeartHandshake, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LandingPage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden text-slate-900 dark:text-slate-50">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Navigation */}
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            V
          </div>
          <span className="font-bold text-xl tracking-tight font-poppins">VolunteerAI</span>
        </div>
        
        <div className="hidden md:flex gap-8">
          {/* Navigation links removed per user request */}
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:flex text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => navigate('/login')}>
            Log In
          </Button>
          <Button onClick={() => navigate('/signup')} className="bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-full px-6">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 font-semibold text-sm mb-8 backdrop-blur-sm shadow-sm cursor-default"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
            </motion.div>
            <span>Next-Gen AI Matching Engine</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-7xl font-extrabold tracking-tight font-poppins text-slate-900 dark:text-white mb-6 leading-tight"
          >
            Find the right cause. <br className="hidden md:block" />
            <span className="text-primary">Instantly.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Upload your resume. Our AI reads your skills and experience to match you with local non-profits that need exactly what you know how to do. No endless scrolling required.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" onClick={() => navigate('/analyzer')} className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/40 relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Try the AI Matcher
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* How It Works - UI Mockup Section */}
      <section id="features" className="relative z-10 py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">How it works</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">No manual searching. The platform does the heavy lifting for you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Step 1: Upload */}
            <div className="flex flex-col gap-6">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl font-bold text-xl">1</div>
              <h3 className="text-2xl font-bold">Upload your experience</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Drop in your resume. The analyzer extracts your technical skills, past experience, and core competencies instantly.
              </p>
              
              {/* Mini Mock UI */}
              <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Resume_2026.pdf</h4>
                    <p className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Successfully extracted 14 skills</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">React</span>
                  <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">Mentorship</span>
                  <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">Organization</span>
                </div>
              </div>
            </div>

            {/* Step 2: Match */}
            <div className="flex flex-col gap-6 mt-12 md:mt-0">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl font-bold text-xl">2</div>
              <h3 className="text-2xl font-bold">Get matched with causes</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The algorithm compares your extracted profile against thousands of active NGO opportunities and ranks them by compatibility score.
              </p>
              
              {/* Mini Mock UI */}
              <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white font-bold rounded-lg flex items-center justify-center shadow-lg">
                    98%
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Tech Skills Workshop for Youth</h4>
                    <p className="text-xs text-slate-500 mb-2">Code for Good NGO</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 bg-indigo-50 dark:bg-indigo-500/10 p-2 rounded border border-indigo-100 dark:border-indigo-500/20">
                      Matches your <strong className="font-semibold">React</strong> and <strong className="font-semibold">Mentorship</strong> skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HeartHandshake size={24} className="text-primary" />
            <span className="font-bold text-white font-poppins tracking-wide">VolunteerAI</span>
          </div>
          <p className="text-sm">© 2026 VolunteerAI. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
