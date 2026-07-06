import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Globe, Smartphone } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Auth.module.css';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save user info and token
      if (data.data && data.data.user) {
        localStorage.setItem('userEmail', data.data.user.email);
        localStorage.setItem('userName', data.data.user.name);
        localStorage.setItem('userRole', data.data.user.role);
        localStorage.setItem('token', data.data.token);
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Enter your details to sign in to your account</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md mb-2">
              {error}
            </div>
          )}
          <Input 
            label="Email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            icon={<Mail size={18} />}
            required
          />
          <div className="flex flex-col gap-1">
            <Input 
              label="Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock size={18} />}
              required
            />
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
          
          <Button type="submit" size="lg" className={styles.submitBtn} isLoading={isLoading}>
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
