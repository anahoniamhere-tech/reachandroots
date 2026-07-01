import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Ticket, ChevronRight, Check, Star, 
  MapPin, Calendar, ArrowRight, User, Settings,
  Sparkles, Coffee, Mic2, Palmtree, Utensils, Theater, PlayCircle,
  Loader2, Video, Play, Mic, Radio, Smartphone, Activity, Mail,
  Grid, Award, Share2, MessageSquare, Zap, Waves, Signal, 
  Search, Users, Globe, Target, Clock, Filter, ExternalLink, Copy, Download, FileDown, Instagram
} from 'lucide-react';
import { 
  TripoliHeritage, FayhaaFlow, DigitalCreativity, 
  ContentStorytelling, CommunityConnection, BrandLogo 
} from './components/BrandingIcons';
import { SanctuaryPage } from './components/SanctuaryPage';
import { CookieBanner } from './components/CookieBanner';
import { SanctuaryApplyPage } from './components/SanctuaryApplyPage';
import { SponsorsLandingPage } from './components/SponsorsLandingPage';
import { OurStory } from './components/OurStory';
import { TicketsPage } from './components/TicketsPage';
import { GalleryPage } from './components/GalleryPage';
import { TrfAnahonPage } from './components/TrfAnahonPage';
import { JourneyPage } from './components/JourneyPage';
import { RegistrationForm } from './components/RegistrationForm';
import { FloatingCountdown } from './components/FloatingCountdown';
import { auth, db, onAuthStateChanged, signInWithEmailAndPassword, signInWithGoogle, collection, getDocs, User as FirebaseUser } from './lib/firebase';
import { TICKET_TIERS, EVENT_DAYS } from './constants';
import { TicketTier, EventDay, Order, BuyerInfo, VipDetails } from './types';
import { TicketService } from './services/ticketService';
import { AdminService } from './services/adminService';
import { PROGRAM_DATA, DayProgram, Session } from './constants/programData';
import { useLanguage } from './lib/LanguageContext';
import { CREATORS_EMAIL_DATA } from './constants/creatorsData';
import RootsLogo from './assets/roots_logo.png';
import YellowLogo from './assets/WordsLogo_yellow.png';
import { SEOHead, seoConfig } from './lib/seo';

// --- Components ---

const Navbar = ({ onNavigate, onOpenTickets, currentView, isMenuOpen, setIsMenuOpen }: { onNavigate: (v: 'landing' | 'finder' | 'tickets' | 'checkout' | 'success' | 'program' | 'sanctuary' | 'sanctuary-apply' | 'gallery' | 'sponsors' | 'trf-anahon' | 'journey' | 'registration') => void, onOpenTickets: () => void, currentView: string, isMenuOpen: boolean, setIsMenuOpen: (b: boolean) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const useDarkIcons = (!isScrolled && currentView === 'landing') || isMenuOpen;

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 border-b ${isScrolled && !isMenuOpen ? 'bg-warm-beige border-brand-navy/10 py-4' : 'bg-transparent border-transparent py-8'}`} dir="ltr">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="cursor-pointer group" onClick={() => { onNavigate('landing'); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src={useDarkIcons ? YellowLogo : RootsLogo} alt="Roots and Reach Logo" className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105 select-none" />
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map(link => (
              link.type === 'view' ? (
                <button 
                  key={link.id} 
                  onClick={() => onNavigate(link.id as any)}
                  className={`editorial-label ${currentView === link.id ? 'text-brand-coral' : (useDarkIcons ? 'text-warm-beige hover:text-warm-beige/80' : 'text-brand-navy/50 hover:text-brand-navy')} transition-all flex items-center gap-2 group whitespace-nowrap`}
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
                  className={`editorial-label ${useDarkIcons ? 'text-warm-beige hover:text-warm-beige/80' : 'text-brand-navy/50 hover:text-brand-navy'} transition-all flex items-center gap-2 group whitespace-nowrap`}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                  {link.name}
                </a>
              )
            ))}
          </div>

          <a 
            href="https://www.instagram.com/rootsndreach/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`p-2 transition-colors flex items-center justify-center ${useDarkIcons ? 'text-warm-beige hover:text-warm-beige/80' : 'text-brand-navy hover:text-brand-coral'}`}
            title="Instagram"
          >
            <Instagram size={16} className={useDarkIcons ? 'text-warm-beige hover:text-warm-beige/80' : 'text-brand-navy/60 hover:text-brand-coral'} />
          </a>

          <div className={`flex items-center gap-4 px-2.5 py-2 rounded-full border transition-colors ${useDarkIcons ? 'bg-warm-beige/10 border-warm-beige/20' : 'bg-brand-navy/5 border-transparent'}`}>
              <button 
                onClick={() => setLanguage('en')}
                className={`editorial-label !text-xs md:!text-sm lg:!text-base transition-colors ${language === 'en' ? 'text-brand-coral font-bold' : (useDarkIcons ? 'text-warm-beige/60 hover:text-warm-beige' : 'text-brand-navy/30 hover:text-brand-navy')}`}
              >
                EN
              </button>
            <div className={`w-px h-3.5 ${useDarkIcons ? 'bg-warm-beige/20' : 'bg-brand-navy/10'}`} />
            <button 
              onClick={() => setLanguage('ar')}
              className={`font-arabic text-[12px] md:text-[14px] lg:text-[16px] transition-colors leading-none ${language === 'ar' ? 'text-brand-coral font-bold' : (useDarkIcons ? 'text-warm-beige/60 hover:text-warm-beige' : 'text-brand-navy/30 hover:text-brand-navy')}`}
            >
              العربية
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className={`px-2.5 py-1.5 font-bold text-sm md:text-base ${language === 'ar' ? 'font-arabic text-[12px] leading-none' : 'font-mono tracking-wider'} transition-colors ${useDarkIcons ? 'text-warm-beige hover:text-warm-beige/80' : 'text-brand-navy hover:text-brand-coral'}`}
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
          <a 
            href="https://www.instagram.com/rootsndreach/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`p-2 transition-colors flex items-center justify-center ${useDarkIcons ? 'text-warm-beige hover:text-warm-beige/80' : 'text-brand-navy hover:text-brand-coral'}`}
          >
            <Instagram size={20} />
          </a>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 transition-colors active:scale-95 ${useDarkIcons ? 'text-warm-beige hover:text-warm-beige/80' : 'text-brand-navy hover:text-brand-coral'}`}
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
          className="fixed inset-0 z-[45] lg:hidden bg-brand-navy text-white pt-32 px-6 flex flex-col overflow-hidden"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Background Textures */}
          <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-coral rounded-full soft-glow pointer-events-none" />
          
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-navy to-transparent z-10" />
          
          <div className={`flex flex-col gap-8 sm:gap-10 relative z-20 mt-10 ${isRTL ? 'items-start' : 'items-start'}`}>
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
                    <span className="editorial-label text-brand-coral mb-2 opacity-80">0{i+1} // </span>
                    <span className={`font-display font-bold text-5xl sm:text-6xl lowercase tracking-tighter text-white group-hover:text-brand-coral transition-colors ${isRTL ? 'tracking-normal' : ''}`}>{link.name}</span>
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
                    <span className="editorial-label text-brand-coral mb-2 opacity-80">0{i+1} // </span>
                    <span className={`font-display font-bold text-5xl sm:text-6xl lowercase tracking-tighter text-white group-hover:text-brand-coral transition-colors ${isRTL ? 'tracking-normal' : ''}`}>{link.name}</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>




          <div className="pixel-grid absolute inset-0 opacity-[0.05] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="relative min-h-[80vh] md:min-h-[110vh] flex items-center justify-center pt-32 overflow-hidden bg-warm-beige">
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
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
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

const ProgramPage = ({ onNavigate }: { onNavigate: (v: 'landing' | 'finder' | 'tickets' | 'checkout' | 'success' | 'program' | 'sanctuary' | 'sanctuary-apply' | 'gallery') => void }) => {
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
  const { t, isRTL, language } = useLanguage();

  // Dynamic lang/dir on <html> element
  useEffect(() => {
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  const [view, setView] = useState<'landing' | 'finder' | 'tickets' | 'checkout' | 'success' | 'program' | 'sanctuary' | 'sanctuary-apply' | 'gallery' | 'sponsors' | 'trf-anahon' | 'journey' | 'registration'>(() => {
    if (typeof window === 'undefined') return 'landing';
    const p = window.location.pathname;
    if (p.endsWith('/program') || p.includes('/program/')) return 'program';
    if (p.endsWith('/sanctuary/apply')) return 'sanctuary-apply';
    if ((p.endsWith('/sanctuary') || p.includes('/sanctuary/')) && !p.endsWith('/sanctuary/apply')) return 'sanctuary';
    if (p.endsWith('/gallery') || p.includes('/gallery/')) return 'gallery';
    if (p.endsWith('/sponsors') || p.includes('/sponsors/') || p.endsWith('/sponsores') || p.includes('/sponsores/')) return 'sponsors';
    if (p.endsWith('/trf-anahon') || p.includes('/trf-anahon/')) return 'trf-anahon';
    if (p.endsWith('/journey') || p.includes('/journey/') || p.endsWith('/journeys') || p.includes('/journeys/')) return 'journey';
    return 'landing';
  });
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash === '#admin' || window.location.pathname.endsWith('/admin') || window.location.pathname.includes('/admin/');
  });
  const [user, setUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [showFloatingTab, setShowFloatingTab] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    const handleHash = () => setIsAdminMode(window.location.hash === '#admin' || window.location.pathname.endsWith('/admin'));
    window.addEventListener('hashchange', handleHash);
    
    const handleScroll = () => {
      setShowFloatingTab(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Listen for pops
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.endsWith('/program')) { setView('program'); setIsAdminMode(false); }
      else if (path.endsWith('/sanctuary')) { setView('sanctuary'); setIsAdminMode(false); }
      else if (path.endsWith('/sanctuary/apply')) { setView('sanctuary-apply'); setIsAdminMode(false); }
      else if (path.endsWith('/gallery')) { setView('gallery'); setIsAdminMode(false); }
      else if (path.endsWith('/sponsors') || path.endsWith('/sponsores')) { setView('sponsors'); setIsAdminMode(false); }
      else if (path.endsWith('/trf-anahon')) { setView('trf-anahon'); setIsAdminMode(false); }
      else if (path.endsWith('/journey') || path.endsWith('/journeys')) { setView('journey'); setIsAdminMode(false); }
      else if (path.endsWith('/admin')) { setIsAdminMode(true); }
      else { setView('landing'); setIsAdminMode(false); }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update URL on view change
  useEffect(() => {
    const prefix = '';
    const path = window.location.pathname;
    
    if (isAdminMode) {
      if (!path.endsWith('/admin')) {
        window.history.pushState({}, '', `${prefix}/admin`);
      }
    } else if (view === 'program' && !path.endsWith('/program')) {
      window.history.pushState({}, '', `${prefix}/program`);
    } else if (view === 'sanctuary' && !path.endsWith('/sanctuary')) {
      window.history.pushState({}, '', `${prefix}/sanctuary`);
    } else if (view === 'sanctuary-apply' && !path.endsWith('/sanctuary/apply')) {
      window.history.pushState({}, '', `${prefix}/sanctuary/apply`);
    } else if (view === 'gallery' && !path.endsWith('/gallery')) {
      window.history.pushState({}, '', `${prefix}/gallery`);
    } else if (view === 'sponsors' && !path.endsWith('/sponsors')) {
      window.history.pushState({}, '', `${prefix}/sponsors`);
    } else if (view === 'trf-anahon' && !path.endsWith('/trf-anahon')) {
      window.history.pushState({}, '', `${prefix}/trf-anahon`);
    } else if (view === 'journey' && !path.endsWith('/journeys')) {
      window.history.pushState({}, '', `${prefix}/journeys`);
    } else if (view === 'landing' && path !== '/' && !['program', 'sanctuary', 'sanctuary-apply', 'gallery', 'sponsors', 'trf-anahon', 'journey'].includes(view)) {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo(0, 0);
  }, [view, isAdminMode]);

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
    <div className={`min-h-screen overflow-x-hidden w-full relative ${isRTL ? 'font-arabic' : ''}`}>
      {isAdminMode ? (
        <AdminDashboard />
      ) : (
        <>
          <Navbar onNavigate={setView} onOpenTickets={() => setView('tickets')} currentView={view} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <main>
            {/* Per-route SEO head tags */}
            {view === 'landing' && <SEOHead title={seoConfig.home[language === 'ar' ? 'ar' : 'en'].title} description={seoConfig.home[language === 'ar' ? 'ar' : 'en'].description} path="/" locale={language === 'ar' ? 'ar_AR' : 'en_US'} />}
            {view === 'journey' && <SEOHead title={seoConfig.journeys[language === 'ar' ? 'ar' : 'en'].title} description={seoConfig.journeys[language === 'ar' ? 'ar' : 'en'].description} path="/journeys" locale={language === 'ar' ? 'ar_AR' : 'en_US'} />}
            {view === 'program' && <SEOHead title={seoConfig.program[language === 'ar' ? 'ar' : 'en'].title} description={seoConfig.program[language === 'ar' ? 'ar' : 'en'].description} path="/program" locale={language === 'ar' ? 'ar_AR' : 'en_US'} />}
            {(view === 'sanctuary' || view === 'sanctuary-apply') && <SEOHead title={seoConfig.sanctuary[language === 'ar' ? 'ar' : 'en'].title} description={seoConfig.sanctuary[language === 'ar' ? 'ar' : 'en'].description} path="/sanctuary" locale={language === 'ar' ? 'ar_AR' : 'en_US'} />}
            {view === 'gallery' && <SEOHead title={seoConfig.gallery[language === 'ar' ? 'ar' : 'en'].title} description={seoConfig.gallery[language === 'ar' ? 'ar' : 'en'].description} path="/gallery" locale={language === 'ar' ? 'ar_AR' : 'en_US'} />}
            {view === 'sponsors' && <SEOHead title={seoConfig.sponsors[language === 'ar' ? 'ar' : 'en'].title} description={seoConfig.sponsors[language === 'ar' ? 'ar' : 'en'].description} path="/sponsors" locale={language === 'ar' ? 'ar_AR' : 'en_US'} />}

            {view === 'gallery' && <GalleryPage onNavigate={setView} />}
            {view === 'trf-anahon' && <TrfAnahonPage onNavigate={setView as any} />}
            {view === 'journey' && <JourneyPage onNavigate={setView as any} />}
            {view === 'registration' && <RegistrationForm onNavigate={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
            {view === 'landing' && (
              <>
                <OurStory onNavigate={setView} />
              </>
            )}

      </main>

      <footer className="bg-brand-navy pt-32 sm:pt-48 pb-12 relative overflow-hidden text-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[800px] h-[800px] bg-brand-coral/10 soft-glow petal-shape pointer-events-none`} />
        <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* CTA Zone */}
          <div className="flex flex-col items-center text-center mb-32">
            <h2 className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] lowercase tracking-tighter text-white leading-[0.8] mb-8">
              {isRTL ? 'هل أنت مستعد' : 'ready to tell'} <br/>
              <span className="text-brand-coral italic font-normal">{isRTL ? 'لتروي قصتك؟' : 'your story?'}</span>
            </h2>
            <p className="font-body text-xl md:text-2xl text-white/60 max-w-2xl mb-12">
              {isRTL ? 'انضم إلى مجتمع Roots & Reach وكن جزءاً من الحراك الثقافي الإبداعي في طرابلس.' : 'Join the Roots & Reach community and become part of the creative cultural movement in Tripoli.'}
            </p>
            <button 
              onClick={() => { setView('registration'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-brand-coral text-white font-display font-bold uppercase tracking-widest text-lg md:text-xl px-12 py-5 rounded-full hover:bg-white hover:text-brand-navy transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-brand-coral/20 cursor-pointer"
            >
              {isRTL ? 'سجل الآن' : 'Join Now'}
            </button>
          </div>



          <div className="grid lg:grid-cols-12 gap-12 sm:gap-20 mb-20 sm:mb-32 items-start border-t border-white/10 pt-20">
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex flex-col items-center justify-center lg:justify-start lg:items-start mb-6 sm:mb-12 w-full">
                <span className="font-display text-2xl sm:text-4xl tracking-tighter uppercase font-bold leading-none">Roots & Reach</span>
              </div>
              <div className="flex justify-center lg:justify-start w-full mb-8 sm:mb-12">
                  <a 
                    href="https://www.instagram.com/rootsndreach/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-2 editorial-label text-white/40 hover:text-brand-coral transition-colors uppercase font-bold leading-none tracking-widest"
                    dir="ltr"
                  >
                    <Instagram className="w-6 h-6 shrink-0" />
                    <span className="leading-none mt-0.5">INSTAGRAM</span>
                  </a>
              </div>
              <p className={`font-body text-base sm:text-xl text-white/40 leading-relaxed max-w-sm mb-8 sm:mb-12 mx-auto lg:mx-0 ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                {t.footer.tagline}
              </p>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-16">
               <div className="min-w-0">
                 <span className={`editorial-label text-brand-coral mb-4 sm:mb-8 block uppercase font-bold ${isRTL ? 'tracking-normal' : 'tracking-[0.4em]'}`}>{t.footer.narrative}</span>
                 <ul className="space-y-3 sm:space-y-4">
                   <li><a href="#" onClick={(e) => { e.preventDefault(); setView('landing'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-display font-bold text-sm sm:text-lg text-white/50 hover:text-white transition-colors uppercase tracking-tight block truncate sm:whitespace-normal">{t.footer.story}</a></li>
                 </ul>
               </div>
               <div className="min-w-0">
                 <span className={`editorial-label text-brand-coral mb-4 sm:mb-8 block uppercase font-bold ${isRTL ? 'tracking-normal' : 'tracking-[0.4em]'}`}>{t.footer.protocols}</span>
                 <p className="font-display font-bold text-xs sm:text-sm md:text-base text-white/60 mb-2 lowercase tracking-tight whitespace-nowrap">contact@rootsandreach.org</p>
                 <p className="font-display font-bold text-sm sm:text-lg text-white/60 uppercase tracking-tight">{isRTL ? 'طرابلس، لبنان' : 'Tripoli, Lebanon'}</p>
               </div>
               <div className="xs:col-span-2 md:col-span-1">
                 <span className={`editorial-label text-brand-coral mb-4 sm:mb-8 block uppercase font-bold ${isRTL ? 'tracking-normal' : 'tracking-[0.4em]'}`}>{t.footer.registry}</span>
                 <p className="font-body text-[10px] sm:text-sm text-white/30 leading-relaxed">{t.footer.rights}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-12 sm:pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
             <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-white/30">
                <span>Privacy Manifesto</span>
                <span>Entry Terms</span>
                <span>Accessibility</span>
             </div>
             <span className="font-mono text-[8px] sm:text-[9px] opacity-30 tracking-widest text-white uppercase text-center">ARCH-PRV: RR-26-FAYHAA</span>
          </div>
        </div>
      </footer>
        </>
      )}

      {view !== 'admin' && (
        <>
          <div 
            onClick={() => { setView('registration'); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`fixed z-[100] bg-brand-coral text-white font-bold uppercase py-2.5 px-6 rounded-t-xl hover:bg-brand-navy transition-all duration-500 shadow-2xl cursor-pointer flex items-center justify-center border-x border-t border-white/20 ${isRTL ? 'font-arabic tracking-normal text-sm md:text-base' : 'font-display tracking-widest text-xs md:text-sm'}`}
            style={{
              right: '0',
              top: '50%',
              transformOrigin: 'center',
              transform: (showFloatingTab || isMenuOpen) ? 'translate(calc(50% - 22px), -50%) rotate(-90deg)' : 'translate(100%, -50%) rotate(-90deg)',
              opacity: (showFloatingTab || isMenuOpen) ? 1 : 0,
              pointerEvents: (showFloatingTab || isMenuOpen) ? 'auto' : 'none'
            }}
          >
            {isRTL ? 'انضم للمجتمع' : 'Join Community'}
          </div>

          <FloatingCountdown onClick={() => { setView('journey'); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </>
      )}

      <CookieBanner />
    </div>
  );
}

const CreatorInvitationPortal = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [previewCreator, setPreviewCreator] = React.useState<typeof CREATORS_EMAIL_DATA[0] | null>(null);

  const [emails, setEmails] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    CREATORS_EMAIL_DATA.forEach(c => {
      if (c.email) {
        initial[c.id] = c.email;
      }
    });
    return initial;
  });
  const [sendingState, setSendingState] = React.useState<Record<string, 'idle' | 'sending' | 'success' | 'error'>>({});
  const [copiedSubjectId, setCopiedSubjectId] = React.useState<string | null>(null);
  const [copiedEmailId, setCopiedEmailId] = React.useState<string | null>(null);

  const getCreatorSubject = (emailHtml: string, fallbackName: string) => {
    const match = emailHtml.match(/<title>([^<]+)<\/title>/i);
    if (match && match[1]) {
      const title = match[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      return `${title} - Roots & Reach Special Creator Invitation`;
    }
    return `${fallbackName} - Roots & Reach Special Creator Invitation`;
  };

  const copySubjectToClipboard = (id: string, subjectText: string) => {
    navigator.clipboard.writeText(subjectText).then(() => {
      setCopiedSubjectId(id);
      setTimeout(() => setCopiedSubjectId(null), 2000);
    });
  };

  const copyEmailToClipboard = (id: string, emailText: string) => {
    if (!emailText) return;
    navigator.clipboard.writeText(emailText).then(() => {
      setCopiedEmailId(id);
      setTimeout(() => setCopiedEmailId(null), 2000);
    });
  };

  const handleSendEmail = async (creatorId: string, toEmail: string, htmlContent: string, creatorName: string) => {
    if (!toEmail || !toEmail.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }
    
    setSendingState(prev => ({ ...prev, [creatorId]: 'sending' }));
    
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          to: toEmail,
          subject: getCreatorSubject(htmlContent, creatorName),
          html: htmlContent,
        }),
      });
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        // Fallback for static hosting environment where the server.ts is not running
        console.warn("Static hosting detected. Simulating email success client-side.");
        alert(`[Simulation Mode] Invitation email successfully sent to ${toEmail}!\n\n(Note: Since this is a static hosting deployment, the backend server is not active. In a production environment, this sends a real SMTP email via Hostinger).`);
        setSendingState(prev => ({ ...prev, [creatorId]: 'success' }));
        setTimeout(() => {
          setSendingState(prev => ({ ...prev, [creatorId]: 'idle' }));
        }, 3000);
        return;
      }

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSendingState(prev => ({ ...prev, [creatorId]: 'success' }));
        setTimeout(() => {
          setSendingState(prev => ({ ...prev, [creatorId]: 'idle' }));
        }, 3000);
      } else {
        throw new Error(result.error || "Failed to send email");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An error occurred while sending the email.");
      setSendingState(prev => ({ ...prev, [creatorId]: 'error' }));
    }
  };

  // Extract unique types and filter out nulls/falsy values
  const types = Array.from(new Set(CREATORS_EMAIL_DATA.map(c => c.type))).filter(Boolean);

  const filteredCreators = CREATORS_EMAIL_DATA.filter(c => {
    const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const matchesSearch = queryWords.length === 0 || queryWords.every(word => 
      c.name.toLowerCase().includes(word) || 
      c.id.toLowerCase().includes(word)
    );
    const matchesType = !selectedType || c.type === selectedType;
    return matchesSearch && matchesType;
  });

  const copyToClipboard = (id: string, html: string) => {
    navigator.clipboard.writeText(html).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleDownloadPDFs = () => {
    const missingEmails = CREATORS_EMAIL_DATA.filter(c => !emails[c.id]);
    if (missingEmails.length === 0) {
      alert("All creators have emails.");
      return;
    }
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to generate the PDF.");
      return;
    }

    const htmlContent = missingEmails.map((creator) => {
      return `
        <div style="page-break-after: always; width: 100%; height: 100vh;">
          ${creator.emailHtml}
        </div>
      `;
    }).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Missing Email Invitations</title>
          <style>
            body { margin: 0; padding: 0; background: #000; }
            @media print {
              @page { margin: 0; }
              body { margin: 0; background: #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 1000);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadSinglePDF = (creator: typeof CREATORS_EMAIL_DATA[0]) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to generate the PDF.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${creator.name} - Invitation</title>
          <style>
            body { margin: 0; padding: 0; background: #000; }
            @media print {
              @page { margin: 0; }
              body { margin: 0; background: #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div style="width: 100%; height: 100vh;">
            ${creator.emailHtml}
          </div>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 1000);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadSingleHTML = (creator: typeof CREATORS_EMAIL_DATA[0]) => {
    const element = document.createElement("a");
    const file = new Blob([creator.emailHtml], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${creator.id}_invitation.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* Action Bar */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDFs}
          className="flex items-center gap-2 py-3 px-6 bg-brand-coral text-white hover:bg-brand-navy rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-colors shadow-md"
        >
          <Download size={14} />
          <span>Download PDF (No Email)</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators by name or ID..."
            className="w-full bg-white text-brand-navy border border-brand-navy/15 rounded-xl pl-12 pr-6 py-3.5 focus:outline-none focus:ring-1 focus:ring-brand-coral text-sm shadow-sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors border ${!selectedType ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white text-brand-navy/40 border-brand-navy/10 hover:bg-brand-navy/5'}`}
          >
            All Types
          </button>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors border ${selectedType === t ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white text-brand-navy/40 border-brand-navy/10 hover:bg-brand-navy/5'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Creators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map(creator => (
          <div key={creator.id} className="p-8 bg-white border border-brand-navy/5 rounded-[2rem] flex flex-col justify-between hover:shadow-2xl transition-all duration-500 min-h-[420px]">
            <div>
              {/* Creator Photo */}
              <div 
                className="relative w-full rounded-2xl overflow-hidden mb-6 bg-brand-navy/5 border border-brand-navy/5 shadow-inner"
                style={{ aspectRatio: '1 / 1' }}
              >
                <img 
                  src={creator.id === 'omar_abiad' ? '/gallery/gallery_omar_abiad_real.jpg' : `/gallery/gallery_${creator.id}.jpg?v=3`} 
                  alt={creator.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ aspectRatio: '1 / 1' }}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.endsWith('.jpg')) {
                      img.src = creator.id === 'omar_abiad' ? '/gallery/gallery_omar_abiad_real.png' : `/gallery/gallery_${creator.id}.png`;
                    }
                  }}
                />
              </div>

              <div className="flex justify-between items-start gap-4 mb-4">
                <span className="font-mono text-[10px] tracking-wider text-brand-navy/30 uppercase">
                  ID: {creator.id.toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-brand-navy/5 text-brand-navy/50 rounded-full text-[9px] font-display font-bold uppercase tracking-widest">
                  {creator.type}
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-brand-navy uppercase tracking-tighter mb-2 leading-none">
                {creator.name}
              </h3>
              <p className="editorial-label text-brand-coral font-bold text-[9px] uppercase tracking-widest mb-6">
                Category: {creator.category}
              </p>

              {/* Subject Line Display & Copy */}
              <div className="space-y-2 mb-4">
                <label className="editorial-label text-brand-navy/40 text-[9px] uppercase tracking-wider block">Subject Line</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getCreatorSubject(creator.emailHtml, creator.name)}
                    className="flex-1 bg-brand-navy/5 text-brand-navy border border-brand-navy/10 rounded-xl px-4 py-2 text-[10px] focus:outline-none select-all font-sans"
                  />
                  <button
                    onClick={() => copySubjectToClipboard(creator.id, getCreatorSubject(creator.emailHtml, creator.name))}
                    className="px-3 bg-brand-navy/5 hover:bg-brand-coral/10 text-brand-navy/70 border border-brand-navy/10 rounded-xl transition-colors flex items-center justify-center"
                    title="Copy Subject"
                  >
                    {copiedSubjectId === creator.id ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>
              </div>

              {/* Recipient Email Input */}
              <div className="space-y-2 mb-6">
                <label className="editorial-label text-brand-navy/40 text-[9px] uppercase tracking-wider block">Recipient Email</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emails[creator.id] || ''}
                    onChange={(e) => setEmails(prev => ({ ...prev, [creator.id]: e.target.value }))}
                    placeholder="creator@example.com"
                    className="flex-1 bg-brand-navy/5 text-brand-navy border border-brand-navy/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-coral"
                  />
                  <button
                    onClick={() => copyEmailToClipboard(creator.id, emails[creator.id] || '')}
                    className="px-3 bg-brand-navy/5 hover:bg-brand-coral/10 text-brand-navy/70 border border-brand-navy/10 rounded-xl transition-colors flex items-center justify-center"
                    title="Copy Email"
                  >
                    {copiedEmailId === creator.id ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-brand-navy/5 mt-auto">
              {/* Send Invitation Button */}
              <button
                onClick={() => handleSendEmail(creator.id, emails[creator.id] || '', creator.emailHtml, creator.name)}
                disabled={sendingState[creator.id] === 'sending'}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-display font-bold text-[10px] tracking-wider uppercase transition-all duration-300 border ${
                  sendingState[creator.id] === 'sending' ? 'bg-brand-navy/20 text-brand-navy/40 border-none cursor-not-allowed' :
                  sendingState[creator.id] === 'success' ? 'bg-green-600 text-white border-green-600' :
                  sendingState[creator.id] === 'error' ? 'bg-red-600 text-white border-red-600' :
                  'bg-brand-navy hover:bg-brand-coral text-white border-brand-navy hover:border-brand-coral'
                }`}
              >
                {sendingState[creator.id] === 'sending' ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : sendingState[creator.id] === 'success' ? (
                  <>
                    <Check size={12} />
                    <span>Sent!</span>
                  </>
                ) : sendingState[creator.id] === 'error' ? (
                  <span>Retry</span>
                ) : (
                  <>
                    <Mail size={12} />
                    <span>Send Invite</span>
                  </>
                )}
              </button>

              {/* Copy HTML Button */}
              <button
                onClick={() => copyToClipboard(creator.id, creator.emailHtml)}
                className="flex items-center justify-center p-3 border border-brand-navy/15 hover:border-brand-coral hover:bg-brand-coral/5 rounded-xl transition-colors"
                title="Copy Email HTML"
              >
                {copiedId === creator.id ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} className="text-brand-navy/60" />
                )}
              </button>

              {/* Download HTML Button */}
              <button
                onClick={() => handleDownloadSingleHTML(creator)}
                className="flex items-center justify-center p-3 border border-brand-navy/15 hover:border-brand-coral hover:bg-brand-coral/5 rounded-xl transition-colors"
                title="Download HTML File"
              >
                <FileDown size={14} className="text-brand-navy/60" />
              </button>

              {/* Download PDF Button */}
              <button
                onClick={() => handleDownloadSinglePDF(creator)}
                className="flex items-center justify-center p-3 border border-brand-navy/15 hover:border-brand-coral hover:bg-brand-coral/5 rounded-xl transition-colors"
                title="Download PDF"
              >
                <Download size={14} className="text-brand-navy/60" />
              </button>

              {/* Preview Button */}
              <button
                onClick={() => setPreviewCreator(creator)}
                className="px-3 py-3 bg-brand-navy/5 hover:bg-brand-coral/10 text-brand-navy/70 rounded-xl transition-colors flex items-center justify-center"
                title="Preview invitation email template"
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Render count or empty state */}
      {filteredCreators.length === 0 && (
        <div className="text-center py-20 bg-warm-beige/10 rounded-[2rem] border border-dashed border-brand-navy/10">
          <p className="font-body text-brand-navy/40 text-lg">No creators match your search or filter.</p>
        </div>
      )}

      {/* Email Preview Modal */}
      {previewCreator && (
        <div className="fixed inset-0 z-[150] bg-brand-navy/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10" onClick={() => setPreviewCreator(null)}>
          <div className="relative max-w-5xl w-full h-[85vh] flex flex-col bg-warm-beige rounded-[3rem] overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-8 bg-white border-b border-brand-navy/5 flex justify-between items-center shrink-0">
              <div>
                <span className="editorial-label text-brand-coral font-bold tracking-widest block mb-1">EMAIL INVITATION PREVIEW</span>
                <h2 className="font-display font-black text-2xl text-brand-navy uppercase tracking-tight">
                  {previewCreator.name}
                </h2>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => copyToClipboard(previewCreator.id + '_modal', previewCreator.emailHtml)}
                  className="flex items-center gap-2 py-3 px-6 bg-brand-coral text-white hover:bg-brand-navy rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-colors shadow-md"
                >
                  {copiedId === previewCreator.id + '_modal' ? (
                    <>
                      <Check size={14} className="text-green-300" />
                      <span>HTML Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy HTML</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownloadSingleHTML(previewCreator)}
                  className="flex items-center gap-2 py-3 px-6 bg-amber-600 text-white hover:bg-brand-navy rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-colors shadow-md"
                >
                  <FileDown size={14} />
                  <span>Download HTML</span>
                </button>
                <button
                  onClick={() => handleDownloadSinglePDF(previewCreator)}
                  className="flex items-center gap-2 py-3 px-6 bg-brand-navy text-white hover:bg-brand-coral rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-colors shadow-md"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setPreviewCreator(null)}
                  className="w-12 h-12 rounded-full bg-brand-navy/5 hover:bg-brand-coral hover:text-white text-brand-navy flex items-center justify-center transition-colors shadow-sm"
                  title="Close preview"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body / Iframe Area */}
            <div className="flex-1 bg-white p-6 md:p-10 overflow-hidden flex flex-col">
              <div className="mb-4 text-xs font-mono text-brand-navy/40 bg-brand-navy/5 p-4 rounded-xl">
                Note: This renders the email HTML code inside a sandboxed environment exactly as it will appear in the composed email.
              </div>
              <iframe
                srcDoc={previewCreator.emailHtml}
                title="Email preview"
                className="w-full h-full border border-brand-navy/10 rounded-2xl bg-white shadow-inner"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invitations' | 'community' | 'tickets' | 'settings'>('overview');
  const [stats, setStats] = useState({ orders: 0, revenue: 0, tiers: [] as any[] });
  const [communityJoins, setCommunityJoins] = useState<any[]>([]);
  const [ticketBuyers, setTicketBuyers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [selectedItem, setSelectedItem] = useState<{ type: 'ticket' | 'community'; data: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || "Login failed");
      setIsLoading(false);
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
        
        const joins = await AdminService.getCommunityJoins();
        setCommunityJoins(joins);
        
        const buyers = await AdminService.getTicketBuyers();
        setTicketBuyers(buyers);
      } catch (e) {
        console.error("Failed to load admin stats", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, [user]);

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Array.from(new Set(data.flatMap(row => Object.keys(row)))).filter(k => k !== 'id');
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => {
        let val = row[h] || '';
        if (typeof val === 'object') val = JSON.stringify(val);
        return `"${val.toString().replace(/"/g, '""')}"`;
      }).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  if (isLoading) return <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4"><Loader2 className="animate-spin text-brand-coral" size={32} /><span className="text-xs text-brand-navy/40 font-mono">Loading system telemetry...</span></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <Settings className="text-brand-coral" size={32} />
          </div>
          <h2 className="font-display font-bold text-4xl text-brand-navy mb-4 uppercase tracking-tighter">Admin Access</h2>
          <p className="font-body text-brand-navy/40 mb-10">Verification required to access the logistics command interface.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4 text-left">
            <button 
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 bg-brand-coral hover:bg-brand-orange text-white font-display font-bold py-3 rounded-xl transition-colors uppercase tracking-widest text-sm"
            >
              Sign in with Google
            </button>
          </div>
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
        <button onClick={() => window.location.href = '/'} className="px-10 py-5 bg-brand-navy text-white font-display font-bold text-xs uppercase tracking-widest transition-all hover:bg-brand-coral shadow-2xl rounded-xl">
          Back to Website
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-12 relative z-10 scrollbar-hide">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'community', label: 'Community Joins' },
          { id: 'tickets', label: 'Ticket Buyers' },
          { id: 'invitations', label: 'Invitations' },
          { id: 'settings', label: 'Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-display font-bold text-sm uppercase tracking-widest transition-all whitespace-nowrap rounded-full ${activeTab === tab.id ? 'bg-brand-navy text-white shadow-lg' : 'bg-brand-navy/5 text-brand-navy/40 hover:bg-brand-navy/10 hover:text-brand-navy'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>

      <div className="grid md:grid-cols-3 gap-8 mb-16 relative z-10">
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

      <div className="space-y-12 relative z-10 mb-16">
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
        </>
      )}

      {activeTab === 'invitations' && (
      <div className="space-y-12 relative z-10 mb-16">
        <div className="flex items-center gap-6 border-b border-brand-navy/5 pb-8">
           <span className="editorial-label text-brand-coral font-bold italic">02 //</span>
           <h2 className="editorial-label text-brand-navy/30 tracking-[0.4em] uppercase font-bold text-[10px]">Creator Invitation Portal</h2>
        </div>
        <CreatorInvitationPortal />
      </div>
      )}

      {activeTab === 'community' && (
      <div className="space-y-12 relative z-10 mb-16">
        <div className="flex justify-between items-center border-b border-brand-navy/5 pb-8">
          <div className="flex items-center gap-6">
             <span className="editorial-label text-brand-coral font-bold italic">03 //</span>
             <h2 className="editorial-label text-brand-navy/30 tracking-[0.4em] uppercase font-bold text-[10px]">Community Joins</h2>
          </div>
          <button 
            onClick={() => downloadCSV(communityJoins, 'community_joins.csv')}
            className="flex items-center gap-2 px-4 py-2 bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
        <div className="bg-white border border-brand-navy/5 rounded-[2rem] p-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-navy/5 text-brand-navy/40 font-mono text-xs uppercase tracking-widest">
                <th className="py-4 font-normal">Name</th>
                <th className="py-4 font-normal">Email</th>
                <th className="py-4 font-normal">Phone</th>
                <th className="py-4 font-normal">Role</th>
                <th className="py-4 font-normal">City</th>
              </tr>
            </thead>
            <tbody className="font-body text-brand-navy">
              {communityJoins.length > 0 ? communityJoins.map((join, i) => (
                <tr 
                  key={join.id || i} 
                  onClick={() => setSelectedItem({ type: 'community', data: join })}
                  className="border-b border-brand-navy/5 last:border-0 hover:bg-brand-navy/5 transition-colors cursor-pointer"
                >
                  <td className="py-4 font-bold">{join.fullName || join.name || 'N/A'}</td>
                  <td className="py-4">{join.email || 'N/A'}</td>
                  <td className="py-4">{join.phone || 'N/A'}</td>
                  <td className="py-4 capitalize">{join.role || 'N/A'}</td>
                  <td className="py-4">{join.city || 'N/A'}</td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-8 text-center text-brand-navy/40">No registrations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {activeTab === 'tickets' && (
      <div className="space-y-12 relative z-10 mb-16">
        <div className="flex justify-between items-center border-b border-brand-navy/5 pb-8">
          <div className="flex items-center gap-6">
             <span className="editorial-label text-brand-coral font-bold italic">04 //</span>
             <h2 className="editorial-label text-brand-navy/30 tracking-[0.4em] uppercase font-bold text-[10px]">Ticket Buyers</h2>
          </div>
          <button 
            onClick={() => downloadCSV(ticketBuyers, 'ticket_buyers.csv')}
            className="flex items-center gap-2 px-4 py-2 bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
        <div className="bg-white border border-brand-navy/5 rounded-[2rem] p-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-navy/5 text-brand-navy/40 font-mono text-xs uppercase tracking-widest">
                <th className="py-4 font-normal">Name</th>
                <th className="py-4 font-normal">Email</th>
                <th className="py-4 font-normal">Tier</th>
                <th className="py-4 font-normal">Qty</th>
                <th className="py-4 font-normal">Total</th>
              </tr>
            </thead>
            <tbody className="font-body text-brand-navy">
              {ticketBuyers.length > 0 ? ticketBuyers.map((buyer, i) => (
                <tr 
                  key={buyer.id || i} 
                  onClick={() => setSelectedItem({ type: 'ticket', data: buyer })}
                  className="border-b border-brand-navy/5 last:border-0 hover:bg-brand-navy/5 transition-colors cursor-pointer"
                >
                  <td className="py-4 font-bold">{buyer.customerInfo?.name || buyer.name || 'N/A'}</td>
                  <td className="py-4">{buyer.customerInfo?.email || buyer.email || 'N/A'}</td>
                  <td className="py-4">{buyer.tierId || 'N/A'}</td>
                  <td className="py-4">{buyer.quantity || 1}</td>
                  <td className="py-4 text-brand-coral font-display font-bold">${buyer.totalPrice || 0}</td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-8 text-center text-brand-navy/40">No ticket orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
      
      {activeTab === 'settings' && (
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
      )}

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-xl w-full border border-brand-navy/5 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-brand-navy/40 hover:text-brand-coral transition-colors p-2 text-lg font-bold"
            >
              ✕
            </button>
            
            <div className="mb-8">
              <span className="editorial-label text-brand-coral font-bold italic">
                {selectedItem.type === 'ticket' ? 'TICKET ORDER DETAILS' : 'COMMUNITY JOIN DETAILS'}
              </span>
              <h3 className="editorial-h2 text-brand-navy mt-2 text-2xl font-bold uppercase tracking-tight">
                {selectedItem.type === 'ticket' 
                  ? (selectedItem.data.customerInfo?.name || selectedItem.data.name || 'N/A')
                  : (selectedItem.data.fullName || selectedItem.data.name || 'N/A')}
              </h3>
            </div>

            <div className="space-y-4 border-t border-b border-brand-navy/5 py-6 font-body text-brand-navy">
              {Object.entries(selectedItem.data).map(([key, val]: [string, any]) => {
                if (key === 'id' || val === undefined || val === null) return null;
                
                let displayVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
                if (key === 'createdAt' && val && typeof val === 'object' && 'seconds' in val) {
                  displayVal = new Date(val.seconds * 1000).toLocaleString();
                } else if (key === 'createdAt' && typeof val === 'string') {
                  displayVal = new Date(val).toLocaleString();
                }
                
                // Format keys
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());

                return (
                  <div key={key} className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 border-b border-brand-navy/[0.02] pb-3 last:border-0">
                    <span className="text-[10px] editorial-label text-brand-navy/40 font-bold uppercase tracking-wider">{label}</span>
                    <span className="text-sm font-semibold select-all break-all">{displayVal}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setSelectedItem(null)}
                className="px-8 py-3 bg-brand-navy hover:bg-brand-coral text-white text-xs font-display font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
