import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Auth.module.css';

export function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'volunteer' | 'ngo'>('volunteer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        throw new Error('Server encountered an error. Please check Vercel logs or database connection.');
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Registration failed');
      }

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
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md mb-2">
              {error}
            </div>
          )}
          <Input 
            label="Full Name" 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            icon={<User size={18} />}
            required
          />
          <Input 
            label="Email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            icon={<Mail size={18} />}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock size={18} />}
            required
          />
          
          <Button type="submit" size="lg" className={styles.submitBtn} isLoading={isLoading}>
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
