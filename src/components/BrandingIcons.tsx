import React from 'react';
import logo01Y from '../assets/HON-LOGO---01-1440-Y.png';
import logo02T from '../assets/HON-LOGO---02-1440-T.png';
import logo02TYellow from '../assets/HON-LOGO---02-1440-T_Yellow.png';
import logo03Y from '../assets/HON-LOGO---03-1440-Y.png';
import yellowHeaderLogo from '../assets/Yellow_Header_logo.png';
import galleryLogoBlack from '../assets/gallery_logo_black.png';
import galleryLogoYellow from '../assets/gallery_logo_yellow.png';

export const TripoliHeritage = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M4 21V10C4 6.8 6.4 4 12 4C17.6 4 20 6.8 20 10V21" />
    <path d="M12 4V2" />
    <path d="M8 21H16" />
  </svg>
);

export const FayhaaFlow = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M4 12C4 12 8 8 14 8C20 8 20 14 14 14C8 14 8 20 4 20" />
    <path d="M8 10C8 10 11 7 16 7C21 7 21 12 16 12C11 12 11 17 8 17" />
  </svg>
);

export const DigitalCreativity = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="4" y="4" width="3" height="3" />
    <rect x="9" y="4" width="3" height="3" />
    <rect x="14" y="4" width="3" height="3" />
    <rect x="19" y="4" width="3" height="3" />
    <rect x="4" y="9" width="3" height="3" />
    <rect x="9" y="9" width="3" height="3" />
    <rect x="14" y="9" width="3" height="3" />
    <rect x="19" y="9" width="3" height="3" />
    <rect x="4" y="14" width="3" height="3" />
    <rect x="9" y="14" width="3" height="3" />
    <rect x="14" y="14" width="3" height="3" />
    <rect x="19" y="14" width="3" height="3" />
    <rect x="4" y="19" width="3" height="3" />
    <rect x="9" y="19" width="3" height="3" />
    <rect x="14" y="19" width="3" height="3" />
    <rect x="19" y="19" width="3" height="3" />
  </svg>
);

export const ContentStorytelling = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M8 5V19L19 12L8 5Z" />
  </svg>
);

export const CommunityConnection = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="4" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="12" cy="8" r="1.5" />
    <circle cx="16" cy="8" r="1.5" />
    <circle cx="4" cy="12" r="1.5" />
    <circle cx="8" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="16" cy="12" r="1.5" />
    <circle cx="20" cy="12" r="1.5" />
    <circle cx="8" cy="16" r="1.5" />
    <circle cx="12" cy="16" r="1.5" />
    <circle cx="16" cy="16" r="1.5" />
    <circle cx="12" cy="20" r="1.5" />
  </svg>
);

interface BrandLogoProps {
  className?: string;
  variant?: 'transparent' | 'yellow' | 'transparent-yellow' | 'banner' | 'yellow-header' | 'written-black' | 'written-yellow';
}

export const BrandLogo = ({ className = "w-12 h-12", variant = "transparent" }: BrandLogoProps) => {
  const getSrc = () => {
    switch (variant) {
      case 'yellow':
        return logo01Y;
      case 'transparent-yellow':
        return logo02TYellow;
      case 'banner':
        return logo03Y;
      case 'yellow-header':
        return yellowHeaderLogo;
      case 'written-black':
        return galleryLogoBlack;
      case 'written-yellow':
        return galleryLogoYellow;
      case 'transparent':
      default:
        return logo02T;
    }
  };

  return (
    <img 
      src={getSrc()} 
      alt="HON Roots and Reach Logo" 
      className={`object-contain max-h-full ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

