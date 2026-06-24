import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Users, Mic2, Zap, PlayCircle, Coffee, Award, Share2, Star, User, ExternalLink, MapPin, Clock } from 'lucide-react';
import { BrandLogo } from './BrandingIcons';
import { useLanguage } from '../lib/LanguageContext';
import { PROGRAM_DATA } from '../constants/programData';

export const ProgramPage = ({ onNavigate }: { onNavigate: (v: 'landing' | 'finder' | 'tickets' | 'checkout' | 'success' | 'program' | 'sanctuary' | 'sanctuary-apply' | 'gallery') => void }) => {
  const [activeDay, setActiveDay] = useState<'Friday' | 'Saturday' | 'Sunday'>('Friday');
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
