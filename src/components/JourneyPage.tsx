import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Clock, ArrowRight, User, 
  Check, Sparkles, Award, Wallet, ShieldCheck, 
  Users, CheckCircle2, Copy, Send
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import YazeedPhoto from '../assets/yazeed_mousa_real.jpg';

export const JourneyPage = ({ onNavigate }: { onNavigate: (v: any) => void }) => {
  const { t, isRTL } = useLanguage();
  const [selectedTicket, setSelectedTicket] = useState<'single' | 'package' | 'lecture'>('package');
  const [copied, setCopied] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', workshopChoice: 'both' });
  const [isRegistered, setIsRegistered] = useState(false);

  // Fallback values if context translations are loading or missing
  const journeyT = (t as any).sanctuary?.journey || {
    label: 'CREATOR COLLABORATIONS',
    title: 'Our Journey.',
    title2: 'With Creators',
    description: 'We collaborate with forward-thinking content creators and experts to bring exclusive developmental, mental health, and educational programs to the community.',
    guestLabel: 'Current Featured Guest',
    guestName: 'Dr. Yazeed Mousa',
    guestTitle: 'Psychologist & Mental Wellness Coach',
    programTitle: 'Journey towards the Self',
    programSub: 'Self-Development & Psychological Awareness Program',
    programDesc: 'An integrated three-day developmental experience in Tripoli, Lebanon. Designed as a progressive learning journey starting with a public talk, leading into two specialized workshops focused on practical tools.',
    eventsTitle: 'Program Timeline',
    publicEvent: 'Public Lecture',
    workshop: 'Specialized Workshop',
    lectureTitle: 'The Five Inner Thoughts',
    lectureDesc: 'A free public lecture laying the foundation of our inner cognitive patterns, exploring how repeat thoughts shape our emotions and decisions.',
    lectureLoc: 'Cultural Association Theatre, Tripoli',
    lectureDate: 'Monday, July 6, 2026',
    lectureTime: 'Doors open at 5:30 PM | Program: 6:00 PM',
    ws1Title: 'Passion & Stress Management',
    ws1Desc: 'Learn practical tools for breathing, emotional decompression, and finding authentic passion amidst modern life pressures.',
    ws1Loc: 'Space Noor, Tripoli',
    ws1Date: 'Wednesday, July 8, 2026',
    ws1Time: '4:00 PM – 7:00 PM',
    ws2Title: 'Mind Programming',
    ws2Desc: 'An advanced session on identifying self-limiting core beliefs and replacing them with supportive cognitive patterns.',
    ws2Loc: 'Space Noor, Tripoli',
    ws2Date: 'Thursday, July 9, 2026',
    ws2Time: '4:00 PM – 7:00 PM',
    pricingTitle: 'Ticket Options & Registration',
    singleWs: 'Single Workshop',
    singleWsPrice: '$20',
    singleWsDesc: 'Access to either Passion & Stress Management or Mind Programming workshop.',
    packageWs: 'Double Workshop Package',
    packageWsPrice: '$30',
    packageWsDesc: 'Complete access to both specialized workshops for a reduced rate.',
    freeLecture: 'Public Lecture Entry',
    freeLecturePrice: 'Free',
    freeLectureDesc: 'Free admission to the general lecture on July 6 (prior registration required).',
    paymentTitle: 'Suggested Payment Methods',
    wishTitle: 'Wish Money Transfer',
    wishDesc: 'Transfer the amount to the Wish Money account below. Keep your transaction receipt to present it at the entrance.',
    wishAccount: 'Account number: 81408171',
    doorTitle: 'Payment at the Door',
    doorDesc: 'You can also secure your spot and pay cash in USD or LBP at the door upon arrival (subject to venue capacity).',
    ctaReserve: 'Secure Your Ticket',
    badgeCapacity: '50 Seats Max',
    badgeFree: 'Registration Required'
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('81408171');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsRegistered(true);
      setTimeout(() => {
        setShowRegisterForm(false);
        setIsRegistered(false);
        setFormData({ name: '', phone: '', workshopChoice: 'both' });
      }, 5000);
    }
  };

  return (
    <div className={`min-h-screen bg-warm-beige/35 backdrop-blur-3xl pt-32 pb-40 ${isRTL ? 'text-right font-arabic' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-coral/5 soft-glow petal-shape rotate-45 pointer-events-none" />
        <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-brand-orange/5 soft-glow petal-shape -rotate-12 pointer-events-none" />

        {/* 1. HERO SECTION */}
        <div className="mb-24 w-full relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center gap-12 w-full">
            
            {/* Centered Content */}
            <div className="w-full flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Sparkles size={16} className="text-brand-coral" />
                <span className="editorial-label text-brand-coral tracking-[0.5em] font-bold uppercase">
                  {journeyT.label}
                </span>
              </div>
              <h1 className="editorial-h1 lowercase tracking-tighter mb-8 leading-[0.8] text-brand-navy text-center w-full">
                {journeyT.title.split('.')[0]} <br />
                <span className="text-brand-coral italic font-normal">{journeyT.title2}</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-brand-navy/60 leading-relaxed max-w-2xl mb-12 text-center mx-auto">
                {journeyT.description}
              </p>

              {/* Creator Spotlight Badge */}
              <div className="bg-white/60 border border-brand-navy/5 p-8 rounded-3xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-center gap-6 shadow-sm w-full max-w-md mx-auto mb-12">
                <div className="w-12 h-12 rounded-2xl bg-brand-coral/10 text-brand-coral flex items-center justify-center shrink-0">
                  <User size={24} />
                </div>
                <div className={`text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
                  <span className="editorial-label text-[10px] text-brand-coral tracking-widest font-bold uppercase block mb-1">
                    {journeyT.guestLabel}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-brand-navy uppercase tracking-tight">
                    {journeyT.guestName}
                  </h3>
                  <p className="font-body text-sm text-brand-navy/50">
                    {journeyT.guestTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Centered Photo Frame */}
            <div className="max-w-md w-full relative mx-auto">
              <div className="absolute inset-0 bg-brand-coral/10 rounded-[3rem] rotate-3 translate-x-2 translate-y-2 scale-102 blur-sm pointer-events-none" />
              <div className="absolute inset-0 bg-brand-orange/10 rounded-[3rem] -rotate-3 -translate-x-2 -translate-y-2 scale-102 blur-sm pointer-events-none" />
              <div className="relative media-card border-none rounded-[3rem] overflow-hidden group shadow-2xl">
                <img 
                  src={YazeedPhoto} 
                  alt={journeyT.guestName} 
                  className="w-full h-auto object-cover aspect-square transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <span className="font-mono text-[10px] text-white/50 tracking-widest block mb-1">PROGRAM HEADLINER</span>
                  <h4 className="font-display font-bold text-2xl text-white tracking-tight uppercase leading-none">{journeyT.guestName}</h4>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. PROGRAM OVERVIEW BANNER */}
        <div className="w-full mb-24 relative z-10 max-w-4xl mx-auto">
          <div className="media-card bg-white p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold" />
            <div className="flex flex-col items-center justify-center text-center gap-12 relative z-10 w-full">
              <div className="max-w-3xl flex flex-col items-center text-center w-full">
                <span className="editorial-label text-brand-coral mb-4 block">{journeyT.programTitle}</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase mb-6 tracking-tighter leading-tight text-center">
                  {journeyT.programSub}
                </h2>
                <p className="font-body text-lg text-brand-navy/60 leading-relaxed text-center">
                  {journeyT.programDesc}
                </p>
              </div>
              <div className="flex justify-center w-full">
                <a href="#register" className="w-full sm:w-auto text-center px-8 py-4 bg-brand-navy text-white font-display font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-brand-coral hover:scale-102 transition-all shadow-md">
                  {journeyT.ctaReserve}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TIMELINE OF EVENTS */}
        <div className="w-full mb-28 relative z-10 flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-16 gap-3 w-full">
            <span className="editorial-label text-brand-coral mb-2 block">// SCHEDULE</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase tracking-tighter text-center">
              {journeyT.eventsTitle}
            </h2>
            <div className="w-12 h-0.5 bg-brand-coral mt-4" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Event 1: Public Event */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-10 rounded-[2rem] flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-brand-navy/5 relative overflow-hidden group min-h-[420px]"
            >
              <div>
                <div className={`flex justify-between items-start mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="px-4 py-1.5 bg-brand-navy/5 text-brand-navy text-[10px] uppercase font-bold tracking-widest font-mono rounded-full">
                    {journeyT.publicEvent}
                  </span>
                  <span className="px-4 py-1.5 bg-brand-green/10 text-brand-green text-[10px] uppercase font-bold tracking-widest font-mono rounded-full">
                    {isRTL ? 'مجاني' : 'Free Entry'}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy uppercase mb-4 tracking-tight group-hover:text-brand-coral transition-colors">
                  {journeyT.lectureTitle}
                </h3>
                <p className="font-body text-sm text-brand-navy/60 leading-relaxed mb-8">
                  {journeyT.lectureDesc}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-brand-navy/5 text-sm text-brand-navy/70">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar size={16} className="text-brand-coral shrink-0" />
                  <span className="font-mono text-[13px]">{journeyT.lectureDate}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock size={16} className="text-brand-coral shrink-0" />
                  <span className="font-mono text-[13px]">{journeyT.lectureTime}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin size={16} className="text-brand-coral shrink-0" />
                  <span className="font-body text-[13px]">{journeyT.lectureLoc}</span>
                </div>
              </div>
            </motion.div>

            {/* Event 2: Workshop 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-10 rounded-[2rem] flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-brand-navy/5 relative overflow-hidden group min-h-[420px]"
            >
              <div>
                <div className={`flex justify-between items-start mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="px-4 py-1.5 bg-brand-coral/10 text-brand-coral text-[10px] uppercase font-bold tracking-widest font-mono rounded-full">
                    {journeyT.workshop} 01
                  </span>
                  <span className="px-4 py-1.5 bg-brand-navy text-white text-[10px] uppercase font-bold tracking-widest font-mono rounded-full">
                    {journeyT.badgeCapacity}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy uppercase mb-4 tracking-tight group-hover:text-brand-coral transition-colors">
                  {journeyT.ws1Title}
                </h3>
                <p className="font-body text-sm text-brand-navy/60 leading-relaxed mb-8">
                  {journeyT.ws1Desc}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-brand-navy/5 text-sm text-brand-navy/70">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar size={16} className="text-brand-coral shrink-0" />
                  <span className="font-mono text-[13px]">{journeyT.ws1Date}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock size={16} className="text-brand-coral shrink-0" />
                  <span className="font-mono text-[13px]">{journeyT.ws1Time}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin size={16} className="text-brand-coral shrink-0" />
                  <span className="font-body text-[13px]">{journeyT.ws1Loc}</span>
                </div>
              </div>
            </motion.div>

            {/* Event 3: Workshop 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-10 rounded-[2rem] flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-brand-navy/5 relative overflow-hidden group min-h-[420px]"
            >
              <div>
                <div className={`flex justify-between items-start mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="px-4 py-1.5 bg-brand-coral/10 text-brand-coral text-[10px] uppercase font-bold tracking-widest font-mono rounded-full">
                    {journeyT.workshop} 02
                  </span>
                  <span className="px-4 py-1.5 bg-brand-navy text-white text-[10px] uppercase font-bold tracking-widest font-mono rounded-full">
                    {journeyT.badgeCapacity}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy uppercase mb-4 tracking-tight group-hover:text-brand-coral transition-colors">
                  {journeyT.ws2Title}
                </h3>
                <p className="font-body text-sm text-brand-navy/60 leading-relaxed mb-8">
                  {journeyT.ws2Desc}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-brand-navy/5 text-sm text-brand-navy/70">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar size={16} className="text-brand-coral shrink-0" />
                  <span className="font-mono text-[13px]">{journeyT.ws2Date}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock size={16} className="text-brand-coral shrink-0" />
                  <span className="font-mono text-[13px]">{journeyT.ws2Time}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin size={16} className="text-brand-coral shrink-0" />
                  <span className="font-body text-[13px]">{journeyT.ws2Loc}</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 4. REGISTRATION AND TICKET OPTIONS */}
        <span id="register" className="block h-24 -mt-24 pointer-events-none" />
        <div className="w-full mb-24 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 gap-3 w-full">
            <span className="editorial-label text-brand-coral mb-2 block">// ADMISSION PASSES</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase tracking-tighter text-center">
              {journeyT.pricingTitle}
            </h2>
            <div className="w-12 h-0.5 bg-brand-coral mt-4" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Interactive Ticket Selector */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Option 1: Free Lecture Entry */}
              <div 
                onClick={() => setSelectedTicket('lecture')}
                className={`glass-card p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex gap-6 items-center ${selectedTicket === 'lecture' ? 'border-brand-coral bg-white shadow-md' : 'border-brand-navy/5 hover:border-brand-navy/20 bg-white/40'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedTicket === 'lecture' ? 'border-brand-coral text-brand-coral' : 'border-brand-navy/20'}`}>
                  {selectedTicket === 'lecture' && <div className="w-3 h-3 bg-brand-coral rounded-full" />}
                </div>
                <div className="flex-1">
                  <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-display font-bold text-xl uppercase tracking-tight text-brand-navy">{journeyT.freeLecture}</h3>
                    <span className="font-display font-black text-2xl text-brand-green">{journeyT.freeLecturePrice}</span>
                  </div>
                  <p className="font-body text-sm text-brand-navy/60 leading-normal">{journeyT.freeLectureDesc}</p>
                </div>
              </div>

              {/* Option 2: Single Workshop */}
              <div 
                onClick={() => setSelectedTicket('single')}
                className={`glass-card p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex gap-6 items-center ${selectedTicket === 'single' ? 'border-brand-coral bg-white shadow-md' : 'border-brand-navy/5 hover:border-brand-navy/20 bg-white/40'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedTicket === 'single' ? 'border-brand-coral text-brand-coral' : 'border-brand-navy/20'}`}>
                  {selectedTicket === 'single' && <div className="w-3 h-3 bg-brand-coral rounded-full" />}
                </div>
                <div className="flex-1">
                  <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-display font-bold text-xl uppercase tracking-tight text-brand-navy">{journeyT.singleWs}</h3>
                    <span className="font-display font-black text-2xl text-brand-navy">{journeyT.singleWsPrice}</span>
                  </div>
                  <p className="font-body text-sm text-brand-navy/60 leading-normal">{journeyT.singleWsDesc}</p>
                </div>
              </div>

              {/* Option 3: Double Package (Recommended) */}
              <div 
                onClick={() => setSelectedTicket('package')}
                className={`glass-card p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex gap-6 items-center relative overflow-hidden ${selectedTicket === 'package' ? 'border-brand-coral bg-white shadow-md' : 'border-brand-navy/5 hover:border-brand-navy/20 bg-white/40'}`}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-coral/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute top-3 right-6 bg-brand-coral text-white text-[8px] uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full">
                  {isRTL ? 'الباقة الأفضل قيمة' : 'Best Value'}
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedTicket === 'package' ? 'border-brand-coral text-brand-coral' : 'border-brand-navy/20'}`}>
                  {selectedTicket === 'package' && <div className="w-3 h-3 bg-brand-coral rounded-full" />}
                </div>
                <div className="flex-1">
                  <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-display font-bold text-xl uppercase tracking-tight text-brand-navy">{journeyT.packageWs}</h3>
                    <span className="font-display font-black text-2xl text-brand-coral">{journeyT.packageWsPrice}</span>
                  </div>
                  <p className="font-body text-sm text-brand-navy/60 leading-normal">{journeyT.packageWsDesc}</p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setShowRegisterForm(true)} 
                className="w-full flex items-center justify-between bg-brand-navy hover:bg-brand-coral text-white p-6 rounded-2xl transition-all duration-300 font-display font-bold text-sm tracking-widest uppercase shadow-lg hover:scale-101 cursor-pointer"
              >
                <span>{isRTL ? 'سجل اهتمامك الآن' : 'Reserve & Book Ticket'}</span>
                <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform ${isRTL ? 'rotate-180' : ''}`}>
                  <ArrowRight size={18} />
                </div>
              </button>
            </div>

            {/* Suggested Payment Details Box */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 border border-brand-navy/5 rounded-[2rem] p-8 md:p-10 shadow-sm backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 pixel-grid opacity-[0.02] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Wallet size={20} className="text-brand-coral" />
                    <span className="editorial-label text-brand-navy/80 font-bold uppercase tracking-wider">
                      {journeyT.paymentTitle}
                    </span>
                  </div>

                  <div className="space-y-8">
                    
                    {/* Method 1: Wish Money */}
                    <div className="space-y-3 pb-8 border-b border-brand-navy/5">
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="w-6 h-6 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-mono font-bold flex items-center justify-center">1</span>
                        <h4 className="font-display font-bold text-lg text-brand-navy uppercase">{journeyT.wishTitle}</h4>
                      </div>
                      <p className="font-body text-sm text-brand-navy/60 leading-relaxed">
                        {journeyT.wishDesc}
                      </p>
                      
                      {/* Copyable Account Box */}
                      <div className={`flex items-center justify-between p-4 bg-warm-beige/30 rounded-xl border border-brand-navy/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] text-brand-navy/30 uppercase tracking-widest">WISH TRANSFER ACCOUNT</span>
                          <p className="font-mono font-bold text-lg text-brand-navy">81408171</p>
                        </div>
                        <button 
                          onClick={handleCopyAccount}
                          className="p-3 bg-white border border-brand-navy/5 hover:border-brand-coral hover:text-brand-coral rounded-lg transition-all active:scale-95 text-brand-navy/60 cursor-pointer"
                          title="Copy Account Number"
                        >
                          {copied ? <Check size={16} className="text-brand-green" /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Method 2: At the Door */}
                    <div className="space-y-3">
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="w-6 h-6 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-mono font-bold flex items-center justify-center">2</span>
                        <h4 className="font-display font-bold text-lg text-brand-navy uppercase">{journeyT.doorTitle}</h4>
                      </div>
                      <p className="font-body text-sm text-brand-navy/60 leading-relaxed">
                        {journeyT.doorDesc}
                      </p>
                    </div>

                    {/* Gatekeeping Check */}
                    <div className="bg-brand-gold/20 border border-brand-gold/30 p-4 rounded-xl flex items-start gap-4 text-xs text-brand-navy/70 mt-6">
                      <ShieldCheck size={18} className="text-brand-coral shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        {isRTL 
                          ? 'بمجرد حجزك للتذكرة، سيقوم فريقنا بالتواصل معك هاتفياً أو عبر الواتساب لتأكيد الدفع وضمان مقعدك في ورشتي العمل التخصصيتين.'
                          : 'After registration, our organizing committee will follow up with you via WhatsApp or phone call to confirm payment details and secure your workshop seat.'}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Dynamic Registration Modal */}
      <AnimatePresence>
        {showRegisterForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isRegistered) setShowRegisterForm(false); }}
              className="absolute inset-0 bg-brand-navy/70 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-lg w-full rounded-[2.5rem] p-10 shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-coral" />
              
              {!isRegistered ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-3xl text-brand-navy uppercase mb-2 tracking-tight">
                      {isRTL ? 'طلب حجز مقعد' : 'Ticket Reservation'}
                    </h3>
                    <p className="font-body text-sm text-brand-navy/50">
                      {isRTL ? 'أدخل معلوماتك وسنقوم بالتواصل معك لتأكيد التذاكر.' : 'Enter your details. We will contact you to finalize ticketing details.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="editorial-label text-[10px] font-bold block">{isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-warm-beige/25 border border-brand-navy/10 rounded-xl p-4 text-brand-navy font-body focus:outline-none focus:border-brand-coral transition-colors"
                        placeholder={isRTL ? 'مثال: محمد أحمد' : 'e.g. Jean Doe'}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="editorial-label text-[10px] font-bold block">{isRTL ? 'رقم الهاتف (واتساب)' : 'Phone Number (WhatsApp)'}</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-warm-beige/25 border border-brand-navy/10 rounded-xl p-4 text-brand-navy font-body focus:outline-none focus:border-brand-coral transition-colors"
                        placeholder="e.g. +961 81 408 171"
                      />
                    </div>

                    {/* Workshop Choice */}
                    <div className="space-y-2">
                      <label className="editorial-label text-[10px] font-bold block">{isRTL ? 'الفعاليات المطلوبة' : 'Selected Event Segment'}</label>
                      <select 
                        value={formData.workshopChoice}
                        onChange={(e) => setFormData({ ...formData, workshopChoice: e.target.value })}
                        className="w-full bg-warm-beige/25 border border-brand-navy/10 rounded-xl p-4 text-brand-navy font-body focus:outline-none focus:border-brand-coral transition-colors"
                      >
                        <option value="both">{isRTL ? 'باقة الورشتين معاً ($30)' : 'Double Workshop Package ($30)'}</option>
                        <option value="ws1">{isRTL ? 'ورشة الشغف وإدارة التوتر فقط ($20)' : 'Passion & Stress Management Only ($20)'}</option>
                        <option value="ws2">{isRTL ? 'ورشة برمجة العقل فقط ($20)' : 'Mind Programming Only ($20)'}</option>
                        <option value="lecture">{isRTL ? 'المحاضرة العامة فقط (مجاني)' : 'Public Lecture Only (Free)'}</option>
                      </select>
                    </div>

                  </div>

                  <div className={`flex gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button 
                      type="button" 
                      onClick={() => setShowRegisterForm(false)}
                      className="flex-1 py-4 border border-brand-navy/10 hover:border-brand-coral rounded-xl text-brand-navy font-display font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                    >
                      {isRTL ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-4 bg-brand-navy hover:bg-brand-coral text-white rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isRTL ? 'إرسال' : 'Submit'}</span>
                      <Send size={12} className={isRTL ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-[1.5rem] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-brand-navy uppercase tracking-tight">
                      {isRTL ? 'تم تسجيل اهتمامك بنجاح!' : 'Pre-Registration Saved!'}
                    </h3>
                    <p className="font-body text-sm text-brand-navy/60 leading-relaxed max-w-sm mx-auto">
                      {formData.workshopChoice === 'lecture'
                        ? (isRTL 
                          ? 'طلبك لحضور المحاضرة العامة المجانية قيد المعالجة، وسنقوم بالتواصل معك قريباً لتأكيد مقعدك.'
                          : 'Your request to attend the free public lecture is processing. We will contact you shortly to confirm your seat.')
                        : (isRTL
                          ? 'طلبك لحضور الفعالية قيد المعالجة. يرجى إتمام تحويل الرسوم عبر Wish Money للحساب: 81408171 لإتمام الحجز وسنقوم بالتواصل معك لتأكيد مقعدك.'
                          : 'Your request is processing. Please transfer your tickets fee via Wish Money to account 81408171 to guarantee your seat. Our team will contact you shortly.')}
                    </p>
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
};
