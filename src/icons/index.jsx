// ============================================================================
// Inline Lucide icons — SVG components, zero external dependency.
// ----------------------------------------------------------------------------
// Add new icons: pick SVG paths from https://lucide.dev and wrap like below.
// ============================================================================
import React from 'react';

const iconBase = (path, props = {}) => {
  const { className = '', strokeWidth = 2, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{ __html: path }}
      {...rest}
    />
  );
};

export const Home = (p) => iconBase('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', p);
export const Gift = (p) => iconBase('<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C9.985 3 12 4.5 12 8c0-3.5 2.015-5 4.5-5a2.5 2.5 0 0 1 0 5"/>', p);
export const Award = (p) => iconBase('<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>', p);
export const User = (p) => iconBase('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>', p);
export const Bell = (p) => iconBase('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>', p);
export const Sparkles = (p) => iconBase('<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>', p);
export const ChevronRight = (p) => iconBase('<path d="m9 18 6-6-6-6"/>', p);
export const ChevronDown = (p) => iconBase('<path d="m6 9 6 6 6-6"/>', p);
export const ArrowRight = (p) => iconBase('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', p);
export const ArrowDown = (p) => iconBase('<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>', p);
export const TrendingUp = (p) => iconBase('<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>', p);
export const TrendingDown = (p) => iconBase('<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>', p);
export const Shield = (p) => iconBase('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>', p);
export const Zap = (p) => iconBase('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', p);
export const Heart = (p) => iconBase('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>', p);
export const Mountain = (p) => iconBase('<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>', p);
export const Trophy = (p) => iconBase('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>', p);
export const Calendar = (p) => iconBase('<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>', p);
export const MapPin = (p) => iconBase('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', p);
export const CheckCircle = (p) => iconBase('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', p);
export const AlertTriangle = (p) => iconBase('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>', p);
export const Target = (p) => iconBase('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', p);
export const Layers = (p) => iconBase('<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>', p);
export const Sliders = (p) => iconBase('<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>', p);
export const RotateCcw = (p) => iconBase('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>', p);
export const Play = (p) => iconBase('<polygon points="5 3 19 12 5 21 5 3"/>', p);
export const Activity = (p) => iconBase('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', p);
