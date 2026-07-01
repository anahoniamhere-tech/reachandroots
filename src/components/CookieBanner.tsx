import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isRTL } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Small delay so it doesn't pop up instantly on load
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
    // Trigger analytics initialization here
    if (typeof window !== 'undefined' && (window as any).initializeAnalytics) {
      (window as any).initializeAnalytics();
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-4 md:bottom-8 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-[110] max-w-lg w-auto bg-brand-navy/95 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-5 items-center justify-between overflow-hidden`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
          
          <div className="flex items-start md:items-center gap-4 relative z-10 w-full md:w-auto">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
              <Cookie size={20} className="text-brand-coral" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-white font-display font-bold text-sm md:text-base tracking-widest uppercase mb-1">
                {isRTL ? 'نحن نستخدم ملفات تعريف الارتباط' : 'We use cookies'}
              </h4>
              <p className="text-white/60 font-body text-xs md:text-sm leading-relaxed max-w-[280px]">
                {isRTL 
                  ? 'نستخدم ملفات تعريف الارتباط لتحليل حركة المرور وتحسين تجربتك. لن يتم تفعيل التتبع حتى توافق.' 
                  : 'We use cookies to analyze traffic and improve your experience. Tracking is disabled until you accept.'}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 w-full md:w-auto relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isRTL ? 'رفض' : 'Decline'}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-2.5 bg-brand-coral hover:bg-brand-orange text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
            >
              {isRTL ? 'قبول' : 'Accept'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
