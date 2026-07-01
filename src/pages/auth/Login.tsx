import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Globe, Smartphone } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Auth.module.css';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBackground} />
      
      <motion.div 
        className={styles.authCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.authHeader}>
          <div className={styles.logo}>V</div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Enter your details to sign in to your account</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <Input 
            label="Email" 
            type="email" 
            placeholder="john@example.com"
            icon={<Mail size={18} />}
            required
          />
          <div className="flex flex-col gap-1">
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              icon={<Lock size={18} />}
              required
            />
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
          
          <Button type="submit" size="lg" className={styles.submitBtn}>
            Sign in
          </Button>
        </form>

        <div className={styles.divider}>Or continue with</div>

        <div className={styles.socialBtns}>
          <button type="button" className={styles.socialBtn}>
            <Globe size={18} /> Google
          </button>
          <button type="button" className={styles.socialBtn}>
            <Smartphone size={18} /> Phone
          </button>
        </div>

        <div className={styles.footer}>
          Don't have an account? <Link to="/signup" className={styles.footerLink}>Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}
