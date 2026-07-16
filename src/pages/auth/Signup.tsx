import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Sparkles, ArrowRight, Building2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'volunteer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            role: formData.role
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        let role = formData.role;
        let name = formData.name;
        try {
          const res = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${data.session.access_token}`
            }
          });
          const backendData = await res.json();
          name = backendData.data?.name || name;
          role = backendData.data?.role || role;
        } catch (err) {
          console.warn('Backend sync failed, using local form data');
        }

        localStorage.setItem('userEmail', data.user?.email || '');
        localStorage.setItem('userName', name);
        localStorage.setItem('userRole', role);
        localStorage.setItem('token', data.session.access_token);
        
        if (role === 'ngo') {
          navigate('/ngo-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden py-12">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="text-center mb-8 relative z-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
              Create Account
            </h1>
            <p className="text-slate-400 text-sm">
              Join our community of changemakers
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5 relative z-10">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl flex items-center gap-2"
                >
                  <div className="w-1 h-full bg-red-500 rounded-full" />
                  {error}
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'volunteer'})}
                  className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                    formData.role === 'volunteer' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                      : 'bg-slate-950/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <User className="w-4 h-4" /> Volunteer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'ngo'})}
                  className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                    formData.role === 'ngo' 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                      : 'bg-slate-950/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Building2 className="w-4 h-4" /> NGO
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          <div className="mt-8 text-center text-sm text-slate-400 relative z-10">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-medium hover:text-purple-400 transition-colors">
              Sign in instead
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
