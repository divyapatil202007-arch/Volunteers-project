import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.landing}>
      <nav className={styles.navbar + ' glass'}>
        <div className={styles.logo}>
          VolunteerAI
        </div>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#how-it-works" className={styles.navLink}>How it Works</a>
          <a href="#testimonials" className={styles.navLink}>Testimonials</a>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
          <Button onClick={() => navigate('/signup')}>Get Started</Button>
        </div>
      </nav>

      <main className={styles.hero}>
        <div className={styles.heroBackground}>
          <motion.div 
            className={styles.blob1}
            animate={{ 
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className={styles.blob2}
            animate={{ 
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroBadge}>
              <Sparkles size={16} />
              <span>AI-Powered Matching Engine</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Empowering NGOs with <br />
              <span className="text-gradient">Intelligent</span> Volunteer Management
            </h1>
            
            <p className={styles.heroDescription}>
              Match the right volunteers with the right opportunities using advanced AI. 
              Streamline events, track hours, and amplify your impact.
            </p>
            
            <div className={styles.heroButtons}>
              <Button size="lg" onClick={() => navigate('/signup')} className="gap-2">
                Get Started <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-white/50 backdrop-blur-md dark:bg-slate-800/50 dark:border-slate-700">
                <Play size={18} /> Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
