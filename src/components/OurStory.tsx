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

      {/* 1. Who We Are (Yellow) */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-warm-beige" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-12 left-12 md:top-16 md:left-16 z-20 pointer-events-none"
        >
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-brand-coral rounded-full" />)}
          </div>
        </motion.div>

        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-10">
          {/* Text Content (Right logically, so order-1 in RTL) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col items-center lg:items-start text-center lg:text-start ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter text-brand-navy leading-none mb-4 md:mb-6">
              {t.story.companyInfo?.whoWeAre?.title}
            </h2>
            <h3 className="font-arabic font-bold text-2xl md:text-4xl lg:text-5xl text-brand-coral leading-tight mb-8 md:mb-12">
              {t.story.companyInfo?.whoWeAre?.subtitle}
            </h3>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-xl max-w-xl">
              <p className="font-body font-medium text-xl md:text-2xl lg:text-3xl text-brand-navy leading-relaxed">
                {t.story.companyInfo?.whoWeAre?.desc}
              </p>
            </div>
          </motion.div>

          {/* Image Collage (Left logically, so order-2 in RTL) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={`relative w-full h-[600px] flex justify-center lg:justify-start ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative w-full max-w-md h-full">
              {/* Tall Image */}
              <motion.div 
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute top-0 left-4 w-64 h-96 rounded-2xl overflow-hidden shadow-2xl z-10 grayscale"
              >
                <img src={InfoCard2} alt="Who We Are" className="w-full h-full object-cover" />
              </motion.div>
              {/* Small Image */}
              <motion.div 
                initial={{ y: -30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute bottom-12 left-24 w-48 h-48 rounded-2xl overflow-hidden shadow-xl z-20 grayscale"
              >
                <img src={Tripoli_Souks} alt="City" className="w-full h-full object-cover" />
              </motion.div>
              {/* Decorative Pill */}
              <div className="absolute bottom-12 left-0 w-12 h-32 bg-[#759078] rounded-full z-0" />
              {/* Decorative Lines */}
              <div className="absolute bottom-20 right-12 space-y-3 z-0">
                {[...Array(6)].map((_, i) => <div key={i} className="w-24 h-0.5 bg-brand-navy/30" />)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Mic2, text: t.story.companyInfo?.whoWeAre?.pillars?.p1, color: 'text-brand-navy', bg: 'bg-[#fcd07a]', decor: 'bg-brand-orange' },
            { icon: Users, text: t.story.companyInfo?.whoWeAre?.pillars?.p2, color: 'text-brand-navy', bg: 'bg-[#FF8072]', decor: 'bg-brand-coral' },
            { icon: Share2, text: t.story.companyInfo?.whoWeAre?.pillars?.p3, color: 'text-brand-navy', bg: 'bg-[#80AEF4]', decor: 'bg-brand-sky' },
            { icon: Target, text: t.story.companyInfo?.whoWeAre?.pillars?.p4, color: 'text-brand-navy', bg: 'bg-[#7A9178]', decor: 'bg-brand-green' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${item.bg}`}>
                <item.icon size={32} className={item.color} />
              </div>
              <h4 className="font-display font-black text-2xl text-brand-navy">{item.text}</h4>
              <div className={`w-8 h-1 mt-4 rounded-full ${item.decor}`} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Vision (Coral) */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-brand-coral" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-12 left-12 md:top-16 md:left-16 z-20 pointer-events-none"
        >
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
          </div>
        </motion.div>

        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-10">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col items-center lg:items-start text-center lg:text-start ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[9rem] uppercase tracking-tighter text-brand-navy leading-none mb-2 md:mb-4">
              {t.story.companyInfo?.vision?.title}
            </h2>
            <h3 className="font-arabic font-bold text-2xl md:text-4xl lg:text-6xl text-warm-beige leading-tight mb-8 md:mb-12">
              {t.story.companyInfo?.vision?.subtitle}
            </h3>
            
            <div className="max-w-xl">
              <p className="font-body font-bold text-xl md:text-2xl lg:text-3xl text-brand-navy leading-relaxed">
                {t.story.companyInfo?.vision?.desc}
              </p>
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={`relative w-full h-[600px] flex justify-center lg:justify-start ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative w-full max-w-md h-full">
              {/* Arch Background */}
              <div className="absolute inset-y-0 left-12 right-12 border-4 border-brand-navy/10 rounded-t-[10rem] z-0" />
              {/* Tall Skyscraper Image */}
              <motion.div 
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute top-8 left-0 w-48 h-80 rounded-2xl overflow-hidden shadow-2xl z-10 grayscale"
              >
                <img src={InfoCard1} alt="Vision" className="w-full h-full object-cover" />
              </motion.div>
              {/* Square Image */}
              <motion.div 
                initial={{ y: -30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute bottom-16 right-0 w-72 h-64 rounded-2xl overflow-hidden shadow-xl z-20 grayscale"
              >
                <img src={InfoCard3} alt="Community" className="w-full h-full object-cover" />
              </motion.div>
              {/* Decorative Square */}
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-1/2 left-1/2 w-16 h-16 bg-[#759078] rounded-xl z-30 -translate-x-1/2 -translate-y-1/2" 
              />
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Users, text: t.story.companyInfo?.vision?.pillars?.p1, color: 'text-brand-navy', bg: 'bg-[#fcd07a]' },
            { icon: Palette, text: t.story.companyInfo?.vision?.pillars?.p2, color: 'text-brand-navy', bg: 'bg-[#FF8072]' },
            { icon: Globe, text: t.story.companyInfo?.vision?.pillars?.p3, color: 'text-brand-navy', bg: 'bg-[#80AEF4]' },
            { icon: Sparkles, text: t.story.companyInfo?.vision?.pillars?.p4, color: 'text-brand-navy', bg: 'bg-[#7A9178]' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-warm-beige rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${item.bg}`}>
                <item.icon size={32} className={item.color} />
              </div>
              <h4 className="font-display font-black text-2xl text-brand-navy">{item.text}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Mission (Blue) */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-brand-sky" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-12 left-12 md:top-16 md:left-16 z-20 pointer-events-none"
        >
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
          </div>
        </motion.div>

        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-10">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col items-center lg:items-start text-center lg:text-start ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[9rem] uppercase tracking-tighter text-brand-navy leading-none mb-2 md:mb-4">
              {t.story.companyInfo?.mission?.title}
            </h2>
            <h3 className="font-arabic font-bold text-2xl md:text-4xl lg:text-5xl text-brand-coral leading-tight mb-8 md:mb-12">
              {t.story.companyInfo?.mission?.subtitle}
            </h3>
            
            <div className="max-w-xl relative">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -top-6 right-0 w-16 h-1 bg-brand-navy/80 rounded-full origin-right" 
              />
              <p className="font-body font-bold text-xl md:text-2xl lg:text-3xl text-brand-navy leading-relaxed pt-2 md:pt-4">
                {t.story.companyInfo?.mission?.desc}
              </p>
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={`relative w-full h-[600px] flex justify-center lg:justify-start ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative w-full max-w-md h-full">
              {/* Main Image */}
              <motion.div 
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute top-8 left-8 right-8 bottom-32 rounded-2xl overflow-hidden shadow-2xl z-10 grayscale"
              >
                <img src={InfoCard3} alt="Mission" className="w-full h-full object-cover" />
              </motion.div>
              {/* Decorative Elements */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute top-0 left-0 w-32 h-12 bg-[#759078] rounded-full z-0" 
              />
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-12 left-8 w-48 h-24 bg-brand-coral rounded-xl z-20" 
              />
              {/* Decorative Lines */}
              <div className="absolute bottom-16 right-16 space-x-2 flex z-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                    className="w-0.5 h-16 bg-white/50 origin-bottom" 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Users, text: t.story.companyInfo?.mission?.pillars?.p1, color: 'text-brand-navy', bg: 'bg-[#fcd07a]', decor: 'bg-brand-orange' },
            { icon: Zap, text: t.story.companyInfo?.mission?.pillars?.p2, color: 'text-brand-navy', bg: 'bg-[#FF8072]', decor: 'bg-brand-coral' },
            { icon: Heart, text: t.story.companyInfo?.mission?.pillars?.p3, color: 'text-brand-navy', bg: 'bg-[#80AEF4]', decor: 'bg-brand-sky' },
            { icon: Activity, text: t.story.companyInfo?.mission?.pillars?.p4, color: 'text-brand-navy', bg: 'bg-[#7A9178]', decor: 'bg-brand-green' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${item.bg}`}>
                <item.icon size={32} className={item.color} />
              </div>
              <h4 className="font-display font-black text-2xl text-brand-navy">{item.text}</h4>
              <div className={`w-8 h-1 mt-4 rounded-full ${item.decor}`} />
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};
