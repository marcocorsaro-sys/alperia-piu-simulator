import React from 'react';

export default function ExperienceIntro() {
  return (
    <>
  {/* EXPERIENCE INTRO */}
  <section id="experience" data-section="experience" className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4">L'esperienza utente</div>
      <h2 className="font-display text-5xl md:text-6xl font-light mb-6 leading-tight max-w-4xl">
        Cinque momenti, <span className="italic text-amber-300">cinque leve di business.</span>
      </h2>
      <p className="font-body text-base text-slate-300 leading-relaxed max-w-3xl mb-12">
        Il programma «Alperia+» è progettato come webview integrata nella nuova app in lancio a settembre 2026.
        Accessibile via SSO, senza nuove registrazioni. Ogni schermata è pensata per muovere un indicatore
        di business specifico: adesione, engagement, cross-sell, retention, profilazione.
      </p>

      <div className="mb-12 rounded-xl border border-amber-500/40 bg-amber-950/20 px-5 py-4 flex items-start gap-3 max-w-3xl">
        <span className="font-display text-amber-300 text-lg leading-none mt-0.5">⚠</span>
        <div>
          <div className="font-body text-[10px] uppercase tracking-[0.2em] text-amber-300 font-semibold mb-1">
            Mockup indicativi · non definitivi
          </div>
          <p className="font-body text-sm text-amber-100/80 leading-relaxed">
            Le schermate che seguono sono <span className="font-semibold text-amber-100">wireframe puramente indicativi</span>, a
            scopo esclusivamente illustrativo: servono a comunicare logiche, flussi e leve di business del programma.
            <span className="font-semibold text-amber-100"> Non rappresentano in alcun modo la soluzione finale</span> — layout,
            UI, key visual, copy e sistema iconografico definitivi sono oggetto del percorso creativo dedicato e verranno
            sviluppati in fase di progetto.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-3">
        {[
          { n: '01', screen: 'Home', kpi: 'Adesione & MAU', color: 'teal' },
          { n: '02', screen: 'Vantaggi', kpi: 'Redemption rate', color: 'amber' },
          { n: '03', screen: 'Concorso', kpi: 'Azioni di valore', color: 'orange' },
          { n: '04', screen: 'Livello', kpi: 'Cross-sell & tier climb', color: 'teal' },
          { n: '05', screen: 'Profilo', kpi: 'Profilazione & consensi', color: 'amber' },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
            <div className={`font-display text-2xl font-light mb-3 text-${item.color}-300`}>{item.n}</div>
            <div className="font-body text-base font-semibold text-slate-100 mb-2">{item.screen}</div>
            <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 mb-1">KPI collegato</div>
            <div className="font-body text-xs text-slate-400">{item.kpi}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

    </>
  );
}
