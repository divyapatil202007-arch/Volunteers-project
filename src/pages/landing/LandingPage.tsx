import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, HeartHandshake, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LandingPage() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

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
      
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px]"
        />
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
            Empowering NGOs with <br className="hidden md:block" />
            <motion.span 
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]"
            >
              Intelligent
            </motion.span> Volunteering
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Match the perfect volunteers with the right opportunities instantly using our advanced AI. Streamline your events, track impact hours seamlessly, and amplify your community footprint.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" onClick={() => navigate('/signup')} className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/40 relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Start Volunteering 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight size={20} className="ml-2" />
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" onClick={() => setShowVideo(true)} className="w-full sm:w-auto h-14 px-8 rounded-full text-lg border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">
                <Play size={20} className="mr-2" /> Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Why VolunteerAI?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Our platform provides everything you need to connect, organize, and create meaningful impact in your community.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Smart AI Matching', desc: 'Our algorithm instantly pairs volunteers with events based on skills, location, and passion.', color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/20' },
              { icon: Shield, title: 'Verified Certificates', desc: 'Automatically generate and securely verify volunteer hours and completion certificates.', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20' },
              { icon: Users, title: 'Community Growth', desc: 'Connect NGOs with dedicated individuals, fostering long-term community relationships.', color: 'text-purple-600 bg-purple-100 dark:bg-purple-500/20' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
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

      {/* Video Modal Overlay */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/7hJk8f_tCrs?autoplay=1&mute=0" 
              title="Why You Should Consider Volunteering" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      )}

    </div>
  );
}
