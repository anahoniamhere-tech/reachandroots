import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, CheckCircle2, Send, Instagram, Video, Youtube, 
  MapPin, User, Mail, Phone, Globe, Briefcase, MessageSquare,
  Link as LinkIcon, Users, FileText, Activity, Star, ArrowRight,
  Target, Camera
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface CreatorPassApplyPageProps {
  onBack: () => void;
  selectedTrack?: string | null;
}

export const SanctuaryApplyPage: React.FC<CreatorPassApplyPageProps> = ({ onBack, selectedTrack }) => {
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isCreator = selectedTrack === 'creator';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (submitted) {
    const success = isCreator ? t.sanctuary.form.success.creator : t.sanctuary.form.success.media;
    return (
      <section className={`py-48 px-6 min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
        <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full relative z-10 text-center"
        >
          <div className="w-24 h-24 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={48} className="text-brand-coral" />
          </div>
          <h2 className="editorial-h2 mb-6 tracking-tighter">{success.title} <span className="text-brand-coral italic">{success.titleHighlight}</span></h2>
          <p className="font-body text-xl md:text-2xl text-brand-navy/60 leading-relaxed mb-16">
            {success.description}
          </p>
          <button 
            onClick={onBack}
            className="editorial-label bg-brand-navy text-white px-12 py-5 rounded-full hover:bg-brand-coral transition-all uppercase tracking-[0.3em] font-bold"
          >
            {success.cta}
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
      {/* HEADER SECTION */}
      <section className="pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className={`group flex items-center gap-3 text-brand-navy/40 hover:text-brand-coral transition-colors mb-12 editorial-label text-[10px] uppercase font-bold tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {isRTL ? <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />}
            {t.sanctuary.form.back}
          </button>
          
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold leading-none tracking-tighter uppercase mb-6 text-brand-navy">
            {isCreator ? t.sanctuary.form.titleCreator : t.sanctuary.form.titleMedia}
          </h1>
          <p className="font-body text-2xl text-brand-navy/60 leading-tight italic font-medium max-w-2xl">
            {isCreator ? t.sanctuary.form.descriptionCreator : t.sanctuary.form.descriptionMedia}
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="pb-40 px-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-16">
            
            {/* 1. Identity Group */}
            <div className="space-y-10 p-6 sm:p-10 bg-warm-beige/20 rounded-[2rem] sm:rounded-[3rem] border border-brand-navy/5">
              <h3 className={`editorial-label text-brand-coral text-[12px] tracking-[0.4em] uppercase font-bold border-b border-brand-coral/10 pb-4 mb-4 ${isRTL ? 'text-right' : ''}`}>
                {t.sanctuary.form.sections.identity}
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <InputGroup label={t.sanctuary.form.fields.name} icon={<User size={16} />} required isRTL={isRTL} />
                <InputGroup label={t.sanctuary.form.fields.email} type="email" icon={<Mail size={16} />} required isRTL={isRTL} />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <InputGroup label={t.sanctuary.form.fields.phone} icon={<Phone size={16} />} required isRTL={isRTL} />
                <InputGroup label={t.sanctuary.form.fields.jobTitle} icon={<Briefcase size={16} />} required isRTL={isRTL} />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <InputGroup label={t.sanctuary.form.fields.country} icon={<Globe size={16} />} required isRTL={isRTL} />
                <InputGroup label={t.sanctuary.form.fields.city} icon={<MapPin size={16} />} required isRTL={isRTL} />
              </div>
            </div>

            {/* 2. Professional / Social Group */}
            <div className="space-y-10 p-6 sm:p-10 bg-white rounded-[2rem] sm:rounded-[3rem] border border-brand-navy/5 shadow-sm">
              <h3 className={`editorial-label text-brand-coral text-[12px] tracking-[0.4em] uppercase font-bold border-b border-brand-coral/10 pb-4 mb-4 ${isRTL ? 'text-right' : ''}`}>
                {isCreator ? t.sanctuary.form.sections.platforms : t.sanctuary.form.sections.mediaOutlet}
              </h3>
              
              {isCreator ? (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    <InputGroup label={t.sanctuary.form.fields.creatorName} icon={<Sparkles size={16} />} required isRTL={isRTL} />
                    <InputGroup label={t.sanctuary.form.fields.instagram} placeholder="@username" icon={<Instagram size={16} />} required isRTL={isRTL} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <InputGroup label={t.sanctuary.form.fields.tiktok} placeholder="@username" icon={<Video size={16} />} isRTL={isRTL} />
                    <InputGroup label={t.sanctuary.form.fields.youtube} placeholder="Direct URL" icon={<Youtube size={16} />} isRTL={isRTL} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <InputGroup label={t.sanctuary.form.fields.niche} icon={<Target size={16} />} required isRTL={isRTL} />
                    <InputGroup label={t.sanctuary.form.fields.reach} icon={<Activity size={16} />} required isRTL={isRTL} />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    <InputGroup label={t.sanctuary.form.fields.mediaOrg} icon={<Briefcase size={16} />} required isRTL={isRTL} />
                    <InputGroup label={t.sanctuary.form.fields.website} icon={<LinkIcon size={16} />} required isRTL={isRTL} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <InputGroup label={t.sanctuary.form.fields.professionalProfile} icon={<Users size={16} />} isRTL={isRTL} />
                    <div className="space-y-3 group">
                      <label className={`flex items-center gap-2 editorial-label text-[11px] uppercase tracking-widest text-brand-navy/40 group-focus-within:text-brand-coral transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Camera size={16} />
                        {t.sanctuary.form.fields.coverageType}
                        <span className="text-brand-coral">*</span>
                      </label>
                      <select 
                        required
                        className={`w-full bg-white border border-brand-navy/10 px-6 py-4 rounded-2xl font-body text-brand-navy outline-none focus:border-brand-coral/50 focus:ring-4 focus:ring-brand-coral/5 transition-all appearance-none cursor-pointer ${isRTL ? 'text-right pr-6 pl-10' : ''}`}
                      >
                        <option value="">Select Option</option>
                        {t.sanctuary.form.fields.coverageOptions.map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 3. Narrative & Coverage */}
            <div className="space-y-10 p-6 sm:p-10 bg-warm-beige/20 rounded-[2rem] sm:rounded-[3rem] border border-brand-navy/5">
              <h3 className={`editorial-label text-brand-coral text-[12px] tracking-[0.4em] uppercase font-bold border-b border-brand-coral/10 pb-4 mb-4 ${isRTL ? 'text-right' : ''}`}>
                {isCreator ? t.sanctuary.form.sections.narrative : t.sanctuary.form.sections.coverage}
              </h3>
              <div className="space-y-8">
                <TextareaGroup label={t.sanctuary.form.fields.bio} icon={<FileText size={16} />} required isRTL={isRTL} />
                <TextareaGroup label={t.sanctuary.form.fields.why} icon={<MessageSquare size={16} />} required isRTL={isRTL} />
                
                {!isCreator && (
                   <TextareaGroup label={t.sanctuary.form.fields.assignment} icon={<FileText size={16} />} required isRTL={isRTL} />
                )}

                <InputGroup label={t.sanctuary.form.fields.portfolio} icon={<Star size={16} />} required isRTL={isRTL} />
                
                <div className="grid md:grid-cols-2 gap-8">
                   <InputGroup label={t.sanctuary.form.fields.attendedSimilar} icon={<CheckCircle2 size={16} />} isRTL={isRTL} />
                   <InputGroup label={t.sanctuary.form.fields.notes} icon={<MessageSquare size={16} />} isRTL={isRTL} />
                </div>
              </div>
            </div>

            {/* Submit Block */}
            <div className="pt-12 text-center">
              <button 
                type="submit"
                disabled={loading}
                className="group relative w-full md:w-auto bg-brand-navy text-white px-20 py-6 rounded-full overflow-hidden transition-all duration-500 hover:bg-brand-coral hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-brand-coral translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className={`relative z-10 flex items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="editorial-label text-base tracking-[0.4em] uppercase font-bold">
                    {loading ? t.sanctuary.form.processing : t.sanctuary.form.submit}
                  </span>
                  {!loading && <Send size={18} className={`transition-transform ${isRTL ? 'group-hover:-translate-x-1 group-hover:-translate-y-1 -rotate-90' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />}
                </div>
              </button>
              <p className="mt-8 font-body text-sm text-brand-navy/30 max-w-sm mx-auto">
                {t.sanctuary.form.disclaimer}
              </p>
            </div>

          </form>
        </div>
      </section>

      {/* FOOTER */}
      <section className="py-20 bg-warm-beige/10 border-t border-brand-navy/5 text-center">
         <p className="editorial-label text-[10px] tracking-[0.5em] text-brand-navy/20 uppercase">{t.sanctuary.form.footerCode}</p>
      </section>
    </div>
  );
};

// --- Subcomponents ---

const InputGroup = ({ label, icon, placeholder, type = "text", required = false, isRTL }: any) => (
  <div className="space-y-3 group">
    <label className={`flex items-center gap-2 editorial-label text-[11px] uppercase tracking-widest text-brand-navy/40 group-focus-within:text-brand-coral transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
      {icon}
      {label}
      {required && <span className="text-brand-coral">*</span>}
    </label>
    <input 
      type={type}
      required={required}
      placeholder={placeholder}
      className={`w-full bg-white border border-brand-navy/10 px-6 py-4 rounded-2xl font-body text-brand-navy placeholder:text-brand-navy/20 outline-none focus:border-brand-coral/50 focus:ring-4 focus:ring-brand-coral/5 transition-all ${isRTL ? 'text-right' : ''}`}
    />
  </div>
);

const TextareaGroup = ({ label, icon, placeholder, required = false, isRTL }: any) => (
  <div className="space-y-3 group">
    <label className={`flex items-center gap-2 editorial-label text-[11px] uppercase tracking-widest text-brand-navy/40 group-focus-within:text-brand-coral transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
      {icon}
      {label}
      {required && <span className="text-brand-coral">*</span>}
    </label>
    <textarea 
      required={required}
      placeholder={placeholder}
      rows={4}
      className={`w-full bg-white border border-brand-navy/10 px-6 py-4 rounded-2xl font-body text-brand-navy placeholder:text-brand-navy/20 outline-none focus:border-brand-coral/50 focus:ring-4 focus:ring-brand-coral/5 transition-all resize-none ${isRTL ? 'text-right' : ''}`}
    />
  </div>
);

const Sparkles = ({ size, className }: any) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
