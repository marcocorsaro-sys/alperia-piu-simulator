import React from 'react';
import { Target } from '../icons/index.jsx';

export default function BusinessCaseTable() {
  return (
    <>
  {/* BUSINESS CASE */}
  <section id="business-case" data-section="business-case" className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="font-body text-xs uppercase tracking-[0.25em] text-amber-300 mb-4">Business case</div>
      <h2 className="font-display text-5xl font-light mb-3">I numeri che lo rendono <span className="italic text-amber-300">sostenibile.</span></h2>
      <p className="font-body text-base text-slate-400 mb-2 max-w-3xl leading-relaxed">
        Modellato sui tassi di churn cumulati per canale forniti da Oliver Wyman, applicati al portafoglio retail Alperia al 1 marzo 2026.
      </p>
      <p className="font-body text-sm text-slate-500 mb-12 max-w-3xl">
        Ipotesi gestionali: €30 di margine annuo per cliente trattenuto, riduzione churn del 5% relativo sui membri attivi, vita media residua 36 mesi. Perimetro Pilot: Diretta + Web (~25.000 iscritti attivi a regime).
      </p>

      {/* 3-year P&L */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40 mb-8">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="font-body text-xs uppercase tracking-wider text-slate-400">Profit & Loss · 3 anni</div>
            <div className="font-display text-lg text-slate-200 mt-0.5">Iscritti attivi a regime: ~25.000 (perimetro Diretta + Web)</div>
          </div>
          <Target className="w-5 h-5 text-amber-300" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-6 font-body text-xs uppercase tracking-wider text-slate-500 font-medium">Voce</th>
                <th className="text-right py-3 px-4 font-body text-xs uppercase tracking-wider text-slate-500 font-medium">Anno 1<br/><span className="text-[10px] text-slate-600 font-normal">setup + ramp</span></th>
                <th className="text-right py-3 px-4 font-body text-xs uppercase tracking-wider text-slate-500 font-medium">Anno 2<br/><span className="text-[10px] text-slate-600 font-normal">regime</span></th>
                <th className="text-right py-3 px-4 font-body text-xs uppercase tracking-wider text-slate-500 font-medium">Anno 3<br/><span className="text-[10px] text-slate-600 font-normal">scale</span></th>
                <th className="text-right py-3 px-4 font-body text-xs uppercase tracking-wider text-slate-500 font-medium">Cumulato 3Y</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">Margine retention (€30 × salvati)</td>
                <td className="text-right py-3 px-4 text-emerald-300">€7K</td>
                <td className="text-right py-3 px-4 text-emerald-300">€20K</td>
                <td className="text-right py-3 px-4 text-emerald-300">€33K</td>
                <td className="text-right py-3 px-4 text-emerald-300 font-semibold">€60K</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">Margine cross-sell (Easycharge, FV, wallbox)</td>
                <td className="text-right py-3 px-4 text-emerald-300">€225K</td>
                <td className="text-right py-3 px-4 text-emerald-300">€375K</td>
                <td className="text-right py-3 px-4 text-emerald-300">€413K</td>
                <td className="text-right py-3 px-4 text-emerald-300 font-semibold">€1.013K</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">CAC risparmiato (€110 × salvati)</td>
                <td className="text-right py-3 px-4 text-emerald-300">€33K</td>
                <td className="text-right py-3 px-4 text-emerald-300">€55K</td>
                <td className="text-right py-3 px-4 text-emerald-300">€60K</td>
                <td className="text-right py-3 px-4 text-emerald-300 font-semibold">€148K</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">Asset dato/consenso (lift +30pp profilazione)</td>
                <td className="text-right py-3 px-4 text-emerald-300">€60K</td>
                <td className="text-right py-3 px-4 text-emerald-300">€100K</td>
                <td className="text-right py-3 px-4 text-emerald-300">€110K</td>
                <td className="text-right py-3 px-4 text-emerald-300 font-semibold">€270K</td>
              </tr>
              <tr className="border-b border-slate-700 bg-emerald-950/20">
                <td className="py-3 px-6 font-semibold text-emerald-200">TOTALE BENEFICI</td>
                <td className="text-right py-3 px-4 font-bold text-emerald-300">€325K</td>
                <td className="text-right py-3 px-4 font-bold text-emerald-300">€550K</td>
                <td className="text-right py-3 px-4 font-bold text-emerald-300">€616K</td>
                <td className="text-right py-3 px-4 font-bold text-emerald-300">€1.491K</td>
              </tr>

              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">Setup Jakala (one-shot)</td>
                <td className="text-right py-3 px-4 text-rose-300">-€70K</td>
                <td className="text-right py-3 px-4 text-slate-600">—</td>
                <td className="text-right py-3 px-4 text-slate-600">—</td>
                <td className="text-right py-3 px-4 text-rose-300 font-semibold">-€70K</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">Canone piattaforma Jakala</td>
                <td className="text-right py-3 px-4 text-rose-300">-€110K</td>
                <td className="text-right py-3 px-4 text-rose-300">-€110K</td>
                <td className="text-right py-3 px-4 text-rose-300">-€110K</td>
                <td className="text-right py-3 px-4 text-rose-300 font-semibold">-€330K</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">Concorsi instant win (4/anno)</td>
                <td className="text-right py-3 px-4 text-rose-300">-€45K</td>
                <td className="text-right py-3 px-4 text-rose-300">-€40K</td>
                <td className="text-right py-3 px-4 text-rose-300">-€40K</td>
                <td className="text-right py-3 px-4 text-rose-300 font-semibold">-€125K</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">Reward catalogo (€18/membro × redemption 35%)</td>
                <td className="text-right py-3 px-4 text-rose-300">-€95K</td>
                <td className="text-right py-3 px-4 text-rose-300">-€158K</td>
                <td className="text-right py-3 px-4 text-rose-300">-€174K</td>
                <td className="text-right py-3 px-4 text-rose-300 font-semibold">-€427K</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-3 px-6 text-slate-200">Team interno + agency Alperia</td>
                <td className="text-right py-3 px-4 text-rose-300">-€80K</td>
                <td className="text-right py-3 px-4 text-rose-300">-€120K</td>
                <td className="text-right py-3 px-4 text-rose-300">-€120K</td>
                <td className="text-right py-3 px-4 text-rose-300 font-semibold">-€320K</td>
              </tr>
              <tr className="border-b border-slate-700 bg-rose-950/20">
                <td className="py-3 px-6 font-semibold text-rose-200">TOTALE COSTI</td>
                <td className="text-right py-3 px-4 font-bold text-rose-300">-€400K</td>
                <td className="text-right py-3 px-4 font-bold text-rose-300">-€428K</td>
                <td className="text-right py-3 px-4 font-bold text-rose-300">-€444K</td>
                <td className="text-right py-3 px-4 font-bold text-rose-300">-€1.272K</td>
              </tr>

              <tr className="bg-amber-950/20 border-t-2 border-amber-500/30">
                <td className="py-4 px-6 font-display text-base font-semibold text-amber-200">NET CASHFLOW</td>
                <td className="text-right py-4 px-4 font-display text-lg font-bold text-rose-300">-€75K</td>
                <td className="text-right py-4 px-4 font-display text-lg font-bold text-amber-300">+€122K</td>
                <td className="text-right py-4 px-4 font-display text-lg font-bold text-amber-300">+€172K</td>
                <td className="text-right py-4 px-4 font-display text-lg font-bold text-amber-300">+€219K</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { stat: '€219K', label: 'Net cashflow 3 anni', sub: 'Cumulato non scontato', tone: 'amber' },
          { stat: '17%', label: 'ROI 3 anni', sub: '€219K su €1.272K investiti', tone: 'amber' },
          { stat: 'Anno 2', label: 'Break-even', sub: 'Primo anno cashflow positivo', tone: 'teal' },
          { stat: '€17/iscritto', label: 'Costo netto per attivo /anno', sub: 'a regime, anno 2', tone: 'teal' },
        ].map((kpi, i) => (
          <div key={i} className={`p-5 rounded-xl border ${kpi.tone === 'amber' ? 'border-amber-500/30 bg-amber-950/10' : 'border-teal-500/30 bg-teal-950/10'}`}>
            <div className={`font-display text-3xl font-light mb-1 ${kpi.tone === 'amber' ? 'text-amber-300' : 'text-teal-300'}`}>{kpi.stat}</div>
            <div className="font-body text-xs font-semibold text-slate-200 mb-1">{kpi.label}</div>
            <div className="font-body text-xs text-slate-500">{kpi.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

    </>
  );
}
