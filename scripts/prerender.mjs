import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';

// The routes we want to prerender for SEO
const routes = [
  '/',
  '/journeys',
  '/program',
  '/sanctuary',
  '/gallery',
  '/sponsors'
];

async function prerender() {
  console.log('Starting prerender...');
  
  // 1. Start a local server hosting the dist folder
  const app = express();
  app.use(express.static('dist'));
  // Fallback to index.html for SPA routing
  app.use((req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
  });

  const server = await new Promise((resolve) => {
    const s = app.listen(3000, () => resolve(s));
  });

  console.log('Local server started on port 3000');

  // 2. Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();

  // 3. Visit each route and save the HTML
  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    // Wait until network is idle to ensure React and react-helmet-async have finished loading
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });
    
    // Get the fully rendered HTML
    const html = await page.content();
    
    // Save to dist/route/index.html
    // E.g. /journeys -> dist/journeys/index.html
    // Special case for root '/' -> dist/index.html
    let dir = 'dist';
    if (route !== '/') {
      // Remove leading slash for folder name
      dir = path.join('dist', route.slice(1));
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
    
    const filePath = path.join(dir, 'index.html');
    fs.writeFileSync(filePath, html);
    console.log(`Saved ${filePath}`);
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(err => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
