import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Activity, ArrowRight, BarChart2, BookOpen, Calendar,
  ChevronDown, ChevronUp, Eye, FileText, Globe, Lightbulb,
  Link as LinkIcon, PieChart, Play, TrendingUp, Users, Video,
  Mic2, PlayCircle, ExternalLink, Youtube, Instagram, Languages
} from 'lucide-react';
import { TRF_CONTENT_SHEET, TRF_ARTICLES, TRF_PROPOSAL_EN, TRF_PROPOSAL_AR, TRF_PODCASTS } from '../constants/trfData';

export const TrfAnahonPage = ({ onNavigate }: { onNavigate?: (v: string) => void }) => {
  const navigate = useNavigate();
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url || url.includes('youtube.com/embed/')) return url;
    let videoId = '';
    if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1]?.split('?')[0];
    else if (url.includes('youtube.com/watch')) {
      try { videoId = new URL(url).searchParams.get('v') || ''; } catch(e) {}
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // Stats to display based on the prompt insights
  const stats = [
    { label: lang === 'ar' ? 'إجمالي المشاهدات' : 'Total Views', value: '461,561', icon: <Eye size={20} className="text-brand-coral" /> },
    { label: lang === 'ar' ? 'الحسابات التي تم الوصول إليها' : 'Accounts Reached', value: '299,271', icon: <Users size={20} className="text-brand-coral" /> },
    { label: lang === 'ar' ? 'مشاهدات غير المتابعين' : 'Non-follower Views', value: '84%', icon: <Globe size={20} className="text-brand-coral" /> },
    { label: lang === 'ar' ? 'نسبة مشاهدات الريلز' : 'Reels Views Share', value: '89%', icon: <Video size={20} className="text-brand-coral" /> }
  ];

  const platformStats = [
    { name: lang === 'ar' ? 'المنصة ١' : 'Platform 1', views: '423,768', reach: '287,078', nonFollowers: '84.9%' },
    { name: lang === 'ar' ? 'المنصة ٢' : 'Platform 2', views: '37,793', reach: '12,193', nonFollowers: '75.5%' },
  ];

  return (
    <div className="min-h-screen bg-warm-beige pt-32 pb-40" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Language Toggle Button */}
      <button 
        onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        className={`fixed top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm ring-1 ring-brand-navy/10 hover:bg-white transition-all`}
      >
        <Languages size={18} className="text-brand-coral" />
        <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-navy mt-0.5">
          {lang === 'ar' ? 'EN' : 'عربي'}
        </span>
      </button>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-brand-coral" />
            <span className="editorial-label text-brand-coral tracking-[0.4em] font-bold uppercase">{lang === 'ar' ? 'التقرير النهائي' : 'Final Report'}</span>
            <div className="h-px w-12 bg-brand-coral" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-navy mb-6">
            TRF &times; AnaHon
          </h1>
          <p className="font-body text-xl md:text-2xl text-brand-navy/60 max-w-3xl mx-auto leading-relaxed">
            {lang === 'ar' ? 'نظرة شاملة على مدى وصول الحملة، الأنشطة المنشورة، والرؤى الاستراتيجية لمشروع TRF بالتعاون مع أنا هون.' : 'A comprehensive overview of campaign reach, published activities, and strategic insights for the AnaHon TRF Project.'}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white px-8 py-4 rounded-full ring-1 ring-brand-navy/5 shadow-sm text-sm text-brand-navy/70 mx-auto">
              <span className="font-bold text-brand-coral">33</span> {lang === 'ar' ? 'إجمالي المحتوى' : 'Total Content'}
              <span className="px-3 text-brand-navy/20">|</span>
              <span><strong className="text-brand-navy">3</strong> {lang === 'ar' ? 'بودكاست' : 'Podcasts'}</span>
              <span className="px-1 text-brand-navy/20">•</span>
              <span><strong className="text-brand-navy">3</strong> {lang === 'ar' ? 'مقالات' : 'Articles'}</span>
              <span className="px-1 text-brand-navy/20">•</span>
              <span><strong className="text-brand-navy">2</strong> {lang === 'ar' ? 'حملتان رئيسيتان' : 'Main Campaigns'}</span>
            </div>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-2 rounded-full bg-brand-coral/10 text-xs font-bold text-brand-coral">
              <span>{lang === 'ar' ? 'الحملة ١: انهيار المباني في طرابلس' : 'Campaign 1: Collapsing Buildings in Tripoli'}</span>
              <span className="px-2 opacity-50">|</span>
              <span>{lang === 'ar' ? 'الحملة ٢: النازحون في شمال لبنان' : 'Campaign 2: Displaced People in North Lebanon'}</span>
            </div>
          </div>
        </motion.div>

        {/* Campaign Reach and Visibility Insights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <BarChart2 className="text-brand-coral" size={28} />
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-brand-navy font-bold">
              {lang === 'ar' ? 'مدى الوصول والظهور للحملة' : 'Campaign Reach & Visibility'}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl ring-1 ring-brand-navy/5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  {stat.icon}
                </div>
                <h3 className="font-display text-4xl font-bold text-brand-navy tracking-tighter mb-2">{stat.value}</h3>
                <p className="editorial-label text-brand-navy/50 uppercase text-xs tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[3rem] ring-1 ring-brand-navy/5 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 pixel-grid opacity-5 pointer-events-none" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-brand-navy uppercase tracking-tighter mb-4">
                  {lang === 'ar' ? 'الرؤى الاستراتيجية' : 'Strategic Insights'}
                </h3>
                <p className="font-body text-brand-navy/70 leading-relaxed text-lg">
                  {lang === 'ar' ? (
                    <>تشير رؤى المنصات من "أنا هون" و"iContent" خلال فترة الحملة إلى مستوى عالٍ من الظهور والتفاعل للمحتوى المنشور. على مدار فترة الـ 90 يومًا عبر كلتا المنصتين، حققت الحسابات مجتمعة <strong>461,561 مشاهدة</strong> ووصلت إلى <strong>299,271 حسابًا</strong>.</>
                  ) : (
                    <>Platform insights from AnaHon and iContent during the campaign period indicate strong visibility and audience penetration for the published content. Across both platforms over the relevant 90-day period, the accounts generated a combined <strong>461,561 views</strong> and reached <strong>299,271 accounts</strong>.</>
                  )}
                </p>
                <p className="font-body text-brand-navy/70 leading-relaxed text-lg">
                  {lang === 'ar' ? (
                    <>جاءت الغالبية العظمى من هذه المشاهدات من غير المتابعين (ما يقرب من 84%)، مما يشير إلى أن المحتوى امتد إلى ما هو أبعد من الجماهير الحالية للمنصات وكان قادرًا على الوصول إلى دوائر عامة أوسع. كانت فيديوهات "الريلز" الدافع الرئيسي للظهور، حيث شكلت حوالي <strong>89% من إجمالي المشاهدات</strong>، مما يؤكد فعالية الفيديو القصير في تضخيم الرسائل المتعلقة بالحملة وسرد القصص ذات الاهتمام العام.</>
                  ) : (
                    <>A large majority of these views came from non-followers (approximately 84%), which suggests that the content extended well beyond the platforms’ existing audiences and was able to reach wider public circles. Reels were the main driver of visibility, accounting for nearly <strong>89% of total views</strong>, which confirms the effectiveness of short-form video in amplifying campaign-related messaging and public-interest storytelling.</>
                  )}
                </p>
              </div>
              
              <div className="space-y-8">
                <h3 className="font-display text-2xl font-bold text-brand-navy uppercase tracking-tighter mb-4">
                  {lang === 'ar' ? 'تحليل المنصات' : 'Platform Breakdown'}
                </h3>
                {platformStats.map((plat, i) => (
                  <div key={i} className="p-6 bg-warm-beige/50 rounded-2xl border border-brand-navy/5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-display font-bold text-xl text-brand-navy">{plat.name}</span>
                      <span className="editorial-label text-brand-coral font-bold text-xs tracking-widest">{plat.nonFollowers} {lang === 'ar' ? 'غير متابعين' : 'Non-Followers'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-brand-navy/50 uppercase tracking-widest mb-1">{lang === 'ar' ? 'المشاهدات' : 'Views'}</p>
                        <p className="font-mono text-xl text-brand-navy font-bold">{plat.views}</p>
                      </div>
                      <div>
                        <p className="text-sm text-brand-navy/50 uppercase tracking-widest mb-1">{lang === 'ar' ? 'الحسابات التي تم الوصول إليها' : 'Accounts Reached'}</p>
                        <p className="font-mono text-xl text-brand-navy font-bold">{plat.reach}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="font-body text-brand-navy/60 italic text-sm">
                  {lang === 'ar' ? 'وهذا يشير إلى أن محتوى فترة الحملة لم يُشاهد من قبل المتابعين الحاليين فحسب، بل اكتشفه أيضًا جماهير جديدة، مما ساعد في زيادة الوعي والمشاركة العامة حول القضية.' : 'This indicates that the campaign period content was not only seen by existing followers, but also discovered by new audiences, helping expand awareness and public engagement around the issue.'}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Delivered Activities */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <Lightbulb className="text-brand-coral" size={28} />
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-brand-navy font-bold">
              {lang === 'ar' ? 'الأنشطة المنجزة' : 'Delivered Activities'}
            </h2>
          </div>
          <div className="bg-brand-navy text-white p-10 md:p-16 rounded-[3rem] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pixel-grid" />
            <div className="relative z-10">
              <p className="font-body text-xl leading-relaxed opacity-90 max-w-4xl whitespace-pre-line">
                {lang === 'ar' ? TRF_PROPOSAL_AR : TRF_PROPOSAL_EN}
              </p>
            </div>
          </div>
        </motion.section>

        {/* The 3 Articles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <FileText className="text-brand-coral" size={28} />
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-brand-navy font-bold">
              {lang === 'ar' ? 'المقالات المنشورة' : 'Published Articles'}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {TRF_ARTICLES.map((article, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 ring-1 ring-brand-navy/5 shadow-sm flex flex-col h-full" dir={lang === 'ar' ? "rtl" : "ltr"}>
                <div className="mb-6">
                  <span className="editorial-label text-brand-coral text-[10px] tracking-widest mb-3 block">{lang === 'ar' ? 'مقال' : 'ARTICLE'} {i + 1}</span>
                  <h3 className="font-display text-2xl font-bold text-brand-navy leading-tight mb-4">{lang === 'ar' ? article.titleAr : article.titleEn}</h3>
                  <div className="flex items-center gap-4 text-xs text-brand-navy/40 font-mono">
                    <span className="flex items-center gap-1.5"><Users size={12} /> {lang === 'ar' ? article.authorAr : article.authorEn}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {lang === 'ar' ? article.dateAr : article.dateEn}</span>
                  </div>
                </div>
                
                <div className={`font-body text-brand-navy/70 leading-loose flex-grow relative whitespace-pre-line ${expandedArticle === i ? '' : 'line-clamp-4'}`}>
                  {lang === 'ar' ? article.contentAr : article.contentEn}
                  {expandedArticle !== i && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                  )}
                </div>
                
                {article.instagramUrl && (
                  <div className={`mt-6 w-full flex justify-center transition-all duration-500 overflow-hidden ${expandedArticle === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <iframe 
                      src={`${article.instagramUrl.split('?')[0]}embed`}
                      className="w-full h-[500px] max-w-sm rounded-xl border border-gray-100 shadow-sm bg-white"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency={true}
                    />
                  </div>
                )}
                <button 
                  onClick={() => setExpandedArticle(expandedArticle === i ? null : i)}
                  className="mt-6 flex items-center gap-2 text-brand-coral text-sm font-bold uppercase tracking-widest hover:text-brand-navy transition-colors"
                >
                  {expandedArticle === i ? (
                    <>{lang === 'ar' ? 'اقرأ أقل' : 'Read less'} <ChevronUp size={16} /></>
                  ) : (
                    <>{lang === 'ar' ? 'اقرأ المزيد' : 'Read more'} <ChevronDown size={16} /></>
                  )}
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Haki Taghyiir Podcasts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <Mic2 className="text-brand-coral" size={28} />
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-brand-navy font-bold">
              {lang === 'ar' ? 'بودكاست حكي تغيير' : 'Haki Taghyiir Podcast'}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {TRF_PODCASTS.map((podcast, i) => (
              <div key={i} className="bg-brand-navy rounded-[2rem] p-1 relative overflow-hidden group">
                <div className="absolute inset-0 pixel-grid opacity-[0.03] pointer-events-none" />
                <div className="h-56 bg-brand-navy/50 w-full rounded-[1.8rem] rounded-b-none relative overflow-hidden flex items-center justify-center group-hover:bg-brand-navy/40 transition-colors">
                  {podcast.youtubeUrl ? (
                    <iframe 
                      src={getYoutubeEmbedUrl(podcast.youtubeUrl)} 
                      title={lang === 'ar' ? podcast.titleAr : podcast.titleEn}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      className="w-full h-full object-cover relative z-20"
                    ></iframe>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent opacity-60 z-10" />
                      <PlayCircle size={48} className="text-brand-coral/40 relative z-20" />
                    </>
                  )}
                  <div className="absolute top-4 left-6 z-30 flex justify-between items-center pointer-events-none">
                    <span className="editorial-label text-white/90 text-[10px] uppercase tracking-widest bg-brand-navy/60 px-3 py-1 rounded-full backdrop-blur-sm">
                      {lang === 'ar' ? podcast.typeAr : podcast.typeEn}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 pb-10">
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-bold text-white leading-tight mb-2" dir="auto">{lang === 'ar' ? podcast.guestAr : podcast.guestEn}</h3>
                    <p className="font-body text-white/50 text-sm leading-relaxed line-clamp-2" dir="auto">
                      {lang === 'ar' ? podcast.titleAr : podcast.titleEn}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <a href={podcast.youtubeUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-brand-coral text-white rounded-xl transition-colors group/btn">
                      <Youtube size={16} className="text-brand-coral group-hover/btn:text-white transition-colors" />
                      <span className="editorial-label text-[10px] uppercase tracking-widest font-bold">{lang === 'ar' ? 'يوتيوب' : 'YouTube'}</span>
                    </a>
                    <a href={podcast.socialUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-brand-coral text-white rounded-xl transition-colors group/btn">
                      <Instagram size={16} className="text-brand-coral group-hover/btn:text-white transition-colors" />
                      <span className="editorial-label text-[10px] uppercase tracking-widest font-bold">{lang === 'ar' ? 'سوشيال' : 'Social'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Content Sheet List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <BookOpen className="text-brand-coral" size={28} />
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-brand-navy font-bold">
                {lang === 'ar' ? 'جدول محتوى المشروع' : 'Project Content Sheet'}
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full ring-1 ring-brand-navy/5">
              <Activity size={16} className="text-brand-coral" />
              <span className="editorial-label text-xs font-bold text-brand-navy">{TRF_CONTENT_SHEET.length} {lang === 'ar' ? 'نشاط مسجل' : 'Activities Logged'}</span>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] ring-1 ring-brand-navy/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} border-collapse`}>
                <thead>
                  <tr className="bg-warm-beige/30 border-b border-brand-navy/5">
                    <th className="p-6 editorial-label text-[10px] text-brand-navy/40 uppercase tracking-widest w-16">{lang === 'ar' ? 'الرقم' : 'No.'}</th>
                    <th className="p-6 editorial-label text-[10px] text-brand-navy/40 uppercase tracking-widest w-48">{lang === 'ar' ? 'الموضوع الفرعي' : 'Subtheme'}</th>
                    <th className="p-6 editorial-label text-[10px] text-brand-navy/40 uppercase tracking-widest">{lang === 'ar' ? 'العنوان / الوصف' : 'Title / Description'}</th>
                    <th className="p-6 editorial-label text-[10px] text-brand-navy/40 uppercase tracking-widest w-32">{lang === 'ar' ? 'الشكل' : 'Format'}</th>
                    <th className="p-6 editorial-label text-[10px] text-brand-navy/40 uppercase tracking-widest w-32">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                    <th className="p-6 editorial-label text-[10px] text-brand-navy/40 uppercase tracking-widest text-center w-20">{lang === 'ar' ? 'الرابط' : 'Link'}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(
                    TRF_CONTENT_SHEET.reduce((acc: any, item: any) => {
                      const section = item['Section'] || 'Other Activities';
                      if (!acc[section]) acc[section] = [];
                      acc[section].push(item);
                      return acc;
                    }, {})
                  ).map(([section, items]: [string, any], groupIdx: number) => (
                    <React.Fragment key={groupIdx}>
                      <tr className="bg-brand-navy/5 border-b border-brand-navy/10">
                        <td colSpan={6} className="p-4 px-6 font-display font-bold text-brand-navy text-lg">{section}</td>
                      </tr>
                      {items.map((item: any, idx: number) => (
                        <tr key={`${groupIdx}-${idx}`} className="border-b border-brand-navy/5 hover:bg-warm-beige/10 transition-colors">
                          <td className="p-6 font-mono text-sm text-brand-navy/50">{item['Item No.']}</td>
                          <td className="p-6 text-sm text-brand-navy/70">{item['Subtheme']}</td>
                          <td className="p-6 text-sm text-brand-navy/80 leading-relaxed" dir="auto">
                            {item['Title / Description']}
                          </td>
                          <td className="p-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-navy/5 text-brand-navy text-xs rounded-full font-medium whitespace-nowrap">
                              {item['Format']}
                            </span>
                          </td>
                          <td className="p-6">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-bold whitespace-nowrap ${
                              item['Status'] === 'Published' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {item['Status']}
                            </span>
                          </td>
                          <td className="p-6 text-center">
                            {item['Link'] && !item['Link'].includes('Links to be shared') ? (
                              <a href={item['Link']} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy/5 hover:bg-brand-coral text-brand-navy hover:text-white transition-colors" title="View Link">
                                <LinkIcon size={14} />
                              </a>
                            ) : (
                              <span className="text-brand-navy/20">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Footer actions */}
        <div className="mt-24 flex justify-center">
          <button 
            onClick={() => onNavigate ? onNavigate('landing') : navigate('/')}
            className="px-8 py-4 border border-brand-navy/10 text-brand-navy font-display font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white transition-all"
          >
            {lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    </div>
  );
};
