import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandingIcons';
import { auth, onAuthStateChanged, signInWithPasscode, User } from '../lib/firebase';
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
  const [passcode, setPasscode] = useState('');
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handlePasscodeSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passcode.trim()) return;

    setActionLoading(true);
    setError(null);
    try {
      const loggedUser = await signInWithPasscode(passcode);
      if (APPROVED_EMAILS.includes(loggedUser.email || '')) {
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
            <form onSubmit={handlePasscodeSubmit} className="w-full">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="ENTER ACCESS CODE"
                autoFocus
                className="w-full bg-white text-brand-navy border border-brand-navy/15 rounded-xl px-6 py-3.5 sm:py-4 font-mono uppercase tracking-[0.25em] text-center focus:outline-none focus:ring-1 focus:ring-brand-coral text-sm mb-4 shadow-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={actionLoading || !passcode.trim()}
                className="w-full flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-coral hover:text-white text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all font-display font-black uppercase text-xs tracking-wider cursor-pointer shadow-lg disabled:opacity-60"
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
