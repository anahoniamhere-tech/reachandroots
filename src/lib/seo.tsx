import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
  locale?: string;
}

const BASE_URL = 'https://rootsandreach.org';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = 'Roots & Reach';

export function SEOHead({
  title = 'Roots & Reach — Culture × Creation × Digital',
  description = 'Born in Tripoli, Lebanon — Roots & Reach is a creative community telling stories and making an impact. Culture × Creation × Digital.',
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  locale = 'en_US',
}: SEOHeadProps) {
  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      {locale === 'en_US' && <meta property="og:locale:alternate" content="ar_AR" />}
      {locale === 'ar_AR' && <meta property="og:locale:alternate" content="en_US" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

// Per-route SEO configurations
export const seoConfig = {
  home: {
    en: {
      title: 'Roots & Reach — Culture × Creation × Digital',
      description: 'Born in Tripoli, Lebanon — Roots & Reach is a creative community telling stories and making an impact. Culture × Creation × Digital.',
    },
    ar: {
      title: 'Roots & Reach — ثقافة × إبداع × رقمي',
      description: 'من طرابلس، لبنان — Roots & Reach مجتمع إبداعي يروي القصص ويصنع التأثير. ثقافة × إبداع × رقمي.',
    },
  },
  journeys: {
    en: {
      title: "Dr. Yazeed's Journey — Roots & Reach",
      description: 'Join Dr. Yazeed Mousa for an exclusive developmental journey in Tripoli, Lebanon. Lectures, workshops, and transformative experiences.',
    },
    ar: {
      title: 'رحلة د. يزيد — Roots & Reach',
      description: 'انضم إلى رحلة د. يزيد موسى التنموية الحصرية في طرابلس، لبنان. محاضرات وورش عمل وتجارب تحوّلية.',
    },
  },
  program: {
    en: {
      title: 'Event Program — Roots & Reach',
      description: 'Explore the 3-day event schedule for Roots & Reach. Workshops, panels, and creative sessions in Tripoli, Lebanon.',
    },
    ar: {
      title: 'برنامج الحدث — Roots & Reach',
      description: 'استكشف جدول الحدث لمدة 3 أيام لـ Roots & Reach. ورش عمل وجلسات إبداعية في طرابلس، لبنان.',
    },
  },
  sanctuary: {
    en: {
      title: 'Creator Sanctuary — Roots & Reach',
      description: 'Apply for the Roots & Reach Creator Sanctuary. An exclusive accreditation for content creators and storytellers.',
    },
    ar: {
      title: 'محمية المبدعين — Roots & Reach',
      description: 'قدّم على محمية المبدعين من Roots & Reach. اعتماد حصري لصناع المحتوى ورواة القصص.',
    },
  },
  gallery: {
    en: {
      title: 'Gallery — Roots & Reach',
      description: 'Browse our gallery of creators, storytellers, and community members shaping culture across the Arab world.',
    },
    ar: {
      title: 'المعرض — Roots & Reach',
      description: 'تصفّح معرض المبدعين ورواة القصص وأفراد المجتمع الذين يصنعون الثقافة في العالم العربي.',
    },
  },
  sponsors: {
    en: {
      title: 'Sponsors — Roots & Reach',
      description: 'Partner with Roots & Reach. Discover sponsorship opportunities for our cultural and creative events in Lebanon.',
    },
    ar: {
      title: 'الرعاة — Roots & Reach',
      description: 'شارك مع Roots & Reach. اكتشف فرص الرعاية لفعالياتنا الثقافية والإبداعية في لبنان.',
    },
  },
};
