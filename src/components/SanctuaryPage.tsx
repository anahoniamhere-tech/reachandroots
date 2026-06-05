import React from 'react';
import { motion } from 'motion/react';
import { 
  Camera, Video, Radio, Mic, Smartphone, Activity, 
  MessageSquare, Zap, Waves, Signal, Users, Globe, Target, 
  ArrowRight, ChevronRight, Star, ExternalLink, PlayCircle,
  FileText, Shield, Sparkles, ChevronLeft
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

  const iconMap: { [key: string]: React.ReactNode } = {
    "Content Creators": <Smartphone size={20} />,
    "Video Storytellers": <Video size={20} />,
    "Media Platforms": <Globe size={20} />,
    "Documentarians": <Camera size={20} />,
    "Photographers": <Sparkles size={20} />,
    "Podcasters": <Mic size={20} />,
    "Social-First Creators": <Activity size={20} />,
    "Digital Journalists": <FileText size={20} />,
    "Regional Voices": <MessageSquare size={20} />,
    "صناع المحتوى": <Smartphone size={20} />,
    "رواة القصص المرئية": <Video size={20} />,
    "منصات الإعلام": <Globe size={20} />,
    "الموثقون": <Camera size={20} />,
    "المصورون": <Sparkles size={20} />,
    "صناع البودكاست": <Mic size={20} />,
    "مبدعو التواصل الاجتماعي": <Activity size={20} />,
    "الصحفيون الرقميون": <FileText size={20} />,
    "الأصوات الإقليمية": <MessageSquare size={20} />,
  };

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 pixel-grid opacity-30 pointer-events-none" />
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[50%] h-full opacity-[0.03] pointer-events-none`}>
           <Globe className="w-full h-full text-brand-navy" />
        </div>
        <div className={`absolute top-[-10%] ${isRTL ? 'left-[-5%]' : 'right-[-5%]'} w-[400px] h-[400px] bg-brand-coral/5 soft-glow petal-shape rotate-45`} />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className={`flex items-center gap-4 mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-brand-coral" />
              <span className="editorial-label text-brand-coral tracking-[0.5em] font-bold uppercase">
                {t.sanctuary.label}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-display font-bold leading-[0.9] md:leading-[0.8] tracking-tighter uppercase mb-10 tracking-[-0.04em]">
              {t.sanctuary.hero.title} <br />
              <span className="text-brand-coral italic">{t.sanctuary.hero.title2}</span> <br />
              {t.sanctuary.hero.title3}
            </h1>
            
            <p className="font-body text-2xl md:text-3xl max-w-4xl mb-16 leading-tight text-brand-navy/60 font-medium tracking-tight">
              {t.sanctuary.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TWO OPTION CARDS */}
      <section className="py-20 px-6 md:px-12 bg-warm-beige/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card A: Content Creator */}
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="media-card bg-white p-10 md:p-16 rounded-[3rem] border border-brand-navy/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-brand-coral/10 text-brand-coral rounded-2xl flex items-center justify-center mb-10">
                  <Smartphone size={32} />
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase mb-6 tracking-tighter">
                  {t.sanctuary.accreditationTypes.creator.title}
                </h3>
                <p className="font-body text-xl text-brand-navy/60 leading-relaxed mb-12">
                  {t.sanctuary.accreditationTypes.creator.description}
                </p>
              </div>
              <button 
                onClick={() => onApplyWithTrack?.('creator')}
                className="group w-full flex items-center justify-between bg-brand-navy text-white p-6 rounded-2xl hover:bg-brand-coral transition-all"
              >
                <span className="editorial-label tracking-[0.3em] font-bold uppercase">{t.sanctuary.accreditationTypes.creator.cta}</span>
                <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </motion.div>

            {/* Card B: Media Pass */}
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="media-card bg-white p-10 md:p-16 rounded-[3rem] border border-brand-navy/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-brand-navy/10 text-brand-navy rounded-2xl flex items-center justify-center mb-10">
                  <FileText size={32} />
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase mb-6 tracking-tighter">
                  {t.sanctuary.accreditationTypes.media.title}
                </h3>
                <p className="font-body text-xl text-brand-navy/60 leading-relaxed mb-12">
                  {t.sanctuary.accreditationTypes.media.description}
                </p>
              </div>
              <button 
                onClick={() => onApplyWithTrack?.('media')}
                className="group w-full flex items-center justify-between bg-brand-navy text-white p-6 rounded-2xl hover:bg-brand-coral transition-all"
              >
                <span className="editorial-label tracking-[0.3em] font-bold uppercase">{t.sanctuary.accreditationTypes.media.cta}</span>
                <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. ACCESS CLARITY BLOCK */}
      <section className="py-40 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={isRTL ? 'lg:order-2' : ''}>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-12">
                {t.sanctuary.accessClarity.title}
              </h2>
              <ul className="space-y-6">
                {t.sanctuary.accessClarity.items.map((item: string, i: number) => (
                  <li key={i} className={`flex items-center gap-4 text-xl text-white/80 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-brand-coral/20 flex items-center justify-center text-brand-coral shrink-0">
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-10 md:p-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] ${isRTL ? 'lg:order-1' : ''}`}>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-coral uppercase mb-10 tracking-widest">
                {t.sanctuary.accessClarity.notTitle}
              </h3>
              <ul className="space-y-6">
                {t.sanctuary.accessClarity.notItems.map((item: string, i: number) => (
                  <li key={i} className={`flex items-center gap-4 text-lg text-white/40 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <header className={`mb-24 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="editorial-label text-brand-coral mb-8 block tracking-[0.5em] font-bold">{t.sanctuary.concept.label}</span>
            <h2 className="editorial-h2 leading-none">{t.sanctuary.concept.title} <span className="text-brand-coral italic">{t.sanctuary.concept.titleHighlight}</span></h2>
          </header>
          
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <p className="font-body text-2xl text-brand-navy/60 leading-relaxed font-medium">{t.sanctuary.concept.desc1}</p>
              <p className="font-body text-xl text-brand-navy/40 leading-relaxed">{t.sanctuary.concept.desc2}</p>
              <div className="grid grid-cols-2 gap-6">
                {t.sanctuary.concept.features.map((feature: string, i: number) => (
                  <div key={i} className={`flex items-center gap-3 p-4 bg-warm-beige/30 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Sparkles size={14} className="text-brand-coral" />
                    <span className="editorial-label text-[10px] uppercase font-bold tracking-widest">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-brand-navy/5">
               <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <BrandLogo className="w-1/2 h-1/2" />
               </div>
               <div className="absolute inset-0 pixel-grid" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-40 bg-warm-beige/10 border-t border-brand-navy/5">
        <div className="max-w-4xl mx-auto px-6">
           <span className="editorial-label text-brand-navy/30 mb-12 block text-center uppercase font-bold tracking-[0.4em]">{t.sanctuary.faq.label}</span>
           <div className="space-y-12">
             {t.sanctuary.faq.items.map((faq: any, i: number) => (
               <div key={i} className={`group ${isRTL ? 'text-right' : ''}`}>
                  <h4 className="font-display font-bold text-xl text-brand-navy uppercase mb-4 tracking-tight group-hover:text-brand-coral transition-colors">{faq.q}</h4>
                  <p className="font-body text-brand-navy/50 leading-relaxed text-lg">{faq.a}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* FOOTER CALL */}
      <section className="py-20 bg-white text-center border-t border-brand-navy/5">
         <p className="editorial-label tracking-[0.5em] text-brand-navy/20 uppercase">{t.sanctuary.footerCode}</p>
      </section>
    </div>
  );
};
