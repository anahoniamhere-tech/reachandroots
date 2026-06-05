import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ticket, Check, ArrowRight, User, Phone, MapPin, 
  CreditCard, Calendar, Info, Star, ShieldCheck,
  ChevronLeft, Users, Mail, Globe, Zap, X, ChevronRight, ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { TICKET_TIERS, EVENT_DAYS } from '../constants';
import { TicketTier, EventDay, BuyerInfo, VipDetails } from '../types';
import { BrandLogo } from './BrandingIcons';

interface TicketsPageProps {
  onComplete: (data: { tier: TicketTier, day: EventDay | 'all', quantity: number, buyerInfo: BuyerInfo, vipDetails?: VipDetails }) => void;
  onBack: () => void;
}

type Step = 'selection' | 'day-selection' | 'details' | 'summary';

export const TicketsPage: React.FC<TicketsPageProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<Step>('selection');
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [selectedDay, setSelectedDay] = useState<EventDay | 'all'>('Friday');
  const [quantity, setQuantity] = useState(1);
  const { t, isRTL } = useLanguage();
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    fullName: '', email: '', phone: '', country: 'Lebanon', city: 'Tripoli', language: 'en'
  });
  const [vipDetails, setVipDetails] = useState<VipDetails>({
    dietaryPreference: 'None', welcomeKitName: ''
  });

  const handleTierSelect = (tier: TicketTier) => {
    setSelectedTier(tier);
    if (tier.duration === 'single') {
      setStep('day-selection');
    } else {
      setSelectedDay('all');
      setStep('details');
    }
  };

  const handleDaySelect = (day: EventDay) => {
    setSelectedDay(day);
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('summary');
  };

  const handleFinalSubmit = () => {
    if (selectedTier) {
      onComplete({
        tier: selectedTier,
        day: selectedDay,
        quantity,
        buyerInfo,
        vipDetails: selectedTier.isVip ? vipDetails : undefined
      });
    }
  };

  const goBack = () => {
    if (step === 'summary') setStep('details');
    else if (step === 'details') {
      if (selectedTier?.duration === 'single') setStep('day-selection');
      else setStep('selection');
    }
    else if (step === 'day-selection') setStep('selection');
    else onBack();
  };

  return (
    <div className={`min-h-screen bg-warm-beige/35 backdrop-blur-3xl pt-32 pb-40 px-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1400px] mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className={`mb-12 flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
           <button 
             onClick={goBack}
             className="w-12 h-12 rounded-full border border-brand-navy/5 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-all shadow-sm"
           >
             {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
           </button>
           <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`editorial-label ${step === 'selection' ? 'text-brand-coral' : 'text-brand-navy/20'}`}>01 {t.tickets.steps.s1}</span>
              <div className="w-4 h-px bg-brand-navy/10" />
              <span className={`editorial-label ${step === 'day-selection' || (step !== 'selection' && selectedTier?.duration === 'single') ? 'text-brand-coral' : 'text-brand-navy/20'}`}>02 {t.tickets.steps.s2}</span>
              <div className="w-4 h-px bg-brand-navy/10" />
              <span className={`editorial-label ${step === 'details' ? 'text-brand-coral' : 'text-brand-navy/20'}`}>03 {t.tickets.steps.s3}</span>
              <div className="w-4 h-px bg-brand-navy/10" />
              <span className={`editorial-label ${step === 'summary' ? 'text-brand-coral' : 'text-brand-navy/20'}`}>04 {t.tickets.steps.s4}</span>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-20"
            >
              {/* Hero Section */}
              <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                <BrandLogo variant="banner" className="h-56 sm:h-72 md:h-96 lg:h-[420px] w-auto mb-16 hover:scale-105 transition-transform duration-500 pointer-events-none" />
                <span className="editorial-label text-brand-coral mb-6 block tracking-[0.5em] uppercase font-bold">{t.tickets.label}</span>
                <h1 className="editorial-h1 mb-8 leading-[0.85] tracking-tighter uppercase">
                  {t.tickets.title} <br /><span className="text-brand-coral">{t.tickets.titleHighlight}</span>
                </h1>
                <p className="font-body text-xl md:text-2xl text-brand-navy/60 leading-tight mb-12 max-w-2xl mx-auto">
                  {t.tickets.description}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-0.5 w-12 bg-brand-navy/10" />
                  <span className="editorial-label text-brand-navy/30 uppercase tracking-[0.3em]">{t.tickets.scroll}</span>
                  <div className="h-0.5 w-12 bg-brand-navy/10" />
                </div>
              </div>

              {/* Tickets Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {TICKET_TIERS.map((tier) => (
                  <motion.div
                    key={tier.id}
                    whileHover={{ y: -10 }}
                    className={`media-card p-8 flex flex-col h-full bg-white relative group border transition-all duration-500 ${tier.badge ? 'ring-1 ring-brand-coral/20' : 'border-brand-navy/5'}`}
                  >
                    {tier.badge && (
                      <div className={`absolute top-6 ${isRTL ? 'left-8' : 'right-8'} bg-brand-coral text-white px-3 py-1 rounded-full editorial-label font-bold tracking-widest z-10 shadow-lg`}>
                        {tier.id === 'pass-early' ? t.tickets.badges.limited : 
                         tier.id === 'vip-all' ? t.tickets.badges.premium : 
                         tier.badge}
                      </div>
                    )}

                    <div className="mb-10">
                      <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm ${tier.isVip ? 'bg-brand-gold/10 text-brand-gold' : 'bg-brand-navy/5 text-brand-navy'}`}>
                            {tier.isVip ? <Star size={16} fill="currentColor" /> : <Ticket size={16} />}
                         </div>
                         <span className="editorial-label text-brand-navy/30 uppercase tracking-widest">
                           {tier.duration === 'single' ? t.tickets.tiers.single : t.tickets.tiers.pass}
                         </span>
                      </div>
                      <h3 className={`font-display font-bold text-3xl text-brand-navy uppercase tracking-tighter leading-none mb-4 group-hover:text-brand-coral transition-colors ${isRTL ? 'text-right' : ''}`}>
                        {tier.name}
                      </h3>
                      <p className={`font-body text-brand-navy/50 text-sm leading-relaxed italic ${isRTL ? 'text-right' : ''}`}>{tier.description}</p>
                    </div>

                    <div className={`mb-12 pt-8 border-t border-brand-navy/5 flex items-baseline gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                       <span className="font-display font-bold text-5xl text-brand-navy group-hover:text-brand-coral transition-colors tracking-tighter">${tier.price}</span>
                       <span className="editorial-label opacity-20 uppercase tracking-widest">USD</span>
                    </div>

                    <div className="flex-grow space-y-6 mb-16">
                       <div className={isRTL ? 'text-right' : ''}>
                          <p className={`editorial-label text-brand-navy/40 uppercase font-bold mb-4 tracking-widest`}>{t.tickets.tiers.includes}</p>
                          <div className="space-y-3">
                            {tier.includes.slice(0, 5).map((inc, i) => (
                              <div key={i} className={`flex gap-3 items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Check size={12} className="text-brand-coral mt-0.5 shrink-0" />
                                <span className={`font-body text-[13px] text-brand-navy/70 leading-tight ${isRTL ? 'text-right' : ''}`}>{inc}</span>
                              </div>
                            ))}
                          </div>
                       </div>
                       
                       {tier.excludes && tier.excludes.length > 0 && (
                         <div className={isRTL ? 'text-right' : ''}>
                            <p className="editorial-label text-[10px] text-brand-navy/40 uppercase font-bold mb-4 tracking-widest">{t.tickets.tiers.excludes}</p>
                            <div className="space-y-3">
                              {tier.excludes.slice(0, 3).map((exc, i) => (
                                <div key={i} className={`flex gap-3 items-start opacity-40 grayscale ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <X size={12} className="text-brand-navy mt-0.5 shrink-0" />
                                  <span className={`font-body text-[13px] text-brand-navy/70 leading-tight line-through ${isRTL ? 'text-right' : ''}`}>{exc}</span>
                                </div>
                              ))}
                            </div>
                         </div>
                       )}
                    </div>

                    <button 
                      onClick={() => handleTierSelect(tier)}
                      className={`w-full py-5 rounded-2xl font-display font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-xl active:scale-[0.98] ${tier.isVip ? 'bg-brand-navy text-white hover:bg-brand-coral' : 'bg-brand-coral text-white hover:bg-brand-navy'}`}
                    >
                      {tier.isVip ? t.tickets.tiers.secureVip : t.tickets.tiers.select}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'day-selection' && (
            <motion.div
              key="day-selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                 <span className="editorial-label text-brand-coral mb-6 block tracking-[0.5em] uppercase font-bold">{t.tickets.days.label}</span>
                 <h2 className="editorial-h2 mb-6">{t.tickets.days.title} <span className="text-brand-coral italic">{t.tickets.days.titleHighlight}</span></h2>
                 <p className="font-body text-xl text-brand-navy/50">{t.tickets.days.description}</p>
              </div>

              <div className="grid gap-6">
                {EVENT_DAYS.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => handleDaySelect(day.id as EventDay)}
                    className={`group flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-white ring-1 ring-brand-navy/5 rounded-[2.5rem] hover:ring-brand-coral/30 hover:shadow-2xl transition-all duration-500 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`flex items-center gap-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                       <div className="w-20 h-20 bg-warm-beige rounded-3xl flex flex-col items-center justify-center group-hover:bg-brand-coral group-hover:text-white transition-all shadow-inner">
                          <span className="font-display font-bold text-3xl leading-none">{day.date.split(' ')[1].replace(',', '')}</span>
                          <span className="editorial-label text-[24px] uppercase tracking-widest">
                            {isRTL ? (
                              day.id === 'Friday' ? 'أكتوبر' : 'أكتوبر' // Simplify if unsure, but usually date parts are localized
                            ) : day.date.split(' ')[0]}
                          </span>
                       </div>
                       <div className={isRTL ? 'text-right' : ''}>
                          <span className={`editorial-label text-brand-coral mb-2 block tracking-widest uppercase`}>{t.tickets.days.sequence} // 0{EVENT_DAYS.indexOf(day) + 1}</span>
                          <h4 className="font-display font-bold text-4xl text-brand-navy uppercase tracking-tighter mb-4 group-hover:text-brand-coral transition-colors">
                            {isRTL ? (day.id === 'Friday' ? 'الجمعة' : day.id === 'Saturday' ? 'السبت' : 'الأحد') : day.id}
                          </h4>
                          <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                             {day.themes.map((theme, i) => (
                               <span key={i} className="px-3 py-1 bg-brand-navy/5 text-brand-navy/40 editorial-label uppercase tracking-widest rounded-full">{theme}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                    <div className={`mt-8 md:mt-0 w-16 h-16 rounded-full border border-brand-navy/5 flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-all ${isRTL ? 'rotate-180' : ''}`}>
                       <ArrowRight size={24} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                 <span className="editorial-label text-brand-coral mb-6 block tracking-[0.5em] uppercase font-bold">{t.tickets.form.label}</span>
                 <h2 className="editorial-h2 mb-6 tracking-tighter">{t.tickets.form.title} <span className="text-brand-coral italic">{t.tickets.form.titleHighlight}</span></h2>
                 <p className="font-body text-xl text-brand-navy/50">{t.tickets.form.description}</p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-12">
                 <div className="grid md:grid-cols-2 gap-8 p-12 bg-warm-beige/20 rounded-[3rem] border border-brand-navy/5">
                    <div className="space-y-3 group">
                       <label className={`editorial-label text-brand-navy/40 ${isRTL ? 'mr-4' : 'ml-4'} group-focus-within:text-brand-coral transition-colors block`}>{t.tickets.form.name}</label>
                       <div className="relative">
                          <div className={`absolute ${isRTL ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-brand-navy/20 group-focus-within:text-brand-coral transition-colors`}><User size={16} /></div>
                          <input 
                            required
                            type="text" 
                            placeholder="Samir Kasir"
                            className={`w-full bg-white border border-brand-navy/5 rounded-2xl py-5 ${isRTL ? 'pr-14 pl-8 text-right' : 'pl-14 pr-8'} font-display font-medium text-brand-navy placeholder:text-brand-navy/20 focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral/50 outline-none transition-all shadow-sm`}
                            value={buyerInfo.fullName}
                            onChange={(e) => setBuyerInfo({...buyerInfo, fullName: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-3 group">
                       <label className={`editorial-label text-brand-navy/40 ${isRTL ? 'mr-4' : 'ml-4'} group-focus-within:text-brand-coral transition-colors block`}>{t.tickets.form.email}</label>
                       <div className="relative">
                          <div className={`absolute ${isRTL ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-brand-navy/20 group-focus-within:text-brand-coral transition-colors`}><Mail size={16} /></div>
                          <input 
                            required
                            type="email" 
                            placeholder="samir@rootsandreach.org"
                            className={`w-full bg-white border border-brand-navy/5 rounded-2xl py-5 ${isRTL ? 'pr-14 pl-8 text-right' : 'pl-14 pr-8'} font-display font-medium text-brand-navy placeholder:text-brand-navy/20 focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral/50 outline-none transition-all shadow-sm`}
                            value={buyerInfo.email}
                            onChange={(e) => setBuyerInfo({...buyerInfo, email: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-3 group">
                       <label className={`editorial-label text-brand-navy/40 ${isRTL ? 'mr-4' : 'ml-4'} group-focus-within:text-brand-coral transition-colors block`}>{t.tickets.form.phone}</label>
                       <div className="relative">
                          <div className={`absolute ${isRTL ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-brand-navy/20 group-focus-within:text-brand-coral transition-colors`}><Phone size={16} /></div>
                          <input 
                            required
                            type="tel" 
                            placeholder="+961 70 000 000"
                            className={`w-full bg-white border border-brand-navy/5 rounded-2xl py-5 ${isRTL ? 'pr-14 pl-8 text-right' : 'pl-14 pr-8'} font-display font-medium text-brand-navy placeholder:text-brand-navy/20 focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral/50 outline-none transition-all shadow-sm`}
                            value={buyerInfo.phone}
                            onChange={(e) => setBuyerInfo({...buyerInfo, phone: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-3 group">
                       <label className={`editorial-label text-brand-navy/40 ${isRTL ? 'mr-4' : 'ml-4'} group-focus-within:text-brand-coral transition-colors block`}>{t.tickets.form.quantity}</label>
                       <div className="relative">
                          <div className={`absolute ${isRTL ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-brand-navy/20 group-focus-within:text-brand-coral transition-colors`}><Users size={16} /></div>
                          <select 
                            className={`w-full bg-white border border-brand-navy/5 rounded-2xl py-5 ${isRTL ? 'pr-14 pl-8 text-right' : 'pl-14 pr-8'} font-display font-medium text-brand-navy appearance-none focus:ring-2 focus:ring-brand-coral/20 focus:border-brand-coral/50 outline-none transition-all shadow-sm`}
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                          >
                            {[1,2,3,4,5,6].map(n => (
                              <option key={n} value={n}>
                                {n} {n > 1 ? t.tickets.form.tickets : t.tickets.form.ticket}
                              </option>
                            ))}
                          </select>
                          <div className={`absolute ${isRTL ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 pointer-events-none opacity-20`}><ArrowRight size={14} className="rotate-90" /></div>
                       </div>
                    </div>
                 </div>

                 {selectedTier?.isVip && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }} 
                     animate={{ opacity: 1, y: 0 }}
                     className="space-y-10 p-12 bg-brand-gold/5 rounded-[3rem] border border-brand-gold/20"
                   >
                      <h3 className={`editorial-label text-brand-gold tracking-[0.4em] uppercase font-bold border-b border-brand-gold/10 pb-4 mb-4 ${isRTL ? 'text-right' : ''}`}>{t.tickets.form.vipLabel}</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3 group">
                           <label className={`editorial-label text-[11px] text-brand-navy/40 ${isRTL ? 'mr-4' : 'ml-4'} group-focus-within:text-brand-gold transition-colors block`}>{t.tickets.form.dietary}</label>
                           <select 
                             className={`w-full bg-white border border-brand-navy/5 rounded-2xl py-5 px-8 font-display font-medium text-brand-navy appearance-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold/50 outline-none transition-all shadow-sm ${isRTL ? 'text-right' : ''}`}
                             value={vipDetails.dietaryPreference}
                             onChange={(e) => setVipDetails({...vipDetails, dietaryPreference: e.target.value})}
                           >
                             <option>Classic Selection</option>
                             <option>Vegetarian Narrative</option>
                             <option>Vegan Protocol</option>
                             <option>Celiac Sensitive</option>
                           </select>
                        </div>
                        <div className="space-y-3 group">
                           <label className={`editorial-label text-[11px] text-brand-navy/40 ${isRTL ? 'mr-4' : 'ml-4'} group-focus-within:text-brand-gold transition-colors block`}>{t.tickets.form.kit}</label>
                           <input 
                             type="text" 
                             placeholder={t.tickets.form.kitPlaceholder}
                             className={`w-full bg-white border border-brand-navy/5 rounded-2xl py-5 px-8 font-display font-medium text-brand-navy placeholder:text-brand-navy/20 focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold/50 outline-none transition-all shadow-sm ${isRTL ? 'text-right' : ''}`}
                             value={vipDetails.welcomeKitName}
                             onChange={(e) => setVipDetails({...vipDetails, welcomeKitName: e.target.value})}
                           />
                        </div>
                      </div>
                   </motion.div>
                 )}

                 <div className="flex justify-center">
                    <button 
                      type="submit"
                      className={`group flex items-center gap-6 bg-brand-navy text-white px-16 py-6 rounded-full hover:bg-brand-coral transition-all duration-500 shadow-2xl relative overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="editorial-label text-white tracking-[0.4em] relative z-10">{t.tickets.form.submit}</span>
                      <ArrowRight size={18} className={`relative z-10 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
                    </button>
                 </div>
              </form>
            </motion.div>
          )}

          {step === 'summary' && selectedTier && (
             <motion.div
               key="summary"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="max-w-4xl mx-auto"
             >
                <div className="text-center mb-16">
                   <span className="editorial-label text-brand-coral mb-6 block tracking-[0.5em] uppercase font-bold">{t.tickets.summary.label}</span>
                   <h2 className="editorial-h2 mb-4 tracking-tighter capitalize leading-none">{t.tickets.summary.title} <span className="text-brand-coral italic">{t.tickets.summary.titleHighlight}</span></h2>
                   <p className="font-body text-xl text-brand-navy/50">{t.tickets.summary.description}</p>
                </div>

                <div className="bg-white p-12 rounded-[4rem] border border-brand-navy/5 architectural-shadow relative overflow-hidden mb-16">
                   <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
                   <div className={`absolute top-[-10%] ${isRTL ? 'left-[-10%]' : 'right-[-10%]'} w-1/2 h-1/2 opacity-[0.05] pointer-events-none grayscale flex items-center justify-center`}>
                      <div className="w-[80%] h-[80%] border-[20px] border-brand-navy rounded-full flex items-center justify-center font-display italic text-[150px]">R</div>
                   </div>

                   <div className="relative z-10">
                      <div className={`flex flex-col md:flex-row justify-between mb-16 items-start gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                         <div className={isRTL ? 'text-right' : 'text-left'}>
                            <span className="editorial-label text-brand-coral mb-4 block uppercase font-bold tracking-[0.4em]">{t.tickets.summary.identified}</span>
                            <h3 className="font-display font-bold text-5xl text-brand-navy uppercase tracking-tighter leading-none mb-3">{selectedTier.name}</h3>
                            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                               <div className={`flex items-center gap-2 text-brand-navy/40 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <Calendar size={12} />
                                  <span className="editorial-label uppercase tracking-widest">{selectedDay === 'all' ? t.tickets.summary.allDays : (isRTL ? (selectedDay === 'Friday' ? 'الجمعة' : selectedDay === 'Saturday' ? 'السبت' : 'الأحد') : selectedDay)}</span>
                               </div>
                               <div className="w-1 h-1 bg-brand-navy/10 rounded-full" />
                               <div className={`flex items-center gap-2 text-brand-navy/40 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <Users size={12} />
                                  <span className="editorial-label uppercase tracking-widest">{quantity} {t.tickets.summary.attendees}</span>
                               </div>
                            </div>
                         </div>
                         <div className={isRTL ? 'text-left' : 'text-right'}>
                            <span className="editorial-label text-brand-navy/30 mb-2 block uppercase font-bold tracking-[0.4em]">{t.tickets.summary.total}</span>
                            <p className="font-display font-bold text-6xl text-brand-navy tracking-tighter leading-none">${selectedTier.price * quantity}</p>
                            <span className="editorial-label opacity-20 uppercase tracking-widest">{t.tickets.summary.calculated}</span>
                         </div>
                      </div>

                      <div className={`grid md:grid-cols-2 gap-16 border-t border-brand-navy/5 pt-12`}>
                         <div className={isRTL ? 'text-right' : 'text-left'}>
                            <span className="editorial-label text-brand-navy/30 mb-6 block uppercase font-bold tracking-[0.4em]">{t.tickets.summary.manifest}</span>
                            <div className="space-y-4">
                               <div className={`flex justify-between items-baseline py-1 border-b border-brand-navy/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <span className="editorial-label text-brand-navy/40">{t.tickets.summary.name}</span>
                                  <span className="font-display font-bold text-lg text-brand-navy uppercase tracking-tight">{buyerInfo.fullName}</span>
                                </div>
                               <div className={`flex justify-between items-baseline py-1 border-b border-brand-navy/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <span className="editorial-label text-brand-navy/40">{t.tickets.summary.signal}</span>
                                  <span className="font-body text-brand-navy italic">{buyerInfo.email}</span>
                               </div>
                               <div className={`flex justify-between items-baseline py-1 border-b border-brand-navy/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <span className="editorial-label text-brand-navy/40">{t.tickets.summary.origin}</span>
                                  <span className="editorial-label text-brand-navy uppercase tracking-wider">{buyerInfo.city}, {buyerInfo.country}</span>
                               </div>
                            </div>
                         </div>
                         
                         <div className={`p-8 bg-warm-beige/30 rounded-[2.5rem] border border-brand-navy/5 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                               <ShieldCheck size={20} className="text-brand-coral" />
                               <span className="editorial-label text-brand-navy uppercase font-bold tracking-widest">{t.tickets.summary.secure}</span>
                            </div>
                            <p className="font-body text-xs text-brand-navy/50 leading-relaxed italic mb-0">
                               {t.tickets.summary.disclaimer}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex justify-center">
                    <button 
                      onClick={handleFinalSubmit}
                      className="group flex flex-col items-center gap-4 bg-brand-navy text-white px-20 py-8 rounded-[3rem] hover:bg-brand-coral transition-all duration-700 shadow-2xl active:scale-[0.98] relative overflow-hidden w-full md:w-auto"
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`flex items-center gap-6 mb-2 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="font-display font-bold text-4xl uppercase tracking-tighter">{t.tickets.summary.finalize}</span>
                        <ArrowRight size={24} className={`${isRTL ? 'rotate-180 group-hover:-translate-x-3' : 'group-hover:translate-x-3'} transition-transform duration-500`} />
                      </div>
                      <span className="editorial-label text-white/40 tracking-[0.4em] uppercase relative z-10">{t.tickets.summary.redirect}</span>
                    </button>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
;
