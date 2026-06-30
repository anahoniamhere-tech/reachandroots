import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandingIcons';
import { auth, onAuthStateChanged, signInWithEmailAndPassword, User } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight, Loader2 } from 'lucide-react';

const APPROVED_EMAILS = [
  "anahoniamhere@gmail.com",
  "your@email.com",
  "secondadmin@email.com",
  "RR666"
];

export const ComingSoon: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setActionLoading(true);
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (APPROVED_EMAILS.includes(cred.user.email || '')) {
        navigate('/preview');
      } else {
        setError(`Access restricted.`);
        setActionLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed');
      setActionLoading(false);
    }
  };

  const isApproved = user && APPROVED_EMAILS.includes(user.email || '');

  return (
    <div className="min-h-screen bg-warm-beige flex flex-col items-center justify-between py-10 px-4 sm:px-6 relative overflow-y-auto">
      {/* Background elements with low opacity to keep focus clean and high-fidelity */}
      <div className="absolute inset-0 pixel-grid opacity-15 pointer-events-none" />

      {/* Top spacer to balance the bottom footer */}
      <div className="h-4 sm:h-8 w-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-sm sm:max-w-md mx-auto my-auto"
      >
        {/* Only the specified logo with variant="yellow" - fully responsive sizing */}
        <div className="mb-6 w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[420px] h-auto flex justify-center">
          <BrandLogo variant="yellow" className="w-full h-auto hover:scale-102 transition-transform duration-500" />
        </div>

        {/* Interactive Entry Controls for Authorized Users */}
        <div className="w-full px-2 sm:px-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-xs font-semibold rounded-xl leading-relaxed break-words">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="animate-spin text-brand-navy" size={24} />
            </div>
          ) : isApproved ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/preview')}
              className="w-full flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-coral hover:text-white text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all font-display font-black uppercase text-xs tracking-wider cursor-pointer shadow-lg"
            >
              <span>ENTER SITE</span>
              <ArrowRight size={14} />
            </motion.button>
          ) : showInput ? (
            <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left">
              <div>
                <label className="block font-mono text-xs text-brand-navy/60 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl px-4 py-3 text-brand-navy font-mono focus:outline-none focus:border-brand-coral transition-colors shadow-sm"
                  placeholder="admin@rootsandreach.org"
                  autoFocus
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-brand-navy/60 uppercase tracking-widest mb-2">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl px-4 py-3 text-brand-navy font-mono tracking-[0.2em] focus:outline-none focus:border-brand-coral transition-colors shadow-sm"
                  placeholder="••••••••"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={actionLoading || !email.trim() || !password.trim()}
                className="w-full mt-4 flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-coral hover:text-white text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all font-display font-black uppercase text-xs tracking-wider cursor-pointer shadow-lg disabled:opacity-60"
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    <span>VERIFYING...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT CODE</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowInput(true)}
              className="w-full flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-coral hover:text-white text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all font-display font-black uppercase text-xs tracking-wider cursor-pointer shadow-lg"
            >
              <LogIn size={14} />
              <span>SIGN IN TO ENTER</span>
            </motion.button>
          )}
          
          {user && !isApproved && (
            <div className="mt-4 p-2.5 bg-brand-navy/[0.04] border border-brand-navy/5 rounded-xl text-center flex flex-col sm:flex-row items-center justify-center gap-1">
              <span className="text-[10px] text-brand-navy/40 font-mono uppercase tracking-wider">Signed in as:</span>
              <span className="text-[11px] font-mono text-brand-navy/70 select-all break-all font-bold">{user.email}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Footer Content */}
      <div className="relative z-10 mt-12 mb-2 text-center w-full">
        <div className="h-px w-20 bg-brand-navy/20 mx-auto mb-4" />
        <p className="editorial-label text-brand-navy/40 tracking-[0.45em] uppercase text-[10px] sm:text-xs">
          2026 EDITION // FAYHAA
        </p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-brand-navy/30 font-bold mt-4 select-all">
          rootsandreach.org
        </p>
      </div>
    </div>
  );
};
