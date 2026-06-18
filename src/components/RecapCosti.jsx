import React from 'react';
import { Target } from '../icons/index.jsx';
import { formatEUR } from '../utils/formulas.js';

/**
 * RecapCosti — vista sintetica delle voci di costo della proposta (Anno 1).
 * Fonte: "Alperia_2026_Proposta Loyalty_Recap costi.xlsx" (foglio "Sintesi costi").
 * Tutti gli importi sono IVA esclusa. È la vista che accompagna la proposta al
 * cliente: le voci sono quotabili separatamente. Si differenzia dal P&L del
 * Business Case (modello a coorti) che resta la base economica del simulatore.
 */

const VOCI = [
  {
    gruppo: 'Digital Wallet',
    items: [
      {
        label: 'Setup Digital Wallet (one-shot)',
        amount: 70000,
        desc: 'Sviluppo e configurazione piattaforma J-Next, integrazione SSO + API clusterizzazione, motore loyalty, catalogo premi, workflow redemption, collaudo end-to-end.',
      },
      {
        label: 'Maintenance piattaforma (12 mesi)',
        amount: 102000,
        desc: 'Monitoring moduli attivati, refresh contenuti always-on, coordinamento SAL, report KPI mensili, gestione ticket, bug fixing e data management.',
      },
      {
        label: 'Creatività Digital Wallet',
        amount: 28899,
        desc: 'Direzione creativa, naming programma e tier, logo, key visual e declinazioni, icone tier. Opzionale (SBAM).',
        opzionale: true,
      },
    ],
  },
  {
    gruppo: 'Instant Win',
    items: [
      {
        label: 'Set-up & supporto on-going Instant Win',
        amount: 45000,
        desc: 'Infrastruttura concorsi (instant win / estrazione finale), logiche di partecipazione personalizzate, supporto on-going e gestione chiusura. Raccomandazione: 4 contest/anno.',
      },
      {
        label: 'Scouting premi & declinazioni creative',
        amount: 36111,
        desc: 'Scouting e messa in palio fino a 5 referenze per contest (premi digitali o fisici), declinazioni creative, UX-UI, DEM e copy fine-tuning. Costo premi escluso.',
      },
    ],
  },
  {
    gruppo: 'Reward',
    items: [
      {
        label: 'Reward catalogo (on top)',
        amount: 126000,
        desc: 'Budget premi complessivo, allineato al Business Case. Dato aggregato Digital Wallet + Contest Instant Win, non ripartito per singola iniziativa. Voce a consumo, quotata a parte e allineata all\'effettivo riscatto premi.',
      },
    ],
  },
];

export default function RecapCosti() {
  const totale = VOCI.reduce((acc, g) => acc + g.items.reduce((a, i) => a + i.amount, 0), 0);

  return (
    <section id="recap-costi" data-section="economics" className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4">Recap costi · proposta</div>
        <h2 className="font-display text-5xl font-light mb-3">Le voci di costo, <span className="italic text-amber-300">una per una.</span></h2>
        <p className="font-body text-base text-slate-400 mb-2 max-w-3xl leading-relaxed">
          Vista sintetica delle componenti economiche della proposta (Anno 1, IVA esclusa). Le voci sono
          quotate separatamente e condivise con il cliente insieme alla proposta.
        </p>
        <p className="font-body text-sm text-slate-500 mb-12 max-w-3xl">
          Questa è la vista d'offerta. Il P&L del Business Case (sezione precedente) modella gli stessi
          economics su orizzonte pluriennale con il modello a coorti: alcune voci — reward, contest — sono
          rappresentate con logiche di sintesi differenti.
        </p>

        <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="font-body text-xs uppercase tracking-wider text-slate-400">Recap costi · Anno 1 · IVA esclusa</div>
            <Target className="w-5 h-5 text-teal-300" />
          </div>

          <div className="divide-y divide-slate-800/60">
            {VOCI.map((gruppo) => (
              <div key={gruppo.gruppo} className="px-6 py-5">
                <div className="font-body text-[10px] uppercase tracking-[0.2em] text-amber-300/80 font-semibold mb-3">{gruppo.gruppo}</div>
                <div className="space-y-4">
                  {gruppo.items.map((item, i) => (
                    <div key={i} className="grid md:grid-cols-12 gap-3 items-start">
                      <div className="md:col-span-8">
                        <div className="font-body text-sm font-semibold text-slate-100 flex items-center gap-2">
                          {item.label}
                          {item.opzionale && (
                            <span className="font-body text-[9px] uppercase tracking-wider text-teal-300 border border-teal-500/30 rounded-full px-2 py-0.5">opzionale</span>
                          )}
                        </div>
                        <div className="font-body text-xs text-slate-500 leading-relaxed mt-1">{item.desc}</div>
                      </div>
                      <div className="md:col-span-4 text-right">
                        <span className="font-display text-2xl font-light text-rose-300 tabular-nums">{formatEUR(item.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 bg-amber-950/20 border-t-2 border-amber-500/30 flex items-center justify-between">
            <div className="font-display text-base font-semibold text-amber-200">Totale costi · Anno 1</div>
            <div className="font-display text-3xl font-light text-amber-300 tabular-nums">{formatEUR(totale)}</div>
          </div>
        </div>

        <p className="font-body text-xs text-slate-500 mt-4 max-w-3xl italic">
          Piattaforma J-Next a 3 tier (base · silver · gold), ISO 27001, privacy by design e by default.
          Costo premi a catalogo e premi instant win esclusi dalle voci sopra.
        </p>
      </div>
    </section>
  );
}
