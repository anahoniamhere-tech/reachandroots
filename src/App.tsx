import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Ticket, ChevronRight, Check, Star, 
  MapPin, Calendar, ArrowRight, User, Settings,
  Sparkles, Coffee, Mic2, Palmtree, Utensils, Theater, PlayCircle,
  Loader2, Video, Play, Mic, Radio, Smartphone, Activity, 
  Grid, Award, Share2, MessageSquare, Zap, Waves, Signal, 
  Search, Users, Globe, Target, Clock, Filter, ExternalLink
} from 'lucide-react';
import { 
  TripoliHeritage, FayhaaFlow, DigitalCreativity, 
  ContentStorytelling, CommunityConnection, BrandLogo 
} from './components/BrandingIcons';
import { SanctuaryPage } from './components/SanctuaryPage';
import { SanctuaryApplyPage } from './components/SanctuaryApplyPage';
import { OurStory } from './components/OurStory';
import { TicketsPage } from './components/TicketsPage';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { 
  signInWithPopup, GoogleAuthProvider, 
  onAuthStateChanged, User as FirebaseUser 
} from 'firebase/auth';
import { TICKET_TIERS, EVENT_DAYS } from './constants';
import { TicketTier, EventDay, Order, BuyerInfo, VipDetails } from './types';
import { TicketService } from './services/ticketService';
import { AdminService } from './services/adminService';
import { PROGRAM_DATA, DayProgram, Session } from './constants/programData';
import { useLanguage } from './lib/LanguageContext';

// --- Components ---

const Navbar = ({ onNavigate, onOpenTickets, currentView }: { onNavigate: (v: 'landing' | 'finder' | 'tickets' | 'checkout' | 'success' | 'program' | 'sanctuary' | 'sanctuary-apply') => void, onOpenTickets: () => void, currentView: string }) => {
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
    { name: t.nav.program, id: 'program', icon: <Activity size={10} />, type: 'view' },
    { name: t.nav.sanctuary, id: 'sanctuary', icon: <Target size={10} />, type: 'view' },
  ];

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-warm-beige/95 backdrop-blur-xl border-brand-navy/10 py-4' : 'bg-transparent border-transparent py-8'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className={`flex items-center gap-4 sm:gap-6 cursor-pointer group`} onClick={() => { onNavigate('landing'); setIsMenuOpen(false); }}>
          <BrandLogo variant="yellow-header" className="h-14 sm:h-20 md:h-24 w-auto transition-all duration-500 group-hover:scale-105" />
        </div>
        
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex items-center gap-10">
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

const Hero = ({ onShopNow }: { onShopNow: () => void }) => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="relative min-h-[110vh] flex items-center justify-center pt-32 overflow-hidden bg-warm-beige">
      {/* Background Media Elements */}
      <div className={`absolute top-0 ${isRTL ? 'left-0 scale-x-[-1]' : 'right-0'} w-[60%] h-full opacity-[0.03] pointer-events-none`}>
        <TripoliHeritage className="w-full h-full text-brand-navy" />
      </div>

      <div className={`absolute top-[-10%] ${isRTL ? 'right-[-10%]' : 'left-[-10%]'} w-[50%] h-[70%] bg-brand-coral/5 soft-glow petal-shape rotate-45`} />
      <div className={`absolute bottom-[-10%] ${isRTL ? 'left-[-10%]' : 'right-[-10%]'} w-[40%] h-[60%] bg-brand-lavender/5 soft-glow petal-shape -rotate-12`} />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-40" />

      {/* Media Signals */}
      <div className={`absolute top-1/4 ${isRTL ? 'left-10' : 'right-10'} space-y-4 hidden xl:block`}>
        {[Zap, Signal, Waves].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 0.2, x: 0 }}
            transition={{ delay: i * 0.5, duration: 1 }}
            className="w-10 h-10 border border-brand-navy/10 rounded-full flex items-center justify-center text-brand-navy"
          >
            <Icon size={14} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-10 bg-brand-coral" />
              <span className="editorial-label text-brand-coral tracking-[0.5em] font-bold">
                {t.hero.tagline}
              </span>
              <div className="h-px w-10 bg-brand-coral" />
            </div>
            
            <div className="mb-10 w-full flex justify-center">
              <BrandLogo variant="transparent" className="w-full max-w-[640px] h-auto hover:scale-102 transition-transform duration-500" />
            </div>
            
            <p className="font-body text-xl md:text-2xl max-w-2xl mb-16 leading-tight text-brand-navy/60 font-medium tracking-tight text-center">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full sm:w-auto">
              <button 
                onClick={() => onShopNow()}
                className="w-full sm:w-auto group flex items-center justify-center gap-4 bg-brand-navy text-white px-10 py-5 rounded-full hover:bg-brand-coral transition-all duration-500 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="editorial-label text-white tracking-[0.4em] relative z-10">{t.hero.cta}</span>
                <ChevronRight size={16} className={`relative z-10 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
              </button>
              
              <div className="w-full sm:w-auto flex items-center justify-center gap-4 py-4 px-6 rounded-full border border-brand-navy/5 bg-warm-beige group cursor-pointer transition-all hover:border-brand-coral/20">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-navy group-hover:bg-brand-coral group-hover:text-white transition-all shadow-sm">
                  <Play size={12} fill="currentColor" className={isRTL ? 'rotate-180' : ''} />
                </div>
                <span className="editorial-label opacity-40 group-hover:opacity-100 transition-opacity">{t.hero.narrative}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Selection Page ---

const ProgramPage = ({ onNavigate }: { onNavigate: (v: 'landing' | 'finder' | 'tickets' | 'checkout' | 'success' | 'program' | 'sanctuary' | 'sanctuary-apply') => void }) => {
  const [activeDay, setActiveDay] = useState<'Friday' | 'Saturday' | 'Sunday'>('Friday');
  const [filterType, setFilterType] = useState<string | null>(null);
  const { t, isRTL } = useLanguage();

  const currentProgram = PROGRAM_DATA.find(d => d.id === activeDay);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Panel': return <Users size={14} />;
      case 'TED Talk': return <Mic2 size={14} />;
      case 'Workshop': return <Zap size={14} />;
      case 'Live': return <PlayCircle size={14} />;
      case 'Break': return <Coffee size={14} />;
      case 'Opening': return <Activity size={14} />;
      case 'Closing': return <Award size={14} />;
      case 'Networking': return <Share2 size={14} />;
      default: return <Activity size={14} />;
    }
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case 'Panel': return 'bg-brand-coral text-white';
      case 'TED Talk': return 'bg-brand-navy text-white';
      case 'Workshop': return 'bg-brand-gold text-brand-navy';
      case 'Live': return 'bg-brand-sky text-brand-navy';
      case 'Break': return 'bg-warm-beige text-brand-navy/40';
      default: return 'bg-brand-navy text-white';
    }
  };

  return (
    <div className="min-h-screen bg-warm-beige/35 backdrop-blur-3xl pt-32 pb-40" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Brand Banner */}
        <BrandLogo variant="banner" className="h-56 sm:h-72 md:h-96 lg:h-[420px] w-auto mb-20 hover:scale-105 transition-transform duration-500 pointer-events-none" />
        
        {/* Hero */}
        <div className="mb-24 w-full relative">
          <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[500px] h-[500px] bg-brand-coral/5 soft-glow petal-shape opacity-10`} />
          <div className={`flex flex-col md:flex-row justify-between items-end gap-12 relative z-10 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={`max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Activity size={16} className="text-brand-coral" />
                <span className="editorial-label text-brand-coral tracking-[0.5em] font-bold uppercase">{t.program.label}</span>
              </div>
              <h1 className="editorial-h1 lowercase tracking-tighter mb-8">
                {t.program.title.includes('.') ? (
                  <>
                    {t.program.title.split('.')[0]} <br /> <span className="text-brand-coral italic">{t.program.title.split('.')[1] || ''}</span>
                  </>
                ) : (
                  t.program.title
                )}
              </h1>
              <p className="font-body text-2xl md:text-3xl text-brand-navy/60 leading-tight max-w-2xl mb-6 text-balance">
                {t.program.description}
              </p>
              <p className="font-body text-sm text-brand-navy/40 uppercase tracking-widest mb-12">
                {t.program.note}
              </p>
              <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                 <button onClick={() => onNavigate('tickets')} className="px-8 py-3 bg-brand-navy text-white font-display font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-brand-coral transition-all">{t.program.cta1}</button>
                 <button onClick={() => {
                   onNavigate('landing');
                   setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
                 }} className="px-8 py-3 border border-brand-navy/10 text-brand-navy font-display font-bold text-[10px] uppercase tracking-widest rounded-xl hover:border-brand-coral transition-all">{t.program.cta2}</button>
              </div>
            </div>
            <div className={`hidden md:block ${isRTL ? 'text-left' : 'text-right'}`}>
              <p className="editorial-label text-brand-navy/20 uppercase tracking-[0.4em] mb-4 text-xs font-bold whitespace-nowrap">{t.program.location}</p>
              <p className="font-display font-bold text-xl md:text-2xl uppercase tracking-tighter text-brand-navy/40 leading-none">Rashid Karami <br /> Tripoli Pavilion</p>
            </div>
          </div>
        </div>

        {/* Day Nav - Sticky */}
        <div className="sticky top-20 md:top-24 z-40 mb-12 md:mb-20 px-2 sm:px-0">
          <div className="bg-white/80 backdrop-blur-xl border border-brand-navy/5 rounded-2xl md:rounded-3xl p-2 md:p-4 flex flex-col md:flex-row justify-between items-center shadow-2xl gap-4">
            <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar gap-1 sm:gap-2 p-1">
              {['Friday', 'Saturday', 'Sunday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day as any)}
                  className={`flex-1 md:flex-none px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-display font-bold text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all whitespace-nowrap ${activeDay === day ? 'bg-brand-navy text-white' : 'hover:bg-warm-beige text-brand-navy/40'}`}
                >
                  {isRTL ? (day === 'Friday' ? 'الجمعة' : day === 'Saturday' ? 'السبت' : 'الأحد') : day}
                </button>
              ))}
            </div>
            
            <div className="hidden sm:flex items-center gap-8 px-6">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-coral rounded-full animate-pulse" />
                  <span className="editorial-label text-[10px] text-brand-navy/40 font-bold uppercase tracking-widest">{t.program.liveSequence}</span>
               </div>
               <div className="h-6 w-px bg-brand-navy/10" />
               <div className="font-mono text-[10px] text-brand-navy/20 uppercase tracking-[0.3em]">
                  UTC+03:00 // TRL-DXB
               </div>
            </div>
          </div>
        </div>

        {/* Day Context Card */}
        {currentProgram && (
          <motion.div 
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-4 gap-8 mb-24"
          >
            <div className={`md:col-span-1 media-card p-10 bg-warm-beige/30 border-none flex flex-col justify-between ${isRTL ? 'items-end' : 'items-start'}`}>
               <div className={isRTL ? 'text-right' : 'text-left'}>
                  <span className="editorial-label text-brand-navy/30 mb-6 block uppercase font-bold tracking-[0.2em]">{t.program.theme}</span>
                  <h3 className="font-display font-bold text-3xl text-brand-navy uppercase tracking-tighter leading-[0.9]">{currentProgram.theme}</h3>
               </div>
               <div className={`mt-8 pt-8 border-t border-brand-navy/5 space-y-6 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div>
                    <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock size={12} className="text-brand-coral" />
                      <span className="editorial-label text-[9px] text-brand-navy uppercase font-bold">{t.program.opening}</span>
                    </div>
                    <p className="font-mono text-xl text-brand-navy">{currentProgram.opening}</p>
                  </div>
                  {currentProgram.programStarts && (
                    <div>
                      <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <PlayCircle size={12} className="text-brand-coral" />
                        <span className="editorial-label text-[9px] text-brand-navy uppercase font-bold">{t.program.begins}</span>
                      </div>
                      <p className="font-mono text-xl text-brand-navy">{currentProgram.programStarts}</p>
                    </div>
                  )}
               </div>
            </div>
            <div className={`md:col-span-3 media-card p-10 bg-white ring-1 ring-brand-navy/5 relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
               <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
               <div className="relative z-10">
                  <span className="editorial-label text-brand-navy/30 mb-6 block uppercase font-bold text-[9px] tracking-[0.2em]">{t.program.atmosphere}</span>
                  <p className="font-body text-4xl md:text-5xl text-brand-navy/80 tracking-tighter leading-tight italic font-medium mb-10 max-w-2xl">
                    "{currentProgram.atmosphere}"
                  </p>
                  <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {currentProgram.topics.map((topic, i) => (
                      <span key={i} className="px-4 py-1.5 bg-brand-navy/5 text-brand-navy/40 editorial-label uppercase tracking-widest rounded-full">{topic}</span>
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* Schedule */}
        <div className="space-y-6 relative">
          <div className={`absolute top-0 bottom-0 ${isRTL ? 'right-[2.25rem] md:right-[5.25rem]' : 'left-[2.25rem] md:left-[5.25rem]'} w-px bg-gradient-to-b from-brand-coral/40 via-brand-navy/10 to-transparent hidden md:block`} />
          
          {currentProgram?.sessions.map((session, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`relative grid md:grid-cols-12 gap-8 md:gap-16 items-start py-8 group transition-all duration-500 rounded-[2rem] hover:bg-warm-beige/20 px-4 -mx-4 ${session.featured ? 'bg-brand-coral/5 ring-1 ring-brand-coral/10' : ''}`}
            >
              <div className="md:col-span-2 relative z-10 md:pt-1">
                 <div className="flex items-center gap-4 mb-2 md:mb-0">
                    <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-coral md:hidden">
                       <Clock size={14} />
                    </div>
                    <div>
                      <span className="font-mono text-xs md:text-sm font-bold text-brand-navy whitespace-nowrap block lg:inline">{session.time.split(' – ')[0]}</span>
                      <span className="font-mono text-[9px] text-brand-navy/30 block lg:inline mx-2">{isRTL ? 'إلى' : '–'} {session.time.split(' – ')[1]}</span>
                    </div>
                 </div>
              </div>
              
              <div className="hidden md:block md:col-span-1 relative z-10 flex justify-center pt-2">
                 <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg z-20 transition-all duration-500 group-hover:scale-125 ${session.featured ? 'bg-brand-coral' : 'bg-brand-navy/20'}`} />
              </div>

              <div className="md:col-span-6 relative z-10">
                 <div className="flex items-center gap-4 mb-4">
                    <div className={`px-4 py-1 rounded-full editorial-label uppercase tracking-widest font-bold flex items-center gap-2 ${getTagColor(session.type)}`}>
                       {getIcon(session.type)}
                       {session.type}
                    </div>
                    {session.featured && (
                      <span className="editorial-label text-brand-coral font-bold flex items-center gap-1.5 animate-pulse">
                         <Star size={10} className="fill-brand-coral" />
                         {t.program.featured}
                      </span>
                    )}
                 </div>
                 
                 <div className="flex flex-col gap-2 mb-6">
                   <h4 className="font-display font-bold text-2xl md:text-3xl text-brand-navy uppercase tracking-tighter leading-none group-hover:text-brand-coral transition-colors">
                     {(isRTL && session.arabicTitle) ? session.arabicTitle : session.title}
                   </h4>
                   {session.arabicTitle && (
                     <p className="font-display font-medium text-lg text-brand-navy/40 italic" dir="rtl">{session.arabicTitle}</p>
                   )}
                 </div>

                 <div className="flex flex-wrap gap-6">
                    {session.speakers.map((speaker, j) => (
                      <div key={j} className="flex items-center gap-3 group/speaker">
                         <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy group-hover/speaker:bg-brand-navy group-hover/speaker:text-white transition-all">
                            <User size={14} />
                         </div>
                         <div>
                            <p className="font-display font-bold text-sm text-brand-navy leading-none mb-1">{speaker.name}</p>
                            {speaker.handle && (
                              <a 
                                href={speaker.link || `https://instagram.com/${speaker.handle.replace('@', '')}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="editorial-label text-brand-coral hover:underline flex items-center gap-1"
                              >
                                {speaker.handle}
                                <ExternalLink size={8} />
                              </a>
                            )}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className={`md:col-span-3 relative z-10 ${isRTL ? 'text-left' : 'text-right'} md:pt-1`}>
                 <div className="inline-flex items-center gap-3 px-6 py-2 bg-white ring-1 ring-brand-navy/5 rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                    <MapPin size={10} className="text-brand-navy/30" />
                    <span className="editorial-label text-brand-navy/60 font-medium uppercase tracking-[0.2em]">{session.stage}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Note */}
        <div className={`mt-32 p-12 bg-warm-beige/30 rounded-[3rem] border border-brand-navy/5 relative overflow-hidden ${isRTL ? 'text-right md:text-right' : 'text-center md:text-left'}`}>
           <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
           <p className="font-body text-brand-navy/40 text-sm max-w-3xl italic relative z-10">
             {t.program.disclaimer}
           </p>
        </div>
      </div>
    </div>
  );
};



export default function App() {
  const { t, isRTL } = useLanguage();
  const [view, setView] = useState<'landing' | 'finder' | 'tickets' | 'checkout' | 'success' | 'program' | 'sanctuary' | 'sanctuary-apply'>('landing');
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(window.location.hash === '#admin');
  const [user, setUser] = useState<FirebaseUser | null>(auth.currentUser);

  useEffect(() => {
    // Handle URL routing simulation
    const p = window.location.pathname;
    const isProgram = p.endsWith('/program') || p.includes('/program/');
    const isSanctuaryApply = p.endsWith('/sanctuary/apply');
    const isSanctuary = (p.endsWith('/sanctuary') || p.includes('/sanctuary/')) && !isSanctuaryApply;

    if (isProgram) setView('program');
    else if (isSanctuaryApply) setView('sanctuary-apply');
    else if (isSanctuary) setView('sanctuary');
    
    const unsubscribe = onAuthStateChanged(auth, setUser);
    const handleHash = () => setIsAdminMode(window.location.hash === '#admin');
    window.addEventListener('hashchange', handleHash);
    
    // Listen for pops
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.endsWith('/program')) setView('program');
      else if (path.endsWith('/sanctuary')) setView('sanctuary');
      else if (path.endsWith('/sanctuary/apply')) setView('sanctuary-apply');
      else setView('landing');
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Update URL on view change
  useEffect(() => {
    const prefix = '/preview';
    const path = window.location.pathname;
    
    if (view === 'program' && !path.endsWith('/program')) {
      window.history.pushState({}, '', `${prefix}/program`);
    } else if (view === 'sanctuary' && !path.endsWith('/sanctuary')) {
      window.history.pushState({}, '', `${prefix}/sanctuary`);
    } else if (view === 'sanctuary-apply' && !path.endsWith('/sanctuary/apply')) {
      window.history.pushState({}, '', `${prefix}/sanctuary/apply`);
    } else if (view === 'landing' && path !== prefix && !['program', 'sanctuary', 'sanctuary-apply'].includes(view)) {
      window.history.pushState({}, '', prefix);
    }
    window.scrollTo(0, 0);
  }, [view]);

  const [recommendedTier, setRecommendedTier] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [selectedDay, setSelectedDay] = useState<EventDay | 'all'>('Friday');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    fullName: '', email: '', phone: '', country: 'Lebanon', city: 'Tripoli', language: 'en'
  });
  const [vipDetails, setVipDetails] = useState<VipDetails>({
    dietaryPreference: 'Classic Selection', welcomeKitName: ''
  });

  // Load / Seed Data
  useEffect(() => {
    const init = async () => {
      try {
        const seeded = await AdminService.isSeeded();
        if (!seeded) {
          // Only attempt seeding if we are an admin or if we explicitly trigger it
          // For initial setup, we can't seed without auth anymore due to rules
          console.log("Database not seeded. Visit #admin to initialize.");
        }
      } catch (e) {
        console.warn("Seeding check failed - likely unauthenticated (Expected).");
      }
    };
    init();
  }, []);
  
  const handleTicketsComplete = async (data: { tier: TicketTier, day: EventDay | 'all', quantity: number, buyerInfo: BuyerInfo, vipDetails?: VipDetails }) => {
    setSelectedTier(data.tier);
    setSelectedDay(data.day);
    setBuyerInfo(data.buyerInfo);
    if (data.vipDetails) setVipDetails(data.vipDetails);
    setQuantity(data.quantity);
    
    setIsSubmitting(true);
    try {
      const id = await TicketService.placeOrder({
        tierId: data.tier.id,
        day: data.day,
        quantity: data.quantity,
        totalPrice: data.tier.price * data.quantity,
        buyerInfo: data.buyerInfo,
        vipDetails: data.vipDetails,
        userId: auth.currentUser?.uid,
      });
      setOrderId(id);
      setView('success');
    } catch (error: any) {
      alert(error.message || "Reservation failed. Please check inventory.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectTier = (tierId: string) => {
    const tier = TICKET_TIERS.find(t => t.id === tierId);
    if (tier) {
      setSelectedTier(tier);
      setSelectedDay(tier.duration === '3-day' ? 'all' : 'Friday');
      setView('checkout');
    }
  };

  const handleSubmitOrder = async () => {
    // Legacy function, no longer used as TicketsPage handles its own submission
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'font-arabic' : ''}`}>
      {isAdminMode ? (
        <AdminDashboard />
      ) : (
        <>
          <Navbar onNavigate={setView} onOpenTickets={() => setView('tickets')} currentView={view} />
          <main>
            {view === 'program' && <ProgramPage onNavigate={setView} />}
            {view === 'sanctuary' && (
              <SanctuaryPage 
                onNavigate={setView} 
                onApply={() => setView('sanctuary-apply')} 
                onApplyWithTrack={(track) => { setSelectedTrack(track); setView('sanctuary-apply'); }} 
              />
            )}
            {view === 'sanctuary-apply' && (
              <SanctuaryApplyPage onBack={() => setView('sanctuary')} selectedTrack={selectedTrack} />
            )}
            {view === 'landing' && (
              <>
                <Hero onShopNow={() => setView('tickets')} />
                <OurStory onNavigate={setView} />
              </>
            )}

        {view === 'tickets' && (
          <TicketsPage 
            onComplete={handleTicketsComplete}
            onBack={() => setView('landing')}
          />
        )}
        
        {view === 'success' && selectedTier && (
          <section className="py-40 flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`absolute top-[10%] ${isRTL ? 'right-[-10%]' : 'left-[-10%]'} w-[500px] h-[500px] bg-brand-coral/5 soft-glow petal-shape rotate-45`} />
            <div className="absolute inset-0 pixel-grid opacity-30 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="max-w-[1200px] w-full relative z-10"
            >
              <div className="w-24 h-24 bg-brand-navy rounded-[2rem] flex items-center justify-center mx-auto mb-16 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-coral translate-y-full animate-progress-fill" />
                <Check size={40} className="text-white relative z-10" />
              </div>
              
              <div className="flex flex-col items-center gap-4 mb-24">
                <span className="editorial-label text-brand-coral block tracking-[0.5em] uppercase font-bold">{t.common.authenticated}</span>
                <h2 className="editorial-h1 lowercase tracking-tighter">{t.common.welcome.split(' ')[0]} <span className="text-brand-coral italic">{t.common.welcome.split(' ').slice(1).join(' ')}</span></h2>
              </div>
              
              <div className={`media-card p-12 md:p-20 relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'} mb-20 bg-warm-beige/30 border-brand-navy/5`}>
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-navy" />
                <div className="absolute inset-0 pixel-grid opacity-[0.03] pointer-events-none" />
                
                <div className="flex flex-col lg:flex-row justify-between items-start gap-24 relative z-10">
                  <div className="space-y-16 flex-1">
                    <div className="grid md:grid-cols-2 gap-16">
                      <div className="space-y-4">
                        <span className="editorial-label text-brand-navy/30 uppercase font-bold text-[9px]">{t.common.verifiedGuest}</span>
                        <p className="font-display font-bold text-4xl uppercase tracking-tighter text-brand-navy leading-none">{buyerInfo.fullName}</p>
                      </div>
                      <div className="space-y-4">
                        <span className="editorial-label text-brand-navy/30 uppercase font-bold text-[9px]">{t.common.sanctuaryTier}</span>
                        <p className="font-display font-bold text-4xl uppercase tracking-tighter text-brand-coral leading-none">{selectedTier.name}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                      <div className="space-y-4">
                        <span className="editorial-label text-brand-navy/30 uppercase font-bold text-[9px]">{t.common.timeframe}</span>
                        <p className="font-display font-bold text-xl uppercase tracking-tighter text-brand-navy/60 leading-tight">
                          {selectedDay === 'all' ? (isRTL ? 'دورة كاملة ٣ أيام' : 'FULL 3-DAY CYCLE') : `${selectedDay} ${isRTL ? 'توجيه' : 'ORIENTATION'}`} <br />
                          <span className="text-[11px] opacity-40 uppercase tracking-[0.3em] font-mono">July 10 — 12, 2026</span>
                        </p>
                      </div>
                      <div className="space-y-4">
                        <span className="editorial-label text-brand-navy/30 uppercase font-bold text-[9px]">{t.common.systemId}</span>
                        <p className="font-mono text-[9px] tracking-[0.4em] text-brand-navy/40 uppercase">{orderId?.substring(0, 16).toUpperCase() || 'RR-PROTO-2026'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex flex-col items-center bg-white p-10 rounded-[3rem] shadow-xl border border-brand-navy/5">
                    <div className="w-48 h-48 bg-white p-4 relative overflow-hidden">
                      <div className="absolute inset-0 pixel-grid opacity-[0.05]" />
                      <div className="w-full h-full flex items-center justify-center bg-brand-navy/5 rounded-2xl relative">
                        <Smartphone size={40} className="text-brand-navy/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-12 h-12 border-2 border-brand-coral rounded-full animate-ping opacity-20" />
                        </div>
                      </div>
                    </div>
                    <span className="editorial-label mt-8 tracking-[0.3em] uppercase opacity-40">{t.common.digitalNode}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button className="px-12 py-5 bg-brand-navy text-white font-display font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-coral transition-all duration-700 shadow-2xl">
                  {t.common.launchMap}
                </button>
                <button 
                  onClick={() => setView('landing')}
                  className="px-12 py-5 border border-brand-navy/10 text-brand-navy/40 font-display font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all hover:text-brand-navy"
                >
                   {t.common.returnArchive}
                </button>
              </div>
            </motion.div>
          </section>
        )}
      </main>

      <footer className="py-20 sm:py-40 bg-warm-beige border-t border-brand-navy/5 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[500px] h-[500px] bg-brand-coral/5 soft-glow petal-shape`} />
        
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 sm:gap-20 mb-20 sm:mb-32 items-start">
            <div className="lg:col-span-5">
              <div className={`flex items-center gap-4 sm:gap-6 mb-6 sm:mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <BrandLogo className="w-12 h-12 sm:w-16 sm:h-16" />
                <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                  <span className="font-display text-xl sm:text-3xl tracking-tighter uppercase font-bold leading-none">Roots & Reach</span>
            <span className="editorial-label text-[8px] sm:text-[11px] text-brand-coral tracking-[0.5em] mt-1">{t.nav.edition}</span>
                </div>
              </div>
              <p className={`font-body text-base sm:text-xl text-brand-navy/40 leading-relaxed max-w-sm mb-8 sm:mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t.footer.tagline}
              </p>
              <div className={`flex flex-wrap gap-4 sm:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                 {[
                   { name: t.footer.social.instagram, id: 'instagram' },
                   { name: t.footer.social.linkedin, id: 'linkedin' },
                   { name: t.footer.social.vimeo, id: 'vimeo' }
                 ].map(social => (
                   <a key={social.id} href="#" className="editorial-label text-brand-navy/40 hover:text-brand-coral transition-colors tracking-widest uppercase font-bold">{social.name}</a>
                 ))}
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-16">
              <div className="min-w-0">
                <span className="editorial-label text-brand-coral mb-4 sm:mb-8 block uppercase font-bold tracking-[0.4em]">{t.footer.narrative}</span>
                <ul className="space-y-3 sm:space-y-4">
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setView('landing'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-display font-bold text-sm sm:text-lg text-brand-navy/50 hover:text-brand-navy transition-colors uppercase tracking-tight block truncate sm:whitespace-normal">{t.footer.story}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setView('tickets'); }} className="font-display font-bold text-sm sm:text-lg text-brand-navy/50 hover:text-brand-navy transition-colors uppercase tracking-tight block truncate sm:whitespace-normal">{t.footer.access}</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setView('sanctuary'); }} className="font-display font-bold text-sm sm:text-lg text-brand-navy/50 hover:text-brand-navy transition-colors uppercase tracking-tight block truncate sm:whitespace-normal">{t.footer.sanctuary}</a></li>
                </ul>
              </div>
              <div className="min-w-0">
                <span className="editorial-label text-brand-coral mb-4 sm:mb-8 block uppercase font-bold tracking-[0.4em]">{t.footer.protocols}</span>
                <p className="font-display font-bold text-sm sm:text-lg text-brand-navy/60 mb-2 uppercase tracking-tight break-all sm:break-words">contact@rootsandreach.org</p>
                <p className="font-display font-bold text-sm sm:text-lg text-brand-navy/60 uppercase tracking-tight">{isRTL ? 'طرابلس، لبنان' : 'Tripoli, Lebanon'}</p>
              </div>
              <div className="xs:col-span-2 md:col-span-1">
                <span className="editorial-label text-brand-coral mb-4 sm:mb-8 block uppercase font-bold tracking-[0.4em]">{t.footer.registry}</span>
                <p className="font-body text-[10px] sm:text-sm text-brand-navy/30 leading-relaxed">{isRTL ? 'نسخة الفيحاء — ٢٠٢٦.' : 'Fayhaa Edition — 2026.'} <br className="hidden sm:block" /> {t.footer.rights}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-12 sm:pt-20 border-t border-brand-navy/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
             <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-brand-navy/20">
                <span>Privacy Manifesto</span>
                <span>Entry Terms</span>
                <span>Accessibility</span>
             </div>
             <span className="font-mono text-[8px] sm:text-[9px] opacity-20 tracking-widest text-brand-navy uppercase text-center">ARCH-PRV: RR-26-FAYHAA</span>
          </div>
        </div>
      </footer>
        </>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, tiers: [] as any[] });
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        const ordersSnap = await getDocs(collection(db, 'orders'));
        const tiersSnap = await getDocs(collection(db, 'ticketTiers'));
        
        const orders = ordersSnap.docs.map(d => d.data() as Order);
        const tiers = tiersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        
        const revenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
        
        setStats({ orders: orders.length, revenue, tiers });
      } catch (e) {
        console.error("Failed to load admin stats", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, [user]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-brand-coral" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <Settings className="text-brand-coral" size={32} />
          </div>
          <h2 className="font-display font-bold text-4xl text-brand-navy mb-4 uppercase tracking-tighter">Admin Access</h2>
          <p className="font-body text-brand-navy/40 mb-10">Verification required to access the logistics command interface.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-5 bg-brand-navy text-white font-display font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-coral transition-all shadow-2xl"
          >
            Authenticate with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-20 max-w-[1600px] mx-auto bg-white min-h-screen relative overflow-hidden">
      <div className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] bg-brand-coral/5 soft-glow petal-shape opacity-10" />
      <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 relative z-10 gap-12">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Signal size={16} className="text-brand-coral" />
            <span className="editorial-label text-brand-coral tracking-[0.5em] uppercase font-bold">Logistics Command</span>
          </div>
          <h1 className="editorial-h1 lowercase tracking-tighter">System <br /> <span className="text-brand-coral italic">Interface.</span></h1>
        </div>
        <button onClick={() => window.location.hash = ''} className="px-10 py-5 bg-brand-navy text-white font-display font-bold text-xs uppercase tracking-widest transition-all hover:bg-brand-coral shadow-2xl rounded-xl">
          Public Gateway
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-32 relative z-10">
        <div className="media-card p-12 bg-warm-beige/30 border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 pixel-grid w-24 h-24 opacity-20" />
          <span className="editorial-label text-brand-navy/30 mb-8 block uppercase font-bold tracking-[0.2em]">Live Transmissions</span>
          <p className="text-7xl font-display font-bold tracking-tighter text-brand-navy">{stats.orders}</p>
          <div className="mt-8 flex items-center gap-3 text-brand-coral font-mono text-[8px] uppercase tracking-widest font-bold">
             <div className="w-2 h-2 bg-brand-coral rounded-full animate-pulse" />
             Active Stream
          </div>
        </div>
        <div className="media-card p-12 bg-white ring-1 ring-brand-navy/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 pixel-grid w-24 h-24 opacity-20" />
          <span className="editorial-label text-brand-navy/30 mb-8 block uppercase font-bold tracking-[0.2em]">Curation Revenue</span>
          <p className="text-7xl font-display font-bold tracking-tighter text-brand-coral">${stats.revenue}</p>
          <span className="mt-8 block font-mono text-[8px] text-brand-navy/20 uppercase tracking-[0.4em]">Protocol: USD</span>
        </div>
        <div className="media-card p-12 bg-brand-navy text-white relative overflow-hidden group border-none">
          <div className="absolute inset-0 pixel-grid opacity-10" />
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-gold/20 soft-glow petal-shape" />
          <span className="editorial-label text-brand-gold mb-8 block uppercase font-bold tracking-[0.2em]">Security Status</span>
          <p className="text-7xl font-display font-bold tracking-tighter uppercase leading-none mb-4">Secured</p>
          <p className="font-body text-white/40 text-sm uppercase tracking-widest">Rashid Karami Creator Pass</p>
        </div>
      </div>

      <div className="space-y-12 relative z-10 mb-32">
        <div className="flex items-center gap-6 border-b border-brand-navy/5 pb-8">
           <span className="editorial-label text-brand-coral font-bold italic">01 //</span>
           <h2 className="editorial-label text-brand-navy/30 tracking-[0.4em] uppercase font-bold text-[10px]">Registry Monitoring</h2>
        </div>
        <div className="grid gap-6">
          {stats.tiers.sort((a,b) => a.sortOrder - b.sortOrder).map(tier => (
            <div key={tier.id} className="p-8 bg-white border border-brand-navy/5 rounded-[2rem] flex flex-col md:flex-row justify-between items-center group hover:shadow-2xl transition-all duration-700">
              <div className="mb-8 md:mb-0">
                <h3 className="font-display font-bold text-3xl text-brand-navy mb-2 uppercase tracking-tighter group-hover:text-brand-coral transition-colors">{tier.name}</h3>
                <div className="flex items-center gap-6">
                  <span className="editorial-label text-brand-navy/30 uppercase font-bold tracking-[0.2em]">{tier.duration} Access</span>
                  <div className="h-4 w-[1px] bg-brand-navy/5" />
                  <span className="editorial-label text-brand-navy/30 uppercase font-bold tracking-[0.2em]">ID: {tier.wristband}</span>
                </div>
              </div>
              <div className="flex gap-16 text-center items-center">
                <div className="space-y-1">
                  <span className="editorial-label text-brand-navy/20 uppercase font-bold tracking-widest text-center block">Manifested</span>
                  <span className="font-mono text-2xl text-brand-navy">{tier.soldCount}</span>
                </div>
                <div className="h-12 w-[1px] bg-brand-navy/5" />
                <div className="space-y-1">
                  <span className="editorial-label text-brand-navy/20 uppercase font-bold tracking-widest text-center block">Max Capacity</span>
                  <span className="font-mono text-2xl text-brand-navy/30">{tier.capacity}</span>
                </div>
                <div className="h-12 w-[1px] bg-brand-navy/5" />
                <div className="min-w-[120px] space-y-1">
                  <span className="editorial-label text-brand-navy/20 uppercase font-bold tracking-widest text-center block">Saturation</span>
                  <span className="font-display font-bold text-3xl text-brand-coral">{Math.round((tier.soldCount / tier.capacity) * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="media-card rounded-[3rem] p-16 md:p-24 flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden bg-warm-beige/30 border-none">
         <div className="absolute inset-0 pixel-grid opacity-[0.05]" />
         <div className="relative z-10 max-w-lg text-center md:text-left">
            <h4 className="editorial-h2 mb-4">Environment Reset</h4>
            <p className="font-body text-brand-navy/40 text-lg leading-snug">Initialize the database architecture with original seed configuration. All records will be synchronized.</p>
         </div>
         <button 
           onClick={() => AdminService.seedDatabase()}
           className="relative z-10 px-12 py-5 bg-brand-navy text-white font-display font-bold text-xs uppercase tracking-widest transition-all duration-700 hover:bg-brand-coral shadow-2xl rounded-xl"
         >
           Execute Protocol
         </button>
      </div>
    </div>
  );
};
