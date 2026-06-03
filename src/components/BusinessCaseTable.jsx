import React from 'react';
import { Target } from '../icons/index.jsx';
import { DEFAULT_KPIS } from '../data/assumptions.js';
import { runBusinessCase, formatEURK } from '../utils/formulas.js';

/**
 * BusinessCaseTable — P&L del Business Case ufficiale Alperia.
 * Calcolato dal modello (DEFAULT_KPIS = scenario Base = BC ufficiale): i numeri
 * coincidono per costruzione con l'Excel e con i test, e non possono divergere.
 * Benefici su orizzonte 5 anni (code coorti), costi sui primi 3 anni.
 */
export default function BusinessCaseTable() {
  const r = runBusinessCase(DEFAULT_KPIS);
  const Y = r.years; // 5 anni

  const benefitRows = [
    { label: 'Margine retention (€30 + €110 × salvati)', get: (y) => y.benefits.retention },
    { label: 'Cross-sell (Easycharge, FV, wallbox)', get: (y) => y.benefits.crossSell },
    { label: 'CAC evitato (€110 × salvati)', get: (y) => y.benefits.cacSaved },
  ];
  const costRows = [
    { label: 'Setup Jakala (one-shot)', get: (y) => y.costs.setup },
    { label: 'Canone piattaforma Jakala', get: (y) => y.costs.platform },
    { label: 'Contest instant win', get: (y) => y.costs.contest },
    { label: 'Reward catalogo (€10/membro × redemption 15%)', get: (y) => y.costs.reward },
    { label: 'Team interno + agency', get: (y) => y.costs.ops },
  ];

  const sum = (get) => Y.reduce((acc, y) => acc + get(y), 0);
  const cell = (v, tone) => (
    <td className={`text-right py-3 px-4 ${v === 0 ? 'text-slate-600' : tone}`}>
      {v === 0 ? '—' : (tone.includes('rose') ? `-${formatEURK(v)}` : formatEURK(v))}
    </td>
  );

  return (
    <>
  {/* BUSINESS CASE */}
  <section id="business-case" data-section="business-case" className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="font-body text-xs uppercase tracking-[0.25em] text-amber-300 mb-4">Business case · ufficiale</div>
      <h2 className="font-display text-5xl font-light mb-3">I numeri che lo rendono <span className="italic text-amber-300">sostenibile.</span></h2>
      <p className="font-body text-base text-slate-400 mb-2 max-w-3xl leading-relaxed">
        Business Case ufficiale Alperia, applicato al portafoglio addressable (250.267 clienti con consenso e profilazione).
      </p>
      <p className="font-body text-sm text-slate-500 mb-12 max-w-3xl">
        Ipotesi: iscritti EOP 30% (75.080), delta churn 8% / 9% / 10% (Y1/Y2/Y3), uplift cross-sell 5% costante,
        €30 di margine annuo per cliente trattenuto. Benefici modellati su 5 anni (code coorti), costi sui primi 3.
      </p>

      {/* P&L */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40 mb-8">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="font-body text-xs uppercase tracking-wider text-slate-400">Profit & Loss · orizzonte business case</div>
            <div className="font-display text-lg text-slate-200 mt-0.5">Iscritti EOP: {Math.round(r.iscrittiEOP).toLocaleString('it-IT')}</div>
          </div>
          <Target className="w-5 h-5 text-amber-300" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-6 font-body text-xs uppercase tracking-wider text-slate-500 font-medium">Voce</th>
                {Y.map((y) => (
                  <th key={y.year} className="text-right py-3 px-4 font-body text-xs uppercase tracking-wider text-slate-500 font-medium">Anno {y.year}</th>
                ))}
                <th className="text-right py-3 px-4 font-body text-xs uppercase tracking-wider text-slate-500 font-medium">Totale</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {benefitRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-800/50">
                  <td className="py-3 px-6 text-slate-200">{row.label}</td>
                  {Y.map((y) => cell(row.get(y), 'text-emerald-300'))}
                  <td className="text-right py-3 px-4 text-emerald-300 font-semibold">{formatEURK(sum(row.get))}</td>
                </tr>
              ))}
              <tr className="border-b border-slate-700 bg-emerald-950/20">
                <td className="py-3 px-6 font-semibold text-emerald-200">TOTALE RICAVI</td>
                {Y.map((y) => <td key={y.year} className="text-right py-3 px-4 font-bold text-emerald-300">{formatEURK(y.benefits.total)}</td>)}
                <td className="text-right py-3 px-4 font-bold text-emerald-300">{formatEURK(r.totalBenefits)}</td>
              </tr>

              {costRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-800/50">
                  <td className="py-3 px-6 text-slate-200">{row.label}</td>
                  {Y.map((y) => cell(row.get(y), 'text-rose-300'))}
                  <td className="text-right py-3 px-4 text-rose-300 font-semibold">{sum(row.get) === 0 ? '—' : `-${formatEURK(sum(row.get))}`}</td>
                </tr>
              ))}
              <tr className="border-b border-slate-700 bg-rose-950/20">
                <td className="py-3 px-6 font-semibold text-rose-200">TOTALE COSTI</td>
                {Y.map((y) => <td key={y.year} className={`text-right py-3 px-4 font-bold ${y.costs.total === 0 ? 'text-slate-600' : 'text-rose-300'}`}>{y.costs.total === 0 ? '—' : `-${formatEURK(y.costs.total)}`}</td>)}
                <td className="text-right py-3 px-4 font-bold text-rose-300">-{formatEURK(r.totalCosts)}</td>
              </tr>

              <tr className="bg-amber-950/20 border-t-2 border-amber-500/30">
                <td className="py-4 px-6 font-display text-base font-semibold text-amber-200">SALDO NETTO</td>
                {Y.map((y) => (
                  <td key={y.year} className={`text-right py-4 px-4 font-display text-base font-bold ${y.net >= 0 ? 'text-amber-300' : 'text-rose-300'}`}>{formatEURK(y.net)}</td>
                ))}
                <td className="text-right py-4 px-4 font-display text-lg font-bold text-amber-300">{formatEURK(r.totalNet)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { stat: formatEURK(r.totalNet), label: 'Saldo netto · orizzonte', sub: 'Ricavi − costi (non scontato)', tone: 'amber' },
          { stat: `${Math.round(r.roi * 100)}%`, label: 'ROI sui costi', sub: `${formatEURK(r.totalNet)} su ${formatEURK(r.totalCosts)}`, tone: 'amber' },
          { stat: r.breakEven ? `Anno ${r.breakEven}` : '>5 anni', label: 'Break-even cumulato', sub: 'Saldo cumulato ≥ 0', tone: 'teal' },
          { stat: r.primoAnnoPositivo ? `Anno ${r.primoAnnoPositivo}` : '—', label: 'Saldo annuo positivo', sub: 'Primo anno con netto ≥ 0', tone: 'teal' },
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
