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
  
  // Read the original index.html ONCE into memory before it gets modified
  const originalIndexHtml = fs.readFileSync(path.resolve('dist/index.html'), 'utf8');
  
  app.use(express.static('dist', { index: false })); // Don't auto-serve index.html
  
  // Fallback to the original index.html for SPA routing
  app.use((req, res) => {
    res.send(originalIndexHtml);
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
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle2', timeout: 60000 });
    // Add a small explicit wait to let React Helmet finish injecting tags
    await new Promise(r => setTimeout(r, 2000));
    
    // Get the fully rendered HTML
    const html = await page.content();
    
    // Save to dist/route.html
    // E.g. /journeys -> dist/journeys.html
    // Special case for root '/' -> dist/index.html
    let filePath;
    if (route === '/') {
      filePath = path.join('dist', 'index.html');
    } else {
      // Remove leading slash and append .html
      filePath = path.join('dist', `${route.slice(1)}.html`);
    }
    
    fs.writeFileSync(filePath, html);
    console.log(`Saved ${filePath}`);
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(err => {
  console.error('Prerendering failed:', err);
  // Exit with 0 so the build does not fail on Hostinger
  process.exit(0);
});
