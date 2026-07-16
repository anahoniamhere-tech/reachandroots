import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './lib/LanguageContext.tsx';
import {ComingSoon} from './components/ComingSoon.tsx';
import {AdminGuard} from './components/AdminGuard.tsx';
import {ContentCreatorsInvitation} from './components/ContentCreatorsInvitation.tsx';
import {SponsorsLandingPage} from './components/SponsorsLandingPage.tsx';
import {TrfAnahonPage} from './components/TrfAnahonPage.tsx';
import {CommunityForm} from './components/CommunityForm.tsx';
import {CommunityDashboard} from './components/CommunityDashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Website */}
            <Route path="/*" element={<App />} />
            
            {/* Public Content Creators Invitation Page */}
            <Route path="/icontent_Creators" element={<ContentCreatorsInvitation />} />
            <Route path="/icontent_creators" element={<Navigate to="/icontent_Creators" replace />} />
            
            {/* Public Sponsorship Landing Page */}
            <Route path="/sponsors" element={<SponsorsLandingPage />} />
            <Route path="/sponsores" element={<Navigate to="/sponsors" replace />} />
            
            {/* TRF Anahon Presentation Page */}
            <Route path="/TRF-anahon" element={<TrfAnahonPage />} />
            
            {/* Community Feature */}
            <Route path="/members" element={<CommunityForm />} />
            <Route path="/team-dashboard" element={<CommunityDashboard />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>,
);
