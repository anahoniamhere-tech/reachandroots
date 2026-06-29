import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, ArrowRight, Activity, Target, Award, Globe, User } from 'lucide-react';
import { BrandLogo } from './BrandingIcons';
import { useLanguage } from '../lib/LanguageContext';

export const Navbar = ({ onNavigate, onOpenTickets, currentView }: { onNavigate: (v: 'landing' | 'finder' | 'tickets' | 'checkout' | 'success' | 'program' | 'sanctuary' | 'sanctuary-apply' | 'gallery' | 'sponsors' | 'trf-anahon' | 'journey') => void, onOpenTickets: () => void, currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.story, id: 'about', icon: <Globe size={10} />, type: 'anchor' },
    { name: (t.nav as any).journey || 'Journey', id: 'journey', icon: <User size={10} />, type: 'view' },
  ];

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-warm-beige/95 backdrop-blur-xl border-brand-navy/10 py-4' : 'bg-transparent border-transparent py-8'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="cursor-pointer group" onClick={() => { onNavigate('landing'); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="flex flex-col text-brand-navy group-hover:text-brand-coral transition-colors select-none">
            <span className="font-display text-lg sm:text-xl font-black tracking-tight leading-[0.9] uppercase">ROOTS</span>
            <span className="font-display text-lg sm:text-xl font-black tracking-tight leading-[0.9] uppercase">AND</span>
            <span className="font-display text-lg sm:text-xl font-black tracking-tight leading-[0.9] uppercase">REACH</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map(link => (
              link.type === 'view' ? (
                <button 
                  key={link.id} 
                  onClick={() => onNavigate(link.id as any)}
                  className={`editorial-label ${currentView === link.id ? 'text-brand-coral' : 'text-brand-navy/50'} hover:text-brand-coral transition-all flex items-center gap-2 group whitespace-nowrap`}
                >
                  <span className={`${currentView === link.id ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}>{link.icon}</span>
                  {link.name}
                </button>
              ) : (
                <a 
                  key={link.id} 
                  href={`#${link.id}`} 
                  onClick={(e) => {
                    if (currentView !== 'landing') {
                      e.preventDefault();
                      onNavigate('landing');
                      setTimeout(() => {
                        const el = document.getElementById(link.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className="editorial-label text-brand-navy/50 hover:text-brand-coral transition-all flex items-center gap-2 group whitespace-nowrap"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                  {link.name}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-4 px-4 py-1.5 bg-brand-navy/5 rounded-full border border-brand-navy/5">
              <button 
                onClick={() => setLanguage('en')}
                className={`editorial-label translation-all ${language === 'en' ? 'text-brand-coral font-bold' : 'text-brand-navy/30 hover:text-brand-navy'}`}
              >
                EN
              </button>
            <div className="w-px h-3 bg-brand-navy/10" />
            <button 
              onClick={() => setLanguage('ar')}
              className={`font-arabic text-[10px] transition-all leading-none ${language === 'ar' ? 'text-brand-coral font-bold' : 'text-brand-navy/30 hover:text-brand-navy'}`}
            >
              العربية
            </button>
          </div>

          <div className="h-4 w-px bg-brand-navy/10" />
          <button 
            onClick={() => onNavigate('tickets')}
            className="flex items-center gap-3 bg-brand-navy text-white px-8 py-3.5 rounded-full hover:bg-brand-coral transition-all duration-300 group"
          >
            <span className="editorial-label text-white tracking-[0.3em] font-medium">{t.nav.portal}</span>
            <ChevronRight size={14} className={`${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform shrink-0`} />
          </button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className={`px-3 py-1.5 rounded-lg border border-brand-navy/10 editorial-label ${language === 'ar' ? 'font-arabic text-[10px] leading-none' : ''} hover:bg-brand-navy/5 transition-colors`}
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-brand-navy bg-white/50 backdrop-blur-md rounded-xl transition-all active:scale-95 hover:bg-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="fixed inset-0 z-[45] lg:hidden bg-white pt-32 px-6 flex flex-col"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
          <div className={`flex flex-col gap-10 sm:gap-12 relative z-10 ${isRTL ? 'items-start' : 'items-start'}`}>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="w-full"
              >
                {link.type === 'view' ? (
                  <button 
                    onClick={() => { onNavigate(link.id as any); setIsMenuOpen(false); }}
                    className={`flex flex-col group w-full ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <span className="editorial-label text-brand-coral mb-2">0{i+1} // </span>
                    <span className={`font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter text-brand-navy group-hover:text-brand-coral transition-colors ${isRTL ? 'tracking-normal' : ''}`}>{link.name}</span>
                  </button>
                ) : (
                  <a 
                    href={`#${link.id}`} 
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (currentView !== 'landing') {
                        onNavigate('landing');
                        setTimeout(() => {
                          const el = document.getElementById(link.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className={`flex flex-col group w-full ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <span className="editorial-label text-brand-coral mb-2">0{i+1} // </span>
                    <span className={`font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter text-brand-navy group-hover:text-brand-coral transition-colors ${isRTL ? 'tracking-normal' : ''}`}>{link.name}</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-auto mb-10">
            <button 
              onClick={() => { onNavigate('tickets'); setIsMenuOpen(false); }}
              className={`w-full flex items-center justify-between bg-brand-navy text-white p-6 sm:p-8 rounded-[2rem] hover:bg-brand-coral transition-all`}
            >
              <span className="font-display font-bold text-xl sm:text-2xl uppercase tracking-widest">{t.nav.portal}</span>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white flex items-center justify-center rounded-full text-brand-navy shrink-0 transition-transform group-hover:scale-110">
                 <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
              </div>
            </button>
          </div>

          <div className="pixel-grid absolute inset-0 opacity-[0.05] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
