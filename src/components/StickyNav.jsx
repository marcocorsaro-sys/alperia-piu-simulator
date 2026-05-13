import React from 'react';
import { ArrowRight, Sliders } from '../icons/index.jsx';

const navItems = [
  { id: 'brand', label: 'Brand' },
  { id: 'experience', label: 'UX' },
  { id: 'tiers', label: 'Tier' },
  { id: 'simulator', label: 'Simulator', isSim: true },
  { id: 'economics', label: 'Economics' },
  { id: 'cases', label: 'Cases' },
  { id: 'timeline', label: 'Timeline' },
];

/**
 * StickyNav — barra di navigazione fissa in top.
 * Evidenzia la sezione correntemente visibile e offre CTA diretta al simulator.
 */
export default function StickyNav({ activeSection }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center gap-6">
        <a href="#cover" className="font-display text-xl text-slate-100 whitespace-nowrap hover:text-amber-300 transition-colors">
          Alperia <span className="italic text-amber-300">più</span>
        </a>
        <div className="hidden md:flex gap-1 items-center">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                activeSection === n.id
                  ? 'bg-amber-300/15 text-amber-300'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {n.isSim && <Sliders className="w-3 h-3" />}
              {n.label}
            </a>
          ))}
        </div>
        <a
          href="#simulator"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-300 text-slate-900 text-xs font-body font-semibold hover:bg-amber-200 transition-colors"
        >
          Apri simulatore <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </nav>
  );
}
