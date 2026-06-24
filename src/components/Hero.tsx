import React from 'react';
import { motion } from 'motion/react';
import { Zap, Signal, Waves, Play, ChevronRight } from 'lucide-react';
import { TripoliHeritage, BrandLogo } from './BrandingIcons';
import { useLanguage } from '../lib/LanguageContext';

export const Hero = ({ onShopNow }: { onShopNow: () => void }) => {
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
