import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Auth.module.css';

export function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'volunteer' | 'ngo'>('volunteer');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBackground} />
      
      <motion.div 
        className={styles.authCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.authHeader}>
          <h1 className={styles.title}>Create an account</h1>
          <p className={styles.subtitle}>Join VolunteerAI and start making an impact</p>
        </div>

        <div className={styles.roleSelector}>
          <button 
            type="button"
            className={`${styles.roleBtn} ${role === 'volunteer' ? styles.active : ''}`}
            onClick={() => setRole('volunteer')}
          >
            <User size={24} />
            Volunteer
          </button>
          <button 
            type="button"
            className={`${styles.roleBtn} ${role === 'ngo' ? styles.active : ''}`}
            onClick={() => setRole('ngo')}
          >
            <Building2 size={24} />
            NGO
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSignup}>
          <Input 
            label="Full Name" 
            type="text" 
            placeholder="John Doe"
            icon={<User size={18} />}
            required
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="john@example.com"
            icon={<Mail size={18} />}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            icon={<Lock size={18} />}
            required
          />
          
          <Button type="submit" size="lg" className={styles.submitBtn}>
            Create account
          </Button>
        </form>

        <div className={styles.footer}>
          Already have an account? <Link to="/login" className={styles.footerLink}>Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}
