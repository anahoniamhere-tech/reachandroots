
export type Language = 'en' | 'ar';

export const translations = {
  en: {
    nav: {
      story: 'Story',
      program: 'Program',
      sanctuary: 'Accreditation',
      portal: 'Access Portal',
      edition: 'Fayhaa Edition',
      sponsors: 'Sponsors'
    },
    hero: {
      tagline: 'CULTURE x CREATION x DIGITAL',
      title1: 'Roots',
      title2: 'Reach',
      description: 'An event for influencers and creators, bringing real talk, innovation, and content creation into one space.',
      cta: 'Securize Entry',
      narrative: 'Launch Narrative',
      live: 'Live Connection',
      quote: 'A space architected for the creative resilience of a global generation.'
    },
    program: {
      label: 'PUBLIC FAIR SEQUENCE',
      title: 'The Program.',
      description: 'Explore our three-day public fair sequence at Rashid Karami International Fair — talks, panels, workshops, live activations, and cultural exchange.',
      note: 'Note: This page covers the 3-day Public Fair phase of the 6-day Roots & Reach journey.',
      cta1: 'Get Tickets',
      cta2: 'Our Story',
      location: 'Tripoli Pavilion, Rashid Karami',
      liveSequence: 'Live Sequence',
      theme: 'Curation Theme',
      opening: 'Doors Open',
      begins: 'Program Begins',
      atmosphere: 'Atmosphere Matrix',
      featured: 'Featured Session',
      disclaimer: '“Program details and selected speaker lineup are subject to final confirmation. Certain segments, including Saturday’s YouTube sequence, are currently in final technical orchestration.”'
    },
    common: {
      welcome: 'Welcome Home.',
      authenticated: 'Credential Authenticated',
      verifiedGuest: 'Verified Guest',
      sanctuaryTier: 'Creator Pass Tier',
      timeframe: 'Timeframe Protocol',
      systemId: 'System ID',
      digitalNode: 'Digital Node Passport',
      launchMap: 'Launch Visual Map',
      returnArchive: 'Return to Archive'
    },
    footer: {
      tagline: 'An event for influencers and creators, bringing real talk, innovation, and content creation into one space.',
      narrative: 'Narrative',
      story: 'The Story',
      access: 'Access Tiers',
      sanctuary: 'Creator Pass',
      protocols: 'Protocols',
      registry: 'Registry',
      rights: 'All rights reserved for regional innovation.',
      social: {
        instagram: 'Instagram',
        linkedin: 'LinkedIn',
        vimeo: 'Vimeo'
      }
    },
    story: {
      label: 'The Chronicle',
      title: 'Our Story.',
      description: 'Roots & Reach is a six-day immersive gathering that invites creators to rediscover Tripoli and North Lebanon through story, culture, movement, and authentic collaboration.',
      methodology: {
        label: 'The Strategic Bridge',
        title: 'Two-Phase Methodology.',
        phase1: {
          label: 'Phase 01 // Field',
          title: 'Field Experience',
          subtitle: 'Three days of immersive exploration across natural landscapes and heritage sites.',
          items: ['Tripoli Heritage', 'Danniyeh Nature', 'Akkar Landscapes', 'Local Food', 'Community Stories', 'Authentic Content']
        },
        phase2: {
          label: 'Phase 02 // Industry',
          title: 'Fair Experience',
          subtitle: 'Three days at the Rashid Karami International Fair for public storytelling and creator exchange.',
          items: ['Panels & Talks', 'Workshops', 'Creator Exchange', 'Live Activations', 'Public Storytelling', 'Brand Collaboration']
        }
      },
      landmark: {
        label: 'The Landmark',
        title: 'The Tripoli Exhibition.',
        description: 'A centerpiece of the fair phase, the exhibition serves as a physical archive and interactive space where visitors encounter the layers of Fayhaa.',
        exhibitNote: 'The exhibition is an immersive storytelling environment reflecting Tripoli\'s history, culture, and identity.',
        heritage: 'Heritage Sites',
        heritageDesc: 'Exploring the architectural marvels of Oscar Niemeyer and historic Tripoli.',
        identity: 'Cultural Identity',
        identityDesc: 'Visual narratives of Tripoli’s diverse street life, craft, and soul.'
      },
      values: {
        label: 'The Foundations',
        title: 'What We Stand For.',
        v1: { title: 'Cultural Storytelling', desc: 'Crafting narratives that celebrate the deep heritage of Lebanon\'s northern capital.' },
        v2: { title: 'Creative Exchange', desc: 'Building bridges between local talent and regional creators for mutual evolution.' },
        v3: { title: 'Regional Voices', desc: 'Amplifying the diverse perspectives that define the Mediterranean creative soul.' },
        v4: { title: 'Heritage in Motion', desc: 'Taking historic beauty into the digital future through dynamic content creation.' },
        v5: { title: 'Public Imagination', desc: 'Inspiring the community to see their city as a stage for global creativity.' },
        v6: { title: 'Community Connection', desc: 'Fostering deep relationships rooted in place, authenticity, and shared purpose.' }
      },
      location: {
        title: 'Location.',
        label: 'Location',
        l1: { name: 'Tripoli', desc: 'A mosaic of Mamluk architecture and modern ambition.' },
        l2: { name: 'Danniyeh', desc: 'The green lungs of the north, where nature speaks.' },
        l3: { name: 'Akkar', desc: 'Raw landscapes and authentic community narratives.' },
        l4: { name: 'RKIF', desc: 'The futuristic masterpiece of Oscar Niemeyer.' }
      },
      result: {
        label: 'The Result',
        title: 'From Place to Reach.',
        description: 'We transform Tripoli\'s unique atmosphere into powerful digital narratives, amplifying its reach through trusted regional creators and immersive live public experiences.'
      },
      ctas: {
        next: 'Next Step',
        program: 'Explore Program',
        tickets: 'Get Tickets',
        sanctuary: 'Get Your Creator Pass'
      }
    },
    tickets: {
      label: 'Access Portal',
      title: 'Tickets &',
      titleHighlight: 'Privileges.',
      description: 'Choose your access to Roots & Reach — Fayhaa Edition at Rashid Karami International Fair. From open public access to full premium entry.',
      scroll: 'Scroll to Options',
      steps: {
        s1: 'Selection',
        s2: 'Day',
        s3: 'Identity',
        s4: 'Checkout'
      },
      tiers: {
        single: 'Single Day',
        pass: '3-Day Pass',
        includes: 'Includes',
        excludes: 'Excludes',
        secureVip: 'Secure VIP Access',
        select: 'Select Ticket'
      },
      days: {
        label: 'Temporal Selection',
        title: 'Choose Your',
        titleHighlight: 'Experience.',
        description: 'Your single-day pass grants you access to one day of the fair program.',
        sequence: 'Day Sequence'
      },
      form: {
        label: 'Identity Protocol',
        title: 'Enter Your',
        titleHighlight: 'Credentials.',
        description: 'Register your identification for the access pass.',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone / WhatsApp',
        quantity: 'Quantity',
        ticket: 'Ticket',
        tickets: 'Tickets',
        vipLabel: 'VIP Protocol',
        dietary: 'Dietary Preference',
        kit: 'Welcome Kit Personalization',
        kitPlaceholder: 'Name to appear on kit',
        submit: 'Generate Summary'
      },
      summary: {
        label: 'Transaction Review',
        title: 'Your',
        titleHighlight: 'Pass.',
        description: 'Finalize your connection to the Roots & Reach creator pass.',
        identified: 'Product Identified',
        allDays: 'All Days',
        attendees: 'Attendees',
        attendee: 'Attendee',
        total: 'Batch Total',
        calculated: 'Calculated USD',
        manifest: 'Attendee Manifest',
        name: 'Name',
        signal: 'Signal',
        origin: 'Origin',
        secure: 'Authenticity Secure',
        disclaimer: 'Tickets are non-refundable but transferable through the protocol. Admission is subject to site security screening at Rashid Karami International Fair.',
        finalize: 'Finalize Purchase',
        redirect: 'Redirecting to Secure Gateway'
      }
    },
    sanctuary: {
      label: 'Accreditation Passes',
      hero: {
        title: 'Accredited access for',
        title2: 'Voices & Visions.',
        title3: 'Apply to join.',
        description: 'Apply for accredited access to Roots & Reach — Fayhaa Edition through one of two dedicated paths: Content Creator Pass or Media Pass. Both provide approved applicants with full event access, excluding VIP-only privileges.',
        applyCreator: 'Apply as a Content Creator',
        applyMedia: 'Apply as Media',
        view: 'View Program'
      },
      accreditationTypes: {
        creator: {
          title: 'Content Creator Pass',
          description: 'For influencers, content creators, storytellers, video creators, podcasters, and digital creatives who want to participate in the event and create content around the experience.',
          cta: 'Apply as a Content Creator'
        },
        media: {
          title: 'Media Pass',
          description: 'For journalists, reporters, photographers, videographers, editors, media outlets, and correspondents who want to cover the event professionally.',
          cta: 'Apply as Media'
        }
      },
      accessClarity: {
        title: 'Approved access includes:',
        items: [
          'Entry to all three fair days',
          'Access to the public event zones',
          'Access to talks, panels, and workshops',
          'Access to cover or experience the event professionally',
          'Accreditation as an approved participant'
        ],
        notTitle: 'Does not include:',
        notItems: [
          'VIP lounge access',
          'VIP catering services',
          'VIP reserved front-row seating',
          'VIP-exclusive hospitality'
        ]
      },
      concept: {
        label: 'The Concept',
        title: 'A selective track for the',
        titleHighlight: 'visionary lens.',
        desc1: 'Roots & Reach is a six-day immersive event that brings together creators from Lebanon and the diaspora. Accreditation is designed as a focused entry point for media-minded participants.',
        desc2: 'Approved applicants will engage deeply with the narrative through the public fair at Rashid Karami International Fair, participating as credited storytellers or journalists.',
        features: ['Creator Labs & Media Desk', 'Dedicated Press Zones', 'Cultural Storytelling Moments', 'Industry Networking']
      },
      profile: {
        label: 'Candidate Profile',
        title: 'Regional creative voices.',
        categories: [
          { name: "Content Creators", desc: "Digital storytellers shaping the modern Levantine narrative." },
          { name: "Video Storytellers", desc: "Cinematic voices documenting the architecture of resilience." },
          { name: "Media Platforms", desc: "Regional hubs and digital publications leading the discourse." },
          { name: "Documentarians", desc: "Deep-dive observers of place, people, and heritage." },
          { name: "Photographers", desc: "Capturing the lens of cultural and architectural evolution." },
          { name: "Podcasters", desc: "Audio architects of conversation and sonic exploration." },
          { name: "Social-First Creators", desc: "Real-time curators of experience and community vibe." },
          { name: "Digital Journalists", desc: "Reporting from the confluence of heritage and tech." },
          { name: "Regional Voices", desc: "Creative authorities from across the Levantine diaspora." }
        ]
      },
      form: {
        success: {
          creator: {
            title: 'Application',
            titleHighlight: 'Received.',
            description: 'Thank you. Your Content Creator Pass application has been received. Our team will review it and contact selected applicants with next steps.',
            cta: 'Return to Overwiew'
          },
          media: {
            title: 'Accreditation',
            titleHighlight: 'Pending.',
            description: 'Thank you. Your Media Pass application has been received. Our team will review it and contact approved media applicants with next steps.',
            cta: 'Return to Overview'
          }
        },
        back: 'Back to Accreditation',
        titleCreator: 'Apply for Content Creator Pass',
        titleMedia: 'Apply for Media Pass',
        descriptionCreator: 'For influencers, storytellers, and digital creatives.',
        descriptionMedia: 'For professional journalists and media outlets.',
        sections: {
          identity: 'Identity',
          platforms: 'Social Platforms',
          mediaOutlet: 'Organization',
          narrative: 'Intent & Interest',
          coverage: 'Coverage Plan'
        },
        fields: {
          name: 'Full Name',
          creatorName: 'Creator / Public Name',
          mediaOrg: 'Media Organization / Outlet',
          jobTitle: 'Job Title / Role',
          email: 'Email Address',
          phone: 'Phone / WhatsApp',
          country: 'Country',
          city: 'City',
          instagram: 'Instagram Profile',
          tiktok: 'TikTok Profile',
          youtube: 'YouTube / Other Platform',
          website: 'Website / Publication Link',
          professionalProfile: 'Professional Profile (X, LinkedIn)',
          niche: 'Primary Content Niche',
          reach: 'Audience Size',
          bio: 'Short Bio',
          why: 'Why do you want to join/cover Roots & Reach?',
          portfolio: 'Portfolio / Best Work Links',
          coverageType: 'Type of Coverage',
          coverageOptions: ['Written', 'Video', 'Photography', 'Broadcast', 'Digital / Social'],
          assignment: 'Assignment / Editorial Interest',
          previous: 'Previous Coverage Samples',
          attendedSimilar: 'Have you attended similar events before?',
          notes: 'Additional Notes'
        },
        submit: 'Submit Application',
        processing: 'Processing...',
        disclaimer: 'By submitting, you agree that your data will be reviewed for the Fayhaa 2026 accreditation protocol.',
        footerCode: 'ACC-SEC 2026 // ACCREDITATION'
      },
      faq: {
        label: 'Frequently Asked Questions',
        items: [
          { q: 'Who is eligible for accreditation?', a: 'Accreditation is open to professional content creators, influencers, journalists, photographers, and media representatives who plan to actively cover the event.' },
          { q: 'How long does the review process take?', a: 'Our media relations team reviews applications on a rolling basis. You can expect a response within 3 to 5 business days after submission.' },
          { q: 'Does accreditation guarantee entry?', a: 'Accreditation grants access to the public fair program, workshops, and panels, but registration is subject to site capacity constraints. VIP areas remain exclusive to VIP pass holders.' }
        ]
      },
      footerCode: 'ACC-SEC 2026 // Lebanon'
    }
  },
  ar: {
    nav: {
      story: 'قصتنا',
      program: 'البرنامج',
      sanctuary: 'تصاريح الاعتماد',
      portal: 'بوابة الدخول',
      edition: 'نسخة الفيحاء',
      sponsors: 'الرعاة'
    },
    hero: {
      tagline: 'ثقافة x إبداع x رقمي',
      title1: 'Roots',
      title2: 'Reach',
      description: 'حدث للمؤثرين وصنّاع المحتوى، يجمع الريل توك، الابتكار، وصناعة المحتوى في مكان واحد.',
      cta: 'تأمين الدخول',
      narrative: 'ابدأ الرواية',
      live: 'اتصال مباشر',
      quote: 'مساحة صممت هندسياً للصمود الإبداعي لجيل عالمي.'
    },
    common: {
      welcome: 'مرحباً بك في وطنك.',
      authenticated: 'تم توثيق بيانات الاعتماد',
      verifiedGuest: 'ضيف موثق',
      sanctuaryTier: 'رتبة الملاذ',
      timeframe: 'بروتوكول الإطار الزمني',
      systemId: 'معرف النظام',
      digitalNode: 'جواز سفر العقدة الرقمية',
      launchMap: 'إطلاق الخريطة البصرية',
      returnArchive: 'العودة إلى الأرشيف'
    },
    footer: {
      tagline: 'حدث للمؤثرين وصنّاع المحتوى، يجمع الريل توك، الابتكار، وصناعة المحتوى في مكان واحد.',
      narrative: 'السرد',
      story: 'القصة',
      access: 'فئات الدخول',
      sanctuary: 'تصريح صنّاع المحتوى',
      protocols: 'البروتوكولات',
      registry: 'السجل',
      rights: 'جميع الحقوق محفوظة للابتكار الإقليمي.',
      social: {
        instagram: 'إنستغرام',
        linkedin: 'لينكد إن',
        vimeo: 'فيميو'
      }
    },
    program: {
      label: 'تسلسل المعرض العام',
      title: 'البرنامج.',
      description: 'استكشف برنامج المعرض العام لمدة ثلاثة أيام في معرض رشيد كرامي الدولي — محادثات، ندوات، ورش عمل، وفعاليات مباشرة، وتبادل ثقافي.',
      note: 'ملاحظة: تغطي هذه الصفحة مرحلة المعرض العام لمدة ٣ أيام من رحلة Roots & Reach التي تستمر ٦ أيام.',
      cta1: 'احصل على تذاكر',
      cta2: 'قصتنا',
      location: 'جناح طرابلس، رشيد كرامي',
      liveSequence: 'التسلسل المباشر',
      theme: 'موضوع التنسيق',
      opening: 'فتح الأبواب',
      begins: 'يبدأ البرنامج',
      atmosphere: 'مصفوفة الأجواء',
      featured: 'جلسة مميزة',
      disclaimer: '“تفاصيل البرنامج وقائمة المتحدثين المختارين تخضع للتأكيد النهائي. بعض الفقرات، بما في ذلك تسلسل يوتيوب يوم السبت، لا تزال في مراحل اللمسات الفنية الأخيرة.”'
    },
    story: {
      label: 'السجل',
      title: 'قصتنا.',
      description: 'إن Roots & Reach هو تجمع غامر لمدة ستة أيام يدعو المبدعين لإعادة اكتشاف طرابلس وشمال لبنان من خلال القصة والثقافة والحركة والتعاون الأصيل.',
      methodology: {
        label: 'الجسر الاستراتيجي',
        title: 'منهجية ذات مرحلتين.',
        phase1: {
          label: 'المرحلة ٠١ // الميدان',
          title: 'التجربة الميدانية',
          subtitle: 'ثلاثة أيام من الاستكشاف الغامر عبر المناظر الطبيعية والمواقع التراثية.',
          items: ['تراث طرابلس', 'طبيعة الضنية', 'مناظر عكار', 'طعام محلي', 'قصص المجتمع', 'محتوى أصيل']
        },
        phase2: {
          label: 'المرحلة ٠٢ // الصناعة',
          title: 'تجربة المعرض',
          subtitle: 'ثلاثة أيام في معرض رشيد كرامي الدولي لسرد القصص العام وتبادل المبدعين.',
          items: ['ندوات ومحادثات', 'ورش عمل', 'تبادل المبدعين', 'فعاليات مباشرة', 'سرد القصص العام', 'تعاون العلامات التجارية']
        }
      },
      landmark: {
        label: 'المعلم',
        title: 'معرض طرابلس.',
        description: 'حجر الزاوية في مرحلة المعرض، يعمل المعرض كأرشيف فيزيائي ومساحة تفاعلية حيث يواجه الزوار طبقات الفيحاء.',
        exhibitNote: 'المعرض عبارة عن بيئة سرد قصص غامرة تعكس تاريخ طرابلس وثقافتها وهويتها.',
        heritage: 'المواقع التراثية',
        heritageDesc: 'استكشاف العجائب المعمارية لأوسكار نيماير وطرابلس التاريخية.',
        identity: 'الهوية الثقافية',
        identityDesc: 'روايات بصرية لحياة شوارع طرابلس المتنوعة وحرفها وروحها.'
      },
      values: {
        label: 'الأسس',
        title: 'ما نؤمن به.',
        v1: { title: 'سرد القصص الثقافي', desc: 'صياغة روايات تحتفل بالتراث العميق للعاصمة الشمالية للبنان.' },
        v2: { title: 'التبادل الإبداعي', desc: 'بناء جسور بين المواهب المحلية والمبدعين الإقليميين للتطور المتبادل.' },
        v3: { title: 'الأصوات الإقليمية', desc: 'تضخيم المنظورات المتنوعة التي تحدد الروح الإبداعية للبحر الأبيض المتوسط.' },
        v4: { title: 'التراث في حركة', desc: 'نقل الجمال التاريخي إلى المستقبل الرقمي من خلال إنشاء محتوى ديناميكي.' },
        v5: { title: 'الخيال العام', desc: 'إلهام المجتمع لرؤية مدينتهم كمسرح للإبداع العالمي.' },
        v6: { title: 'الارتباط المجتمعي', desc: 'تعزيز علاقات عميقة متجذرة في المكان والأصالة والهدف المشترك.' }
      },
      location: {
        title: 'الموقع.',
        label: 'موقع',
        l1: { name: 'طرابلس', desc: 'فسيفساء من العمارة المملوكية والطموح الحديث.' },
        l2: { name: 'الضنية', desc: 'الرئة الخضراء للشمال، حيث تتحدث الطبيعة.' },
        l3: { name: 'عكار', desc: 'مناظر طبيعية خام وروايات مجتمعية أصيلة.' },
        l4: { name: 'معرض رشيد كرامي', desc: 'التحفة المستقبلية لأوسكار نيماير.' }
      },
      result: {
        label: 'النتيجة',
        title: 'من المكان إلى الوصول.',
        description: 'نحول أجواء طرابلس الفريدة إلى روايات رقمية قوية، ونعظم وصولها من خلال مبدعين إقليميين موثوقين وتجارب عامة غامرة.'
      },
      ctas: {
        next: 'الخطوة التالية',
        program: 'استكشف البرنامج',
        tickets: 'احصل على تذاكر',
        sanctuary: 'احصل على تصريح الصنّاع'
      }
    },
    tickets: {
      label: 'بوابة الدخول',
      title: 'التذاكر',
      titleHighlight: 'والامتيازات.',
      description: 'اختر طريقة دخولك إلى Roots & Reach — نسخة الفيحاء في معرض رشيد كرامي الدولي. من الدخول العام المفتوح إلى الدخول المتميز الكامل.',
      scroll: 'انتقل لخيارات الإدخال',
      steps: {
        s1: 'الاختيار',
        s2: 'اليوم',
        s3: 'الهوية',
        s4: 'الدفع'
      },
      tiers: {
        single: 'يوم واحد',
        pass: 'اشتراك ٣ أيام',
        includes: 'يتضمن',
        excludes: 'لا يتضمن',
        secureVip: 'تأمين حجز VIP',
        select: 'اختر التذكرة'
      },
      days: {
        label: 'الاختيار الزمني',
        title: 'اختر',
        titleHighlight: 'تجربتك.',
        description: 'تمنحك تذكرة اليوم الواحد الوصول إلى برنامج المعرض لمدة يوم واحد.',
        sequence: 'تسلسل اليوم'
      },
      form: {
        label: 'بروتوكول الهوية',
        title: 'أدخل بيانات',
        titleHighlight: 'الاعتماد.',
        description: 'سجل هويتك للحصول على تذكرة الدخول.',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف / واتساب',
        quantity: 'الكمية',
        ticket: 'تذكرة',
        tickets: 'تذاكر',
        vipLabel: 'بروتوكول VIP',
        dietary: 'التفضيلات الغذائية',
        kit: 'تخصيص حقيبة الاستقبال',
        kitPlaceholder: 'الاسم الذي سيظهر على الحقيبة',
        submit: 'إنشاء الملخص'
      },
      summary: {
        label: 'مراجعة المعاملة',
        title: 'تذكرة',
        titleHighlight: 'دخولك.',
        description: 'أكمل اتصالك بملاذ Roots & Reach.',
        identified: 'المنتج المحدد',
        allDays: 'كل الأيام',
        attendees: 'الحضور',
        attendee: 'حاضر',
        total: 'إجمالي الدفعة',
        calculated: 'محسوبة بالدولار',
        manifest: 'بيان الحضور',
        name: 'الاسم',
        signal: 'الإشارة',
        origin: 'الأصل',
        secure: 'توثيق الأمان',
        disclaimer: 'التذاكر غير قابلة للاسترداد ولكن يمكن نقلها عبر البروتوكول. الدخول يخضع للفحص الأمني في معرض رشيد كرامي الدولي.',
        finalize: 'إتمام عملية الشراء',
        redirect: 'جاري التحويل إلى بوابة الدفع الآمنة'
      }
    },
    sanctuary: {
      label: 'تصاريح الاعتماد',
      hero: {
        title: 'دخول معتمد لـ',
        title2: 'الأصوات والرؤى.',
        title3: 'قدّم للانضمام.',
        description: 'قدّم بطلب للحصول على تصريح معتمد لحدث Roots & Reach — نسخة الفيحاء من خلال أحد المسارين المخصصين: تصريح صانع محتوى أو تصريح إعلامي. يوفر كلا المسارين للمتقدمين المعتمدين وصولاً كاملاً للحدث، باستثناء امتيازات الـ VIP.',
        applyCreator: 'قدّم كصانع محتوى',
        applyMedia: 'قدّم كإعلامي',
        view: 'عرض البرنامج'
      },
      accreditationTypes: {
        creator: {
          title: 'تصريح صانع محتوى',
          description: 'للمؤثرين، صانعي المحتوى، رواة القصص، مصوري الفيديو، صانعي البودكاست، والمبدعين الرقميين الذين يرغبون في المشاركة في الحدث وإنشاء محتوى حول التجربة.',
          cta: 'قدّم كصانع محتوى'
        },
        media: {
          title: 'تصريح إعلامي',
          description: 'للصحفيين، المراسلين، المصورين، المحررين، المؤسسات الإعلامية، والمراسلين الذين يرغبون في تغطية الحدث مهنياً.',
          cta: 'قدّم كإعلامي'
        }
      },
      accessClarity: {
        title: 'يشمل الاعتماد المعتمد:',
        items: [
          'دخول لجميع أيام المعرض الثلاثة',
          'الوصول إلى مناطق الفعاليات العامة',
          'الوصول إلى المحادثات والندوات وورش العمل',
          'الوصول لتغطية أو تجربة الحدث مهنياً',
          'الاعتماد كمشارك معتمد'
        ],
        notTitle: 'لا يشمل:',
        notItems: [
          'دخول صالة الـ VIP',
          'خدمات ضيافة الـ VIP',
          'مقاعد الـ VIP الأمامية المحجوزة',
          'الضيافة الحصرية للـ VIP'
        ]
      },
      concept: {
        label: 'المفهوم',
        title: 'مسار انتقائي لعدسة',
        titleHighlight: 'صاحب الرؤية.',
        desc1: 'إن Roots & Reach هو حدث غامر لمدة ستة أيام يجمع المبدعين من لبنان والمغتربين. تم تصميم الاعتماد كنقطة دخول مركزة للمشاركين ذوي التفكير الإعلامي.',
        desc2: 'سيتفاعل المتقدمون المعتمدون بعمق مع السرد من خلال المعرض العام في معرض رشيد كرامي الدولي، والمشاركة كصحفيين أو رواة قصص معتمدين.',
        features: ['مختبرات المبدعين ومكتب الإعلام', 'مناطق صحفية مخصصة', 'لحظات سرد القصص الثقافية', 'التواصل المهني']
      },
      profile: {
        label: 'ملف المرشح',
        title: 'الأصوات الإبداعية الإقليمية.',
        categories: [
          { name: "صناع المحتوى", desc: "رواة القصص الرقمية الذين يشكلون السرد المشرقي الحديث." },
          { name: "رواة القصص المرئية", desc: "أصوات سينمائية توثق عمارة الصمود." },
          { name: "منصات الإعلام", desc: "المراكز الإقليمية والمنشورات الرقمية التي تقود الخطاب." },
          { name: "الموثقون", desc: "مراقبون متعمقون للمكان والناس والتراث." },
          { name: "المصورون", desc: "التقاط عدسة التطور الثقافي والمعماري." },
          { name: "صناع البودكاست", desc: "مهندسو الصوت في المحادثة والاستكشاف الصوتي." },
          { name: "مبدعو التواصل الاجتماعي", desc: "منسقو التجارب ونبض المجتمع في الوقت الفعلي." },
          { name: "الصحفيون الرقميون", desc: "التقارير من نقطة التقاء التراث والتكنولوجيا." },
          { name: "الأصوات الإقليمية", desc: "سلطات إبداعية من مختلف المغتربين المشارقة." }
        ]
      },
      form: {
        success: {
          creator: {
            title: 'تم استلام',
            titleHighlight: 'الطلب.',
            description: 'شكراً لك. تم استلام طلبك للحصول على تصريح صانع محتوى. سيقوم فريقنا بمراجعته والتواصل مع المتقدمين المختارين بشأن الخطوات التالية.',
            cta: 'العودة إلى النظرة العامة'
          },
          media: {
            title: 'الاعتماد',
            titleHighlight: 'قيد المراجعة.',
            description: 'شكراً لك. تم استلام طلبك للحصول على تصريح إعلامي. سيقوم فريقنا بمراجعته والتواصل مع المتقدمين الإعلاميين المعتمدين بشأن الخطوات التالية.',
            cta: 'العودة إلى النظرة العامة'
          }
        },
        back: 'العودة إلى الاعتمادات',
        titleCreator: 'التقديم على تصريح صانع محتوى',
        titleMedia: 'التقديم على تصريح إعلامي',
        descriptionCreator: 'للمؤثرين، رواة القصص، والمبدعين الرقميين.',
        descriptionMedia: 'للصحفيين والمهنيين والمؤسسات الإعلامية.',
        sections: {
          identity: 'الهوية',
          platforms: 'المنصات الاجتماعية',
          mediaOutlet: 'المؤسسة',
          narrative: 'الهدف والاهتمام',
          coverage: 'خطة التغطية'
        },
        fields: {
          name: 'الاسم الكامل',
          creatorName: 'اسم المبدع / الاسم العام',
          mediaOrg: 'المؤسسة الإعلامية / القناة',
          jobTitle: 'المسمى الوظيفي / الدور',
          email: 'البريد الإلكتروني',
          phone: 'الهاتف / واتساب',
          country: 'الدولة',
          city: 'المدينة',
          instagram: 'بروفايل إنستغرام',
          tiktok: 'بروفايل تيك توك',
          youtube: 'رابط يوتيوب / المنصة',
          website: 'رابط الموقع / المنشور',
          professionalProfile: 'البروفايل المهني (X, LinkedIn)',
          niche: 'تخصص المحتوى الأساسي',
          reach: 'حجم الجمهور',
          bio: 'نبذة قصيرة',
          why: 'لماذا تريد الانضمام إلى/تغطية Roots & Reach؟',
          portfolio: 'روابط الأعمال / المعرض',
          coverageType: 'نوع التغطية',
          coverageOptions: ['كتابية', 'فيديو', 'تصوير فوتوغرافي', 'بث', 'رقمي / اجتماعي'],
          assignment: 'المهمة / الاهتمام التحريري',
          previous: 'نماذج تغطية سابقة',
          attendedSimilar: 'هل حضرت فعاليات مماثلة من قبل؟',
          notes: 'ملاحظات إضافية'
        },
        submit: 'إرسال الطلب',
        processing: 'جاري المعالجة...',
        disclaimer: 'بإرسالك، فإنك توافق على مراجعة بياناتك لبروتوكول اعتماد الفيحاء ٢٠٢٦.',
        footerCode: 'ACC-SEC 2026 // ACCREDITATION'
      },
      faq: {
        label: 'الأسئلة الشائعة',
        items: [
          { q: 'من هو المؤهل للحصول على تصريح الاعتماد؟', a: 'الاعتماد مفتوح لصناع المحتوى المحترفين، المؤثرين، الصحفيين، المصورين، وممثلي وسائل الإعلام الذين يخططون لتغطية الحدث بنشاط.' },
          { q: 'كم من الوقت تستغرق عملية مراجعة الطلب؟', a: 'يراجع فريق الإعلام لدينا الطلبات أولاً بأول. يمكنك توقع الرد في غضون ٣ إلى ٥ أيام عمل بعد تقديم الطلب.' },
          { q: 'هل يضمن الاعتماد الدخول التلقائي؟', a: 'يمنحك الاعتماد حق الوصول لبرنامج المعرض العام وورش العمل والندوات، ولكن التسجيل يخضع لقدرة استيعاب الموقع. تظل مناطق الـ VIP حصرية لحاملي تصاريح الـ VIP.' }
        ]
      },
      footerCode: 'ACC-SEC 2026 // Lebanon'
    }
  }
};
