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
            cost: 'Setup Digital Wallet',
            amount: '€70K',
            period: 'one-shot · Anno 1',
            buy: 'Loyalty engine J-Next a 3 tier + integrazione SSO con app/Area Clienti Alperia + go-live',
            value: 'Asset abilitante per tutto il programma',
            bench: 'Budget In: servizi professionali + costi di struttura (setup)',
          },
          {
            cost: 'Canone piattaforma',
            amount: '€102K',
            period: 'ricorrente · Anni 1-3',
            buy: 'SaaS J-Next, moduli Wallet + Catalogo + Contest, customer care 2° livello, dashboard PowerBI, manutenzione',
            value: 'Operatività continua del programma',
            bench: 'Budget In Digital Wallet €110K/anno · modellato a €102K nel BC',
          },
          {
            cost: 'Contest Instant Win',
            amount: '€45K',
            period: 'Anno 1 · poi €41K/anno',
            buy: 'Primo contest a set-up + contest ricorrenti. Raccomandazione: 4 attivazioni/anno (cadenza trimestrale)',
            value: 'Picchi di engagement e azioni di valore',
            bench: 'Budget In: 1° contest €30K + €40K per contest aggiuntivo (quotati a parte)',
          },
          {
            cost: 'Budget reward',
            amount: '€126K→€158K',
            period: 'Anni 1-3',
            buy: '€2/iscritto/anno × iscritti cumulati (modello Business Case)',
            value: 'Leva di redemption e percezione di valore',
            bench: 'Cresce con gli iscritti cumulati: 63K → 75K → 79K',
          },
          {
            cost: 'Team Alperia + agency',
            amount: '€45K',
            period: 'Anno 1 · poi €30K/anno',
            buy: 'Presidio operativo interno + agency a supporto del programma',
            value: 'Capability interna trasversale, riusabile post-programma',
            bench: 'Creatività SBAM (naming, logo, key visual): €20K opzionale, quotata a parte',
          },
          {
            cost: 'Saldo netto · orizzonte BC',
            amount: '+€804K',
            period: 'ricavi − costi · 5 anni',
            buy: 'Ricavi €1.845K − costi €1.042K (Business Case ufficiale Alperia)',
            value: 'Saldo annuo negativo in Anno 1, positivo da Anno 2',
            bench: 'Break-even cumulato Anno 2 · ROI ~77% sui costi',
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
              Il saldo annuo diventa positivo dal secondo anno, ma <span className="italic text-amber-300">solo se</span> Alperia valorizza il programma su più leve.
            </div>
            <p className="font-body text-sm text-slate-300 leading-relaxed mb-4">
              La sola retention pura sui clienti salvati dal churn non basta a giustificare l'investimento.
              Il modello tiene economicamente perché aggrega valore di retention, cross-sell sui prodotti energy-related (Easycharge, fotovoltaico, wallbox),
              CAC risparmiato sulla riacquisizione e — nel tempo — il valore della base consensata che alimenta marketing e comunicazione.
            </p>
            <p className="font-body text-sm text-slate-300 leading-relaxed">
              Il KPI da presidiare per validare la tenuta del modello è <span className="text-teal-300 font-semibold">il tasso di iscrizione EOP: il Business Case assume il 30% dell'addressable (79K clienti)</span>.
              Sotto soglia l'intero business case va rivisto. Per questo proponiamo un Pilot di 3 mesi in fase 2 prima del rollout completo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

    </>
  );
}
