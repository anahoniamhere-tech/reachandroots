import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Clock, ArrowRight, User, 
  Check, Sparkles, Award, Wallet, ShieldCheck, 
  Users, CheckCircle2, Copy, Send, Instagram
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { countryCodes } from '../lib/countries';
import YazeedPhoto from '../assets/yazeed_mousa_real.jpg';

const countryTranslations: Record<string, string> = {
  "Lebanon": "لبنان",
  "Syria": "سوريا",
  "Palestine": "فلسطين",
  "Jordan": "الأردن",
  "Egypt": "مصر",
  "Iraq": "العراق"
};

const countriesList = [
  "Lebanon", "Syria", "Palestine", "Jordan", "Egypt", "Iraq",
  "---",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Ireland", "Italy",
  "Ivory Coast", "Jamaica", "Japan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Kingdom", "United States of America",
  "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export const JourneyPage = ({ onNavigate }: { onNavigate: (v: any) => void }) => {
  const { t, isRTL } = useLanguage();
  const [selectedTicket, setSelectedTicket] = useState<'lecture' | 'ws1' | 'ws2' | 'package'>('ws2');
  const [copied, setCopied] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    phoneCode: '+961',
    phone: '', 
    email: '', 
    age: '', 
    nationality: '', 
    workshopChoice: 'both' 
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fallback values if context translations are loading or missing
  const journeyT = (t as any).sanctuary?.journey || {
    label: 'CREATOR COLLABORATIONS',
    title: 'Our Journey.',
    title2: 'With Creators',
    description: 'We collaborate with forward-thinking content creators and experts to bring exclusive developmental, mental health, and educational programs to the community.',
    guestLabel: 'Current Featured Guest',
    guestName: 'Dr. Yazeed Mousa',
    guestTitle: 'Psychologist & Mental Wellness Coach',
    programTitle: 'Journey towards the Self',
    programSub: 'Self-Development & Psychological Awareness Program',
    programDesc: 'An integrated three-day developmental experience in Tripoli, Lebanon. Designed as a progressive learning journey starting with a public talk, leading into two specialized workshops focused on practical tools.',
    eventsTitle: 'Program Timeline',
    publicEvent: 'Public Lecture',
    workshop: 'Specialized Workshop',
    lectureTitle: 'The Five Inner Thoughts',
    lectureDesc: 'A free public lecture laying the foundation of our inner cognitive patterns, exploring how repeat thoughts shape our emotions and decisions.',
    lectureLoc: 'Beit El Fan, Tripoli',
    lectureDate: 'Monday, July 6, 2026',
    lectureTime: 'Doors open at 5:30 PM | Program: 6:00 PM',
    ws1Title: 'Passion & Stress Management',
    ws1Desc: 'Learn practical tools for breathing, emotional decompression, and finding authentic passion amidst modern life pressures.',
    ws1Loc: 'Beit El Fan, Tripoli',
    ws1Date: 'Wednesday, July 8, 2026',
    ws1Time: '4:30 PM – 7:30 PM',
    ws2Title: 'Mind Programming',
    ws2Desc: 'An advanced session on identifying self-limiting core beliefs and replacing them with supportive cognitive patterns.',
    ws2Loc: 'Beit El Fan, Tripoli',
    ws2Date: 'Thursday, July 9, 2026',
    ws2Time: '4:30 PM – 7:30 PM',
    pricingTitle: 'Ticket Options & Registration',
    singleWs: 'Single Workshop',
    singleWsPrice: '$20',
    singleWsDesc: 'Access to either Passion & Stress Management or Mind Programming workshop.',
    packageWs: 'Double Workshop Package',
    packageWsPrice: '$30',
    packageWsDesc: 'Complete access to both specialized workshops for a reduced rate.',
    freeLecture: 'Public Lecture Entry',
    freeLecturePrice: 'Free',
    freeLectureDesc: 'Free admission to the general lecture on July 6 (prior registration required).',
    paymentTitle: 'Suggested Payment Methods',
    wishTitle: 'Whish Money Transfer',
    wishDesc: 'Transfer the amount to the Whish Money account below. Keep your transaction receipt to present it at the entrance.',
    wishAccount: 'Account number: 81408171',
    doorTitle: 'Payment at the Door',
    doorDesc: 'You can also secure your spot and pay cash in USD or LBP at the door upon arrival (subject to venue capacity).',
    ctaReserve: 'Secure Your Ticket',
    badgeCapacity: '50 Seats Max',
    badgeFree: 'Registration Required'
  };
  const handleCopyAccount = () => {
    navigator.clipboard.writeText('81408171');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBookingSummary = () => {
    if (formData.workshopChoice === 'both') return isRTL ? 'تذكرة ورشتين: الشغف والضغوط + برمجة العقل' : 'Double Workshop: Passion & Stress + Mind Programming';
    if (formData.workshopChoice === 'ws1') return isRTL ? 'تذكرة ورشة واحدة: إدارة الشغف والضغوط' : 'Single Workshop: Passion & Stress Management';
    if (formData.workshopChoice === 'ws2') return isRTL ? 'تذكرة ورشة واحدة: برمجة العقل' : 'Single Workshop: Mind Programming';
    return isRTL ? 'تذكرة محاضرة عامة' : 'Public Lecture Ticket';
  };

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(`Name: ${formData.name} - Ticket: ${getBookingSummary()}`);
    setCopiedDetails(true);
    setTimeout(() => setCopiedDetails(false), 2000);
  };

  const getWhatsAppLink = () => {
    const text = isRTL 
      ? `مرحباً، لقد قمت للتو بحجز تذكرة لبرنامج د. يزيد موسى.\n\nالاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nالهاتف: ${formData.phone}\nنوع التذكرة: ${getBookingSummary()}`
      : `Hello! I just booked a ticket for Dr. Yazeed Mousa's program.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nTicket Type: ${getBookingSummary()}`;
    return `https://wa.me/96170530424?text=${encodeURIComponent(text)}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    if (formData.name && formData.phone && formData.email) {
      // Clean phone number: remove non-digits
      let national = formData.phone.replace(/[^\d]/g, '');
      if (national.startsWith('0')) {
        national = national.substring(1);
      }
      if (national.length < 7 || national.length > 15) {
        setPhoneError(isRTL ? 'يرجى إدخال رقم واتساب صحيح مع رمز الدولة.' : 'Please enter a valid WhatsApp number with country code.');
        return;
      }
      
      const phone_e164 = `${formData.phoneCode}${national}`;
      
      setSubmitting(true);
      setSubmitError(null);
      try {
        let price = 0;
        let tierName = '';
        if (formData.workshopChoice === 'both') { 
          price = 30; 
          tierName = 'Double Workshop: Passion & Stress + Mind Programming'; 
        }
        else if (formData.workshopChoice === 'ws1') { 
          price = 20; 
          tierName = 'Single Workshop: Passion & Stress Management'; 
        }
        else if (formData.workshopChoice === 'ws2') { 
          price = 20; 
          tierName = 'Single Workshop: Mind Programming'; 
        }
        else { 
          price = 0; 
          tierName = 'Public Lecture: The Five Inner Thoughts'; 
        }

        const orderRef = doc(collection(db, 'orders'));
        await setDoc(orderRef, {
          name: formData.name,
          email: formData.email,
          phone: phone_e164,
          phone_e164: phone_e164,
          phone_country_code: formData.phoneCode,
          phone_national: national,
          age: formData.age,
          nationality: formData.nationality,
          tierId: tierName,
          quantity: 1,
          totalPrice: price,
          status: 'pending',
          emailStatus: 'sending',
          createdAt: serverTimestamp()
        });
        
        // Trigger the Hostinger PHP script to send the confirmation email
        try {
          fetch('/send_mail.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              name: formData.name,
              tierName: tierName,
              price: price
            })
          })
          .then(async (response) => {
            const resData = await response.json();
            if (resData.status === 'success') {
              updateDoc(orderRef, { emailStatus: 'sent' }).catch(err => console.error(err));
            } else {
              updateDoc(orderRef, { emailStatus: 'failed', emailError: resData.message || 'Server error' }).catch(err => console.error(err));
            }
          })
          .catch(err => {
            console.error('Failed to trigger email:', err);
            updateDoc(orderRef, { emailStatus: 'failed', emailError: err.message || 'Fetch failed' }).catch(e => console.error(e));
          });
        } catch (e: any) {
          // Ignore fetch errors so it doesn't block the success screen
        }
        
        setIsRegistered(true);
      } catch (err: any) {
        console.error("Failed to save order to database", err);
        setSubmitError(err?.message || "Failed to submit. Please check your internet connection.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const showPaymentCard = isRegistered && formData.workshopChoice !== 'lecture';

  return (
    <div className={`min-h-screen bg-warm-beige/35 backdrop-blur-3xl pt-32 pb-40 ${isRTL ? 'text-right font-arabic' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-coral/5 soft-glow petal-shape rotate-45 pointer-events-none" />
        <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-brand-orange/5 soft-glow petal-shape -rotate-12 pointer-events-none" />

        {/* 1. HERO SECTION */}
        <div className="mb-24 w-full relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
            
            {/* Left Content */}
            <div className="max-w-3xl flex-1">
              <div className="flex items-center gap-4 mb-8">
                <Sparkles size={16} className="text-brand-coral" />
                <span className="editorial-label text-brand-coral tracking-[0.5em] font-bold uppercase">
                  {journeyT.label}
                </span>
              </div>
              <h1 className="editorial-h1 lowercase tracking-tighter mb-8 leading-[0.8] text-brand-navy">
                {journeyT.title.split('.')[0]} <br />
                <span className="text-brand-coral italic font-normal">{journeyT.title2}</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-brand-navy/60 leading-relaxed max-w-2xl mb-12">
                {journeyT.description}
              </p>

              {/* Creator Spotlight Badge */}
              <div className="bg-white/60 border border-brand-navy/5 p-8 rounded-3xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-coral/10 text-brand-coral flex items-center justify-center shrink-0">
                  <User size={24} />
                </div>
                <div>
                  <span className="editorial-label text-[10px] text-brand-coral tracking-widest font-bold uppercase block mb-1">
                    {journeyT.guestLabel}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-brand-navy uppercase tracking-tight">
                    {journeyT.guestName}
                  </h3>
                  <p className="font-body text-sm text-brand-navy/50">
                    {journeyT.guestTitle}
                  </p>
                  <a 
                    href="https://www.instagram.com/dr.yazedmousa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex flex-row items-center gap-2.5 px-5 py-2.5 bg-brand-coral hover:bg-brand-navy text-white rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer leading-none"
                  >
                    <Instagram size={18} className="shrink-0" />
                    <span className="leading-none">{isRTL ? 'تابع على إنستغرام' : 'Follow on Instagram'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Photo Frame */}
            <div className="flex-1 max-w-md w-full relative">
              <div className="absolute inset-0 bg-brand-coral/10 rounded-[3rem] rotate-3 translate-x-2 translate-y-2 scale-102 blur-sm pointer-events-none" />
              <div className="absolute inset-0 bg-brand-orange/10 rounded-[3rem] -rotate-3 -translate-x-2 -translate-y-2 scale-102 blur-sm pointer-events-none" />
              <div className="relative media-card border-none rounded-[3rem] overflow-hidden group shadow-2xl">
                <img 
                  src={YazeedPhoto} 
                  alt={journeyT.guestName} 
                  className="w-full h-auto object-cover aspect-square transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-90" />
                <div className={`absolute bottom-8 left-8 right-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="font-mono text-[10px] text-white/50 tracking-widest block mb-1">PROGRAM HEADLINER</span>
                  <h4 className="font-display font-bold text-2xl text-white tracking-tight uppercase leading-none">{journeyT.guestName}</h4>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. PROGRAM OVERVIEW BANNER */}
        <div className="w-full mb-24 relative z-10 max-w-6xl mx-auto">
          <div className="media-card bg-white p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-coral via-brand-orange to-brand-gold" />
            <div className="flex flex-col lg:flex-row gap-12 justify-between items-start lg:items-center relative z-10">
              <div className="max-w-3xl">
                <span className="editorial-label text-brand-coral mb-4 block">{journeyT.programTitle}</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase mb-6 tracking-tighter leading-tight">
                  {journeyT.programSub}
                </h2>
                <p className="font-body text-lg text-brand-navy/60 leading-relaxed">
                  {journeyT.programDesc}
                </p>
              </div>
              {/* Reservation button removed by request */}
            </div>
          </div>
        </div>



        {/* 3. TIMELINE OF EVENTS */}
        <div className="w-full mb-28 relative z-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
              <span className="editorial-label text-brand-coral mb-2 block">// SCHEDULE</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-navy uppercase tracking-tighter">
                {journeyT.eventsTitle}
              </h2>
            </div>
            <div className="h-px bg-brand-navy/10 flex-1 mx-8 hidden md:block" />
            <div className="font-mono text-xs text-brand-navy/40 uppercase tracking-[0.2em]">
              Tripoli, Lebanon // 2026
            </div>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className={`absolute top-0 bottom-0 w-1 bg-brand-navy/10 ${isRTL ? 'right-8 md:right-12' : 'left-8 md:left-12'} rounded-full`} />
            
            <div className="space-y-12">
              {/* Event 1: Public Event (Completed) */}
              <motion.div 
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative opacity-60 grayscale-[50%] ${isRTL ? 'pr-20 md:pr-32' : 'pl-20 md:pl-32'}`}
              >
                {/* Timeline Node */}
                <div className={`absolute top-8 ${isRTL ? 'right-6 md:right-10' : 'left-6 md:left-10'} w-5 h-5 rounded-full bg-brand-navy/20 border-4 border-warm-beige shadow-sm z-10`} />
                
                <div className="glass-card p-8 md:p-10 rounded-[2rem] border border-brand-navy/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-navy/5 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-4 py-1.5 bg-brand-navy/5 text-brand-navy/50 text-[10px] uppercase font-bold tracking-widest font-mono rounded-full">
                        {journeyT.publicEvent}
                      </span>
                      <span className="px-4 py-1.5 bg-brand-navy/10 text-brand-navy text-[10px] uppercase font-bold tracking-widest font-mono rounded-full flex items-center gap-2">
                        <CheckCircle2 size={12} />
                        {isRTL ? 'تم الانتهاء' : 'Completed'}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy/50 uppercase mb-4 tracking-tight">
                      {journeyT.lectureTitle}
                    </h3>
                    <p className="font-body text-sm text-brand-navy/40 leading-relaxed mb-6">
                      {journeyT.lectureDesc}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-brand-navy/10 items-center justify-between">
                      <div className="text-center sm:text-left">
                        <span className="font-display font-bold text-brand-navy/60 uppercase tracking-widest text-xs block mb-1">
                          {isRTL ? 'نراكم في المرة القادمة!' : 'See you next time!'}
                        </span>
                        <span className="font-body text-brand-navy/40 text-[11px] uppercase tracking-widest">
                          {journeyT.lectureDate}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate('registration'); }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy text-white hover:bg-brand-coral rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 w-full sm:w-auto shadow-md"
                      >
                        <Users size={16} />
                        {isRTL ? 'انضم للمجتمع' : 'Join Community'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Event 2: Workshop 1 (Completed) */}
              <motion.div 
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative opacity-60 grayscale-[50%] ${isRTL ? 'pr-20 md:pr-32' : 'pl-20 md:pl-32'}`}
              >
                {/* Timeline Node */}
                <div className={`absolute top-8 ${isRTL ? 'right-6 md:right-10' : 'left-6 md:left-10'} w-5 h-5 rounded-full bg-brand-coral/20 border-4 border-warm-beige shadow-sm z-10`} />
                
                <div className="glass-card p-8 md:p-10 rounded-[2rem] border border-brand-navy/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-navy/5 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 justify-between items-start mb-6">
                      <span className="px-3 md:px-4 py-1.5 bg-brand-coral/5 text-brand-coral/50 text-[9px] md:text-[10px] uppercase font-bold tracking-widest font-mono rounded-full whitespace-nowrap">
                        {journeyT.workshop} 01
                      </span>
                      <span className="px-4 py-1.5 bg-brand-navy/10 text-brand-navy text-[10px] uppercase font-bold tracking-widest font-mono rounded-full flex items-center gap-2">
                        <CheckCircle2 size={12} />
                        {isRTL ? 'تم الانتهاء' : 'Completed'}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy/50 uppercase mb-4 tracking-tight">
                      {journeyT.ws1Title}
                    </h3>
                    <p className="font-body text-sm text-brand-navy/40 leading-relaxed mb-6">
                      {journeyT.ws1Desc}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-brand-navy/10 items-center justify-between">
                      <div className="text-center sm:text-left">
                        <span className="font-display font-bold text-brand-navy/60 uppercase tracking-widest text-xs block mb-1">
                          {isRTL ? 'نراكم في المرة القادمة!' : 'See you next time!'}
                        </span>
                        <span className="font-body text-brand-navy/40 text-[11px] uppercase tracking-widest">
                          {journeyT.ws1Date}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate('registration'); }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy text-white hover:bg-brand-coral rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 w-full sm:w-auto shadow-md"
                      >
                        <Users size={16} />
                        {isRTL ? 'انضم للمجتمع' : 'Join Community'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Event 3: Workshop 2 */}
              <motion.div 
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`relative opacity-60 grayscale-[50%] ${isRTL ? 'pr-20 md:pr-32' : 'pl-20 md:pl-32'}`}
              >
                {/* Timeline Node */}
                <div className={`absolute top-8 ${isRTL ? 'right-6 md:right-10' : 'left-6 md:left-10'} w-5 h-5 rounded-full bg-brand-orange/20 border-4 border-warm-beige shadow-sm z-10`} />
                
                <div className="glass-card p-8 md:p-10 rounded-[2rem] border border-brand-navy/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-navy/5 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 justify-between items-start mb-6">
                      <span className="px-3 md:px-4 py-1.5 bg-brand-coral/10 text-brand-coral/50 text-[9px] md:text-[10px] uppercase font-bold tracking-widest font-mono rounded-full whitespace-nowrap">
                        {journeyT.workshop} 02
                      </span>
                      <span className="px-4 py-1.5 bg-brand-navy/10 text-brand-navy text-[10px] uppercase font-bold tracking-widest font-mono rounded-full flex items-center gap-2">
                        <CheckCircle2 size={12} />
                        {isRTL ? 'تم الانتهاء' : 'Completed'}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-navy/50 uppercase mb-4 tracking-tight group-hover:text-brand-coral transition-colors">
                      {journeyT.ws2Title}
                    </h3>
                    <p className="font-body text-sm text-brand-navy/40 leading-relaxed mb-6">
                      {journeyT.ws2Desc}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-brand-navy/10 items-center justify-between">
                      <div className="text-center sm:text-left">
                        <span className="font-display font-bold text-brand-navy/60 uppercase tracking-widest text-xs block mb-1">
                          {isRTL ? 'نراكم في المرة القادمة!' : 'See you next time!'}
                        </span>
                        <span className="font-body text-brand-navy/40 text-[11px] uppercase tracking-widest">
                          {journeyT.ws2Date}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate('registration'); }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy text-white hover:bg-brand-coral rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 w-full sm:w-auto shadow-md"
                      >
                        <Users size={16} />
                        {isRTL ? 'انضم للمجتمع' : 'Join Community'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default JourneyPage;
