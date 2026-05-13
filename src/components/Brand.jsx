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
        «Alperia più» è progettato come estensione del brand Alperia, non come sotto-brand indipendente.
        Il «più» è il rispetto delle promesse, la somma dei vantaggi territoriali, il tempo di relazione che cresce.
      </p>

      {/* Logo Lockup */}
      <div className="grid md:grid-cols-12 gap-8 items-center mb-16 reveal">
        <div className="md:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/30 p-16 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display font-light text-slate-100 leading-none" style={{ fontSize: '96px' }}>
                Alperia <span className="italic text-amber-300" style={{ fontWeight: 400 }}>più</span>
              </div>
              <div className="mt-6 font-display italic text-2xl text-teal-300/80 font-light">
                L'energia che ti restituisce valore.
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 space-y-6">
          <div>
            <div className="font-body text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Il principio</div>
            <p className="font-body text-sm text-slate-300 leading-relaxed">
              Logotipo composto: «Alperia» mantiene il wordmark corporate, «più» è introdotto come elemento in corsivo oro —
              la continuità brand + la promessa di valore aggiunto, in un solo sguardo.
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
        <div className="font-body text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-4">Palette cromatica</div>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { name: 'Midnight', hex: '#020617', role: 'Base · sfondi scuri, autorevolezza', bg: 'bg-slate-950', fg: 'text-slate-200' },
            { name: 'Dolomite Teal', hex: '#2EB5BC', role: 'Primario · territorio, fiducia', bg: 'bg-teal-500', fg: 'text-slate-900' },
            { name: 'Alpine Gold', hex: '#E8B842', role: 'Accento · valore, premium', bg: 'bg-amber-400', fg: 'text-slate-900' },
            { name: 'Warm White', hex: '#F7F4EE', role: 'Sfondi chiari · calore, aria', bg: 'bg-orange-50', fg: 'text-slate-900' },
            { name: 'Signal Coral', hex: '#E97062', role: 'Alert · urgenza, rischio', bg: 'bg-rose-400', fg: 'text-slate-900' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-slate-800">
              <div className={`${c.bg} h-24 flex items-end p-4`}>
                <div className={`${c.fg} font-display text-xl font-semibold`}>{c.name}</div>
              </div>
              <div className="bg-slate-900/60 p-4">
                <div className="font-body text-[11px] text-slate-400 font-mono mb-1">{c.hex}</div>
                <div className="font-body text-xs text-slate-300 leading-tight">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
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
