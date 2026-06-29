import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, MapPin, Calendar, Sparkles, Coffee, 
  Utensils, Users, Target, ArrowRight, Zap, 
  Waves, Heart, Bookmark, Landmark,
  Compass, Palette, MessageCircle, Ticket,
  Mic2, Share2, Award, Activity
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { TripoliHeritage, FayhaaFlow, BrandLogo } from './BrandingIcons';
import Tripoli_Souks from '../assets/Tripoli_Souks.png';
import RKIF_1 from '../assets/RKIF_1.jpg';
import Exhibition from '../assets/Exhibition.png';
import InfoCard1 from '../assets/info_card_1.jpg';
import InfoCard2 from '../assets/info_card_2.jpg';
import InfoCard3 from '../assets/info_card_3.jpg';

export const OurStory = ({ onNavigate }: { onNavigate: (v: any) => void }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div id="about" className="relative overflow-hidden w-full">

      {/* 1. Hero Section (Keep existing design) */}
      <section className={`relative pt-24 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 bg-warm-beige ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Ambient backgrounds */}
        <div className="absolute top-0 left-0 w-full h-[150vh] pointer-events-none">
          <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] bg-brand-coral/5 soft-glow petal-shape rotate-12" />
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[70%] bg-brand-sky/5 soft-glow petal-shape -rotate-12" />
          <div className="absolute top-[50%] left-[10%] w-[70%] h-[50%] bg-brand-lavender/5 soft-glow petal-shape rotate-45" />
        </div>
        <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10">
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

      {/* 2. Who We Are (Yellow) */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-[#fcd07a]" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="absolute top-12 left-12 md:top-16 md:left-16 z-20 pointer-events-none opacity-20">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-brand-coral rounded-full" />)}
          </div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-10">
          {/* Text Content (Right logically, so order-1 in RTL) */}
          <div className={`flex flex-col items-center lg:items-start text-center lg:text-start ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <h2 className="font-display font-black text-7xl md:text-[8rem] uppercase tracking-tighter text-brand-navy leading-none mb-6">
              {t.companyInfo?.whoWeAre?.title}
            </h2>
            <h3 className="font-arabic font-bold text-3xl md:text-5xl text-brand-coral leading-tight mb-12">
              {t.companyInfo?.whoWeAre?.subtitle}
            </h3>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-xl max-w-xl">
              <p className="font-body font-medium text-2xl md:text-3xl text-brand-navy leading-relaxed">
                {t.companyInfo?.whoWeAre?.desc}
              </p>
            </div>
          </div>

          {/* Image Collage (Left logically, so order-2 in RTL) */}
          <div className={`relative w-full h-[600px] flex justify-center lg:justify-start ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative w-full max-w-md h-full">
              {/* Tall Image */}
              <div className="absolute top-0 left-4 w-64 h-96 rounded-2xl overflow-hidden shadow-2xl z-10 grayscale">
                <img src={InfoCard2} alt="Who We Are" className="w-full h-full object-cover" />
              </div>
              {/* Small Image */}
              <div className="absolute bottom-12 left-24 w-48 h-48 rounded-2xl overflow-hidden shadow-xl z-20 grayscale">
                <img src={Tripoli_Souks} alt="City" className="w-full h-full object-cover" />
              </div>
              {/* Decorative Pill */}
              <div className="absolute bottom-12 left-0 w-12 h-32 bg-[#759078] rounded-full z-0" />
              {/* Decorative Lines */}
              <div className="absolute bottom-20 right-12 space-y-3 z-0">
                {[...Array(6)].map((_, i) => <div key={i} className="w-24 h-0.5 bg-brand-navy/30" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Mic2, text: t.companyInfo?.whoWeAre?.pillars?.p1, color: 'text-brand-navy', bg: 'bg-[#fcd07a]', decor: 'bg-brand-orange' },
            { icon: Users, text: t.companyInfo?.whoWeAre?.pillars?.p2, color: 'text-brand-navy', bg: 'bg-[#FF8072]', decor: 'bg-brand-coral' },
            { icon: Share2, text: t.companyInfo?.whoWeAre?.pillars?.p3, color: 'text-brand-navy', bg: 'bg-[#80AEF4]', decor: 'bg-brand-sky' },
            { icon: Target, text: t.companyInfo?.whoWeAre?.pillars?.p4, color: 'text-brand-navy', bg: 'bg-[#7A9178]', decor: 'bg-brand-green' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${item.bg}`}>
                <item.icon size={32} className={item.color} />
              </div>
              <h4 className="font-display font-black text-2xl text-brand-navy">{item.text}</h4>
              <div className={`w-8 h-1 mt-4 rounded-full ${item.decor}`} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Vision (Coral) */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-brand-coral" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="absolute top-12 left-12 md:top-16 md:left-16 z-20 pointer-events-none opacity-30">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
          </div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-10">
          {/* Text Content */}
          <div className={`flex flex-col items-center lg:items-start text-center lg:text-start ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <h2 className="font-display font-black text-7xl md:text-[9rem] uppercase tracking-tighter text-brand-navy leading-none mb-4">
              {t.companyInfo?.vision?.title}
            </h2>
            <h3 className="font-arabic font-bold text-4xl md:text-6xl text-warm-beige leading-tight mb-12">
              {t.companyInfo?.vision?.subtitle}
            </h3>
            
            <div className="max-w-xl">
              <p className="font-body font-bold text-2xl md:text-3xl text-brand-navy leading-relaxed">
                {t.companyInfo?.vision?.desc}
              </p>
            </div>
          </div>

          {/* Image Collage */}
          <div className={`relative w-full h-[600px] flex justify-center lg:justify-start ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative w-full max-w-md h-full">
              {/* Arch Background */}
              <div className="absolute inset-y-0 left-12 right-12 border-4 border-brand-navy/10 rounded-t-[10rem] z-0" />
              {/* Tall Skyscraper Image */}
              <div className="absolute top-8 left-0 w-48 h-80 rounded-2xl overflow-hidden shadow-2xl z-10 grayscale">
                <img src={InfoCard1} alt="Vision" className="w-full h-full object-cover" />
              </div>
              {/* Square Image */}
              <div className="absolute bottom-16 right-0 w-72 h-64 rounded-2xl overflow-hidden shadow-xl z-20 grayscale">
                <img src={InfoCard3} alt="Community" className="w-full h-full object-cover" />
              </div>
              {/* Decorative Square */}
              <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-[#759078] rounded-xl z-30 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Users, text: t.companyInfo?.vision?.pillars?.p1, color: 'text-brand-navy', bg: 'bg-[#fcd07a]' },
            { icon: Palette, text: t.companyInfo?.vision?.pillars?.p2, color: 'text-brand-navy', bg: 'bg-[#FF8072]' },
            { icon: Globe, text: t.companyInfo?.vision?.pillars?.p3, color: 'text-brand-navy', bg: 'bg-[#80AEF4]' },
            { icon: Sparkles, text: t.companyInfo?.vision?.pillars?.p4, color: 'text-brand-navy', bg: 'bg-[#7A9178]' },
          ].map((item, i) => (
            <div key={i} className="bg-warm-beige rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${item.bg}`}>
                <item.icon size={32} className={item.color} />
              </div>
              <h4 className="font-display font-black text-2xl text-brand-navy">{item.text}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mission (Blue) */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-brand-sky" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="absolute top-12 left-12 md:top-16 md:left-16 z-20 pointer-events-none opacity-30">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
          </div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-10">
          {/* Text Content */}
          <div className={`flex flex-col items-center lg:items-start text-center lg:text-start ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <h2 className="font-display font-black text-7xl md:text-[9rem] uppercase tracking-tighter text-brand-navy leading-none mb-4">
              {t.companyInfo?.mission?.title}
            </h2>
            <h3 className="font-arabic font-bold text-4xl md:text-5xl text-brand-coral leading-tight mb-12">
              {t.companyInfo?.mission?.subtitle}
            </h3>
            
            <div className="max-w-xl relative">
              <div className="absolute -top-6 right-0 w-16 h-1 bg-brand-navy/80 rounded-full" />
              <p className="font-body font-bold text-2xl md:text-3xl text-brand-navy leading-relaxed pt-4">
                {t.companyInfo?.mission?.desc}
              </p>
            </div>
          </div>

          {/* Image Collage */}
          <div className={`relative w-full h-[600px] flex justify-center lg:justify-start ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative w-full max-w-md h-full">
              {/* Main Image */}
              <div className="absolute top-8 left-8 right-8 bottom-32 rounded-2xl overflow-hidden shadow-2xl z-10 grayscale">
                <img src={InfoCard3} alt="Mission" className="w-full h-full object-cover" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-12 bg-[#759078] rounded-full z-0 opacity-80" />
              <div className="absolute bottom-12 left-8 w-48 h-24 bg-brand-coral rounded-xl z-20" />
              {/* Decorative Lines */}
              <div className="absolute bottom-16 right-16 space-x-2 flex z-0">
                {[...Array(6)].map((_, i) => <div key={i} className="w-0.5 h-16 bg-white/50" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Users, text: t.companyInfo?.mission?.pillars?.p1, color: 'text-brand-navy', bg: 'bg-[#fcd07a]', decor: 'bg-brand-orange' },
            { icon: Zap, text: t.companyInfo?.mission?.pillars?.p2, color: 'text-brand-navy', bg: 'bg-[#FF8072]', decor: 'bg-brand-coral' },
            { icon: Heart, text: t.companyInfo?.mission?.pillars?.p3, color: 'text-brand-navy', bg: 'bg-[#80AEF4]', decor: 'bg-brand-sky' },
            { icon: Activity, text: t.companyInfo?.mission?.pillars?.p4, color: 'text-brand-navy', bg: 'bg-[#7A9178]', decor: 'bg-brand-green' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${item.bg}`}>
                <item.icon size={32} className={item.color} />
              </div>
              <h4 className="font-display font-black text-2xl text-brand-navy">{item.text}</h4>
              <div className={`w-8 h-1 mt-4 rounded-full ${item.decor}`} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
