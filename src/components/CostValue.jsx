import React from 'react';
import { Target } from '../icons/index.jsx';

export default function CostValue() {
  return (
    <>
  {/* COST vs VALUE — Architettura economica */}
  <section id="economics" data-section="economics" className="border-b border-slate-800 bg-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4">Architettura economica</div>
      <h2 className="font-display text-5xl font-light mb-3">Ogni voce di costo, <span className="italic text-amber-300">argomentata.</span></h2>
      <p className="font-body text-base text-slate-400 mb-12 max-w-3xl leading-relaxed">
        Le componenti economiche della proposta Jakala mappate sul valore di business che generano per Alperia.
        La nostra raccomandazione è di leggerle come investimento integrato, non come voci di spesa indipendenti.
      </p>

      {/* Costs grid — 2 columns compact cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8 reveal">
        {[
          {
            cost: 'Setup piattaforma',
            amount: '€70K',
            period: 'one-shot · Anno 1',
            buy: 'Loyalty engine + integrazione SSO con app Alperia + go-live',
            value: 'Asset abilitante per tutto il programma',
            bench: 'Ammortizzato su 3 anni: €23K/anno equivalenti',
          },
          {
            cost: 'Canone piattaforma',
            amount: '€110K',
            period: 'ricorrente · Anni 1-3',
            buy: 'SaaS engine, moduli Club + Contest + Catalogo, reportistica KPI base, manutenzione',
            value: 'Operatività continua del programma',
            bench: 'In linea con benchmark: Antavo €120-180K, Talon.One €150K+',
          },
          {
            cost: 'Concorsi instant win',
            amount: '€45K',
            period: 'Anno 1 (15K + 3×10K)',
            buy: 'Quattro contest stagionali (primavera, estate, autunno, inverno)',
            value: '€80-120K/anno valore engagement',
            bench: 'Su Acea ed Enel i contest hanno generato +30-40% di MAU',
          },
          {
            cost: 'Catalogo reward',
            amount: '€157K',
            period: 'a regime · Anno 2',
            buy: '€18/membro/anno × 25K iscritti × 35% redemption rate',
            value: '€60K retention + €148K CAC saved + €270K asset dato (3Y)',
            bench: 'Mix 30% experiential / 30% bolletta / 25% partner / 15% green',
          },
          {
            cost: 'Team Alperia + agency',
            amount: '€120K',
            period: 'a regime · Anno 2',
            buy: 'Loyalty Manager interno + agency creative + customer care 1° livello',
            value: 'Capability interna trasversale, riusabile post-programma',
            bench: 'Non è costo Jakala — investimento Alperia in capability',
          },
          {
            cost: 'Investimento totale 3Y',
            amount: '€1.272K',
            period: 'cumulato',
            buy: 'Setup + canone + contest + reward + team',
            value: 'Genera €1.491K di benefici · Net cashflow +€219K',
            bench: 'Break-even al secondo anno · ROI 17% su 3 anni',
            highlight: true,
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-6 ${item.highlight ? 'border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-slate-900/40' : 'border-slate-800 bg-slate-900/40'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-body text-xs uppercase tracking-wider text-slate-500 mb-1">{item.period}</div>
                <div className="font-body text-base font-semibold text-slate-100">{item.cost}</div>
              </div>
              <div className={`font-display text-4xl font-light ${item.highlight ? 'text-amber-300' : item.cost === 'Team Alperia + agency' ? 'text-slate-300' : 'text-rose-300'}`}>
                {item.amount}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold w-20 flex-shrink-0 pt-0.5">Cosa è</div>
                <div className="font-body text-sm text-slate-300 leading-relaxed flex-1">{item.buy}</div>
              </div>
              <div className="flex gap-3">
                <div className="font-body text-[10px] uppercase tracking-wider text-emerald-400 font-semibold w-20 flex-shrink-0 pt-0.5">Valore</div>
                <div className="font-body text-sm text-emerald-200 leading-relaxed flex-1">{item.value}</div>
              </div>
              <div className="flex gap-3 pt-1 border-t border-slate-800">
                <div className="font-body text-[10px] uppercase tracking-wider text-slate-600 font-semibold w-20 flex-shrink-0 pt-0.5">Note</div>
                <div className="font-body text-xs text-slate-500 leading-relaxed flex-1 italic">{item.bench}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Punto di equilibrio — Jakala recommendation */}
      <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950/30 to-slate-900/50 p-8">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-teal-700/40 border border-teal-400/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-teal-300" />
            </div>
          </div>
          <div className="md:col-span-11">
            <div className="font-body text-[10px] uppercase tracking-[0.25em] text-teal-300 font-semibold mb-2">La raccomandazione di Jakala</div>
            <div className="font-display text-2xl text-slate-100 font-light mb-4 leading-tight">
              Il programma si ripaga al secondo anno, ma <span className="italic text-amber-300">solo se</span> Alperia accetta di valorizzarlo su quattro leve.
            </div>
            <p className="font-body text-sm text-slate-300 leading-relaxed mb-4">
              La sola retention pura sui clienti salvati dal churn (€60K cumulati su 3 anni) non basta a giustificare l'investimento.
              La proposta tiene economicamente perché aggrega valore retention, cross-sell sui prodotti energy-related (Easycharge, fotovoltaico, wallbox),
              CAC risparmiato sulla riacquisizione e crescita dell'asset dato/consenso del CRM.
            </p>
            <p className="font-body text-sm text-slate-300 leading-relaxed">
              Il KPI da presidiare per validare la tenuta del modello è <span className="text-teal-300 font-semibold">il tasso di adesione: ≥35% dell'addressable entro 6 mesi dal lancio</span>.
              Sotto il 25% l'intero business case va rivisto. Per questo motivo proponiamo un Pilot di 3 mesi in fase 2 prima del rollout completo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

    </>
  );
}
