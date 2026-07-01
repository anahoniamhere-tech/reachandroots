import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { submitRegistration } from '../lib/firebase';

export const RegistrationForm = ({ onNavigate }: { onNavigate: (v: any) => void }) => {
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneCode: '+961',
    phone: '',
    email: '',
    age: '',
    city: '',
    role: [] as string[],
    howDidYouHear: '',
    whyAttend: '',
    attendedBefore: '',
    topicOfInterest: [] as string[],
    knowMore: '',
    consent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' && name !== 'topicOfInterest' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCheckboxArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const array = (prev as any)[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...array, value] };
      } else {
        return { ...prev, [field]: array.filter(v => v !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setIsSubmitting(true);
    try {
      const { phoneCode, phone, ...rest } = formData;
      
      // Clean phone number: remove non-digits
      let national = phone.replace(/[^\d]/g, '');
      if (national.startsWith('0')) {
        national = national.substring(1);
      }
      
      if (national.length < 7 || national.length > 15) {
        setPhoneError(t.registration?.phoneError || 'Please enter a valid WhatsApp number with country code.');
        setIsSubmitting(false);
        return;
      }
      
      const phone_e164 = `${phoneCode}${national}`;
      
      const submissionData = { 
        ...rest, 
        phone: phone_e164, // Keep original property but updated
        phone_e164: phone_e164,
        phone_country_code: phoneCode,
        phone_national: national
      };
      
      await submitRegistration(submissionData);
      setIsSuccess(true);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-warm-beige pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-2xl w-full text-center relative z-10"
        >
          <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={48} />
          </div>
          <h2 className="font-display font-black text-4xl text-brand-navy mb-4">{t.registration?.successTitle}</h2>
          <p className="font-body text-xl text-brand-navy/60 mb-10">{t.registration?.successDesc}</p>
          <button 
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-3 bg-brand-navy text-white px-8 py-4 rounded-full hover:bg-brand-coral transition-colors"
          >
            <span className="font-display font-bold uppercase tracking-wider">{t.registration?.backToHome}</span>
            <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-beige pt-32 pb-20 px-6 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-coral/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <button 
          onClick={() => onNavigate('landing')}
          className="mb-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-navy shadow-sm hover:shadow-md transition-all group"
        >
          <X size={24} className="group-hover:scale-90 transition-transform" />
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden">
          <div className="bg-brand-navy p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <span className="editorial-label text-brand-yellow mb-2 block">{t.registration?.title}</span>
            <h1 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter">
              {t.registration?.subtitle}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-display font-bold text-sm uppercase text-brand-navy">{t.registration?.fullName} *</label>
                <input 
                  type="text" required name="fullName" value={formData.fullName} onChange={handleChange}
                  className="w-full bg-warm-beige/50 border border-brand-navy/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral transition-all font-body text-brand-navy"
                />
              </div>

              <div className="space-y-2">
                <label className="font-display font-bold text-sm uppercase text-brand-navy">
                  {t.registration?.phone} *
                </label>
                <div className="flex gap-2" dir="ltr">
                  <select 
                    name="phoneCode" value={formData.phoneCode} onChange={handleChange}
                    className="bg-warm-beige/50 border border-brand-navy/10 rounded-2xl px-4 py-4 focus:outline-none focus:border-brand-coral transition-all font-body text-brand-navy appearance-none w-28 shrink-0 text-center"
                  >
                    <option value="+961">🇱🇧 +961</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+962">🇯🇴 +962</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+964">🇮🇶 +964</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+965">🇰🇼 +965</option>
                    <option value="+973">🇧🇭 +973</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="other">Other</option>
                  </select>
                  <input 
                    type="tel" required name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 71 000 000"
                    className={`flex-1 min-w-0 bg-warm-beige/50 border rounded-2xl px-6 py-4 focus:outline-none transition-all font-body text-brand-navy ${phoneError ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-brand-navy/10 focus:border-brand-coral focus:ring-1 focus:ring-brand-coral'}`}
                  />
                </div>
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1 font-body">{phoneError}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-display font-bold text-sm uppercase text-brand-navy">
                  {t.registration?.email} *
                </label>
                <input 
                  type="email" required name="email" value={formData.email} onChange={handleChange}
                  className="w-full bg-warm-beige/50 border border-brand-navy/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral transition-all font-body text-brand-navy"
                />
              </div>

              <div className="space-y-2">
                <label className="font-display font-bold text-sm uppercase text-brand-navy">{t.registration?.age} *</label>
                <select 
                  required name="age" value={formData.age} onChange={handleChange}
                  className="w-full bg-warm-beige/50 border border-brand-navy/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral transition-all font-body text-brand-navy appearance-none"
                >
                  <option value="" disabled>---</option>
                  {t.registration?.ageOptions?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-display font-bold text-sm uppercase text-brand-navy">{t.registration?.city} *</label>
                <select 
                  required name="city" value={formData.city} onChange={handleChange}
                  className="w-full bg-warm-beige/50 border border-brand-navy/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral transition-all font-body text-brand-navy appearance-none"
                >
                  <option value="" disabled>---</option>
                  {t.registration?.cityOptions?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

            </div>

            <div className="space-y-4 pt-4">
              <label className="font-display font-bold text-sm uppercase text-brand-navy">{t.registration?.role} *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-warm-beige/50 p-6 rounded-2xl border border-brand-navy/10">
                {t.registration?.roleOptions?.map((opt: string) => (
                  <label key={opt} className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-0.5">
                      <input 
                        type="checkbox" 
                        name="role"
                        checked={((formData.role as unknown as string[]) || []).includes(opt)} 
                        onChange={(e) => handleCheckboxArrayChange('role', opt, e.target.checked)}
                        className="peer appearance-none w-6 h-6 border-2 border-brand-navy/20 rounded-md checked:bg-brand-coral checked:border-brand-coral transition-all" 
                      />
                      <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className="font-body text-brand-navy/80 leading-relaxed group-hover:text-brand-navy transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="font-display font-bold text-sm uppercase text-brand-navy">{t.registration?.howDidYouHear} *</label>
              <select 
                required name="howDidYouHear" value={formData.howDidYouHear} onChange={handleChange}
                className="w-full bg-warm-beige/50 border border-brand-navy/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral transition-all font-body text-brand-navy appearance-none"
              >
                <option value="" disabled>---</option>
                {t.registration?.howDidYouHearOptions?.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-display font-bold text-sm uppercase text-brand-navy">
                {t.registration?.whyAttend} <span className="text-brand-navy/40 font-normal normal-case">{t.registration?.optional}</span>
              </label>
              <textarea 
                name="whyAttend" rows={3} value={formData.whyAttend} onChange={handleChange}
                className="w-full bg-warm-beige/50 border border-brand-navy/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral transition-all font-body text-brand-navy resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="font-display font-bold text-sm uppercase text-brand-navy">
                {t.registration?.attendedBefore} <span className="text-brand-navy/40 font-normal normal-case">{t.registration?.optional}</span>
              </label>
              <select 
                name="attendedBefore" value={formData.attendedBefore} onChange={handleChange}
                className="w-full bg-warm-beige/50 border border-brand-navy/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral transition-all font-body text-brand-navy appearance-none"
              >
                <option value="" disabled>---</option>
                {t.registration?.attendedBeforeOptions?.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="font-display font-bold text-sm uppercase text-brand-navy">
                {t.registration?.topicOfInterest} <span className="text-brand-navy/40 font-normal normal-case">{t.registration?.optional}</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-warm-beige/50 p-6 rounded-2xl border border-brand-navy/10">
                {t.registration?.topicOfInterestOptions?.map((opt: string) => (
                  <label key={opt} className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-0.5">
                      <input 
                        type="checkbox" 
                        name="topicOfInterest"
                        checked={formData.topicOfInterest.includes(opt)} 
                        onChange={(e) => handleCheckboxArrayChange('topicOfInterest', opt, e.target.checked)}
                        className="peer appearance-none w-6 h-6 border-2 border-brand-navy/20 rounded-md checked:bg-brand-coral checked:border-brand-coral transition-all" 
                      />
                      <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className="font-body text-brand-navy/80 leading-relaxed group-hover:text-brand-navy transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-brand-navy/10">
              <label className="font-display font-bold text-sm uppercase text-brand-navy block mb-4">{t.registration?.knowMore} *</label>
              <div className="flex flex-col gap-4">
                {t.registration?.knowMoreOptions?.map((opt: string) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="knowMore" value={opt} onChange={handleChange} required className="w-5 h-5 accent-brand-coral" />
                    <span className="font-body text-brand-navy">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-brand-navy/10">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 mt-1 shrink-0">
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required className="peer appearance-none w-6 h-6 border-2 border-brand-navy/20 rounded-md checked:bg-brand-coral checked:border-brand-coral transition-all" />
                  <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className="font-body text-brand-navy/80 leading-relaxed group-hover:text-brand-navy transition-colors">
                  {t.registration?.consentOptions?.[0] || t.registration?.consentLabel} *
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-brand-navy text-white px-8 py-5 rounded-2xl hover:bg-brand-coral transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8 group"
            >
              <span className="font-display font-bold uppercase tracking-wider text-lg">
                {isSubmitting ? t.registration?.submitting : t.registration?.submit}
              </span>
              {!isSubmitting && <ArrowRight size={20} className={`${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
