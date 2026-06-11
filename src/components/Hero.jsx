import React from 'react';

export default function Hero() {
  return (
    <>
  {/* HERO */}
  <section id="hero" data-section="hero" className="relative overflow-hidden border-b border-slate-800 pt-16">
    <div className="absolute inset-0 grain pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-8 py-16 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-12 bg-gradient-to-b from-teal-400 to-amber-400"></div>
        <div>
          <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300/80">Proposta Engagement & Retention</div>
          <div className="font-body text-xs text-slate-500">Jakala per Alperia · Aprile 2026</div>
        </div>
      </div>

      <h1 className="font-display text-7xl md:text-8xl font-light leading-[0.95] mb-6 max-w-4xl">
        <span className="block text-slate-100">Alperia<span className="text-amber-300 font-normal">+</span></span>
      </h1>
      <p className="font-display italic text-2xl md:text-3xl text-teal-200/90 max-w-2xl mb-12 font-light">
        L'energia che ti restituisce valore.
      </p>

      <div className="font-body text-sm text-slate-400 mb-8 max-w-3xl leading-relaxed">
        Una proposta costruita a partire dall'analisi del churn condotta da Oliver Wyman e dai dati di portafoglio Alperia,
        tradotta in un programma di engagement digitale veicolato dalla nuova app in lancio a settembre 2026.
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl reveal">
        {[
          { stat: '6.036', label: 'Switch-out · marzo 2026', sub: 'sui 5 canali retail core (fonte Alperia)', tone: 'red' },
          { stat: '€538M', label: 'Revenue at risk · 36 mesi', sub: 'proiezione su churn cumulato Oliver Wyman', tone: 'amber' },
          { stat: '€1,8M', label: 'Ricavi del programma · 5 anni', sub: 'retention, cross-sell, CAC evitato (BC ufficiale)', tone: 'teal' },
        ].map((kpi, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${kpi.tone === 'red' ? 'border-red-500/20 bg-red-950/20' : kpi.tone === 'amber' ? 'border-amber-500/20 bg-amber-950/20' : 'border-teal-500/20 bg-teal-950/30'}`}>
            <div className={`font-display text-5xl font-light mb-2 ${kpi.tone === 'red' ? 'text-red-300' : kpi.tone === 'amber' ? 'text-amber-300' : 'text-teal-300'}`}>{kpi.stat}</div>
            <div className="font-body text-sm text-slate-200 font-medium mb-1">{kpi.label}</div>
            <div className="font-body text-xs text-slate-400">{kpi.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

    </>
  );
}
