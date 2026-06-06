import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Check, Phone, Mail, Award, Clock, ArrowRight, Sparkles, 
  ChevronRight, Utensils, MessageSquare, Compass, CheckCircle2, Star, Shield, Users, ArrowUpRight
} from 'lucide-react';
import { BrandLogo } from './BrandingIcons';

// Import local assets
import Tripoli_Souks from '../assets/Tripoli_Souks.png';
import RKIF_1 from '../assets/RKIF_1.jpg';
import Exhibition from '../assets/Exhibition.png';
import husseinFayadImg from '../assets/Husein_Fayad.jpg';

export const ContentCreatorsInvitation: React.FC = () => {
  const [rsvpStep, setRsvpStep] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [preferredTime, setPreferredTime] = useState('');
  const [contactMethod, setContactMethod] = useState('Whatsapp');
  const [message, setMessage] = useState('');
  const [showDirectScheduler, setShowDirectScheduler] = useState(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStep('submitting');
    setTimeout(() => {
      setRsvpStep('submitted');
    }, 1200);
  };

  const scrollToScheduler = () => {
    setShowDirectScheduler(true);
    setTimeout(() => {
      const el = document.getElementById('scheduler-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-warm-beige text-brand-navy relative pb-24 selection:bg-brand-coral/20 selection:text-brand-navy">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pixel-grid opacity-[0.14] pointer-events-none" />

      {/* Primary Top Header to match the PDF Exact Style */}
      <header className="pt-10 pb-8 px-6 md:px-12 max-w-4xl mx-auto flex justify-between items-start relative z-20">
        {/* Left Stacked Title */}
        <Link to="/" className="flex flex-col group text-brand-navy">
          <span className="font-display text-2xl font-black tracking-tight leading-[0.9] uppercase">ROOTS</span>
          <span className="font-display text-2xl font-black tracking-tight leading-[0.9] uppercase">AND</span>
          <span className="font-display text-2xl font-black tracking-tight leading-[0.9] uppercase">REACH</span>
        </Link>
        
        {/* Right Stacked Labels */}
        <div className="text-right space-y-1">
          <p className="font-body text-[11px] uppercase tracking-[0.2em] font-extrabold text-brand-navy/60">FAYHAA EDITION / TRIPOLI</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] font-bold text-brand-coral">SPECIAL CREATOR INVITATION</p>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 space-y-10">
        
        {/* Card 1: Let's Make Tripoli's Next Story Together */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-brand-navy/5 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
        >
          {/* Main textual column */}
          <div className="space-y-6 flex-1">
            <span className="inline-block bg-brand-coral text-white font-display text-[10px] tracking-[0.2em] font-black uppercase px-4 py-1.5 rounded-full">
              DEAR HUSEN
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight text-brand-navy leading-[1.05] antialiased">
              Let&apos;s make <br />Tripoli&apos;s next <br />story together.
            </h1>
            <p className="font-body text-brand-navy/70 text-sm md:text-base leading-relaxed">
              A personal invitation to join <strong>Roots & Reach — Fayhaa Edition</strong>, a six-day creator journey where Lebanese food, culture, and storytelling meet in Tripoli.
            </p>
          </div>

          {/* Side Photo Badge column to match Page 1 perfectly */}
          <div className="w-full md:w-56 shrink-0 bg-[#FFF7E3] rounded-3xl p-5 border border-brand-navy/5 flex flex-col items-center text-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-brand-navy/10">
              <img 
                src={husseinFayadImg} 
                alt="Husen Fayad" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-brand-navy/40 mb-1 leading-none">PREPARED FOR</p>
            <h2 className="font-display font-black text-2xl text-brand-navy leading-none mb-1">
              Husen Fayad
            </h2>
            <div className="font-mono text-[9px] font-bold text-brand-navy/60 uppercase tracking-wider mt-1 border-t border-brand-navy/10 pt-2 w-full">
              FOOD CREATOR / STORYTELLER
            </div>
          </div>
        </motion.div>

        {/* Brand Infiltration / Logo Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="py-10 flex flex-col items-center justify-center text-center"
        >
          <BrandLogo className="w-32 h-32 text-brand-navy animate-pulse" />
          <h3 className="font-display font-black text-3xl uppercase tracking-tighter leading-none mt-4 text-brand-navy">HON</h3>
          <p className="font-body font-black text-[10px] tracking-[0.3em] text-brand-navy uppercase mt-1 leading-none">ROOTS AND REACH</p>
          <p className="font-display font-bold text-xs tracking-[0.4em] text-brand-navy uppercase mt-1 leading-none">HERE WE ARE</p>
        </motion.div>

        {/* Card 2: Personal Note from saad */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-brand-navy/5 space-y-6"
        >
          <div className="flex items-center">
            <span className="bg-[#7A9178] text-white font-display text-[10px] tracking-[0.2em] font-black uppercase px-4 py-1.5 rounded-full">
              PERSONAL NOTE
            </span>
          </div>
          
          <div className="space-y-6 font-body text-sm md:text-base text-brand-navy/80 leading-relaxed">
            <p className="font-display font-bold text-lg text-brand-navy">Dear Husen,</p>
            <p>
              I&apos;m reaching out on behalf of the organizing team behind <strong>Roots & Reach — Fayhaa Edition</strong>, a six-day immersive creator gathering taking place in Tripoli, Lebanon.
            </p>
            <p>
              We would be honored to invite you to join us as one of the featured creators and speakers for what we believe can become one of the region&apos;s most important creator-focused events.
            </p>
            <p>
              Your work has changed the way Lebanese food is experienced online. The cinematic pacing, the storytelling, the generosity behind the food, and the now-iconic <strong>&quot;Let&apos;s make...&quot;</strong> energy have turned cooking into something people don&apos;t just watch for recipes, but for emotion, memory, and belonging.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Why Your Voice Matters Accent box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-green text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-4 relative overflow-hidden"
        >
          <span className="font-display text-[9px] tracking-[0.35em] text-white/50 uppercase font-black block">WHY YOUR VOICE MATTERS</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl leading-snug tracking-tight">
            Your &quot;Let&apos;s make...&quot; energy turned cooking into emotion, memory, and belonging.
          </h2>
          <p className="font-body text-white/80 text-sm md:text-base border-t border-white/10 pt-4 mt-2">
            That is exactly why we believe your presence at Roots & Reach would matter.
          </p>
        </motion.div>

        {/* Landmark Aerial Photo Rounded Frame */}
        <div className="rounded-[2.5rem] overflow-hidden shadow-xl relative group border border-brand-navy/10 bg-black">
          <img 
            src={RKIF_1} 
            alt="Rachid Karami International Fair Overview" 
            className="w-full h-auto object-cover max-h-[380px] opacity-95 group-hover:scale-[1.02] transition-transform duration-1000"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center text-white border border-white/5">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-black">RACHID KARAMI INTERNATIONAL FAIR / TRIPOLI</span>
            <MapPin size={14} className="text-brand-coral animate-bounce shrink-0" />
          </div>
        </div>

        {/* Card 4: Highlight banner statement */}
        <div className="bg-brand-coral text-white rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl space-y-3">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-75">THE INVITATION IN ONE LINE</p>
          <h2 className="font-display font-black text-2xl md:text-3xl leading-none">
            Let&apos;s make food, culture, and storytelling meet in Tripoli.
          </h2>
        </div>

        {/* Experience Phases: Side by Side Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Phase 01 */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-brand-navy/5 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block bg-[#80AEF4]/15 text-brand-sky font-mono font-bold text-[9px] tracking-widest uppercase px-3.5 py-1 rounded-full">
                EXPERIENCE 01
              </span>
              <h3 className="font-display font-black text-2xl text-brand-navy antialiased">Creator Tourism</h3>
              <p className="font-body text-xs md:text-sm text-brand-navy/70 leading-relaxed">
                A curated exploration through Tripoli&apos;s old city, Dinniyeh&apos;s mountains, and Akkar&apos;s landscapes — not as a forced campaign, but as a real encounter with places, people, food, stories, and culture.
              </p>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-brand-navy/5">
              <img src={Tripoli_Souks} alt="Tripoli Old City Souks exploration" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Phase 02 */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-brand-navy/5 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block bg-[#FF8072]/15 text-brand-coral font-mono font-bold text-[9px] tracking-widest uppercase px-3.5 py-1 rounded-full">
                EXPERIENCE 02
              </span>
              <h3 className="font-display font-black text-2xl text-brand-navy antialiased">The Fair Program</h3>
              <p className="font-body text-xs md:text-sm text-brand-navy/70 leading-relaxed">
                At Rachid Karami International Fair. Panels, workshops, keynote talks, creator activations, competitions, and a large public program expected to welcome more than 3,000 attendees.
              </p>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-brand-navy/5">
              <img src={Exhibition} alt="Keynote interactive auditorium discussions" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Featured Conversation Box */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-brand-navy/5 space-y-6">
          <div className="flex">
            <span className="bg-brand-coral text-white font-display text-[10px] tracking-[0.2em] font-black uppercase px-4 py-1.5 rounded-full">
              FEATURED CONVERSATION
            </span>
          </div>
          <p className="font-display font-bold text-xl md:text-2xl text-brand-navy leading-snug">
            We would especially love to feature you in the food and storytelling conversations taking place during the Fair program, where your voice can help connect Lebanese cuisine, digital storytelling, and cultural identity in a powerful way.
          </p>
        </div>

        {/* Core logistics boxes split */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* What We Cover */}
          <div className="bg-[#FFFCEF] rounded-[2.5rem] p-8 md:p-10 border border-brand-navy/5 shadow-md space-y-6">
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-brand-coral font-black uppercase block mb-1">COVERED BY THE TEAM</span>
              <h4 className="font-display font-black text-2xl text-brand-navy leading-none">What We Cover</h4>
            </div>
            <ul className="space-y-3 font-body text-sm text-brand-navy/80">
              <li className="flex items-start gap-2.5">
                <Check className="text-brand-coral shrink-0 mt-0.5" size={16} />
                <span>Full accommodation for all 6 nights</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="text-brand-coral shrink-0 mt-0.5" size={16} />
                <span>All meals throughout the event</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="text-brand-coral shrink-0 mt-0.5" size={16} />
                <span>Local program logistics during the gathering</span>
              </li>
            </ul>
            <p className="font-body text-xs text-brand-navy/50 italic border-t border-black/5 pt-4">
              You would only need to handle your transportation to Tripoli on Day 1, and everything from there will be covered.
            </p>
          </div>

          {/* Your Participation */}
          <div className="bg-[#FFFCEF] rounded-[2.5rem] p-8 md:p-10 border border-brand-navy/5 shadow-md space-y-6">
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#7A9178] font-black uppercase block mb-1">PARTICIPATION</span>
              <h4 className="font-display font-black text-2xl text-brand-navy leading-none">Your Participation</h4>
            </div>
            <ul className="space-y-3 font-body text-sm text-brand-navy/80">
              <li className="flex items-start gap-2.5">
                <ArrowUpRight className="text-brand-navy/40 shrink-0 mt-0.5" size={16} />
                <span>Active participation in the tourism experience</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ArrowUpRight className="text-brand-navy/40 shrink-0 mt-0.5" size={16} />
                <span>One announcement post once confirmed</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ArrowUpRight className="text-brand-navy/40 shrink-0 mt-0.5" size={16} />
                <span>Posting during the journey using <strong>#RootsAndReach #FayhaaEdition</strong></span>
              </li>
            </ul>
            <p className="font-body text-xs text-brand-navy/50 italic border-t border-black/5 pt-4">
              We&apos;d also love to discuss your potential participation as a panel speaker or session leader at the Fair.
            </p>
          </div>
        </div>

        {/* NEXT STEPS + SCHEDULER BOARD */}
        <motion.div 
          layout
          className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-brand-navy/5 shadow-xl space-y-8"
        >
          <div className="space-y-6">
            <div className="flex">
              <span className="bg-[#7A9178] text-white font-display text-[10px] tracking-[0.2em] font-black uppercase px-4 py-1.5 rounded-full">
                NEXT STEP
              </span>
            </div>
            
            <h3 className="font-display font-black text-3xl md:text-4xl text-brand-navy tracking-tight leading-none leading-snug">
              Let&apos;s set up a 20–30 minute call.
            </h3>
            
            <p className="font-body text-brand-navy/70 text-sm md:text-base leading-relaxed">
              We&apos;d love to walk you through the full picture, answer your questions, and explore whether this is the right fit. Propose your convenient slot below.
            </p>
          </div>

          {/* Reply Action Trigger */}
          {!showDirectScheduler ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button 
                onClick={scrollToScheduler}
                className="inline-flex items-center gap-3 bg-brand-navy hover:bg-brand-coral hover:text-white text-white px-10 py-5 rounded-full transition-all duration-300 font-display font-black uppercase text-xs tracking-wider cursor-pointer shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>REPLY TO COORDINATE A TIME</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              id="scheduler-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-[#FFFCEF] rounded-[2rem] p-6 sm:p-8 border border-brand-navy/10 relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-coral" />
              
              <div className="mb-6 flex justify-between items-center">
                <span className="font-mono text-[9px] tracking-widest text-brand-coral font-bold uppercase">SECURE SCHEDULER CONSOLE</span>
                <button onClick={() => setShowDirectScheduler(false)} className="text-xs font-mono text-brand-navy/40 hover:text-brand-navy">COLLAPSE</button>
              </div>

              {rsvpStep === 'submitted' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <CheckCircle2 size={44} className="text-green-600 mx-auto animate-bounce" />
                  <h4 className="font-display font-black text-xl text-brand-navy uppercase tracking-tighter">Availability Recorded!</h4>
                  <p className="text-xs text-brand-navy/70 max-w-sm mx-auto font-body">
                    Saad Matar&apos;s office has logged your preference of <strong>{preferredTime}</strong> via {contactMethod}. We will ping you soon to wrap up the details.
                  </p>
                  <button 
                    onClick={() => setRsvpStep('idle')} 
                    className="font-mono text-[9px] uppercase tracking-widest text-brand-coral hover:text-brand-navy transition-colors font-bold"
                  >
                    Reschedule or edit notes
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">Preferred Day & Hour</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Wednesday 4PM or Thursday Morning" 
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-coral transition-colors text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">Preferred Contact Mode</label>
                      <select 
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                        className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-coral transition-colors text-xs select-custom appearance-none"
                      >
                        <option value="Whatsapp">WhatsApp Video / Audio Call</option>
                        <option value="Google Meet">Google Meet Invitation</option>
                        <option value="Direct Call">Direct Voice Phone Call</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] tracking-widest uppercase font-black text-brand-navy/60 mb-2">Notes or Dietary restrictions (Optional)</label>
                    <textarea 
                      placeholder="Share dietary details, arrival timing constraints, or visual content thoughts..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-brand-navy/15 text-brand-navy rounded-xl p-4 focus:outline-none focus:border-brand-coral transition-colors text-xs"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={rsvpStep === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-coral text-white px-8 py-4 rounded-xl transition-all font-display font-black uppercase text-xs tracking-wider cursor-pointer"
                  >
                    <span>{rsvpStep === 'submitting' ? 'PROPOSING...' : 'CONFIRM COORDINATES & SUBMIT'}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Full spans final quote panel */}
        <div className="bg-[#000000] text-[#FEDD8B] rounded-[2.5rem] p-10 md:p-14 text-center shadow-xl space-y-1 relative overflow-hidden">
          <p className="font-mono text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/50 mb-3">CONCLUDING MANDATE</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl leading-snug">
            This is Tripoli&apos;s event. And we believe it deserves voices like yours in the room.
          </h2>
        </div>

        {/* Saad Matar footer card with signature style */}
        <div className="pt-8 border-t border-brand-navy/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1 text-left">
            <h3 className="font-display text-lg font-black text-brand-navy uppercase leading-none">SAAD MATAR</h3>
            <p className="font-mono text-[9px] text-brand-coral font-bold uppercase tracking-widest">ROOTS & REACH — FAYHAA EDITION</p>
            <p className="font-mono text-[8px] text-brand-navy/40 uppercase tracking-widest">LET&apos;S MAKE // TRIPOLI</p>
          </div>

          <a 
            href="https://rootsandreach.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-b border-brand-navy/20 pb-1 font-mono text-xs font-black text-brand-navy hover:text-brand-coral hover:border-brand-coral transition-all"
          >
            <span>rootsandreach.org</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

      </main>
    </div>
  );
};
