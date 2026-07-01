import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/journeys',
  '/program',
  '/sanctuary',
  '/gallery',
  '/sponsors'
];

const seoConfig = {
  '/': {
    title: 'Roots & Reach — Culture × Creation × Digital',
    description: 'Born in Tripoli, Lebanon — Roots & Reach is a creative community telling stories and making an impact. Culture × Creation × Digital.',
    image: 'https://rootsandreach.org/og-image.png'
  },
  '/journeys': {
    title: "Dr. Yazeed's Journey — Roots & Reach",
    description: 'Join Dr. Yazeed Mousa for an exclusive developmental journey in Tripoli, Lebanon. Lectures, workshops, and transformative experiences.',
    image: 'https://rootsandreach.org/OG-Journey.png'
  },
  '/program': {
    title: 'Event Program — Roots & Reach',
    description: 'Explore the 3-day event schedule for Roots & Reach. Workshops, panels, and creative sessions in Tripoli, Lebanon.',
    image: 'https://rootsandreach.org/og-image.png'
  },
  '/sanctuary': {
    title: 'Creator Sanctuary — Roots & Reach',
    description: 'Apply for the Roots & Reach Creator Sanctuary. An exclusive accreditation for content creators and storytellers.',
    image: 'https://rootsandreach.org/og-image.png'
  },
  '/gallery': {
    title: 'Gallery — Roots & Reach',
    description: 'Browse our gallery of creators, storytellers, and community members shaping culture across the Levant.',
    image: 'https://rootsandreach.org/og-image.png'
  },
  '/sponsors': {
    title: 'Sponsors — Roots & Reach',
    description: 'Partner with Roots & Reach. Discover sponsorship opportunities for our cultural and creative events in Lebanon.',
    image: 'https://rootsandreach.org/og-image.png'
  }
};

function prerender() {
  console.log('Starting static metadata injection...');
  const originalIndexHtml = fs.readFileSync(path.resolve('dist/index.html'), 'utf8');

  for (const route of routes) {
    const config = seoConfig[route];
    const canonicalUrl = `https://rootsandreach.org${route === '/' ? '' : route}`;
    
    const metaTags = `
    <title>${config.title}</title>
    <meta name="description" content="${config.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:image" content="${config.image}" />
    <meta property="og:site_name" content="Roots & Reach" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="ar_AR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <meta name="twitter:image" content="${config.image}" />
    `;

    // Inject meta tags right after the <head> tag
    const modifiedHtml = originalIndexHtml.replace('<head>', `<head>\n${metaTags}`);

    let dir = 'dist';
    if (route !== '/') {
      dir = path.join('dist', route.slice(1));
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
    
    const filePath = path.join(dir, 'index.html');
    fs.writeFileSync(filePath, modifiedHtml);
    console.log(`Saved injected HTML to ${filePath}`);
  }
  
  console.log('Static metadata injection complete!');
}

try {
  prerender();
} catch (err) {
  console.error('Prerendering failed:', err);
  process.exit(1);
}
