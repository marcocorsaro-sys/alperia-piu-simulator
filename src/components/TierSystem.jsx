import React from 'react';
import PhoneFrame from './PhoneFrame.jsx';

export default function TierSystem() {
  return (
    <>
  {/* TIER SYSTEM — Immersive */}
  <section id="tiers" data-section="tiers" className="border-b border-slate-800 bg-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4 reveal">Il sistema di livelli</div>
      <h2 className="font-display text-5xl md:text-6xl font-light mb-3 leading-tight reveal">Tre livelli, <span className="italic text-amber-300">una promessa.</span></h2>
      <p className="font-body text-base text-slate-400 mb-10 max-w-3xl reveal">
        Più resti con Alperia, più il programma vi restituisce. Niente punti da accumulare, niente soglie da sbloccare:
        il passaggio di livello è automatico al raggiungimento delle condizioni.
      </p>

      <div className="grid md:grid-cols-4 gap-4 mb-6 reveal">
        {[
          { num: '4', label: 'Concorsi stagionali / anno', desc: 'Primavera, estate, autunno, inverno' },
          { num: '€18', label: 'Costo medio reward / membro / anno', desc: 'Mix esperienze + sconti + partner' },
          { num: '36 mesi', label: 'Vita media cliente baseline', desc: 'Orizzonte CLV di riferimento' },
          { num: '0', label: 'Punti da accumulare', desc: 'Solo tenure + commodity attive' },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
            <div className="font-display text-3xl font-light text-amber-300 mb-1">{s.num}</div>
            <div className="font-body text-xs font-semibold text-slate-200 mb-1">{s.label}</div>
            <div className="font-body text-xs text-slate-500">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* TIER DEEP DIVE — BASE */}
  <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-12 gap-12 items-center reveal">
        <div className="md:col-span-5 flex justify-center">
          <PhoneFrame screenId="tierBase" />
        </div>
        <div className="md:col-span-7">
          <div className="flex items-baseline gap-4 mb-4">
            <div className="font-display text-5xl font-light text-slate-400">Base</div>
            <div className="font-body text-[10px] uppercase tracking-[0.25em] text-slate-600 px-2 py-1 border border-slate-700 rounded-full">Livello 1/3</div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight">
            La porta d'ingresso. <span className="italic text-teal-300">Da subito.</span>
          </h3>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            Ogni cliente Alperia è iscritto al livello Base dal momento in cui attiva il contratto. Il principio «sei cliente, sei dentro»
            si traduce in benefit reali dal primo giorno. Nessuna attesa, nessuna soglia: è la promessa che fa decollare l'adesione nei primi 6 mesi.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Regola</div>
              <p className="font-body text-sm text-slate-300">1 commodity attiva · anzianità ≤12 mesi</p>
            </div>
            <div>
              <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Quota target</div>
              <p className="font-body text-sm text-slate-300">40% della popolazione iscritti</p>
            </div>
          </div>

          <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Cosa sblocca</div>
          <ul className="space-y-2 mb-8">
            {['Welcome kit digitale + bolletta bonus', 'Museo Expea: 1 ingresso/anno', 'Accesso ai 4 concorsi stagionali', 'Bolletta digitale bonus + priorità customer care'].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-5 rounded-xl border border-slate-700 bg-slate-900/60">
            <div className="font-body text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Obiettivo di business</div>
            <div className="font-body text-sm text-slate-200">Massimizzare il tasso di adesione nei primi 90 giorni e trasformare l'early tenure in engagement digitale sull'app.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* TIER DEEP DIVE — SILVER */}
  <section className="border-b border-slate-800 bg-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-12 gap-12 items-center reveal">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="flex items-baseline gap-4 mb-4">
            <div className="font-display text-5xl font-light text-teal-300">Silver</div>
            <div className="font-body text-[10px] uppercase tracking-[0.25em] text-teal-300 px-2 py-1 border border-teal-500/40 rounded-full">Livello 2/3</div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight">
            Il cuore del programma. <span className="italic text-amber-300">La fedeltà riconosciuta.</span>
          </h3>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            Il livello Silver si raggiunge automaticamente al compimento del primo anno con Alperia. È il «premio di continuità» che sostituisce i punti:
            dodici mesi di fornitura attiva diventano un riconoscimento visibile, aperto a quasi metà della popolazione iscritta.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Regola</div>
              <p className="font-body text-sm text-slate-300">1 commodity attiva · anzianità &gt;12 mesi</p>
            </div>
            <div>
              <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Quota target</div>
              <p className="font-body text-sm text-slate-300">45% della popolazione iscritti</p>
            </div>
          </div>

          <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Cosa aggiunge al livello Base</div>
          <ul className="space-y-2 mb-8">
            {['Hockey Bolzano: 1 biglietto/anno', 'Easycharge: −10% sull\'attivazione', 'Convenzioni esercenti Alto Adige', 'Sconto bolletta €20/anno + bonus anniversario €10'].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-5 rounded-xl border border-teal-500/20 bg-teal-950/20">
            <div className="font-body text-[10px] uppercase tracking-wider text-teal-300 font-semibold mb-2">Obiettivo di business</div>
            <div className="font-body text-sm text-slate-200">Consolidare la fedeltà nei clienti con 1 anno di tenure — quelli che l'analisi Oliver Wyman identifica come a rischio al 17° mese. Silver è la trincea di contenimento churn.</div>
          </div>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
          <PhoneFrame screenId="tier" />
        </div>
      </div>
    </div>
  </section>

  {/* TIER DEEP DIVE — GOLD */}
  <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-12 gap-12 items-center reveal">
        <div className="md:col-span-5 flex justify-center">
          <PhoneFrame screenId="tierGold" />
        </div>
        <div className="md:col-span-7">
          <div className="flex items-baseline gap-4 mb-4">
            <div className="font-display text-5xl font-light text-amber-300">Gold</div>
            <div className="font-body text-[10px] uppercase tracking-[0.25em] text-amber-300 px-2 py-1 border border-amber-400/40 rounded-full">Livello 3/3</div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight">
            L'inner circle. <span className="italic text-amber-300">Il cliente multi-commodity.</span>
          </h3>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            Gold è riservato ai clienti con due o più forniture attive e almeno un anno di relazione. È un tier piccolo ma strategico:
            il 15% della popolazione che concentra il 30% del valore e attiva l'effetto brand ambassador con il territorio.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Regola</div>
              <p className="font-body text-sm text-slate-300">2+ commodity attive · anzianità &gt;12 mesi</p>
            </div>
            <div>
              <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Quota target</div>
              <p className="font-body text-sm text-slate-300">15% della popolazione iscritti</p>
            </div>
          </div>

          <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3">Cosa aggiunge al livello Silver</div>
          <ul className="space-y-2 mb-8">
            {['Hockey Bolzano: 2 biglietti + meet&greet', 'Lube Volley: 1 match selezionato', 'FC Südtirol: match-day esperienza completa', 'Easycharge −20% + wallbox agevolato', 'Energy check gratuito + inviti eventi Alperia'].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-950/20">
            <div className="font-body text-[10px] uppercase tracking-wider text-amber-300 font-semibold mb-2">Obiettivo di business</div>
            <div className="font-body text-sm text-slate-200">Guidare il cross-sell gas e i prodotti energy-related (Easycharge, wallbox, FV). Gold è il tier dove il valore cross-sell del programma supera di ordini di grandezza la retention pura.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

    </>
  );
}
