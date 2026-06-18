import React from 'react';
import { Home, Gift, Sparkles, Award, User } from '../icons/index.jsx';
import { screens } from './PhoneScreens.jsx';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'rewards', icon: Gift, label: 'Vantaggi' },
  { id: 'contest', icon: Sparkles, label: 'Concorso' },
  { id: 'tier', icon: Award, label: 'Livello' },
  { id: 'profile', icon: User, label: 'Profilo' },
];

export default function PhoneFrame({ screenId }) {
  // Map tierBase/tierGold to 'tier' in bottom-nav highlight
  const navHighlight = screenId.startsWith('tier') ? 'tier' : screenId;

  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-gradient-to-br from-teal-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      {/* Disclaimer badge — explicit reminder that screens are indicative, not final */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap font-body text-[9px] uppercase tracking-[0.15em] font-semibold text-amber-200 bg-amber-950/80 border border-amber-500/40 rounded-full px-3 py-1 backdrop-blur-sm">
        Mockup indicativo · non definitivo
      </div>
      <div className="relative">
        <div className="w-[320px] h-[680px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800">
          <div className="w-full h-full bg-white rounded-[2.4rem] overflow-hidden relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full z-20"></div>
            <div className="h-full overflow-hidden">{screens[screenId]}</div>
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-3 py-2 flex justify-around z-20">
              {navItems.map((nav) => (
                <div
                  key={nav.id}
                  className={`flex flex-col items-center gap-0.5 py-1 px-2 ${navHighlight === nav.id ? 'text-teal-700' : 'text-slate-400'}`}
                >
                  <nav.icon className="w-4 h-4" />
                  <span className="text-[9px] font-medium">{nav.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
