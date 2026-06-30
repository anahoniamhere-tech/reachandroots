import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export const FloatingCountdown = ({ onClick }: { onClick?: () => void }) => {
  const { isRTL } = useLanguage();
  
  const targetDate = new Date('2026-07-06T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      onClick={onClick}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 z-[100] bg-brand-navy/95 backdrop-blur-md text-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-4 md:gap-8 border border-white/10 scale-90 md:scale-100 origin-bottom-right transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-95 md:hover:scale-105 hover:bg-brand-navy hover:shadow-brand-coral/20' : ''}`} 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
       <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
       
       <div className={`relative z-10 text-center ${isRTL ? 'md:text-right' : 'md:text-left'} block`}>
         <span className="editorial-label text-brand-coral mb-0.5 block tracking-widest text-[9px] md:text-[10px] uppercase font-bold">
           {isRTL ? 'انضم لرحلة د. يزيد' : "Join Dr. Yazeed's Journey"}
         </span>
         <h3 className="font-display font-bold text-sm md:text-xl uppercase tracking-tighter whitespace-nowrap">July 6, 2026</h3>
       </div>
       
       <div className="relative z-10 flex gap-2 md:gap-4 text-center" dir="ltr">
          {[
            { label: isRTL ? 'يوم' : 'DAYS', value: timeLeft.days.toString().padStart(2, '0') },
            { label: isRTL ? 'ساعة' : 'HOURS', value: timeLeft.hours.toString().padStart(2, '0') },
            { label: isRTL ? 'دقيقة' : 'MINS', value: timeLeft.minutes.toString().padStart(2, '0') },
            { label: isRTL ? 'ثانية' : 'SECS', value: timeLeft.seconds.toString().padStart(2, '0') },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
               <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/5 mb-1 md:mb-2">
                  <span className="font-display font-bold text-xl md:text-2xl text-white">{item.value}</span>
               </div>
               <span className="font-mono text-[8px] md:text-[10px] text-white/50 tracking-widest uppercase">{item.label}</span>
            </div>
          ))}
       </div>
    </div>
  );
};
