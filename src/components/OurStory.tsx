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
import InfoCard1 from '../assets/info_card_1.jpg';
import InfoCard2 from '../assets/info_card_2.jpg';
import InfoCard3 from '../assets/info_card_3.jpg';
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

      {/* Company Info Sections */}
      <section className="py-20 px-6 md:px-12 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-[1600px] mx-auto space-y-32">
          
          {/* Who We Are */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className={`space-y-8 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
              <span className="editorial-label text-brand-coral uppercase tracking-[0.5em]">{t.companyInfo?.whoWeAre?.title || 'WHO ARE WE'}</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-tight">
                {t.companyInfo?.whoWeAre?.subtitle}
              </h2>
              <p className="font-body text-xl text-brand-navy/70 leading-relaxed max-w-xl">
                {t.companyInfo?.whoWeAre?.desc}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { icon: Users, text: t.companyInfo?.whoWeAre?.pillars?.p1, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
                  { icon: MessageCircle, text: t.companyInfo?.whoWeAre?.pillars?.p2, color: 'text-brand-coral', bg: 'bg-brand-coral/10' },
                  { icon: Heart, text: t.companyInfo?.whoWeAre?.pillars?.p3, color: 'text-brand-sky', bg: 'bg-brand-sky/10' },
                  { icon: Target, text: t.companyInfo?.whoWeAre?.pillars?.p4, color: 'text-brand-green', bg: 'bg-brand-green/10' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-display font-bold text-sm text-brand-navy uppercase tracking-wider">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img src={InfoCard2} alt="Who We Are" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-brand-yellow/10 mix-blend-multiply" />
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img src={InfoCard1} alt="Vision" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-brand-coral/20 mix-blend-multiply" />
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <span className="editorial-label text-brand-sky uppercase tracking-[0.5em]">{t.companyInfo?.vision?.title || 'VISION'}</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-tight">
                {t.companyInfo?.vision?.subtitle}
              </h2>
              <p className="font-body text-xl text-brand-navy/70 leading-relaxed max-w-xl">
                {t.companyInfo?.vision?.desc}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { icon: Users, text: t.companyInfo?.vision?.pillars?.p1, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
                  { icon: Target, text: t.companyInfo?.vision?.pillars?.p2, color: 'text-brand-coral', bg: 'bg-brand-coral/10' },
                  { icon: Globe, text: t.companyInfo?.vision?.pillars?.p3, color: 'text-brand-sky', bg: 'bg-brand-sky/10' },
                  { icon: Compass, text: t.companyInfo?.vision?.pillars?.p4, color: 'text-brand-green', bg: 'bg-brand-green/10' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-display font-bold text-sm text-brand-navy uppercase tracking-wider">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className={`space-y-8 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
              <span className="editorial-label text-brand-green uppercase tracking-[0.5em]">{t.companyInfo?.mission?.title || 'MISSION'}</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-brand-navy leading-tight">
                {t.companyInfo?.mission?.subtitle}
              </h2>
              <p className="font-body text-xl text-brand-navy/70 leading-relaxed max-w-xl">
                {t.companyInfo?.mission?.desc}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { icon: Target, text: t.companyInfo?.mission?.pillars?.p1, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
                  { icon: Zap, text: t.companyInfo?.mission?.pillars?.p2, color: 'text-brand-coral', bg: 'bg-brand-coral/10' },
                  { icon: Users, text: t.companyInfo?.mission?.pillars?.p3, color: 'text-brand-sky', bg: 'bg-brand-sky/10' },
                  { icon: Sparkles, text: t.companyInfo?.mission?.pillars?.p4, color: 'text-brand-green', bg: 'bg-brand-green/10' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-display font-bold text-sm text-brand-navy uppercase tracking-wider">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img src={InfoCard3} alt="Mission" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-brand-sky/20 mix-blend-multiply" />
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

