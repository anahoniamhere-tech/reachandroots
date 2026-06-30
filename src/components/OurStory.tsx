import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Globe, MapPin, Calendar, Sparkles, Coffee, 
  Utensils, Users, Target, ArrowRight, Zap, 
  Waves, Heart, Bookmark, Landmark,
  Compass, Palette, MessageCircle, Ticket,
  Mic2, Share2, Award, Activity
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

// New richer imagery
import Tripoli_Souks from '../assets/Tripoli_Souks.png';
import WhoAreWe1 from '../assets/Whoarewe_image1.webp';
import WhoAreWe2 from '../assets/Whoarewe_image2.webp';
import Vision1 from '../assets/Vision_image1.webp';
import Vision2 from '../assets/Vision_Image2.webp';
import Mission1 from '../assets/Mission_image1.webp';
import HeroImage from '../assets/gallery_fair_aerial.jpg';



export const OurStory = ({ onNavigate }: { onNavigate: (v: any) => void }) => {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div id="about" className="relative w-full bg-brand-navy" ref={containerRef}>
      
      {/* 0. HERO SECTION */}
      <section className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-brand-navy">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0 bg-brand-navy/70 z-10" />
          <img src={WhoAreWe1} alt="Roots & Reach" className="w-full h-full object-cover object-center" />
        </motion.div>
        
        <div className="relative z-20 text-center px-6 flex flex-col items-center" dir={isRTL ? 'rtl' : 'ltr'}>
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 40 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
           >
             <h1 
               className="font-bold text-6xl md:text-8xl lg:text-[12rem] text-warm-beige lowercase tracking-tighter leading-[0.8] mb-8"
               style={{ fontFamily: '"Space Grotesk", sans-serif' }}
               dir="ltr"
             >
                roots <br className="md:hidden" /><span className="text-brand-coral italic font-normal">&</span> reach
             </h1>
             <p className="font-body text-xl md:text-3xl text-warm-beige/80 max-w-2xl mx-auto leading-relaxed">
               {isRTL ? 'مجتمع إبداعي يروي القصص ويصنع التأثير.' : 'A creative community telling stories and making an impact.'}
             </p>
           </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-60"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="editorial-label text-white uppercase tracking-widest text-[9px]">Scroll</span>
          <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-brand-coral rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* 1. Who We Are */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-warm-beige" dir={isRTL ? 'rtl' : 'ltr'}>
        
        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-20">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-start"
          >
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-[8rem] lowercase tracking-tighter text-brand-navy leading-[0.8] mb-4 md:mb-6">
              {t.story.companyInfo?.whoWeAre?.title}
            </h2>
            <h3 className="font-arabic font-bold text-2xl md:text-4xl lg:text-5xl text-brand-coral leading-tight mb-8 md:mb-12">
              {t.story.companyInfo?.whoWeAre?.subtitle}
            </h3>
            
            <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-xl max-w-xl ring-1 ring-white/50">
              <p className="font-body font-medium text-xl md:text-2xl lg:text-3xl text-brand-navy leading-relaxed">
                {t.story.companyInfo?.whoWeAre?.desc}
              </p>
            </div>
          </motion.div>

          {/* Parallax Image Collage */}
          <div className="relative w-full h-[500px] md:h-[600px] flex justify-center items-center">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-2/3 h-[70%] rounded-3xl overflow-hidden shadow-2xl z-10`}
            >
              <img src={WhoAreWe1} alt="Who We Are" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className={`absolute bottom-0 ${isRTL ? 'left-10' : 'right-10'} w-1/2 h-[50%] rounded-3xl overflow-hidden shadow-2xl z-20 ring-4 ring-white/50`}
            >
              <img src={WhoAreWe2} alt="City" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            {/* Decorative Shape */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`absolute top-1/2 ${isRTL ? 'left-0' : 'right-0'} w-24 h-24 bg-brand-coral/20 rounded-full blur-xl z-0`}
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
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
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300 ring-1 ring-white/50"
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

      {/* Wave Transition (Beige to Coral) */}
      <div className="w-full overflow-hidden leading-none rotate-180 bg-brand-coral">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px] fill-warm-beige">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* 2. Vision (Alternating Layout) */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-brand-coral" dir={isRTL ? 'rtl' : 'ltr'}>

        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-20">
          
          {/* Parallax Image Collage (Appears First Logically to Alternate) */}
          <div className={`relative w-full h-[500px] md:h-[600px] flex justify-center items-center order-2 lg:order-1`}>
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-2/3 h-[80%] rounded-3xl overflow-hidden shadow-2xl z-10`}
            >
              <img src={Vision1} alt="Vision" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className={`absolute bottom-0 ${isRTL ? 'right-10' : 'left-10'} w-[45%] h-[45%] rounded-3xl overflow-hidden shadow-2xl z-20 ring-4 ring-white/50`}
            >
              <img src={Vision2} alt="Community" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-start order-1 lg:order-2"
          >
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-[9rem] lowercase tracking-tighter text-brand-navy leading-[0.8] mb-2 md:mb-4">
              {t.story.companyInfo?.vision?.title}
            </h2>
            <h3 className="font-arabic font-bold text-2xl md:text-4xl lg:text-6xl text-brand-navy/80 leading-tight mb-8 md:mb-12">
              {t.story.companyInfo?.vision?.subtitle}
            </h3>
            
            <div className="bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-xl max-w-xl ring-1 ring-white/50">
              <p className="font-body font-bold text-xl md:text-2xl lg:text-3xl text-brand-navy leading-relaxed">
                {t.story.companyInfo?.vision?.desc}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Pillars (Redesigned) */}
        <div className="max-w-4xl mx-auto w-full relative z-20 mt-16">
          {/* Vertical Line */}
          <div className={`absolute top-0 bottom-0 w-1 bg-brand-navy/10 ${isRTL ? 'right-10 translate-x-[4px]' : 'left-10 -translate-x-[4px]'} md:left-1/2 md:-translate-x-1/2 rounded-full`} />
          
          {[
            { icon: Users, text: t.story.companyInfo?.vision?.pillars?.p1, color: 'text-brand-navy', bg: 'bg-[#fcd07a]', desc: isRTL ? 'خلق مساحة للإبداع والابتكار في طرابلس' : 'Fostering spaces for creativity and innovation in Tripoli' },
            { icon: Palette, text: t.story.companyInfo?.vision?.pillars?.p2, color: 'text-brand-navy', bg: 'bg-[#FF8072]', desc: isRTL ? 'دعم وتمكين المواهب المحلية الشابة' : 'Supporting and empowering young local talents' },
            { icon: Globe, text: t.story.companyInfo?.vision?.pillars?.p3, color: 'text-brand-navy', bg: 'bg-[#80AEF4]', desc: isRTL ? 'تعزيز الحضور الثقافي وتبادل الخبرات' : 'Enhancing cultural presence and knowledge exchange' },
            { icon: Sparkles, text: t.story.companyInfo?.vision?.pillars?.p4, color: 'text-brand-navy', bg: 'bg-[#7A9178]', desc: isRTL ? 'بناء مسار نحو نمو مستدام وتأثير إيجابي' : 'Building a path toward sustainable growth and impact' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className={`relative flex items-center mb-16 last:mb-0 ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              {/* Center Node */}
              <div className={`absolute ${isRTL ? 'right-10 translate-x-1/2' : 'left-10 -translate-x-1/2'} md:left-1/2 md:right-auto md:-translate-x-1/2 w-12 h-12 rounded-full ${item.bg} border-4 border-white shadow-lg flex items-center justify-center z-10 transition-transform duration-300 hover:scale-125`}>
                <item.icon size={20} className={item.color} />
              </div>
              
              {/* Content Box */}
              <div className={`w-full md:w-1/2 ${isRTL ? 'pr-24 md:pr-0 md:pl-12' : 'pl-24 md:pl-0 md:pr-12'} ${i % 2 === 0 ? (isRTL ? 'md:text-left' : 'md:text-right') : (isRTL ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:text-left')}`}>
                 <div className={`bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl ring-1 ring-white/50 hover:bg-white hover:-translate-y-1 transition-all duration-300`}>
                   <h4 className="font-display font-bold text-2xl text-brand-navy mb-2">{item.text}</h4>
                   <p className="font-body text-brand-navy/60 leading-relaxed text-sm">{item.desc}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wave Transition (Pink to Blue) */}
      <div className="w-full overflow-hidden leading-none rotate-180 bg-brand-sky">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px] fill-brand-pink">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* 3. Mission */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center bg-brand-sky" dir={isRTL ? 'rtl' : 'ltr'}>

        <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 relative z-20">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-start"
          >
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-[9rem] lowercase tracking-tighter text-brand-navy leading-[0.8] mb-2 md:mb-4">
              {t.story.companyInfo?.mission?.title}
            </h2>
            <h3 className="font-arabic font-bold text-2xl md:text-4xl lg:text-5xl text-brand-coral leading-tight mb-8 md:mb-12">
              {t.story.companyInfo?.mission?.subtitle}
            </h3>
            
            <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-xl max-w-xl ring-1 ring-white/50 relative">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`absolute -top-6 ${isRTL ? 'left-8' : 'right-8'} w-16 h-2 bg-brand-navy rounded-full origin-right`} 
              />
              <p className="font-body font-bold text-xl md:text-2xl lg:text-3xl text-brand-navy leading-relaxed">
                {t.story.companyInfo?.mission?.desc}
              </p>
            </div>
          </motion.div>

          {/* Parallax Image Collage */}
          <div className="relative w-full h-[500px] md:h-[600px] flex justify-center items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <img src={Mission1} alt="Mission" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className={`absolute top-[-2rem] ${isRTL ? 'right-10' : 'left-10'} w-32 h-32 bg-[#759078] rounded-full z-0 opacity-80 blur-xl`} 
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
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
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300 ring-1 ring-white/50"
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



      {/* 4. Social Proof & Community */}
      <section className="relative py-24 md:py-32 w-full bg-brand-navy overflow-hidden">
        {/* Ticker */}
        <div className="flex whitespace-nowrap overflow-hidden mb-20 opacity-40">
           <motion.div 
             className="flex gap-8 text-5xl md:text-7xl font-display font-bold uppercase tracking-widest text-warm-beige"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ ease: "linear", duration: 30, repeat: Infinity }}
           >
              {Array.from({ length: 4 }).map((_, i) => (
                <React.Fragment key={i}>
                  <span>{isRTL ? 'إبداع' : 'Creativity'}</span>
                  <span className="text-brand-coral">✦</span>
                  <span>{isRTL ? 'مجتمع' : 'Community'}</span>
                  <span className="text-brand-coral">✦</span>
                  <span>{isRTL ? 'تأثير' : 'Impact'}</span>
                  <span className="text-brand-coral">✦</span>
                  <span>{isRTL ? 'طرابلس' : 'Tripoli'}</span>
                  <span className="text-brand-coral">✦</span>
                </React.Fragment>
              ))}
           </motion.div>
        </div>


      </section>

    </div>
  );
};
