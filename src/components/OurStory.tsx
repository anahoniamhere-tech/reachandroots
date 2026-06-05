import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, MapPin, Calendar, Sparkles, Coffee, 
  Utensils, Users, Target, ArrowRight, Zap, 
  Waves, Heart, Bookmark, Landmark,
  Compass, Palette, MessageCircle, Ticket
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { TripoliHeritage, FayhaaFlow, BrandLogo } from './BrandingIcons';
import Tripoli_Souks from '../assets/Tripoli_Souks.png';
import RKIF_1 from '../assets/RKIF_1.jpg';
import Exhibition from '../assets/Exhibition.png';

const ValuePillar = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="p-8 bg-white media-card group h-full"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${color} group-hover:scale-110`}>
      <Icon size={20} className="text-white" />
    </div>
    <h4 className="font-display font-bold text-xl uppercase tracking-tighter text-brand-navy mb-4">{title}</h4>
    <p className="font-body text-sm text-brand-navy/60 leading-relaxed">{description}</p>
  </motion.div>
);

export const OurStory = ({ onNavigate }: { onNavigate: (v: any) => void }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div id="about" className="bg-warm-beige relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[150vh] pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] bg-brand-coral/5 soft-glow petal-shape rotate-12" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[70%] bg-brand-sky/5 soft-glow petal-shape -rotate-12" />
        <div className="absolute top-[50%] left-[10%] w-[70%] h-[50%] bg-brand-lavender/5 soft-glow petal-shape rotate-45" />
      </div>

      <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />

      {/* 1. Hero Section */}
      <section className={`relative pt-24 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center text-center mb-24 ${isRTL ? 'font-arabic' : ''}`}
          >
            
            <div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center">
                <Globe size={16} className="text-brand-coral" />
              </div>
              <span className="editorial-label text-brand-coral tracking-[0.5em] uppercase">{t.story.label}</span>
            </div>
            
            <h1 className="editorial-h1 text-brand-navy lowercase text-center">
              {t.story.title.split(' ')[0]} <br /> <span className="text-brand-coral italic">{t.story.title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="font-body text-xl md:text-3xl text-brand-navy/60 mt-12 max-w-4xl mx-auto leading-tight luxury-text-shadow text-balance">
              {t.story.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Tripoli Exhibition */}
      <section className="py-20 md:py-40 px-6 md:px-12 relative overflow-hidden bg-soft-ivory" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className={`relative ${isRTL ? 'order-2' : 'lg:order-1'}`}>
              <div className="relative aspect-square rounded-[4rem] overflow-hidden group shadow-2xl border border-brand-navy/5">
                <img 
                  src={Exhibition} 
                  alt="Tripoli Exhibition"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-brand-navy/5 mix-blend-overlay" />
              </div>
              <div className={`absolute -bottom-12 ${isRTL ? '-left-12' : '-right-12'} bg-white p-12 rounded-[3rem] shadow-2xl border border-brand-navy/5 max-w-sm hidden md:block ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`w-10 h-10 bg-brand-coral/10 rounded-xl flex items-center justify-center text-brand-coral mb-6 ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                   <Bookmark size={20} />
                </div>
                <p className="editorial-label text-brand-coral mb-4 uppercase">Space Design // 03</p>
                <p className="font-body text-lg text-brand-navy/60 italic leading-relaxed">
                  "{t.story.landmark.exhibitNote}"
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${isRTL ? 'order-1 text-right' : 'lg:order-2'}`}
            >
              <div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                <span className="editorial-label text-brand-orange block uppercase tracking-[0.6em]">{t.story.landmark.label}</span>
              </div>
              <h2 className="font-display font-bold text-5xl md:text-[6rem] lg:text-[7rem] uppercase tracking-tighter text-brand-navy leading-[0.8] mb-12">
                {t.story.landmark.title.includes(' ') ? (
                  <>
                    {t.story.landmark.title.split(' ')[0]} <br /><span className="text-brand-orange">{t.story.landmark.title.split(' ').slice(1).join(' ')}</span>
                  </>
                ) : (
                  t.story.landmark.title
                )}
              </h2>
              <p className={`font-body text-2xl text-brand-navy/60 leading-relaxed mb-16 max-w-xl ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                {t.story.landmark.description}
              </p>
              
              <div className="grid gap-10">
                {[
                  { icon: Landmark, title: t.story.landmark.heritage, desc: t.story.landmark.heritageDesc },
                  { icon: Palette, title: t.story.landmark.identity, desc: t.story.landmark.identityDesc },
                ].map((item, i) => (
                  <div key={i} className={`flex gap-8 items-start group ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="w-14 h-14 rounded-[1.25rem] bg-white shadow-xl shadow-brand-navy/5 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon size={22} />
                    </div>
                    <div>
                       <h4 className="font-display font-bold text-2xl text-brand-navy uppercase tracking-tighter mb-2">{item.title}</h4>
                       <p className="font-body text-base text-brand-navy/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Value Pillars */}
      <section className="py-20 md:py-40 px-6 md:px-12 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className={`flex flex-col md:flex-row items-end justify-between mb-24 gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={`max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="editorial-label text-brand-lavender mb-8 block tracking-[0.7em] uppercase">{t.story.values.label}</span>
              <h2 className="editorial-h2 text-brand-navy lowercase tracking-tighter">
                {t.story.values.title.includes(' ') ? (
                  <>
                    {t.story.values.title.split(' ').slice(0, 2).join(' ')} <span className="text-brand-lavender italic">{t.story.values.title.split(' ').slice(2).join(' ')}</span>
                  </>
                ) : (
                  t.story.values.title
                )}
              </h2>
            </div>
            <div className={`flex items-center gap-4 text-brand-navy/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
               <Waves size={32} />
               <div className="w-24 h-px bg-current" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <ValuePillar 
              icon={MessageCircle} 
              title={t.story.values.v1.title}
              description={t.story.values.v1.desc}
              color="bg-brand-coral" 
            />
            <ValuePillar 
              icon={Users} 
              title={t.story.values.v2.title}
              description={t.story.values.v2.desc}
              color="bg-brand-sky" 
            />
            <ValuePillar 
              icon={Globe} 
              title={t.story.values.v3.title}
              description={t.story.values.v3.desc}
              color="bg-brand-orange" 
            />
            <ValuePillar 
              icon={Landmark} 
              title={t.story.values.v4.title}
              description={t.story.values.v4.desc}
              color="bg-brand-lavender" 
            />
            <ValuePillar 
              icon={Target} 
              title={t.story.values.v5.title}
              description={t.story.values.v5.desc}
              color="bg-brand-gold" 
            />
            <ValuePillar 
              icon={Heart} 
              title={t.story.values.v6.title}
              description={t.story.values.v6.desc}
              color="bg-brand-pink" 
            />
          </div>
        </div>

        <div className={`absolute bottom-[-10%] ${isRTL ? 'left-[-5%] rotate-180' : 'right-[-5%]'} w-1/2 h-1/2 opacity-[0.03] pointer-events-none`}>
          <FayhaaFlow className="w-full h-full text-brand-navy" />
        </div>
      </section>

      {/* 6. Location Cards Section */}
      <section id="locations" className="py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center mb-20 md:mb-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
            >
               <div className="absolute inset-0 bg-brand-coral/5 soft-glow petal-shape animate-pulse" />
               <TripoliHeritage className="w-full h-full text-brand-navy/10 absolute opacity-20" />
               <h2 className={`font-display font-bold text-5xl md:text-8xl uppercase tracking-tighter text-brand-navy relative z-10 luxury-text-shadow ${isRTL ? 'font-arabic' : ''}`}>
                 {t.story.location.title}
               </h2>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: t.story.location.l1.name, 
                desc: t.story.location.l1.desc, 
                img: Tripoli_Souks,
                color: 'brand-coral'
              },
              { 
                name: t.story.location.l2.name, 
                desc: t.story.location.l2.desc, 
                img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
                color: 'brand-sky'
              },
              { 
                name: t.story.location.l3.name, 
                desc: t.story.location.l3.desc, 
                img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
                color: 'brand-orange'
              },
              { 
                name: t.story.location.l4.name, 
                desc: t.story.location.l4.desc, 
                img: RKIF_1,
                color: 'brand-lavender'
              },
            ].map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl"
              >
                <img src={loc.img} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt={loc.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className={`absolute bottom-10 ${isRTL ? 'right-10 left-10 text-right' : 'left-10 right-10'}`}>
                  <div className={`inline-flex items-center justify-center px-4 py-1 rounded-full bg-${loc.color} text-white mb-4`}>
                    <span className="editorial-label text-white leading-none">{t.story.location.label}</span>
                  </div>
                  <h4 className="font-display font-bold text-3xl text-white uppercase tracking-tighter mb-2">{loc.name}</h4>
                  <p className="font-body text-sm text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">{loc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Outcome Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white/50 backdrop-blur-md relative border-y border-brand-navy/5" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-[1400px] mx-auto text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-coral/5 soft-glow petal-shape rounded-full opacity-10" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <span className="editorial-label text-brand-coral mb-8 md:mb-10 block uppercase tracking-[0.5em] md:tracking-[1em]">{t.story.result.label}</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[8rem] text-brand-navy uppercase tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12">
              {t.story.result.title.includes(' ') ? (
                <>
                  {t.story.result.title.split(' ').slice(0, 2).join(' ')} <br /> <span className="text-brand-coral">{t.story.result.title.split(' ').slice(2).join(' ')}</span>
                </>
              ) : (
                t.story.result.title
              )}
            </h2>
            <p className="font-body text-lg md:text-3xl text-brand-navy/60 max-w-4xl mx-auto leading-tight luxury-text-shadow text-balance">
              {t.story.result.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. Final CTAs */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t.story.ctas.program, view: 'program' as const, icon: Calendar, color: 'bg-brand-navy text-white' },
              { title: t.story.ctas.tickets, view: 'tickets' as const, icon: Ticket, color: 'bg-brand-coral text-white' },
              { title: t.story.ctas.sanctuary, view: 'sanctuary' as const, icon: Target, color: 'bg-brand-sky text-white' },
            ].map((cta, i) => (
              <button
                key={i}
                onClick={() => onNavigate(cta.view)}
                className={`p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between items-start text-left h-72 md:h-80 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl active:scale-95 group ${cta.color} ${isRTL ? 'text-right items-end' : ''}`}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 ${isRTL ? 'mr-0 ml-0 mr-auto' : '' /* Swapped logical for RTL buttons */}`}>
                   <cta.icon size={20} />
                </div>
                <div className="space-y-4 w-full">
                  <span className={`editorial-label text-white/50 block tracking-[0.5em] ${isRTL ? 'text-right' : ''}`}>{t.story.ctas.next}</span>
                  <div className={`flex items-center justify-between w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tighter leading-none">{cta.title}</span>
                    <ArrowRight size={20} className={`${isRTL ? 'rotate-180 group-hover:-translate-x-3' : 'group-hover:translate-x-3'} transition-transform duration-500`} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

