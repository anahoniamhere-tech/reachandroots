import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Mic, Video, Users, ArrowRight, X, ChevronRight, 
  MapPin, Clock, Sparkles, Target, Zap, Waves, Signal
} from 'lucide-react';

interface Experience {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  bgLight: string;
  longDesc: string;
  idealFor: string[];
  examples: string[];
  cta: string;
  track: string;
}

const experiences: Experience[] = [
  { 
    id: 'narrative',
    icon: <Globe size={20} />, 
    title: "The Narrative", 
    desc: "Regional voice meets global screen.", 
    color: "text-brand-coral",
    bgLight: "bg-brand-coral/10",
    longDesc: "The Narrative pathway is designed for creators who bridge the gap between regional heritage and global digital audiences. It focuses on how Levantine stories are translated into compelling, cinematic, and high-impact digital media.",
    idealFor: [
      "Documentary storytellers",
      "Interview-led creators",
      "Cultural and regional storytellers",
      "Journalists documenting heritage"
    ],
    examples: [
      "Short-form cultural documentaries",
      "Heritage-focused video essays",
      "Cross-border digital collaborations",
      "Bilingual narrative series"
    ],
    cta: "Apply under Narrative",
    track: "narrative"
  },
  { 
    id: 'pulse',
    icon: <Mic size={20} />, 
    title: "The Pulse", 
    desc: "Creator keynotes and podcast labs.", 
    color: "text-brand-orange",
    bgLight: "bg-brand-orange/10",
    longDesc: "The Pulse is the sonic heart of Roots & Reach. It encompasses oral traditions, audio-first storytelling, and the power of the spoken word in a digital-first creator economy.",
    idealFor: [
      "Podcast creators",
      "Voice-over artists & hosts",
      "Keynote-style media voices",
      "Live conversation facilitators"
    ],
    examples: [
      "Live podcast recordings",
      "Creator keynote sessions",
      "Audio documentary labs",
      "Sonic landscape capturing"
    ],
    cta: "Apply under Pulse",
    track: "pulse"
  },
  { 
    id: 'digital',
    icon: <Video size={20} />, 
    title: "Digital Creator Pass", 
    desc: "New media art in heritage zones.", 
    color: "text-brand-sky",
    bgLight: "bg-brand-sky/10",
    longDesc: "The Digital Creator Pass track explores the intersection of technology, visual arts, and architectural heritage. It's for those re-imagining historical spaces through new media lenses.",
    idealFor: [
      "Digital artists",
      "New media creators",
      "Visual storytellers",
      "Experimental content makers"
    ],
    examples: [
      "Media art in heritage settings",
      "AR/VR cultural experiences",
      "Projection mapping projects",
      "Experimental visual narratives"
    ],
    cta: "Apply under Digital Creator Pass",
    track: "digital"
  },
  { 
    id: 'collective',
    icon: <Users size={20} />, 
    title: "Collective Hub", 
    desc: "High-impact mentorship sessions.", 
    color: "text-brand-lavender",
    bgLight: "bg-brand-lavender/10",
    longDesc: "The Collective Hub is dedicated to the collaborative spirit of the Levant. It focuses on the ecosystem of creators, the power of community, and the transfer of knowledge between generations.",
    idealFor: [
      "Collaborative creators",
      "Mentors & Coaches",
      "Community facilitators",
      "Community-centered practitioners"
    ],
    examples: [
      "Mentorship and shared learning labs",
      "Collaborative production cycles",
      "Community-led media workshops",
      "Networking and collective strategy"
    ],
    cta: "Apply under Collective Hub",
    track: "collective"
  },
];

interface ExperienceHighlightsProps {
  onApplyWithTrack?: (track: string) => void;
}

export const ExperienceHighlights: React.FC<ExperienceHighlightsProps> = ({ onApplyWithTrack }) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const handleCardClick = (exp: Experience) => {
    setSelectedExperience(exp);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedExperience(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="py-40 bg-warm-beige relative overflow-hidden">
      <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <header className="grid md:grid-cols-12 gap-10 mb-24 items-end">
          <div className="md:col-span-8">
            <span className="editorial-label text-brand-coral mb-8 block tracking-[0.5em]">Experience Modules</span>
            <h2 className="editorial-h2 mb-4">A Multi-Media Confluence.</h2>
          </div>
          <p className="md:col-span-4 font-body text-xl text-brand-navy/40 leading-tight md:text-right">
            Curated zones where technical innovation powers cultural resilience.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, i) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => handleCardClick(exp)}
              className="media-card group p-10 h-full flex flex-col justify-between cursor-pointer hover:bg-white hover:shadow-2xl transition-all duration-500 active:scale-[0.98]"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                   <div className={`w-14 h-14 flex items-center justify-center ${exp.bgLight} ${exp.color} rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                      {exp.icon}
                   </div>
                   <span className="editorial-label text-[10px] opacity-20">MOD-{i+1}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-brand-navy mb-3 uppercase tracking-tight group-hover:text-brand-coral transition-colors">{exp.title}</h3>
                <p className="font-body text-brand-navy/50 leading-snug group-hover:text-brand-navy transition-colors">{exp.desc}</p>
              </div>
              
              <div className="mt-12 flex items-center gap-4 group-hover:gap-6 transition-all duration-500">
                <div className="h-px flex-1 bg-brand-navy/5 group-hover:bg-brand-coral/20" />
                <div className="w-10 h-10 rounded-full border border-brand-navy/5 flex items-center justify-center group-hover:bg-brand-coral group-hover:text-white transition-all shadow-sm">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Detail Panel */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md"
            />
            
            {/* Content Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] mx-auto"
            >
              {/* Sidebar / Left side (Branding) */}
              <div className={`md:w-1/3 p-8 sm:p-12 ${selectedExperience.bgLight} flex flex-col justify-between relative`}>
                <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl ${selectedExperience.bgLight} border border-brand-navy/5 flex items-center justify-center ${selectedExperience.color} mb-6 sm:mb-8 shadow-xl bg-white`}>
                    {React.cloneElement(selectedExperience.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <span className="editorial-label text-brand-navy/30 mb-2 block uppercase font-bold tracking-widest text-[8px] sm:text-[10px]">Track Sequence_0{experiences.indexOf(selectedExperience) + 1}</span>
                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-brand-navy uppercase tracking-tighter leading-none mb-4 sm:mb-6">
                    {selectedExperience.title}
                  </h3>
                </div>

                <div className="relative z-10 space-y-4 sm:space-y-6 mt-4 md:mt-0">
                   <div className="flex items-center gap-3">
                      <Zap size={14} className={selectedExperience.color} />
                      <span className="editorial-label text-[8px] text-brand-navy/40 font-bold uppercase tracking-widest">Creator Focused</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Target size={14} className={selectedExperience.color} />
                      <span className="editorial-label text-[8px] text-brand-navy/40 font-bold uppercase tracking-widest">Creator Pass Access</span>
                   </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8 sm:p-12 md:p-20 overflow-y-auto no-scrollbar relative">
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 hover:bg-warm-beige rounded-full transition-colors text-brand-navy/20 hover:text-brand-navy"
                >
                  <X size={20} />
                </button>

                <div className="max-w-2xl">
                  <div className="space-y-8 sm:space-y-12">
                    {/* Description */}
                    <section>
                      <p className="font-body text-lg sm:text-2xl text-brand-navy leading-tight font-medium">
                        {selectedExperience.longDesc}
                      </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 pt-8 sm:pt-12 border-t border-brand-navy/5">
                      {/* Ideal For */}
                      <section>
                        <h4 className="font-display font-bold text-sm uppercase tracking-widest text-brand-navy mb-6">Ideal For</h4>
                        <ul className="space-y-4">
                          {selectedExperience.idealFor.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <ChevronRight size={14} className={selectedExperience.color + " mt-0.5 shrink-0"} />
                              <span className="font-body text-brand-navy/60 text-sm leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      {/* Examples */}
                      <section>
                        <h4 className="font-display font-bold text-sm uppercase tracking-widest text-brand-navy mb-6">Example Outputs</h4>
                        <ul className="space-y-4">
                          {selectedExperience.examples.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <Sparkles size={14} className={selectedExperience.color + " mt-0.5 shrink-0"} />
                              <span className="font-body text-brand-navy/60 text-sm leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    {/* CTA */}
                    <section className="pt-12">
                      <button 
                        onClick={() => {
                          if (onApplyWithTrack) onApplyWithTrack(selectedExperience.track);
                          closeModal();
                        }}
                        className={`w-full group flex items-center justify-between p-8 rounded-3xl bg-brand-navy text-white hover:bg-brand-coral transition-all duration-500 shadow-xl`}
                      >
                        <div className="flex flex-col text-left">
                          <span className="editorial-label text-[8px] opacity-40 uppercase tracking-[0.3em] font-bold mb-2">Registry Sequence</span>
                          <span className="font-display font-bold text-2xl uppercase tracking-widest">{selectedExperience.cta}</span>
                        </div>
                        <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full text-brand-navy group-hover:bg-white group-hover:text-brand-coral transition-all">
                           <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </section>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
