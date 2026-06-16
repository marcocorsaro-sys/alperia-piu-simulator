import React from 'react';

export default function Brand() {
  return (
    <>
  {/* BRAND IDENTITY */}
  <section id="brand" data-section="brand" className="border-b border-slate-800 bg-slate-950 relative overflow-hidden">
    <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-8 py-24 relative">
      <div className="font-body text-xs uppercase tracking-[0.25em] text-amber-300 mb-4 reveal">Brand identity</div>
      <h2 className="font-display text-5xl md:text-6xl font-light mb-6 leading-tight max-w-4xl reveal">
        Un nome che <span className="italic text-amber-300">restituisce,</span> non che accumula.
      </h2>
      <p className="font-body text-base text-slate-300 leading-relaxed max-w-3xl mb-16 reveal">
        «Alperia+» è progettato come estensione del brand Alperia, non come sotto-brand indipendente.
        Il «+» è il rispetto delle promesse, la somma dei vantaggi territoriali, il tempo di relazione che cresce.
      </p>

      {/* Naming wordmark (NON è il logo definitivo) */}
      <div className="grid md:grid-cols-12 gap-8 items-center mb-16 reveal">
        <div className="md:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/30 p-16 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display font-light text-slate-100 leading-none" style={{ fontSize: '96px' }}>
                Alperia<span className="text-amber-300" style={{ fontWeight: 400 }}>+</span>
              </div>
              <div className="mt-6 font-display italic text-2xl text-teal-300/80 font-light">
                L'energia che ti restituisce valore.
              </div>
              <div className="mt-8 inline-block px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/60 font-body text-[11px] text-slate-400">
                Wordmark provvisorio · il logo definitivo è un deliverable creativo
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 space-y-6">
          <div>
            <div className="font-body text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Il principio</div>
            <p className="font-body text-sm text-slate-300 leading-relaxed">
              La denominazione è «Alperia+»: il wordmark corporate Alperia con il «+» come segno della promessa di valore aggiunto.
              Questa è una resa tipografica provvisoria, <span className="text-slate-200">non un logo</span>: l'identità visiva definitiva
              (logo, key visual, sistema iconografico) è oggetto del percorso creativo dedicato — naming, logo e color palette proprietari
              sviluppati dall'agenzia SBAM di Jakala.
            </p>
          </div>
          <div>
            <div className="font-body text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Typography</div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                <span className="font-display text-xl text-slate-200">Fraunces</span>
                <span className="font-body text-xs text-slate-500">Display · editoriale, caldo</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                <span className="font-body text-lg text-slate-200">DM Sans</span>
                <span className="font-body text-xs text-slate-500">Body · neutro, contemporaneo</span>
              </div>
            </div>
          </div>
          <div>
            <div className="font-body text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Payoff</div>
            <p className="font-display italic text-lg text-teal-300 leading-snug">«L'energia che ti restituisce valore»</p>
            <p className="font-body text-xs text-slate-500 mt-1">+ declinazione locale: «L'energia che ti restituisce l'Alto Adige»</p>
          </div>
        </div>
      </div>

      {/* Palette */}
      <div className="mb-16 reveal">
        <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
          <div className="font-body text-[10px] uppercase tracking-[0.25em] text-slate-500">Palette cromatica</div>
          <div className="font-body text-[11px] text-amber-300/80 italic">In allineamento ai colori istituzionali Alperia e alle linee guida di accessibilità</div>
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { name: 'Blu', hex: '#006593', role: 'Primario · brand, uso estensivo', aa: 'AA 6,39', style: { background: '#006593' }, fg: 'text-white' },
            { name: 'Turchese', hex: '#1D7990', role: 'Secondario · a supporto del primario', aa: 'AA 5,01', style: { background: '#1D7990' }, fg: 'text-white' },
            { name: 'Arancione', hex: '#DB3700', role: 'Accento · esclusivo per le CTA', aa: 'AA 4,60', style: { background: '#DB3700' }, fg: 'text-white' },
            { name: 'Rosso', hex: '#C0392B', role: 'Status · azione negativa / errore', aa: '', style: { background: '#C0392B' }, fg: 'text-white' },
            { name: 'Verde', hex: '#4E7D2E', role: 'Status · azione positiva / successo', aa: '', style: { background: '#4E7D2E' }, fg: 'text-white' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-slate-800">
              <div className="h-24 flex items-end justify-between p-4" style={c.style}>
                <div className={`${c.fg} font-display text-xl font-semibold`}>{c.name}</div>
                {c.aa && <div className="font-body text-[10px] text-white/90 bg-black/25 px-2 py-0.5 rounded-full">{c.aa}</div>}
              </div>
              <div className="bg-slate-900/60 p-4">
                <div className="font-body text-[11px] text-slate-400 font-mono mb-1">{c.hex}</div>
                <div className="font-body text-xs text-slate-300 leading-tight">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="font-body text-xs text-slate-500 mt-4 max-w-3xl leading-relaxed">
          Colori istituzionali Alperia. I core seguono le best practice di accessibilità con contrasto minimo 4,5:1;
          la scala cromatica estesa (100→10) è derivata direttamente dai colori core. Fonte: linee guida palette Alperia.
        </p>
      </div>

      {/* Voice & Personality */}
      <div className="grid md:grid-cols-3 gap-6 reveal">
        {[
          {
            title: 'Calda, non amichevole',
            body: 'La relazione è con Alperia, non con un «amico». La voce riconosce, non familiarizza. Parole brevi, frasi dirette, nessun emoji.',
            bad: '«Ciao! Sei il nostro cliente preferito! 😊»',
            good: '«Sei con noi da 3 anni. Grazie.»',
          },
          {
            title: 'Concreta, non astratta',
            body: 'Parliamo di cose tangibili: biglietti, sconti, giorni di pausa, kilowatt. Evitiamo concetti vaghi come «esperienza» o «journey» nei touchpoint utente.',
            bad: '«Vivi la tua energy experience»',
            good: '«Due biglietti Hockey Bolzano ti aspettano»',
          },
          {
            title: 'Territoriale con misura',
            body: 'Alto Adige è un asset identitario per i clienti core, ma l\'area Nazionale non deve sentirsi di serie B. Declinazione differenziata, brand unico.',
            bad: '«Solo per i nostri clienti dell\'Alto Adige»',
            good: '«Vantaggi del territorio per chi vive qui + esperienze digitali per tutti»',
          },
        ].map((v, i) => (
          <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="font-display text-xl text-slate-100 font-semibold mb-3">{v.title}</div>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">{v.body}</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-rose-400 text-xs mt-0.5">✕</span>
                <span className="font-body text-xs text-slate-500 italic">{v.bad}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                <span className="font-body text-xs text-teal-200 italic">{v.good}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

    </>
  );
}
