import React from 'react';
import { motion } from 'motion/react';
import { 
  Camera, Video, Globe, Smartphone, Star, 
  FileText, Sparkles, ArrowRight, Shield
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { BrandLogo } from './BrandingIcons';

interface CreatorPassPageProps {
  onNavigate: (v: any) => void;
  onApply: () => void;
  onApplyWithTrack?: (track: string) => void;
}

export const SanctuaryPage: React.FC<CreatorPassPageProps> = ({ onNavigate, onApply, onApplyWithTrack }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-warm-beige/35 backdrop-blur-3xl pt-24 pb-12 ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pixel-grid opacity-30 pointer-events-none" />
        <div className={`absolute top-[-10%] ${isRTL ? 'left-[-5%]' : 'right-[-5%]'} w-[400px] h-[400px] bg-brand-coral/5 soft-glow petal-shape rotate-45`} />
        
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-brand-coral" />
              <span className="editorial-label text-brand-coral tracking-[0.5em] font-bold uppercase">
                {t.sanctuary.label}
              </span>
            </div>
            
            <h1 className="editorial-h1 lowercase tracking-tighter mb-10 leading-[0.8] text-brand-navy">
              {t.sanctuary.hero.title} <br />
              <span className="text-brand-coral italic font-normal">{t.sanctuary.hero.title2}</span> <br />
              {t.sanctuary.hero.title3}
            </h1>
            
            <p className="font-body text-xl md:text-2xl max-w-4xl mb-16 leading-relaxed text-brand-navy/60 font-medium tracking-tight">
              {t.sanctuary.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TWO ACCREDITATION OPTIONS */}
      <section className="py-20 px-6 md:px-12 bg-transparent relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card A: Content Creator */}
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-10 md:p-16 rounded-[2.5rem] flex flex-col justify-between hover:shadow-2xl transition-all duration-500 border border-brand-navy/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 pixel-grid opacity-[0.03] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-coral/10 text-brand-coral rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 shadow-sm">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase mb-6 tracking-tighter leading-none">
                  {t.sanctuary.accreditationTypes.creator.title}
                </h3>
                <p className="font-body text-base md:text-lg text-brand-navy/60 leading-relaxed mb-12">
                  {t.sanctuary.accreditationTypes.creator.description}
                </p>
              </div>
              <button 
                onClick={() => onApplyWithTrack?.('creator')}
                className="group w-full flex items-center justify-between bg-brand-navy hover:bg-brand-coral text-white p-5 rounded-2xl transition-all duration-300 font-display font-bold text-xs tracking-widest uppercase cursor-pointer shadow-lg relative z-10"
              >
                <span className="editorial-label text-white tracking-[0.2em] font-bold uppercase">{t.sanctuary.accreditationTypes.creator.cta}</span>
                <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>
                  <ArrowRight size={16} />
                </div>
              </button>
            </motion.div>

            {/* Card B: Media Pass */}
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-10 md:p-16 rounded-[2.5rem] flex flex-col justify-between hover:shadow-2xl transition-all duration-500 border border-brand-navy/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 pixel-grid opacity-[0.03] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-navy/10 text-brand-navy rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 shadow-sm">
                  <FileText size={28} />
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase mb-6 tracking-tighter leading-none">
                  {t.sanctuary.accreditationTypes.media.title}
                </h3>
                <p className="font-body text-base md:text-lg text-brand-navy/60 leading-relaxed mb-12">
                  {t.sanctuary.accreditationTypes.media.description}
                </p>
              </div>
              <button 
                onClick={() => onApplyWithTrack?.('media')}
                className="group w-full flex items-center justify-between bg-brand-navy hover:bg-brand-coral text-white p-5 rounded-2xl transition-all duration-300 font-display font-bold text-xs tracking-widest uppercase cursor-pointer shadow-lg relative z-10"
              >
                <span className="editorial-label text-white tracking-[0.2em] font-bold uppercase">{t.sanctuary.accreditationTypes.media.cta}</span>
                <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>
                  <ArrowRight size={16} />
                </div>
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. ACCESS CLARITY BLOCK */}
      <section className="py-32 bg-brand-navy text-white relative overflow-hidden rounded-[4rem] mx-4 my-12 shadow-2xl">
        <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-coral/15 soft-glow petal-shape rotate-12 pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-gold/10 soft-glow petal-shape -rotate-45 pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <div className={isRTL ? 'lg:order-2' : ''}>
              <span className="editorial-label text-brand-coral tracking-[0.5em] font-bold mb-6 block uppercase">{t.sanctuary.accessClarity.title}</span>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter mb-12 leading-none">
                Accreditation Privilege <br />
                <span className="text-brand-coral italic font-normal">Accredited Entry</span>
              </h2>
              <ul className="space-y-6">
                {t.sanctuary.accessClarity.items.map((item: string, i: number) => (
                  <li key={i} className={`flex items-center gap-4 text-base md:text-lg text-white/80 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-brand-coral/20 flex items-center justify-center text-brand-coral shrink-0">
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-8 md:p-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] ${isRTL ? 'lg:order-1' : ''}`}>
              <div className="flex items-center gap-4 mb-8">
                <Shield size={24} className="text-brand-coral" />
                <h3 className="text-xl md:text-2xl font-display font-bold text-brand-coral uppercase tracking-widest leading-none">
                  {t.sanctuary.accessClarity.notTitle}
                </h3>
              </div>
              <ul className="space-y-5">
                {t.sanctuary.accessClarity.notItems.map((item: string, i: number) => (
                  <li key={i} className={`flex items-center gap-4 text-base text-white/40 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CONCEPT FEATURES */}
      <section className="py-32 bg-transparent relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <header className={`mb-20 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="editorial-label text-brand-coral mb-6 block tracking-[0.5em] font-bold">{t.sanctuary.concept.label}</span>
            <h2 className="editorial-h2 leading-none text-brand-navy">
              {t.sanctuary.concept.title} <span className="text-brand-coral italic font-normal">{t.sanctuary.concept.titleHighlight}</span>
            </h2>
          </header>
          
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="space-y-10">
              <p className="font-body text-xl md:text-2xl text-brand-navy/70 leading-relaxed font-semibold">
                {t.sanctuary.concept.desc1}
              </p>
              <p className="font-body text-base md:text-lg text-brand-navy/50 leading-relaxed">
                {t.sanctuary.concept.desc2}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sanctuary.concept.features.map((feature: string, i: number) => (
                  <div key={i} className={`flex items-center gap-3.5 p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-brand-navy/5 shadow-sm hover:shadow-md transition-shadow duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Sparkles size={14} className="text-brand-coral shrink-0" />
                    <span className="editorial-label text-[10px] uppercase font-bold tracking-widest leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium branding visual card */}
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-black flex items-center justify-center border border-white/10 group shadow-2xl">
              <div className="absolute inset-0 pixel-grid opacity-20" />
              <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-brand-coral/25 soft-glow petal-shape rotate-45 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-lavender/10 soft-glow petal-shape -rotate-12" />
              <div className="relative z-10 flex flex-col items-center">
                <BrandLogo variant="yellow" className="w-48 h-auto opacity-85 group-hover:scale-103 transition-transform duration-750" />
                <p className="editorial-label text-brand-coral mt-8 tracking-[0.6em] text-[10px] sm:text-xs">ACCREDITATION GATEWAY</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-32 bg-warm-beige/10 border-t border-brand-navy/5">
        <div className="max-w-4xl mx-auto px-6">
          <span className="editorial-label text-brand-navy/30 mb-16 block text-center uppercase font-bold tracking-[0.4em]">
            {t.sanctuary.faq.label}
          </span>
          <div className="space-y-6">
            {t.sanctuary.faq.items.map((faq: any, i: number) => (
              <div key={i} className={`p-8 bg-white/60 backdrop-blur-md border border-brand-navy/5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${isRTL ? 'text-right' : ''}`}>
                <h4 className="font-display font-bold text-lg md:text-xl text-brand-navy uppercase mb-4 tracking-tight leading-snug">
                  {faq.q}
                </h4>
                <p className="font-body text-brand-navy/50 leading-relaxed text-base md:text-lg">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER CODE */}
      <section className="py-20 bg-transparent text-center">
        <p className="editorial-label tracking-[0.5em] text-brand-navy/30 uppercase text-[10px] sm:text-xs">
          {t.sanctuary.footerCode}
        </p>
        <div className="h-px w-16 bg-brand-navy/15 mx-auto mt-6" />
      </section>

    </div>
  );
};
