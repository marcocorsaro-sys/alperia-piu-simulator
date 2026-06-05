import React, { useState, useEffect } from 'react';
import { Sliders, ArrowDown, Activity, Target } from '../icons/index.jsx';
import alperiaLogo from '../assets/alperia-logo.svg';

/**
 * Cover — la prima schermata. Posiziona il tool stesso come asset di valore
 * della proposta Jakala. Non "una presentazione", ma "uno strumento vivo".
 *
 * Elementi chiave:
 *   - Numero saldo netto grande che pulsa (asset del simulatore)
 *   - Tagline che distingue questa proposta da un pitch deck statico
 *   - CTA scroll-down per entrare nella proposta
 *   - Metadati: versione, data, contesto Oliver Wyman
 */
export default function Cover({ result, onStart }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const saldoFormatted = result.saldoNetto >= 0
    ? `+€${Math.round(result.saldoNetto / 1000).toLocaleString('it-IT')}K`
    : `−€${Math.round(Math.abs(result.saldoNetto) / 1000).toLocaleString('it-IT')}K`;

  return (
    <section id="cover" data-section="cover" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">
      {/* Ambient gradient */}
      <div className="absolute inset-0 grain pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-500/15 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 py-20 relative w-full">
        {/* Logo Alperia ufficiale in cima (variante bianca su sfondo scuro) */}
        <div className={`mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <img src={alperiaLogo} alt="Alperia" className="h-7 w-auto [filter:brightness(0)_invert(1)]" />
        </div>

        {/* Top meta row */}
        <div className={`flex justify-between items-start mb-20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-16 bg-gradient-to-b from-teal-400 to-amber-400"></div>
            <div>
              <div className="font-body text-xs uppercase tracking-[0.3em] text-teal-300/80 mb-1">Proposta Engagement & Retention</div>
              <div className="font-body text-xs text-slate-500">Jakala per Alperia · v0.8 · Aprile 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-950/20">
            <Activity className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-body text-xs text-amber-200 font-medium">Tool interattivo</span>
          </div>
        </div>

        {/* Main headline */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] mb-8 max-w-6xl">
            Non una proposta.
            <span className="block italic text-amber-300 mt-2">Uno strumento.</span>
          </h1>
          <p className="font-display italic text-2xl md:text-3xl text-teal-200/90 max-w-3xl font-light leading-relaxed">
            «Alperia+» è il programma. <br className="hidden md:block" />
            Questo è il simulatore che ne sostiene gli investimenti.
          </p>
        </div>

        {/* Dynamic value proof */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <div className="font-body text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-3">Saldo netto · scenario attivo</div>
              <div className={`font-display text-7xl md:text-8xl font-light leading-none mb-4 pulse-soft ${result.saldoNetto >= 0 ? 'text-amber-300' : 'text-rose-300'}`}>
                {saldoFormatted}
              </div>
              <div className="font-body text-sm text-slate-400 max-w-md">
                Calcolato in tempo reale sulle assumptions correnti.
                Modifica i KPI dentro la proposta per vedere come reagisce il business case.
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Break-even', value: result.breakEven ? `Anno ${result.breakEven}` : '>3 anni', color: 'teal' },
                  { label: 'ROI 3 anni', value: `${Math.round(result.roi * 100)}%`, color: 'amber' },
                  { label: 'Iscritti EOP', value: `${Math.round(result.iscrittiEOP / 1000).toLocaleString('it-IT')}K`, color: 'teal' },
                ].map((kpi, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border ${kpi.color === 'amber' ? 'border-amber-500/30 bg-amber-950/10' : 'border-teal-500/30 bg-teal-950/10'}`}
                  >
                    <div className={`font-display text-3xl font-light mb-1 ${kpi.color === 'amber' ? 'text-amber-300' : 'text-teal-300'}`}>
                      {kpi.value}
                    </div>
                    <div className="font-body text-[10px] uppercase tracking-wider text-slate-500">{kpi.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Differentiator strip */}
        <div className={`grid md:grid-cols-3 gap-6 mb-20 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            {
              icon: Sliders,
              title: '9 leve modificabili',
              body: 'Iscritti EOP, delta churn, valore per saved, uplift cross-sell, costi reward, canone piattaforma. Ogni leva è accessibile.',
            },
            {
              icon: Activity,
              title: 'Calcolo in tempo reale',
              body: 'Saldo netto, ROI, break-even, iscritti EOP si aggiornano istantaneamente ad ogni modifica.',
            },
            {
              icon: Target,
              title: 'Scenari preconfigurati',
              body: 'Conservativo / Base / Ottimistico in un click. O salva la tua configurazione custom.',
            },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30">
              <div className="w-10 h-10 rounded-xl bg-teal-900/40 border border-teal-500/20 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-teal-300" />
              </div>
              <div className="font-body font-semibold text-slate-100 mb-2">{item.title}</div>
              <div className="font-body text-sm text-slate-400 leading-relaxed">{item.body}</div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 transition-all duration-1000 delay-900 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-300 hover:bg-amber-200 text-slate-900 font-body font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30"
          >
            Entra nella proposta <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#simulator"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-900/50 font-body font-medium text-sm transition-all"
          >
            Vai dritto al simulatore <Sliders className="w-4 h-4" />
          </a>
          <div className="font-body text-xs text-slate-500 max-w-md md:ml-auto">
            Dati di churn: <span className="text-slate-300">Oliver Wyman</span> · Portafoglio 01/03/2026 ·
            Benchmark Jakala su E.ON, Acea, Enel, NeN, Plenitude
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1200 ${mounted ? 'opacity-60' : 'opacity-0'} float-slow`}>
        <div className="font-body text-[10px] uppercase tracking-[0.3em] text-slate-500">Scroll</div>
        <ArrowDown className="w-4 h-4 text-slate-500" />
      </div>
    </section>
  );
}
