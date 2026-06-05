import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, Trophy, Smartphone, Heart, 
  Library, Star, Users, ExternalLink, ArrowRight,
  Sparkles, Video, Mic2
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

import wessamqImg from '../assets/wessamq.jpg';
import theRahalImg from '../assets/the.rahal.jpg';
import mariamBachatImg from '../assets/mariam.bachat.jpg';
import waelArakjiImg from '../assets/waelarakji.jpg';
import patrickDaoudImg from '../assets/patrickdaoud.jpg';
import osamaMarwahImg from '../assets/ossymarwah.jpg';
import eisaAlHabibImg from '../assets/eisayo.jpg';
import itsKhatibImg from '../assets/ItsKhatib.jpg';
import karenWazenImg from '../assets/KarenWazen.jpg';
import yasminNasirImg from '../assets/yasmin.nasir.jpg';
import husseinFayadImg from '../assets/Husein_Fayad.jpg';
import chadiMaatoukImg from '../assets/Chadi_Maatouk.jpg';
import abirAlSaghirImg from '../assets/abiresag.jpg';

interface Creator {
  name: string;
  niche: string;
  handle: string;
  link: string;
  image?: string;
  location?: string;
  day?: string;
  title?: string;
}

const creators: Creator[] = [
  { name: "Wessam Quotob", niche: "Influence", handle: "@wessamq", link: "https://www.instagram.com/wessamq/" },
  { name: "The Rahal", niche: "Family Content", handle: "@the.rahal", link: "https://www.instagram.com/the.rahal/" },
  { name: "Mariam Bachat", niche: "Tourism / Adventures", handle: "@mariam.bachat", link: "https://www.instagram.com/mariam.bachat/" },
  { name: "Wael Arakji", niche: "Sports", handle: "@waelarakji", link: "https://www.instagram.com/waelarakji/" },
  { name: "Patrick Daoud", niche: "Content", handle: "@patrickdaoud", link: "https://www.instagram.com/patrickdaoud/" },
  { name: "Osama Marwah", niche: "Content", handle: "@ossymarwah", link: "https://www.instagram.com/ossymarwah/?hl=en" },
  { name: "Eisa Al Habib", niche: "Informative", handle: "@eisayo", link: "https://www.instagram.com/eisayo/?hl=en" },
  { name: "Ahmad Al Khatib", niche: "Comedy", handle: "@itskhateb", link: "https://www.instagram.com/itskhateb/" },
  { name: "Karen Wazen", niche: "Beauty and Fashion", handle: "@karenwazen", link: "https://www.instagram.com/karenwazen/" },
  { name: "Yasmin Nasir", niche: "Food", handle: "@yasmin.nasir", link: "https://www.instagram.com/yasmin.nasir/" },
  { name: "Hussein Fayyad", niche: "Food", handle: "@husenfayad", link: "https://www.instagram.com/husenfayad/" },
  { name: "Chadi Maatouk", niche: "Food", handle: "@cckchadymaatouk", link: "https://www.instagram.com/cckchadymaatouk/" },
  { name: "Abir Al Saghir", niche: "Food", handle: "@abiresag", link: "https://www.instagram.com/abiresag/" },
];

const getPlatformIcon = (url: string) => {
  if (url.includes('instagram.com')) return <Smartphone size={12} />;
  if (url.includes('tiktok.com')) return <Video size={12} />;
  if (url.includes('youtube.com')) return <YoutubeIcon size={12} />;
  return <ExternalLink size={12} />;
};

const YoutubeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const getProfileImage = (creator: Creator) => {
  // Manual overrides for specific creators using uploaded assets
  const manualOverrides: Record<string, string> = {
    "Wessam Quotob": wessamqImg,
    "The Rahal": theRahalImg,
    "Mariam Bachat": mariamBachatImg,
    "Wael Arakji": waelArakjiImg,
    "Patrick Daoud": patrickDaoudImg,
    "Osama Marwah": osamaMarwahImg,
    "Eisa Al Habib": eisaAlHabibImg,
    "Ahmad Al Khatib": itsKhatibImg,
    "Karen Wazen": karenWazenImg,
    "Yasmin Nasir": yasminNasirImg,
    "Hussein Fayyad": husseinFayadImg,
    "Chadi Maatouk": chadiMaatoukImg,
    "Abir Al Saghir": abirAlSaghirImg,
  };

  if (manualOverrides[creator.name]) {
    return manualOverrides[creator.name];
  }

  // Fallback pattern if not in manual overrides (though we filtered the list to these 10)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=F7F5F0&color=EE6C4D&bold=true`;
};

const Grid = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

const MapPinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const ShieldIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </svg>
);

const niches = [
  { name: "All", icon: <Grid size={14} /> },
  { name: "Food", icon: <Utensils size={14} /> },
  { name: "Beauty and Fashion", icon: <Sparkles size={14} /> },
  { name: "Comedy", icon: <Smartphone size={14} /> },
  { name: "Sports", icon: <Trophy size={14} /> },
  { name: "Content", icon: <Video size={14} /> },
  { name: "Mom's Content", icon: <Heart size={14} /> },
  { name: "Story", icon: <Library size={14} /> },
  { name: "Influence", icon: <Star size={14} /> },
  { name: "Informative", icon: <Mic2 size={14} /> },
  { name: "Tourism / Adventures", icon: <MapPinIcon size={14} /> },
  { name: "Family Content", icon: <Users size={14} /> },
  { name: "Influence During War", icon: <ShieldIcon size={14} /> },
];

export const CreatorShowcase = ({ onNavigate }: { onNavigate: (v: any) => void }) => {
  const [activeNiche, setActiveNiche] = useState("All");
  const { t } = useLanguage();

  const filteredCreators = activeNiche === "All" 
    ? creators 
    : creators.filter(c => c.niche === activeNiche);

  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-brand-coral/5 soft-glow petal-shape rotate-45" />
      <div className="absolute inset-0 pixel-grid opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Users size={16} className="text-brand-coral" />
              <span className="editorial-label text-brand-coral tracking-[0.5em] uppercase">The Registry</span>
            </div>
            <h2 className="editorial-h2 mb-4">Explore Creator Profiles.</h2>
            <p className="font-body text-xl text-brand-navy/40 leading-snug">
              Celebrating the storytellers, innovators, and cultural authorities shaping the Levantine digital narrative.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 lg:justify-end max-w-2xl">
            {niches.map((niche) => (
              <button
                key={niche.name}
                onClick={() => setActiveNiche(niche.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-[10px] uppercase tracking-widest transition-all ${activeNiche === niche.name ? 'bg-brand-navy text-white shadow-xl' : 'bg-warm-beige/50 text-brand-navy/40 hover:bg-warm-beige'}`}
              >
                {niche.icon}
                {niche.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[600px]">
          <AnimatePresence mode="popLayout">
            {filteredCreators.map((creator, i) => (
              <motion.a
                layout
                key={creator.name}
                href={creator.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="media-card group p-8 bg-white border border-brand-navy/5 relative flex flex-col justify-between hover:shadow-2xl hover:border-brand-coral/20 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center mb-10">
                    <div className="relative group/avatar">
                      <div className="w-28 h-28 rounded-full bg-warm-beige overflow-hidden ring-4 ring-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                         <img 
                           src={getProfileImage(creator)} 
                           alt={creator.name} 
                           className="w-full h-full object-cover"
                           referrerPolicy="no-referrer"
                           onError={(e) => {
                             (e.target as HTMLImageElement).style.display = 'none';
                           }}
                         />
                         {/* Hidden by default, shown if img fails or is loading */}
                         <div className="absolute inset-0 w-full h-full flex items-center justify-center text-brand-coral bg-brand-coral/10 -z-10">
                            <UserIcon niche={creator.niche} size={32} />
                         </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-brand-coral ring-4 ring-white">
                         <UserIcon niche={creator.niche} size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8 text-center">
                    <h4 className="font-display font-bold text-2xl text-brand-navy mb-1 group-hover:text-brand-coral transition-colors">{creator.name}</h4>
                    {creator.title && <p className="font-body text-[10px] text-brand-navy/30 italic mb-2 leading-tight uppercase font-bold tracking-wider">{creator.title}</p>}
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-coral rounded-full" />
                      <span className="editorial-label text-[8px] text-brand-coral uppercase tracking-widest">{creator.niche}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-brand-navy/5 flex flex-col items-center gap-6">
                   <div className="flex flex-col items-center">
                      <span className="editorial-label text-[7px] text-brand-navy/20 font-bold uppercase tracking-[0.2em] mb-1">Public Profile</span>
                      <span className="font-mono text-[9px] text-brand-navy/40 lowercase">{creator.handle}</span>
                   </div>
                   <div className="w-full px-6 py-4 rounded-full bg-brand-navy text-white flex items-center justify-center gap-2 group-hover:bg-brand-coral transition-all shadow-lg overflow-hidden font-display font-bold text-[9px] uppercase tracking-widest">
                     Visit Profile
                     <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                   </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
        
        <div 
          className="mt-32 p-16 bg-brand-navy rounded-[3rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden cursor-pointer group shadow-2xl"
          onClick={() => onNavigate('sanctuary')}
        >
           <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
           <div className="max-w-xl relative z-10 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <Sparkles size={16} className="text-brand-gold" />
                <span className="editorial-label text-brand-gold tracking-[0.5em]">Live Broadcast</span>
              </div>
              <h3 className="editorial-h2 text-white mb-4 text-3xl">Are you a creator?</h3>
              <p className="font-body text-white/50 text-lg">Apply for the Media Creator Pass and explore a creator-focused entry into Roots & Reach — Fayhaa Edition.</p>
           </div>
           <div className="flex flex-col items-center gap-4 relative z-10">
              <button className="bg-white text-brand-navy editorial-label px-12 py-5 rounded-full group-hover:bg-brand-coral group-hover:text-white transition-all shadow-2xl">
                  {t.sanctuary.hero.apply}
              </button>
              <span className="editorial-label text-[8px] text-white/40 group-hover:text-brand-coral tracking-widest transition-colors font-bold uppercase">{t.sanctuary.hero.view}</span>
           </div>
        </div>
      </div>
    </section>
  );
};

const UserIcon = ({ niche, size = 24 }: { niche: string, size?: number }) => {
  switch (niche) {
    case 'Food': return <Utensils size={size} />;
    case 'Beauty and Fashion': return <Sparkles size={size} />;
    case 'Comedy': return <Mic2 size={size} />;
    case 'Sports': return <Trophy size={size} />;
    case 'Content': return <Video size={size} />;
    case 'Informative': return <Smartphone size={size} />;
    case 'YouTube': return <Video size={size} />;
    case 'Tourism / Adventures': return <MapPinIcon size={size} />;
    case 'Family Content': return <Users size={size} />;
    case 'Mom\'s Content': return <Heart size={size} />;
    case 'Story': return <Mic2 size={size} />;
    case 'Influence': return <Star size={size} />;
    case 'Influence During War': return <ShieldIcon size={size} />;
    default: return <Users size={size} />;
  }
};
