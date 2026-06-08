import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, ArrowLeft, Maximize2, X, Share2, 
  ExternalLink, Check, Copy
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface GalleryPageProps {
  onNavigate: (v: any) => void;
}

const GALLERY_PHOTOS = [
  {
    id: 'exhibition',
    url: '/gallery/gallery_exhibition.jpg',
    title: { en: 'Tripoli Explained Exhibition', ar: 'معرض طرابلس المشروحة' },
    description: { en: 'An interactive journey exploring the rich heritage of Tripoli at the Rashid Karami International Fairgrounds.', ar: 'رحلة تفاعلية تستكشف التراث الغني لمدينة طرابلس في معرض رشيد كرامي الدولي.' }
  },
  {
    id: 'creator1',
    url: '/gallery/gallery_creator1.jpg',
    title: { en: 'Content Creator Spotlight', ar: 'تسليط الضوء على منشئي المحتوى' },
    description: { en: 'Empowering local storytelling through regional digital voices.', ar: 'تمكين سرد القصص المحلية من خلال الأصوات الرقمية الإقليمية.' }
  },
  {
    id: 'creator2',
    url: '/gallery/gallery_creator2.jpg',
    title: { en: 'Community Gathering', ar: 'التجمع المجتمعي' },
    description: { en: 'Building bridges between local talent and regional creators.', ar: 'بناء الجسور بين المواهب المحلية والمبدعين الإقليميين.' }
  },
  {
    id: 'creator3',
    url: '/gallery/gallery_creator3.jpg',
    title: { en: 'Cultural Exchange', ar: 'التبادل الثقافي' },
    description: { en: 'Sharing insights and regional voices defining the Mediterranean creative soul.', ar: 'مشاركة الأفكار والأصوات الإقليمية التي تحدد الروح الإبداعية للبحر الأبيض المتوسط.' }
  },
  {
    id: 'creator4',
    url: '/gallery/gallery_creator4.jpg',
    title: { en: 'Modern Narratives', ar: 'الروايات الحديثة' },
    description: { en: 'Exploring heritage through digital storytelling and modern design.', ar: 'استكشاف التراث من خلال سرد القصص الرقمية والتصميم الحديث.' }
  },
  {
    id: 'creator5',
    url: '/gallery/gallery_creator5.jpg',
    title: { en: 'Heritage and Companionship', ar: 'التراث والصحبة' },
    description: { en: 'Documenting the serene integration of local life and historic architectural ruins.', ar: 'توثيق التكامل الهادئ للحياة المحلية والأطلال المعمارية التاريخية.' }
  },
  {
    id: 'creator6',
    url: '/gallery/gallery_creator6.jpg',
    title: { en: 'Culinary Storytelling', ar: 'سرد قصص الطهي' },
    description: { en: 'Sharing authentic Mediterranean recipes and community food traditions.', ar: 'مشاركة وصفات البحر الأبيض المتوسط الأصيلة وتقاليد الطعام المجتمعية.' }
  },
  {
    id: 'creator7',
    url: '/gallery/gallery_creator7.jpg',
    title: { en: 'Creative Reflection', ar: 'التأمل الإبداعي' },
    description: { en: 'A regional creator contemplating the synthesis of modern media and tradition.', ar: 'مبدع إقليمي يتأمل في توليف وسائل الإعلام الحديثة والتقاليد.' }
  },
  {
    id: 'creator8',
    url: '/gallery/gallery_creator8.jpg',
    title: { en: 'Moments of Joy', ar: 'لحظات من الفرح' },
    description: { en: 'Celebrating the laughter and authentic connection between content creators.', ar: 'الاحتفال بالضحك والتواصل الأصيل بين منشئي المحتوى.' }
  },
  {
    id: 'fair',
    url: '/gallery/gallery_fair.jpg',
    title: { en: 'Rashid Karami Pavilion', ar: 'جناح رشيد كرامي' },
    description: { en: 'A sunlit view of Oscar Niemeyer’s iconic modernist architecture in Tripoli.', ar: 'منظر مشمس للعمارة الحداثية الشهيرة للمصمم أوسكار نيماير في طرابلس.' }
  }
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { language, isRTL } = useLanguage();
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_PHOTOS[0] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = {
    en: {
      label: 'Digital Archive',
      title: 'Roots & Reach',
      titleItalic: 'Gallery',
      description: 'A visual anthology capturing moments of cultural exchange, community gathering, and the architectural wonders of Tripoli.',
      backHome: 'Back to website',
      shareLink: 'Copy direct image link',
      copied: 'Copied!',
      viewFull: 'View full size',
      close: 'Close'
    },
    ar: {
      label: 'الأرشيف الرقمي',
      title: 'جذور ووصول',
      titleItalic: 'المعرض الفني',
      description: 'مجموعة بصرية توثق لحظات التبادل الثقافي، والتجمعات المجتمعية، والروائع المعمارية في طرابلس.',
      backHome: 'العودة للموقع',
      shareLink: 'نسخ رابط الصورة المباشر',
      copied: 'تم النسخ!',
      viewFull: 'عرض الحجم الكامل',
      close: 'إغلاق'
    }
  }[language === 'ar' ? 'ar' : 'en'];

  const copyToClipboard = (id: string, url: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className={`min-h-screen bg-warm-beige/35 backdrop-blur-3xl pt-24 pb-24 ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
      <div className="absolute inset-0 pixel-grid opacity-30 pointer-events-none" />
      
      {/* HEADER / NAVIGATION */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-8 mb-16">
        <button 
          onClick={() => onNavigate('landing')}
          className={`group inline-flex items-center gap-3 text-brand-navy hover:text-brand-coral transition-colors font-display font-bold text-xs uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <ArrowLeft size={16} className={`transition-transform group-hover:-translate-x-1 ${isRTL ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
          {t.backHome}
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative pb-16 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-brand-coral" />
              <span className="editorial-label text-brand-coral tracking-[0.5em] font-bold uppercase">
                {t.label}
              </span>
            </div>
            
            <h1 className="editorial-h1 lowercase tracking-tighter mb-10 leading-[0.8] text-brand-navy">
              {t.title} <br />
              <span className="text-brand-coral italic font-normal">{t.titleItalic}</span>
            </h1>
            
            <p className="font-body text-xl md:text-2xl max-w-3xl mb-16 leading-relaxed text-brand-navy/60 font-medium tracking-tight">
              {t.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* MASONRY / GRID GALLERY */}
      <section className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]">
          {GALLERY_PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="break-inside-avoid relative group rounded-[2rem] overflow-hidden bg-brand-navy/5 border border-brand-navy/5 glass-card shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-auto" onClick={() => setActivePhoto(photo)}>
                <img 
                  src={photo.url} 
                  alt={language === 'ar' ? photo.title.ar : photo.title.en}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/95 text-brand-navy flex items-center justify-center shadow-lg transition-transform duration-300 scale-90 group-hover:scale-100 hover:bg-brand-coral hover:text-white">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>

              {/* Caption details */}
              <div className="p-8 flex flex-col justify-between flex-1 bg-white/70 backdrop-blur-md">
                <div onClick={() => setActivePhoto(photo)}>
                  <h3 className="font-display font-bold text-xl text-brand-navy uppercase mb-3 tracking-tight">
                    {language === 'ar' ? photo.title.ar : photo.title.en}
                  </h3>
                  <p className="font-body text-sm text-brand-navy/60 leading-relaxed mb-6">
                    {language === 'ar' ? photo.description.ar : photo.description.en}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-brand-navy/5 flex justify-between items-center">
                  <span className="font-mono text-[10px] tracking-wider text-brand-navy/40 uppercase">
                    ID: {photo.id.toUpperCase()}
                  </span>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(photo.id, photo.url);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-navy/5 hover:bg-brand-coral hover:text-white rounded-full text-brand-navy/60 transition-colors text-[10px] font-display font-bold uppercase tracking-wider"
                    title={t.shareLink}
                  >
                    {copiedId === photo.id ? (
                      <>
                        <Check size={12} className="text-green-500 group-hover:text-white" />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-brand-navy/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setActivePhoto(null)}
          >
            {/* Close button */}
            <button 
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 z-[160] w-12 h-12 rounded-full bg-white/10 hover:bg-brand-coral text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
              title={t.close}
            >
              <X size={24} />
            </button>

            {/* Lightbox Content Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full flex flex-col md:flex-row bg-warm-beige rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Area */}
              <div className="md:w-2/3 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
                <img 
                  src={activePhoto.url} 
                  alt={language === 'ar' ? activePhoto.title.ar : activePhoto.title.en}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>

              {/* Details Side-Panel */}
              <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-between bg-white text-brand-navy">
                <div>
                  <div className="flex items-center gap-2 mb-6 text-brand-coral">
                    <Camera size={16} />
                    <span className="editorial-label text-brand-coral font-bold tracking-widest">{t.label}</span>
                  </div>
                  
                  <h2 className="font-display font-black text-2xl md:text-3xl text-brand-navy uppercase mb-6 tracking-tight">
                    {language === 'ar' ? activePhoto.title.ar : activePhoto.title.en}
                  </h2>
                  
                  <p className="font-body text-base text-brand-navy/70 leading-relaxed mb-8">
                    {language === 'ar' ? activePhoto.description.ar : activePhoto.description.en}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-brand-navy/10">
                  <div className="flex justify-between items-center text-xs font-mono text-brand-navy/40">
                    <span>PATH:</span>
                    <span className="font-bold">{activePhoto.url}</span>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => copyToClipboard(activePhoto.id, activePhoto.url)}
                      className="flex-1 flex items-center justify-center gap-2 py-4 px-6 border-2 border-brand-navy hover:border-brand-coral hover:bg-brand-coral hover:text-white rounded-2xl font-display font-bold text-xs tracking-wider uppercase transition-colors"
                    >
                      {copiedId === activePhoto.id ? (
                        <>
                          <Check size={14} className="text-green-500" />
                          {t.copied}
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          {t.shareLink.split(' ')[0] + ' Link'}
                        </>
                      )}
                    </button>
                    
                    <a 
                      href={activePhoto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-4 bg-brand-navy hover:bg-brand-coral text-white rounded-2xl transition-colors shadow-lg"
                      title={t.viewFull}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
