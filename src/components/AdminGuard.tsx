import React, { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signInWithGoogle, signOut, User } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Lock, LogIn, AlertCircle, LogOut, Loader2, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandingIcons';

// Admin Allowlist - Add approved emails here
const ADMIN_EMAILS = [
  "anahoniamhere@gmail.com",
  "saadmatar@outlook.com",
  "ahmadmawass51@gmail.com",
  "icontent2023@gmail.com",
  "your@email.com",
  "secondadmin@email.com",
  "RR666"
];


interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle(email);
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-brand-coral" size={32} />
        <span className="text-xs text-brand-navy/40 font-mono">Verifying credentials...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-warm-beige/30 flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-brand-navy/5"
        >
          <div className="w-20 h-20 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="text-brand-navy" size={32} />
          </div>
          <h2 className="font-display font-bold text-3xl uppercase tracking-tighter text-brand-navy mb-4">
            Private Access
          </h2>
          <p className="font-body text-brand-navy/60 mb-10 leading-relaxed">
            The preview site is restricted to approved administrators. Please enter your credentials to continue.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {showInput ? (
            <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left">
              <div>
                <label className="block font-mono text-xs text-brand-navy/60 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-brand-navy/5 border border-brand-navy/10 rounded-xl px-4 py-3 text-brand-navy font-mono focus:outline-none focus:border-brand-coral transition-colors"
                  placeholder="admin@rootsandreach.org"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                disabled={!email.trim()}
                className="w-full mt-4 flex items-center justify-center gap-4 bg-brand-navy text-white px-8 py-5 rounded-full hover:bg-brand-coral transition-all duration-300 shadow-xl group disabled:opacity-60"
              >
                <span className="editorial-label text-white tracking-[0.3em] font-medium uppercase">SIGN IN WITH GOOGLE</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setShowInput(true)}
              className="w-full flex items-center justify-center gap-4 bg-brand-navy text-white px-8 py-5 rounded-full hover:bg-brand-coral transition-all duration-300 shadow-xl group"
            >
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="editorial-label text-white tracking-[0.3em] font-medium uppercase">SIGN IN TO ENTER</span>
            </button>
          )}
          
          <div className="mt-12 pt-8 border-t border-brand-navy/5">
             <Link to="/" className="editorial-label text-brand-navy/30 hover:text-brand-coral transition-colors tracking-widest text-[10px]">BACK TO PUBLIC SITE</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Check if authorized
  if (!ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-12"
        >
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-10">
            <Shield className="text-red-500" size={40} />
          </div>
          <h2 className="font-display font-bold text-4xl uppercase tracking-tighter text-brand-navy mb-6">
            Unauthorized
          </h2>
          <p className="font-body text-brand-navy/60 mb-10 leading-relaxed text-lg">
            Access denied. The account <span className="font-bold text-brand-navy">{user.email}</span> is not on the administrator allowlist.
          </p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-4 border-2 border-brand-navy text-brand-navy px-8 py-4 rounded-full hover:bg-brand-navy hover:text-white transition-all duration-300 font-display font-bold text-xs uppercase tracking-widest"
            >
              <LogOut size={16} />
              Sign Out & Switch Account
            </button>
            <Link 
              to="/"
              className="editorial-label text-brand-navy/40 hover:text-brand-coral transition-colors tracking-widest text-[10px] uppercase font-bold mt-4"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authorized!
  return (
    <>
      <div className="fixed bottom-6 left-6 z-[100]">
        <div className="flex items-center gap-4 bg-brand-navy/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-white/10">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="editorial-label !text-white text-[10px] tracking-widest uppercase font-bold opacity-80">Admin Mode</span>
          <div className="w-px h-4 bg-white/20 mx-2" />
          <span className="editorial-label !text-white text-[10px] tracking-widest uppercase font-bold hidden md:inline">{user.email}</span>
          <button onClick={handleSignOut} className="hover:text-brand-coral transition-colors p-1" title="Sign Out">
            <LogOut size={14} />
          </button>
        </div>
      </div>
      {children}
    </>
  );
};
