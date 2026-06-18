import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Check, ArrowRight, ArrowUpRight, ChevronRight, Phone, Mail, Building, User,
  Calendar, MapPin, Users, Award, Clock, Compass, Heart, Instagram, AlertCircle, CheckCircle2,
  Tv, Utensils, Store, Music, Gem, MessageSquare, Camera, BookOpen, UserCheck, Truck, Hotel, Cpu, Crown, Shield,
  Mic, PlayCircle, Zap, Ticket, Video
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { BrandLogo } from './BrandingIcons';
import { sponsorshipTranslations } from '../lib/sponsorshipTranslations';

// Import assets
import Tripoli_Souks from '../assets/Tripoli_Souks.png';
import RKIF_1 from '../assets/RKIF_1.jpg';
import Exhibition from '../assets/Exhibition.png';
import Husein_Fayad from '../assets/Husein_Fayad.jpg';
import abiresag from '../assets/abiresag.jpg';
import KarenWazen from '../assets/KarenWazen.jpg';
import ossymarwah from '../assets/ossymarwah.jpg';
import waelarakji from '../assets/waelarakji.jpg';
import hammoud from '../assets/hammoud.og.jpg';
import therahal from '../assets/the.rahal.jpg';
import maybsat from '../assets/maybsatcooks.jpg';

// Import gallery placeholder assets
import creator10 from '../assets/gallery_creator10.jpg';
import creator12 from '../assets/gallery_creator12.jpg';
import creator15 from '../assets/gallery_creator15.jpg';
import creator18 from '../assets/gallery_creator18.jpg';
import creator20 from '../assets/gallery_creator20.jpg';
import creator22 from '../assets/gallery_creator22.jpg';
import creator25 from '../assets/gallery_creator25.jpg';
import creator27 from '../assets/gallery_creator27.jpg';
import creator30 from '../assets/gallery_creator30.jpg';
import creator32 from '../assets/gallery_creator32.jpg';
import creator35 from '../assets/gallery_creator35.jpg';

// Analytics tracking helper
const trackEvent = (eventName: string, params: any = {}) => {
  console.log(`[Analytics Event] ${eventName}`, params);
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event: eventName, ...params });
  }
};

export const SponsorsLandingPage: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const t = sponsorshipTranslations[language];

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Track page view
  useEffect(() => {
    trackEvent('sponsorship_page_view', { path: window.location.pathname });
  }, []);

  const handleLanguageSwitch = (newLang: 'en' | 'ar') => {
    setLanguage(newLang);
    trackEvent('sponsorship_language_switch', { language: newLang });
  };

  const handleScrollTo = (elementId: string, ctaLabel: string) => {
    trackEvent('sponsorship_cta_click', { cta_label: ctaLabel });
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePackageSelect = (packageName: string) => {
    setFormData(prev => ({ ...prev, interest: packageName }));
    handleScrollTo('contact-form-section', `select_package_${packageName}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    trackEvent('sponsorship_contact_submit', {
      company: formData.company,
      interest: formData.interest
    });

    // Simulate API request
    setTimeout(() => {
      // TODO: Connect this with backend mailing system (e.g. Hostinger SMTP / nodemailer on server.ts)
      // Example target: POST /api/sponsorship/request
      setFormStatus('success');
    }, 1500);
  };

  // Creator Lineup Data
  const creators = [
    { name: "Abir Al Saghir", catEN: "Food / Lifestyle", catAR: "طهي / نمط حياة", img: abiresag },
    { name: "Karen Wazen", catEN: "Beauty / Fashion / Lifestyle", catAR: "جمال / موضة / نمط حياة", img: KarenWazen },
    { name: "Osama Marwah", catEN: "YouTube / Entertainment", catAR: "يوتيوب / ترفيه", img: ossymarwah },
    { name: "Ahmad Abo Rob", catEN: "YouTube / Entertainment", catAR: "يوتيوب / ترفيه", img: creator10 },
    { name: "Ghaith Marwan", catEN: "YouTube / Entertainment", catAR: "يوتيوب / ترفيه", img: creator12 },
    { name: "Weal Arakji", catEN: "Sports", catAR: "رياضة", img: waelarakji },
    { name: "Chef Hammoud", catEN: "Food", catAR: "طهي", img: hammoud },
    { name: "Life with Jad", catEN: "Tourism / Travel", catAR: "سياحة / سفر", img: creator15 },
    { name: "The Rahal", catEN: "Family Content", catAR: "محتوى عائلي", img: therahal },
    { name: "Bob Harkal", catEN: "Storytelling", catAR: "سرد قصصي", img: creator18 },
    { name: "Yazeed Moussa", catEN: "Influence", catAR: "تأثير / نمط حياة", img: creator20 },
    { name: "Shashtari Twins", catEN: "Comedy", catAR: "كوميديا", img: creator22 },
    { name: "Beauty by Lama", catEN: "Beauty", catAR: "جمال", img: creator25 },
    { name: "May Bsat", catEN: "Food", catAR: "طهي", img: maybsat },
    { name: "Elie Harb", catEN: "Food", catAR: "طهي", img: creator27 },
    { name: "Tarazan", catEN: "Adventure / Entertainment", catAR: "مغامرة / ترفيه", img: creator30 },
    { name: "Hasan Raad", catEN: "Family / Influence", catAR: "عائلة / تأثير", img: creator32 },
    { name: "Hassan Hashem", catEN: "Informative Content", catAR: "محتوى معرفي", img: creator35 }
  ];

  // Helper icons for Opportunity section
  const getOpportunityIcon = (index: number) => {
    const icons = [Mic, Compass, Utensils, Award, Store, PlayCircle, Gem, Camera, Camera, Zap, Ticket, Truck];
    const Icon = icons[index % icons.length];
    return <Icon size={20} className="text-white" />;
  };

  const getOpportunityColor = (index: number) => {
    const colors = ["bg-brand-coral", "bg-brand-sky", "bg-brand-green", "bg-brand-orange", "bg-brand-lavender", "bg-brand-gold"];
    return colors[index % colors.length];
  };

  // Helper icons for Packages section
  const getPackageIcon = (index: number) => {
    const icons = [Crown, Tv, Compass, Award, Utensils, Music, Store, Truck, Hotel, Cpu, Video, Shield];
    const Icon = icons[index % icons.length];
    return <Icon size={20} className="text-brand-navy" />;
  };

  return (
    <div className={`min-h-screen bg-warm-beige text-brand-navy relative pb-24 selection:bg-brand-coral/20 selection:text-brand-navy ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pixel-grid opacity-[0.14] pointer-events-none" />

      {/* Floating Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-[200vh] pointer-events-none overflow-hidden">
        <div className={`absolute top-[-5%] ${isRTL ? 'right-[-10%]' : 'left-[-10%]'} w-[60%] h-[60%] bg-brand-coral/5 soft-glow petal-shape rotate-12`} />
        <div className={`absolute top-[40%] ${isRTL ? 'left-[-10%]' : 'right-[-10%]'} w-[50%] h-[70%] bg-brand-sky/5 soft-glow petal-shape -rotate-12`} />
        <div className={`absolute top-[80%] ${isRTL ? 'right-[10%]' : 'left-[10%]'} w-[70%] h-[50%] bg-brand-lavender/5 soft-glow petal-shape rotate-45`} />
      </div>

      {/* 1. Header & Language Switcher Toggle */}
      <header className="pt-10 pb-8 px-6 md:px-12 max-w-7xl mx-auto flex justify-between items-center relative z-30">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex flex-col text-brand-navy">
            <span className="font-display text-2xl font-black tracking-tight leading-[0.9] uppercase">ROOTS</span>
            <span className="font-display text-2xl font-black tracking-tight leading-[0.9] uppercase">AND</span>
            <span className="font-display text-2xl font-black tracking-tight leading-[0.9] uppercase">REACH</span>
          </div>
          <div className="h-10 w-px bg-brand-navy/10 hidden sm:block" />
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-mono text-[10px] tracking-widest text-brand-coral uppercase font-bold leading-none">FAYHAA EDITION</span>
            <span className="font-mono text-[9px] tracking-widest text-brand-navy/40 uppercase font-bold mt-1">TRIPOLI, LEBANON</span>
          </div>
        </div>

        {/* Bilingual language switcher */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-navy/5 rounded-full border border-brand-navy/10">
          <button 
            onClick={() => handleLanguageSwitch('en')}
            className={`px-3 py-1 text-[11px] font-mono font-black uppercase tracking-wider rounded-full transition-all ${language === 'en' ? 'bg-brand-navy text-white shadow-sm' : 'text-brand-navy/40 hover:text-brand-navy'}`}
          >
            EN
          </button>
          <button 
            onClick={() => handleLanguageSwitch('ar')}
            className={`px-3 py-1 text-[11px] font-arabic font-extrabold rounded-full transition-all ${language === 'ar' ? 'bg-brand-navy text-white shadow-sm' : 'text-brand-navy/40 hover:text-brand-navy'}`}
          >
            العربية
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-24">
        
        {/* 1. Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-brand-navy/5 relative overflow-hidden flex flex-col items-center text-center"
        >
          {/* Accent decoration */}
          <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-brand-coral/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-block bg-brand-coral text-white font-display text-[11px] tracking-[0.25em] font-black uppercase px-5 py-2 rounded-full shadow-sm">
              {t.hero.tag}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-brand-navy leading-[1.05] antialiased">
              {t.hero.title} <br />
              <span className="text-brand-coral italic">{t.hero.titleHighlight}</span>
            </h1>
            <p className="font-body text-brand-navy/60 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => handleScrollTo('packages-section', 'become_a_sponsor_hero')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-coral hover:text-white text-white px-8 py-4.5 rounded-xl transition-all duration-300 font-display font-black uppercase text-xs tracking-wider cursor-pointer shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>{t.hero.btnSponsor}</span>
                <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
              </button>

              <button 
                onClick={() => handleScrollTo('contact-form-section', 'request_deck_hero')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFF7E3] hover:bg-brand-navy hover:text-white text-brand-navy border border-brand-navy/10 px-8 py-4.5 rounded-xl transition-all duration-300 font-display font-black uppercase text-xs tracking-wider cursor-pointer shadow-sm hover:shadow-lg active:scale-95"
              >
                <span>{t.hero.btnDeck}</span>
                <ArrowUpRight size={14} />
              </button>

              <button 
                onClick={() => handleScrollTo('contact-form-section', 'contact_team_hero')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent hover:bg-brand-navy/5 text-brand-navy px-6 py-4.5 rounded-xl transition-all duration-300 font-display font-semibold uppercase text-xs tracking-wider cursor-pointer"
              >
                <span>{t.hero.btnContact}</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* 2. Why Sponsor This Event? */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-brand-coral font-black uppercase block">THE STRATEGIC FIT</span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-none">
              {t.whySponsor.title}
            </h2>
            <p className="font-body text-brand-navy/60 text-base md:text-lg">
              {t.whySponsor.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whySponsor.points.map((point, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-8 bg-white media-card group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-coral font-mono font-bold text-sm">
                    0{index + 1}
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tighter text-brand-navy leading-tight">
                    {point.title}
                  </h3>
                  <p className="font-body text-sm text-brand-navy/60 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Event at a Glance */}
        <section className="space-y-10 bg-soft-ivory/50 rounded-[2.5rem] p-8 md:p-16 border border-brand-navy/5 relative overflow-hidden">
          <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
          
          <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="font-mono text-[10px] tracking-[0.3em] text-brand-green font-black uppercase block">METRIC OVERVIEW</span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-none">
              {t.eventGlance.title}
            </h2>
            <p className="font-body text-brand-navy/60 text-base md:text-lg">
              {t.eventGlance.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {t.eventGlance.metrics.map((metric, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl p-6 border border-brand-navy/5 text-center flex flex-col justify-center space-y-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-display text-3xl md:text-4xl font-black text-brand-coral tracking-tight leading-none">
                  {metric.value}
                </p>
                <p className="font-body text-xs font-bold text-brand-navy/50 uppercase tracking-wider leading-relaxed px-2">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Sponsorship Opportunity */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-brand-coral font-black uppercase block">INTEGRATION MAP</span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-none">
              {t.opportunity.title}
            </h2>
            <p className="font-body text-brand-navy/60 text-base md:text-lg">
              {t.opportunity.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.opportunity.touchpoints.map((point, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 border border-brand-navy/5 flex gap-4 items-start shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-2xl ${getOpportunityColor(index)} flex items-center justify-center shrink-0`}>
                  {getOpportunityIcon(index)}
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-base text-brand-navy uppercase tracking-tighter leading-tight">
                    {point.name}
                  </h4>
                  <p className="font-body text-xs text-brand-navy/55 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Visibility Benefits */}
        <section className="space-y-10 bg-[#FFFCEF] rounded-[2.5rem] p-8 md:p-16 border border-brand-navy/5">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-brand-orange font-black uppercase block">SPONSOR DELIVERABLES</span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-none">
              {t.benefits.title}
            </h2>
            <p className="font-body text-brand-navy/60 text-base md:text-lg">
              {t.benefits.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefits.cards.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-3xl flex gap-4 items-start shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-base text-brand-navy uppercase tracking-tighter leading-tight">
                    {benefit.title}
                  </h4>
                  <p className="font-body text-xs text-brand-navy/50 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Creator Power Section */}
        <section className="space-y-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block bg-brand-coral text-white font-display text-[10px] tracking-[0.25em] font-black uppercase px-4 py-1.5 rounded-full">
                THE CREATOR ADVANTAGE
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-tight">
                {t.creatorPower.title}
              </h2>
              <p className="font-body text-sm md:text-base text-brand-navy/70 leading-relaxed">
                {t.creatorPower.copy}
              </p>
              <div className="p-6 bg-brand-green/10 rounded-3xl border border-brand-green/20">
                <p className="font-body text-xs text-brand-green font-bold uppercase tracking-wider mb-2">
                  {t.creatorPower.lineupTitle}
                </p>
                <p className="font-body text-xs text-brand-navy/60 leading-relaxed">
                  {t.creatorPower.lineupSubtitle}
                </p>
              </div>
            </div>

            {/* Creators grid showcase */}
            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 md:p-10 border border-brand-navy/5 shadow-xl max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid sm:grid-cols-2 gap-4">
                {creators.map((creator, index) => (
                  <div 
                    key={index}
                    onClick={() => trackEvent('creator_card_click', { creator_name: creator.name })}
                    className="p-4 bg-warm-beige/15 rounded-2xl border border-brand-navy/5 flex items-center gap-4 hover:border-brand-coral hover:bg-white transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-brand-navy/10 relative">
                      <img 
                        src={creator.img} 
                        alt={creator.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
                      />
                    </div>
                    <div className="space-y-0.5 text-left flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm text-brand-navy truncate leading-none">
                        {creator.name}
                      </h4>
                      <p className="font-body text-[10px] text-brand-navy/50 leading-none">
                        {language === 'en' ? creator.catEN : creator.catAR}
                      </p>
                      <span className="inline-block font-mono text-[8px] uppercase tracking-wider text-brand-coral leading-none mt-1">
                        {t.creatorPower.status}
                      </span>
                    </div>
                    <Instagram size={14} className="text-brand-navy/20 group-hover:text-brand-coral transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Audience and Brand Fit */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-brand-coral font-black uppercase block">TARGET DEMOGRAPHICS</span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-none">
              {t.audienceFit.title}
            </h2>
            <p className="font-body text-brand-navy/60 text-base md:text-lg">
              {t.audienceFit.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.audienceFit.cards.map((audience, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 border border-brand-navy/5 flex gap-4 items-center shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-brand-sky/10 flex items-center justify-center text-brand-sky shrink-0">
                  <Users size={16} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-sm text-brand-navy uppercase tracking-tighter leading-tight">
                    {audience.title}
                  </h4>
                  <p className="font-body text-xs text-brand-navy/50 leading-relaxed">
                    {audience.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. Sponsorship Packages */}
        <section id="packages-section" className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-brand-coral font-black uppercase block">AVAILABLE TIERS</span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-none">
              {t.packages.title}
            </h2>
            <p className="font-body text-brand-navy/60 text-base md:text-lg">
              {t.packages.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.packages.list.map((pkg, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 border border-brand-navy/5 shadow-md flex flex-col justify-between space-y-6 group hover:border-brand-coral transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center">
                      {getPackageIcon(index)}
                    </div>
                    <span className="font-mono text-[9px] tracking-wider text-brand-coral font-bold uppercase bg-brand-coral/15 px-3 py-1 rounded-full">
                      {t.packages.price}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl uppercase tracking-tighter text-brand-navy leading-tight group-hover:text-brand-coral transition-colors">
                    {language === 'en' ? pkg.name : pkg.name.split(' / ')[1] || pkg.name}
                  </h3>

                  <p className="font-body text-xs text-brand-navy/75 leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <button 
                  onClick={() => handlePackageSelect(pkg.name)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white hover:bg-brand-coral px-6 py-3.5 rounded-xl transition-all font-display font-bold uppercase text-[10px] tracking-widest cursor-pointer group-hover:shadow-md"
                >
                  <span>{isRTL ? 'استفسر الآن' : 'INQUIRE'}</span>
                  <ArrowRight size={12} className={isRTL ? 'rotate-180' : ''} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 9. Why This Is Different */}
        <section className="bg-brand-green text-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
            <span className="font-mono text-[9px] tracking-[0.35em] text-white/50 uppercase font-black block">THE ECOSYSTEM IMPACT</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tighter leading-snug">
              {t.whyDifferent.title}
            </h2>
            <p className="font-body text-white/80 text-base md:text-xl border-t border-white/10 pt-6 max-w-3xl mx-auto leading-relaxed">
              {t.whyDifferent.copy}
            </p>
          </div>
        </section>

        {/* 10. Call to Action Section & 11. Contact Form */}
        <section id="contact-form-section" className="grid lg:grid-cols-12 gap-12 bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-brand-navy/5 overflow-hidden relative">
          <div className="absolute inset-0 pixel-grid opacity-[0.05] pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-sky/10 rounded-full blur-3xl" />

          {/* Left CTA column */}
          <div className="lg:col-span-5 space-y-6 relative z-10">
            <span className="inline-block bg-[#80AEF4]/15 text-brand-sky font-mono font-bold text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full">
              START A CONVERSATION
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-brand-navy tracking-tight leading-none leading-snug">
              {t.cta.title}
            </h2>
            <p className="font-body text-brand-navy/60 text-sm md:text-base leading-relaxed">
              {t.cta.subtitle}
            </p>

            <div className="pt-6 space-y-4">
              <a 
                href="mailto:contact@rootsandreach.org?subject=Sponsorship%20Inquiry%20-%20Roots%20and%20Reach"
                className="flex items-center gap-3 font-mono text-xs text-brand-navy/70 hover:text-brand-coral transition-colors"
              >
                <Mail size={16} className="text-brand-coral" />
                <span>contact@rootsandreach.org</span>
              </a>
              <div className="flex items-center gap-3 font-mono text-xs text-brand-navy/70">
                <Phone size={16} className="text-brand-coral" />
                <span>+961 (0) 3 123 456</span>
              </div>
            </div>
          </div>

          {/* Right Contact Form column */}
          <div className="lg:col-span-7 relative z-10 bg-[#FFFCEF]/50 rounded-[2rem] p-6 sm:p-10 border border-brand-navy/10">
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-6"
                >
                  <CheckCircle2 size={56} className="text-green-600 mx-auto animate-bounce" />
                  <h3 className="font-display font-black text-2xl text-brand-navy uppercase tracking-tighter">
                    {t.contact.fields.successTitle}
                  </h3>
                  <p className="text-sm text-brand-navy/70 max-w-md mx-auto font-body leading-relaxed">
                    {t.contact.fields.successDesc}
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')} 
                    className="font-mono text-[10px] uppercase tracking-widest text-brand-coral hover:text-brand-navy transition-colors font-bold"
                  >
                    {isRTL ? 'إرسال طلب آخر' : 'Send another inquiry'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">
                        {t.contact.fields.name} *
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" />
                        <input 
                          type="text" 
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-coral transition-colors text-xs"
                          placeholder={isRTL ? "الاسم الكامل" : "e.g. John Doe"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">
                        {t.contact.fields.company} *
                      </label>
                      <div className="relative">
                        <Building size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" />
                        <input 
                          type="text" 
                          required
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-coral transition-colors text-xs"
                          placeholder={isRTL ? "اسم الشركة" : "e.g. Acme Corp"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">
                        {t.contact.fields.email} *
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" />
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-coral transition-colors text-xs"
                          placeholder="e.g. contact@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">
                        {t.contact.fields.phone}
                      </label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" />
                        <input 
                          type="text" 
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-brand-coral transition-colors text-xs"
                          placeholder="e.g. +961 03 123456"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">
                      {t.contact.fields.interest}
                    </label>
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                      className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-coral transition-colors text-xs appearance-none"
                    >
                      <option value="">{t.contact.fields.placeholderInterest}</option>
                      {t.packages.list.map((pkg, idx) => (
                        <option key={idx} value={pkg.name}>
                          {language === 'en' ? pkg.name : pkg.name.split(' / ')[1] || pkg.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">
                      {t.contact.fields.message} *
                    </label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl p-4 focus:outline-none focus:border-brand-coral transition-colors text-xs"
                      placeholder={isRTL ? "اكتب أهدافك أو متطلبات الرعاية..." : "Share branding goals, custom requirements, activation concepts..."}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-coral text-white px-8 py-4.5 rounded-xl transition-all font-display font-black uppercase text-xs tracking-wider cursor-pointer shadow-md hover:shadow-xl active:scale-95 disabled:opacity-60"
                  >
                    <span>{formStatus === 'submitting' ? t.contact.fields.sending : t.contact.fields.submit}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 12. Final Sponsor Promise */}
        <section className="text-center py-6 border-t border-brand-navy/10">
          <p className="font-body text-xs md:text-sm text-brand-navy/50 italic leading-relaxed max-w-3xl mx-auto">
            {t.promise.text}
          </p>
        </section>

      </main>

      {/* Footer Branding */}
      <footer className="mt-16 text-center w-full relative z-20">
        <div className="h-px w-20 bg-brand-navy/25 mx-auto mb-6" />
        <p className="editorial-label text-brand-navy/40 tracking-[0.45em] uppercase text-[10px]">
          {isRTL ? "نسخة ٢٠٢٦ // الفيحاء طرابلس" : "2026 EDITION // FAYHAA TRIPOLI"}
        </p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-brand-navy/30 font-bold mt-4 select-all">
          rootsandreach.org
        </p>
      </footer>
    </div>
  );
};
