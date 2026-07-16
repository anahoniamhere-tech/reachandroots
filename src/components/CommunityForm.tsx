import React, { useState, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const CommunityForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    email: '',
    whatsapp: '',
    ageRange: '',
    language: '',
    roles: [] as string[],
    experience: '',
    oneLiner: '',
    links: '',
    storyMeaning: '',
    storyToTell: '',
    goals: [] as string[],
    topics: [] as string[],
    activityTypes: [] as string[],
    formatPref: '',
    availability: [] as string[],
    willingToHost: '',
    contribution: '',
    volunteer: '',
    whatsappConsent: false,
    dataConsent: false
  });

  const [invalidFields, setInvalidFields] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      if (name === 'whatsappConsent' || name === 'dataConsent') {
        setFormData(prev => ({ ...prev, [name]: target.checked }));
      } else {
        // Multi-select chip arrays
        setFormData(prev => {
          const current = (prev as any)[name] as string[];
          if (target.checked) {
            return { ...prev, [name]: [...current, value] };
          } else {
            return { ...prev, [name]: current.filter(v => v !== value) };
          }
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    setInvalidFields(prev => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newInvalid: Record<string, boolean> = {};
    let firstBad: string | null = null;

    const fail = (field: string) => {
      newInvalid[field] = true;
      if (!firstBad) firstBad = field;
    };

    if (!formData.fullName.trim()) fail('fullName');
    if (!formData.city.trim()) fail('city');
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) fail('email');
    if (!formData.whatsapp.trim()) fail('whatsapp');
    if (formData.roles.length === 0) fail('roles');
    if (formData.goals.length === 0) fail('goals');
    if (formData.activityTypes.length === 0) fail('activityTypes');
    if (!formData.dataConsent) fail('dataConsent');

    setInvalidFields(newInvalid);

    if (firstBad) {
      const el = document.getElementById(firstBad) || document.querySelector(`[name="${firstBad}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return Object.keys(newInvalid).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const dataToSubmit: any = {
        fullName: formData.fullName.slice(0, 100),
        city: formData.city.slice(0, 100),
        email: formData.email.slice(0, 200),
        whatsapp: formData.whatsapp.slice(0, 30),
        roles: formData.roles.slice(0, 20),
        goals: formData.goals.slice(0, 20),
        activityTypes: formData.activityTypes.slice(0, 20),
        whatsappConsent: formData.whatsappConsent,
        dataConsent: formData.dataConsent,
        createdAt: serverTimestamp()
      };

      if (formData.oneLiner) dataToSubmit.oneLiner = formData.oneLiner.slice(0, 500);
      if (formData.links) dataToSubmit.links = formData.links.slice(0, 1000);
      if (formData.storyMeaning) dataToSubmit.storyMeaning = formData.storyMeaning.slice(0, 1000);
      if (formData.storyToTell) dataToSubmit.storyToTell = formData.storyToTell.slice(0, 1000);
      if (formData.contribution) dataToSubmit.contribution = formData.contribution.slice(0, 1000);
      if (formData.ageRange) dataToSubmit.ageRange = formData.ageRange;
      if (formData.language) dataToSubmit.language = formData.language;
      if (formData.experience) dataToSubmit.experience = formData.experience;
      if (formData.formatPref) dataToSubmit.formatPref = formData.formatPref;
      if (formData.willingToHost) dataToSubmit.willingToHost = formData.willingToHost;
      if (formData.volunteer) dataToSubmit.volunteer = formData.volunteer;
      if (formData.topics.length) dataToSubmit.topics = formData.topics.slice(0, 20);
      if (formData.availability.length) dataToSubmit.availability = formData.availability.slice(0, 10);

      await addDoc(collection(db, 'community'), dataToSubmit);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Submit failed:", err);
      setErrorMsg("Something went wrong sending your answers. Please check your connection and try again. · تعذّر الإرسال، حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isInvalid = (field: string) => invalidFields[field] ? 'invalid' : '';

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <style>{`
        :root {
          --paper: #F0ECDE;
          --paper-2: #E7E1CE;
          --ink: #16302C;
          --ink-soft: #3D544E;
          --sea: #2C6E6A;
          --citrus: #D98A1E;
          --citrus-deep: #B96E12;
          --line: #C9C0A8;
          --error: #A6402C;
          --white: #FBF9F2;
          --radius: 4px;
        }
        .comm-wrap { max-width: 720px; margin: 0 auto; padding: 0 22px; font-family: "IBM Plex Sans Arabic", system-ui, sans-serif; font-size: 16px; line-height: 1.55; }
        
        .comm-hero {
          background:
            radial-gradient(120% 80% at 100% 0%, rgba(44,110,106,0.12), transparent 60%),
            radial-gradient(90% 70% at 0% 10%, rgba(217,138,30,0.10), transparent 55%),
            var(--ink);
          color: var(--paper);
          padding: 68px 0 60px;
          border-bottom: 3px solid var(--citrus);
        }
        .comm-eyebrow { font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--citrus); font-weight: 600; margin: 0 0 20px; }
        .comm-hero h1 { font-family: "Amiri", serif; font-weight: 700; font-size: clamp(38px, 8vw, 66px); line-height: 1.05; margin: 0 0 6px; letter-spacing: 0.5px; }
        .comm-h1-ar { font-family: "Amiri", serif; direction: rtl; font-size: clamp(30px, 6.5vw, 52px); font-weight: 700; color: var(--paper); opacity: 0.92; margin: 0 0 26px; }
        .comm-lede { font-size: 17px; max-width: 54ch; color: #E8E2D0; margin: 0 0 8px; }
        .comm-lede-ar { direction: rtl; font-size: 16px; max-width: 54ch; color: #D7CFBB; margin: 0; }
        .comm-meta { margin-top: 26px; font-size: 13px; color: #B9B39F; letter-spacing: 0.04em; }

        .comm-main { padding: 44px 0 90px; }

        .comm-fieldset { border: 0; margin: 0 0 8px; padding: 0; }
        .comm-section { padding: 30px 0; border-top: 1px solid var(--line); }
        .comm-section:first-of-type { border-top: 0; }
        .comm-section-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 22px; }
        .comm-section-num { font-family: "Amiri", serif; font-size: 15px; font-weight: 700; color: var(--white); background: var(--sea); width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; margin-top: 2px; }
        .comm-section-titles { display: flex; flex-direction: column; gap: 1px; }
        .comm-section-title { font-size: 20px; font-weight: 600; letter-spacing: 0.01em; }
        .comm-section-title-ar { direction: rtl; font-size: 16px; color: var(--ink-soft); font-weight: 500; }

        .comm-field { margin-bottom: 22px; }
        .comm-q { display: block; margin-bottom: 9px; }
        .comm-q-en { font-weight: 600; font-size: 15.5px; }
        .comm-q-ar { display: block; direction: rtl; font-size: 14px; color: var(--ink-soft); margin-top: 1px; }
        .comm-req { color: var(--citrus-deep); font-weight: 700; margin-inline-start: 3px; }
        .comm-opt { color: var(--ink-soft); font-weight: 400; font-size: 12.5px; margin-inline-start: 6px; opacity: 0.8; }

        .comm-input, .comm-textarea, .comm-select { width: 100%; font-family: inherit; font-size: 15.5px; color: var(--ink); background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); padding: 12px 13px; transition: border-color .15s, box-shadow .15s; }
        .comm-textarea { min-height: 84px; resize: vertical; line-height: 1.5; }
        .comm-input:focus, .comm-textarea:focus, .comm-select:focus { outline: none; border-color: var(--sea); box-shadow: 0 0 0 3px rgba(44,110,106,0.15); }
        .comm-input::placeholder, .comm-textarea::placeholder { color: #9A9581; }

        .comm-chips { display: flex; flex-wrap: wrap; gap: 9px; }
        .comm-chip { position: relative; }
        .comm-chip input { position: absolute; opacity: 0; width: 0; height: 0; }
        .comm-chip label { display: inline-flex; flex-direction: column; cursor: pointer; border: 1px solid var(--line); background: var(--white); border-radius: 40px; padding: 8px 15px; font-size: 14px; line-height: 1.25; transition: all .13s; user-select: none; }
        .comm-chip label .comm-lab-ar { direction: rtl; font-size: 12px; color: var(--ink-soft); }
        .comm-chip input:checked + label { border-color: var(--sea); background: var(--sea); color: var(--white); }
        .comm-chip input:checked + label .comm-lab-ar { color: #D7EAE8; }
        .comm-chip input:focus-visible + label { box-shadow: 0 0 0 3px rgba(44,110,106,0.25); }

        .comm-consent { display: flex; gap: 12px; align-items: flex-start; background: var(--paper-2); border: 1px solid var(--line); border-radius: var(--radius); padding: 14px 15px; margin-bottom: 14px; }
        .comm-consent input { margin-top: 4px; width: 18px; height: 18px; accent-color: var(--sea); flex: 0 0 auto; cursor: pointer; }
        .comm-consent .comm-txt { font-size: 14px; cursor: pointer; }
        .comm-consent .comm-txt .comm-ar { display: block; color: var(--ink-soft); font-size: 13px; margin-top: 2px; }

        .comm-actions { margin-top: 30px; }
        .comm-submit { font-family: inherit; font-size: 16px; font-weight: 600; cursor: pointer; background: var(--citrus); color: #2A1B04; border: 0; border-radius: var(--radius); padding: 15px 30px; transition: background .15s, transform .05s; }
        .comm-submit:hover { background: var(--citrus-deep); color: var(--white); }
        .comm-submit:active { transform: translateY(1px); }
        .comm-submit:disabled { background: var(--line); color: var(--ink-soft); cursor: not-allowed; }

        .comm-err-msg { color: var(--error); font-size: 13px; margin-top: 7px; display: none; }
        .invalid .comm-err-msg { display: block; }
        .invalid .comm-input, .invalid .comm-textarea { border-color: var(--error); }

        .comm-formError { background: #F6E4DE; border: 1px solid var(--error); color: #7A2E1E; padding: 13px 15px; border-radius: var(--radius); margin-top: 20px; font-size: 14px; }

        .comm-success { text-align: center; padding: 60px 10px; }
        .comm-success .comm-mark { width: 58px; height: 58px; border-radius: 50%; background: var(--sea); color: var(--white); display: inline-flex; align-items: center; justify-content: center; font-size: 30px; margin-bottom: 22px; }
        .comm-success h2 { font-family: "Amiri", serif; font-size: 32px; margin: 0 0 6px; }
        .comm-success .comm-h2-ar { direction: rtl; font-family: "Amiri", serif; font-size: 26px; color: var(--ink-soft); margin-bottom: 18px; }
        .comm-success p { max-width: 46ch; margin: 0 auto 6px; color: var(--ink-soft); }
        .comm-success p.comm-ar { direction: rtl; }

        .comm-footer { text-align: center; padding: 26px 0 40px; color: var(--ink-soft); font-size: 12.5px; }
      `}</style>

      <header className="comm-hero">
        <div className="comm-wrap">
          <p className="comm-eyebrow">Roots &amp; Reach · Fayhaa Edition · Members</p>
          <h1>Help us build what's next</h1>
          <div className="comm-h1-ar">ساعِدنا نبني ما هو قادم</div>
          <p className="comm-lede">You're already part of Roots &amp; Reach — thank you for being here. This short form helps us get to know you better and plan events, workshops, and collaborations around what you actually want.</p>
          <p className="comm-lede-ar">أنت أصلاً جزء من مجتمع جذور ووصول — شكراً لوجودك معنا. هذا النموذج القصير يساعدنا على التعرّف إليك أكثر، وعلى تنظيم فعاليات وورش عمل وتعاونات مبنية على ما تريده أنت.</p>
          <p className="comm-meta">≈ 3–4 minutes · ٣–٤ دقائق</p>
        </div>
      </header>

      <main className="comm-main">
        <div className="comm-wrap">
          {success ? (
            <div className="comm-success">
              <div className="comm-mark">✓</div>
              <h2>Thank you — this helps a lot.</h2>
              <div className="comm-h2-ar">شكراً لك — هذا يساعدنا كثيراً.</div>
              <p>We'll be in touch soon with activities shaped by what you told us here.</p>
              <p className="comm-ar">سنتواصل معك قريباً بنشاطات مبنية على ما شاركتنا به.</p>
            </div>
          ) : (
            <form id="intakeForm" noValidate onSubmit={handleSubmit} ref={formRef}>
              
              {/* Section 1 */}
              <fieldset className="comm-section comm-fieldset">
                <div className="comm-section-head">
                  <span className="comm-section-num">١</span>
                  <span className="comm-section-titles">
                    <span className="comm-section-title">Who you are</span>
                    <span className="comm-section-title-ar">من أنت</span>
                  </span>
                </div>

                <div className={`comm-field ${isInvalid('fullName')}`}>
                  <label className="comm-q" htmlFor="fullName"><span className="comm-q-en">Full name<span className="comm-req">*</span></span><span className="comm-q-ar">الاسم الكامل</span></label>
                  <input className="comm-input" type="text" id="fullName" name="fullName" maxLength={100} autoComplete="name" value={formData.fullName} onChange={handleInputChange} />
                  <div className="comm-err-msg">Please enter your name · الرجاء إدخال اسمك</div>
                </div>

                <div className={`comm-field ${isInvalid('city')}`}>
                  <label className="comm-q" htmlFor="city"><span className="comm-q-en">City / town<span className="comm-req">*</span></span><span className="comm-q-ar">المدينة</span></label>
                  <input className="comm-input" type="text" id="city" name="city" maxLength={100} list="cities" placeholder="Tripoli / طرابلس" value={formData.city} onChange={handleInputChange} />
                  <datalist id="cities">
                    <option value="Tripoli / طرابلس"></option>
                    <option value="Beirut / بيروت"></option>
                    <option value="Saida / صيدا"></option>
                    <option value="Zgharta / زغرتا"></option>
                    <option value="Batroun / البترون"></option>
                    <option value="Other Levant / بلاد الشام"></option>
                    <option value="Diaspora / المهجر"></option>
                  </datalist>
                  <div className="comm-err-msg">Please tell us where you're based · الرجاء إدخال مدينتك</div>
                </div>

                <div className={`comm-field ${isInvalid('email')}`}>
                  <label className="comm-q" htmlFor="email"><span className="comm-q-en">Email<span className="comm-req">*</span></span><span className="comm-q-ar">البريد الإلكتروني</span></label>
                  <input className="comm-input" type="email" id="email" name="email" maxLength={200} autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} />
                  <div className="comm-err-msg">Please enter a valid email · بريد إلكتروني صحيح</div>
                </div>

                <div className={`comm-field ${isInvalid('whatsapp')}`}>
                  <label className="comm-q" htmlFor="whatsapp"><span className="comm-q-en">WhatsApp number<span className="comm-req">*</span></span><span className="comm-q-ar">رقم الواتساب</span></label>
                  <input className="comm-input" type="tel" id="whatsapp" name="whatsapp" maxLength={30} autoComplete="tel" placeholder="+961 …" value={formData.whatsapp} onChange={handleInputChange} />
                  <div className="comm-err-msg">Please enter your WhatsApp number · الرجاء إدخال رقم الواتساب</div>
                </div>

                <div className="comm-field">
                  <label className="comm-q"><span className="comm-q-en">Age range<span className="comm-opt">optional</span></span><span className="comm-q-ar">الفئة العمرية</span></label>
                  <div className="comm-chips">
                    <span className="comm-chip"><input type="radio" name="ageRange" id="age1" value="under 18" checked={formData.ageRange === 'under 18'} onChange={handleInputChange} /><label htmlFor="age1">Under 18<span className="comm-lab-ar">أقل من ١٨</span></label></span>
                    <span className="comm-chip"><input type="radio" name="ageRange" id="age2" value="18-24" checked={formData.ageRange === '18-24'} onChange={handleInputChange} /><label htmlFor="age2">18–24</label></span>
                    <span className="comm-chip"><input type="radio" name="ageRange" id="age3" value="25-34" checked={formData.ageRange === '25-34'} onChange={handleInputChange} /><label htmlFor="age3">25–34</label></span>
                    <span className="comm-chip"><input type="radio" name="ageRange" id="age4" value="35-44" checked={formData.ageRange === '35-44'} onChange={handleInputChange} /><label htmlFor="age4">35–44</label></span>
                    <span className="comm-chip"><input type="radio" name="ageRange" id="age5" value="45+" checked={formData.ageRange === '45+'} onChange={handleInputChange} /><label htmlFor="age5">45+</label></span>
                  </div>
                </div>

                <div className="comm-field">
                  <label className="comm-q"><span className="comm-q-en">Preferred language for updates<span className="comm-opt">optional</span></span><span className="comm-q-ar">لغة التواصل المفضّلة</span></label>
                  <div className="comm-chips">
                    <span className="comm-chip"><input type="radio" name="language" id="lang1" value="Arabic" checked={formData.language === 'Arabic'} onChange={handleInputChange} /><label htmlFor="lang1">Arabic<span className="comm-lab-ar">العربية</span></label></span>
                    <span className="comm-chip"><input type="radio" name="language" id="lang2" value="English" checked={formData.language === 'English'} onChange={handleInputChange} /><label htmlFor="lang2">English<span className="comm-lab-ar">الإنجليزية</span></label></span>
                    <span className="comm-chip"><input type="radio" name="language" id="lang3" value="Both" checked={formData.language === 'Both'} onChange={handleInputChange} /><label htmlFor="lang3">Both<span className="comm-lab-ar">كلاهما</span></label></span>
                  </div>
                </div>
              </fieldset>

              {/* Section 2 */}
              <fieldset className="comm-section comm-fieldset">
                <div className="comm-section-head">
                  <span className="comm-section-num">٢</span>
                  <span className="comm-section-titles">
                    <span className="comm-section-title">Your creative world</span>
                    <span className="comm-section-title-ar">عالمك الإبداعي</span>
                  </span>
                </div>

                <div className={`comm-field ${isInvalid('roles')}`}>
                  <label className="comm-q"><span className="comm-q-en">What best describes you?<span className="comm-req">*</span></span><span className="comm-q-ar">ما الذي يصفك؟ (اختر كل ما ينطبق)</span></label>
                  <div className="comm-chips">
                    {[
                      {id: 'r1', value: 'Writer/poet', en: 'Writer / poet', ar: 'كاتب / شاعر'},
                      {id: 'r2', value: 'Storyteller', en: 'Storyteller', ar: 'راوي قصص'},
                      {id: 'r3', value: 'Photographer', en: 'Photographer', ar: 'مصوّر'},
                      {id: 'r4', value: 'Filmmaker', en: 'Filmmaker / video', ar: 'صانع أفلام'},
                      {id: 'r5', value: 'Visual artist', en: 'Visual artist', ar: 'فنان تشكيلي'},
                      {id: 'r6', value: 'Musician', en: 'Musician', ar: 'موسيقي'},
                      {id: 'r7', value: 'Designer', en: 'Designer', ar: 'مصمّم'},
                      {id: 'r8', value: 'Journalist/content creator', en: 'Journalist / creator', ar: 'صحفي / صانع محتوى'},
                      {id: 'r9', value: 'Podcaster', en: 'Podcaster', ar: 'بودكاست'},
                      {id: 'r10', value: 'Actor/performer', en: 'Actor / performer', ar: 'ممثل / أداء'},
                      {id: 'r11', value: 'Craftsperson', en: 'Craftsperson', ar: 'حرفي'},
                      {id: 'r12', value: 'Educator', en: 'Educator', ar: 'معلّم'},
                      {id: 'r13', value: 'Community organizer', en: 'Organizer', ar: 'منظّم مجتمعي'},
                      {id: 'r14', value: 'Audience/supporter', en: 'Here to support', ar: 'داعم / جمهور'},
                      {id: 'r15', value: 'Other', en: 'Other', ar: 'أخرى'},
                    ].map(r => (
                      <span className="comm-chip" key={r.id}>
                        <input type="checkbox" name="roles" id={r.id} value={r.value} checked={formData.roles.includes(r.value)} onChange={handleInputChange} />
                        <label htmlFor={r.id}>{r.en}<span className="comm-lab-ar">{r.ar}</span></label>
                      </span>
                    ))}
                  </div>
                  <div className="comm-err-msg">Please choose at least one · اختر واحداً على الأقل</div>
                </div>

                <div className="comm-field">
                  <label className="comm-q"><span className="comm-q-en">Experience level<span className="comm-opt">optional</span></span><span className="comm-q-ar">مستوى الخبرة</span></label>
                  <div className="comm-chips">
                    <span className="comm-chip"><input type="radio" name="experience" id="e1" value="Just starting" checked={formData.experience === 'Just starting'} onChange={handleInputChange} /><label htmlFor="e1">Just starting<span className="comm-lab-ar">مبتدئ</span></label></span>
                    <span className="comm-chip"><input type="radio" name="experience" id="e2" value="Hobbyist" checked={formData.experience === 'Hobbyist'} onChange={handleInputChange} /><label htmlFor="e2">Hobbyist<span className="comm-lab-ar">هاوٍ</span></label></span>
                    <span className="comm-chip"><input type="radio" name="experience" id="e3" value="Semi-professional" checked={formData.experience === 'Semi-professional'} onChange={handleInputChange} /><label htmlFor="e3">Semi-pro<span className="comm-lab-ar">شبه محترف</span></label></span>
                    <span className="comm-chip"><input type="radio" name="experience" id="e4" value="Professional" checked={formData.experience === 'Professional'} onChange={handleInputChange} /><label htmlFor="e4">Professional<span className="comm-lab-ar">محترف</span></label></span>
                  </div>
                </div>

                <div className="comm-field">
                  <label className="comm-q" htmlFor="oneLiner"><span className="comm-q-en">In one line, what do you create?<span className="comm-opt">optional</span></span><span className="comm-q-ar">بسطر واحد، ما الذي تبدعه؟</span></label>
                  <input className="comm-input" type="text" id="oneLiner" name="oneLiner" maxLength={500} value={formData.oneLiner} onChange={handleInputChange} />
                </div>

                <div className="comm-field">
                  <label className="comm-q" htmlFor="links"><span className="comm-q-en">Links to your work<span className="comm-opt">optional</span></span><span className="comm-q-ar">روابط أعمالك</span></label>
                  <textarea className="comm-textarea" id="links" name="links" maxLength={1000} placeholder="Instagram, portfolio, YouTube…" value={formData.links} onChange={handleInputChange}></textarea>
                </div>
              </fieldset>

              {/* Section 3 */}
              <fieldset className="comm-section comm-fieldset">
                <div className="comm-section-head">
                  <span className="comm-section-num">٣</span>
                  <span className="comm-section-titles">
                    <span className="comm-section-title">You &amp; our mission</span>
                    <span className="comm-section-title-ar">أنت ورسالتنا</span>
                  </span>
                </div>

                <div className="comm-field">
                  <label className="comm-q" htmlFor="storyMeaning"><span className="comm-q-en">What does telling your — or your community's — story mean to you?<span className="comm-opt">optional</span></span><span className="comm-q-ar">ماذا يعني لك أن تروي قصتك أو قصة مجتمعك؟</span></label>
                  <textarea className="comm-textarea" id="storyMeaning" name="storyMeaning" maxLength={1000} value={formData.storyMeaning} onChange={handleInputChange}></textarea>
                </div>

                <div className="comm-field">
                  <label className="comm-q" htmlFor="storyToTell"><span className="comm-q-en">A story, place, or tradition from the Fayhaa / Levant you wish more people knew?<span className="comm-opt">optional</span></span><span className="comm-q-ar">قصة أو مكان أو تقليد من الفيحاء أو بلاد الشام تتمنى أن يعرفه الناس أكثر؟</span></label>
                  <textarea className="comm-textarea" id="storyToTell" name="storyToTell" maxLength={1000} value={formData.storyToTell} onChange={handleInputChange}></textarea>
                </div>
              </fieldset>

              {/* Section 4 */}
              <fieldset className="comm-section comm-fieldset">
                <div className="comm-section-head">
                  <span className="comm-section-num">٤</span>
                  <span className="comm-section-titles">
                    <span className="comm-section-title">What you want from the community</span>
                    <span className="comm-section-title-ar">ماذا تريد من المجتمع</span>
                  </span>
                </div>

                <div className={`comm-field ${isInvalid('goals')}`}>
                  <label className="comm-q"><span className="comm-q-en">What are you hoping to get out of Roots &amp; Reach?<span className="comm-req">*</span></span><span className="comm-q-ar">ما الذي تأمل أن تحصل عليه؟</span></label>
                  <div className="comm-chips">
                    {[
                      {id: 'g1', value: 'Learn new skills', en: 'Learn new skills', ar: 'تعلّم مهارات'},
                      {id: 'g2', value: 'Meet other creators', en: 'Meet creators', ar: 'لقاء مبدعين'},
                      {id: 'g3', value: 'Collaborate', en: 'Collaborate', ar: 'تعاون'},
                      {id: 'g4', value: 'Get my work seen', en: 'Get my work seen', ar: 'إبراز أعمالي'},
                      {id: 'g5', value: 'Find mentorship', en: 'Find mentorship', ar: 'إرشاد'},
                      {id: 'g6', value: 'Mentor others', en: 'Mentor others', ar: 'أن أرشد غيري'},
                      {id: 'g7', value: 'Perform/exhibit', en: 'Perform / exhibit', ar: 'عرض أعمالي'},
                      {id: 'g8', value: 'Belong to a community', en: 'Belong', ar: 'الانتماء'},
                      {id: 'g9', value: 'Other', en: 'Other', ar: 'أخرى'},
                    ].map(g => (
                      <span className="comm-chip" key={g.id}>
                        <input type="checkbox" name="goals" id={g.id} value={g.value} checked={formData.goals.includes(g.value)} onChange={handleInputChange} />
                        <label htmlFor={g.id}>{g.en}<span className="comm-lab-ar">{g.ar}</span></label>
                      </span>
                    ))}
                  </div>
                  <div className="comm-err-msg">Please choose at least one · اختر واحداً على الأقل</div>
                </div>

                <div className="comm-field">
                  <label className="comm-q"><span className="comm-q-en">Topics you'd want workshops on<span className="comm-opt">optional</span></span><span className="comm-q-ar">مواضيع تودّ ورش عمل حولها</span></label>
                  <div className="comm-chips">
                    {[
                      {id: 't1', value: 'Storytelling & writing', en: 'Storytelling & writing', ar: 'السرد والكتابة'},
                      {id: 't2', value: 'Photography', en: 'Photography', ar: 'التصوير'},
                      {id: 't3', value: 'Video/filmmaking', en: 'Video / film', ar: 'الفيديو والأفلام'},
                      {id: 't4', value: 'Social media & audience', en: 'Social media', ar: 'التواصل والجمهور'},
                      {id: 't5', value: 'Design tools', en: 'Design tools', ar: 'أدوات التصميم'},
                      {id: 't6', value: 'Music production', en: 'Music production', ar: 'إنتاج موسيقي'},
                      {id: 't7', value: 'Funding & grants', en: 'Funding & grants', ar: 'التمويل والمنح'},
                      {id: 't8', value: 'Freelancing/business', en: 'Freelancing / business', ar: 'العمل الحر'},
                      {id: 't9', value: 'Creative writing AR/EN', en: 'Creative writing', ar: 'الكتابة الإبداعية'},
                      {id: 't10', value: 'Other', en: 'Other', ar: 'أخرى'},
                    ].map(t => (
                      <span className="comm-chip" key={t.id}>
                        <input type="checkbox" name="topics" id={t.id} value={t.value} checked={formData.topics.includes(t.value)} onChange={handleInputChange} />
                        <label htmlFor={t.id}>{t.en}<span className="comm-lab-ar">{t.ar}</span></label>
                      </span>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* Section 5 */}
              <fieldset className="comm-section comm-fieldset">
                <div className="comm-section-head">
                  <span className="comm-section-num">٥</span>
                  <span className="comm-section-titles">
                    <span className="comm-section-title">Events &amp; activities</span>
                    <span className="comm-section-title-ar">الفعاليات والنشاطات</span>
                  </span>
                </div>

                <div className={`comm-field ${isInvalid('activityTypes')}`}>
                  <label className="comm-q"><span className="comm-q-en">What would you actually show up to?<span className="comm-req">*</span></span><span className="comm-q-ar">ما النشاطات التي ستحضرها فعلاً؟</span></label>
                  <div className="comm-chips">
                    {[
                      {id: 'a1', value: 'In-person meetups in Tripoli', en: 'Meetups in Tripoli', ar: 'لقاءات في طرابلس'},
                      {id: 'a2', value: 'Hands-on workshops', en: 'Workshops', ar: 'ورش عمل'},
                      {id: 'a3', value: 'Online sessions', en: 'Online sessions', ar: 'جلسات أونلاين'},
                      {id: 'a4', value: 'Storytelling nights', en: 'Storytelling nights', ar: 'أمسيات سردية'},
                      {id: 'a5', value: 'Exhibitions/showcases', en: 'Exhibitions', ar: 'معارض'},
                      {id: 'a6', value: 'Collaborative projects', en: 'Collaborations', ar: 'مشاريع مشتركة'},
                      {id: 'a7', value: 'Networking gatherings', en: 'Networking', ar: 'تشبيك'},
                      {id: 'a8', value: 'Field trips/outings', en: 'Creative outings', ar: 'جولات إبداعية'},
                      {id: 'a9', value: 'Other', en: 'Other', ar: 'أخرى'},
                    ].map(a => (
                      <span className="comm-chip" key={a.id}>
                        <input type="checkbox" name="activityTypes" id={a.id} value={a.value} checked={formData.activityTypes.includes(a.value)} onChange={handleInputChange} />
                        <label htmlFor={a.id}>{a.en}<span className="comm-lab-ar">{a.ar}</span></label>
                      </span>
                    ))}
                  </div>
                  <div className="comm-err-msg">Please choose at least one · اختر واحداً على الأقل</div>
                </div>

                <div className="comm-field">
                  <label className="comm-q"><span className="comm-q-en">In-person, online, or both?<span className="comm-opt">optional</span></span><span className="comm-q-ar">حضوري، أونلاين، أم كليهما؟</span></label>
                  <div className="comm-chips">
                    <span className="comm-chip"><input type="radio" name="formatPref" id="f1" value="In-person" checked={formData.formatPref === 'In-person'} onChange={handleInputChange} /><label htmlFor="f1">In-person<span className="comm-lab-ar">حضوري</span></label></span>
                    <span className="comm-chip"><input type="radio" name="formatPref" id="f2" value="Online" checked={formData.formatPref === 'Online'} onChange={handleInputChange} /><label htmlFor="f2">Online<span className="comm-lab-ar">أونلاين</span></label></span>
                    <span className="comm-chip"><input type="radio" name="formatPref" id="f3" value="Both" checked={formData.formatPref === 'Both'} onChange={handleInputChange} /><label htmlFor="f3">Both<span className="comm-lab-ar">كلاهما</span></label></span>
                  </div>
                </div>

                <div className="comm-field">
                  <label className="comm-q"><span className="comm-q-en">When are you usually free?<span className="comm-opt">optional</span></span><span className="comm-q-ar">متى تكون عادةً متفرغاً؟</span></label>
                  <div className="comm-chips">
                    {[
                      {id: 'av1', value: 'Weekday mornings', en: 'Weekday mornings', ar: 'صباحات أيام الأسبوع'},
                      {id: 'av2', value: 'Weekday evenings', en: 'Weekday evenings', ar: 'أمسيات أيام الأسبوع'},
                      {id: 'av3', value: 'Weekends', en: 'Weekends', ar: 'عطلة نهاية الأسبوع'},
                      {id: 'av4', value: 'Flexible', en: 'Flexible', ar: 'مرن'},
                    ].map(av => (
                      <span className="comm-chip" key={av.id}>
                        <input type="checkbox" name="availability" id={av.id} value={av.value} checked={formData.availability.includes(av.value)} onChange={handleInputChange} />
                        <label htmlFor={av.id}>{av.en}<span className="comm-lab-ar">{av.ar}</span></label>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="comm-field">
                  <label className="comm-q"><span className="comm-q-en">Would you host or lead an activity yourself?<span className="comm-opt">optional</span></span><span className="comm-q-ar">هل ترغب في استضافة أو قيادة نشاط بنفسك؟</span></label>
                  <div className="comm-chips">
                    <span className="comm-chip"><input type="radio" name="willingToHost" id="h1" value="Yes" checked={formData.willingToHost === 'Yes'} onChange={handleInputChange} /><label htmlFor="h1">Yes<span className="comm-lab-ar">نعم</span></label></span>
                    <span className="comm-chip"><input type="radio" name="willingToHost" id="h2" value="Maybe, tell me more" checked={formData.willingToHost === 'Maybe, tell me more'} onChange={handleInputChange} /><label htmlFor="h2">Maybe, tell me more<span className="comm-lab-ar">ربما، أخبروني أكثر</span></label></span>
                    <span className="comm-chip"><input type="radio" name="willingToHost" id="h3" value="Not right now" checked={formData.willingToHost === 'Not right now'} onChange={handleInputChange} /><label htmlFor="h3">Not right now<span className="comm-lab-ar">ليس الآن</span></label></span>
                  </div>
                </div>
              </fieldset>

              {/* Section 6 */}
              <fieldset className="comm-section comm-fieldset">
                <div className="comm-section-head">
                  <span className="comm-section-num">٦</span>
                  <span className="comm-section-titles">
                    <span className="comm-section-title">What you can contribute</span>
                    <span className="comm-section-title-ar">ما الذي يمكنك تقديمه</span>
                  </span>
                </div>

                <div className="comm-field">
                  <label className="comm-q" htmlFor="contribution"><span className="comm-q-en">A skill, space, or resource you'd share?<span className="comm-opt">optional</span></span><span className="comm-q-ar">مهارة أو مكان أو مورد تشاركه؟</span></label>
                  <textarea className="comm-textarea" id="contribution" name="contribution" maxLength={1000} placeholder="e.g. I can teach editing · لديّ استوديو صغير · I can help with design" value={formData.contribution} onChange={handleInputChange}></textarea>
                </div>

                <div className="comm-field">
                  <label className="comm-q"><span className="comm-q-en">Would you volunteer to help organize?<span className="comm-opt">optional</span></span><span className="comm-q-ar">هل ترغب في التطوّع للتنظيم؟</span></label>
                  <div className="comm-chips">
                    <span className="comm-chip"><input type="radio" name="volunteer" id="v1" value="Yes" checked={formData.volunteer === 'Yes'} onChange={handleInputChange} /><label htmlFor="v1">Yes<span className="comm-lab-ar">نعم</span></label></span>
                    <span className="comm-chip"><input type="radio" name="volunteer" id="v2" value="Maybe" checked={formData.volunteer === 'Maybe'} onChange={handleInputChange} /><label htmlFor="v2">Maybe<span className="comm-lab-ar">ربما</span></label></span>
                    <span className="comm-chip"><input type="radio" name="volunteer" id="v3" value="No" checked={formData.volunteer === 'No'} onChange={handleInputChange} /><label htmlFor="v3">No<span className="comm-lab-ar">لا</span></label></span>
                  </div>
                </div>
              </fieldset>

              {/* Section 7 */}
              <fieldset className="comm-section comm-fieldset">
                <div className="comm-section-head">
                  <span className="comm-section-num">٧</span>
                  <span className="comm-section-titles">
                    <span className="comm-section-title">Staying in touch</span>
                    <span className="comm-section-title-ar">التواصل والموافقة</span>
                  </span>
                </div>

                <label className="comm-consent" htmlFor="whatsappConsent">
                  <input type="checkbox" id="whatsappConsent" name="whatsappConsent" checked={formData.whatsappConsent} onChange={handleInputChange} />
                  <span className="comm-txt">Add me to the Roots &amp; Reach WhatsApp group (if I'm not already in it).
                    <span className="comm-ar">أضِفني إلى مجموعة واتساب "جذور ووصول" (إن لم أكن مضافاً).</span></span>
                </label>

                <div className={`comm-field ${isInvalid('dataConsent')}`}>
                  <label className="comm-consent" htmlFor="dataConsent">
                    <input type="checkbox" id="dataConsent" name="dataConsent" checked={formData.dataConsent} onChange={handleInputChange} />
                    <span className="comm-txt">I agree that Roots &amp; Reach can store this information to contact me about community events and activities.<span className="comm-req">*</span>
                      <span className="comm-ar">أوافق على أن يحتفظ "جذور ووصول" بهذه المعلومات للتواصل معي بخصوص الفعاليات والنشاطات.</span></span>
                  </label>
                  <div className="comm-err-msg">This consent is required to submit · هذه الموافقة مطلوبة</div>
                </div>

                <div className="comm-actions">
                  <button type="submit" className="comm-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending… · جارٍ الإرسال…' : 'Send my answers · أرسل إجاباتي'}
                  </button>
                </div>
                {errorMsg && <div className="comm-formError">{errorMsg}</div>}
              </fieldset>

            </form>
          )}
        </div>
      </main>

      <footer className="comm-footer">
        Roots &amp; Reach — Fayhaa Edition · جذور ووصول
      </footer>
    </div>
  );
};
