import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Sliders, RotateCcw, TrendingUp, Target, AlertTriangle, CheckCircle, Activity } from '../icons/index.jsx';
import KpiSlider from './KpiSlider.jsx';
import { KPI_CONFIG, SCENARIOS } from '../data/assumptions.js';
import { formatEUR, formatEURK, formatINT } from '../utils/formulas.js';

/**
 * BusinessCaseSim — la sezione simulatore interattivo.
 *
 * Layout a due colonne:
 *   - Sinistra: scenario pills + 8 slider raggruppati per categoria
 *   - Destra: 4 KPI output + bar chart cashflow + breakdown costi/benefici
 *
 * Props:
 *   kpis, updateKpi, applyScenario, resetToDefault, result, activeScenario
 *   (tutti dal hook useBusinessCase)
 */
export default function BusinessCaseSim({
  kpis,
  updateKpi,
  applyScenario,
  resetToDefault,
  result,
  activeScenario,
}) {
  // Group KPIs by category
  const kpiKeys = Object.keys(KPI_CONFIG);
  const kpiByCategory = {
    adozione: kpiKeys.filter(k => KPI_CONFIG[k].category === 'adozione'),
    retention: kpiKeys.filter(k => KPI_CONFIG[k].category === 'retention'),
    economics: kpiKeys.filter(k => KPI_CONFIG[k].category === 'economics'),
    costi: kpiKeys.filter(k => KPI_CONFIG[k].category === 'costi'),
  };

  const categoryMeta = {
    adozione: { title: 'Adozione', color: 'teal', hint: 'Quanti clienti entrano nel programma e lo usano attivamente' },
    retention: { title: 'Retention & Cross-sell', color: 'amber', hint: 'Leve che generano valore sui clienti attivi' },
    economics: { title: 'Economics', color: 'emerald', hint: 'Valore unitario per cliente e parametri finanziari' },
    costi: { title: 'Costi', color: 'rose', hint: 'Costi operativi ricorrenti del programma' },
  };

  // Bar chart data — one bar per year with benefits/costs/net (orizzonte 5 anni)
  const chartData = result.years.map((y) => ({
    name: `Anno ${y.year}`,
    Benefici: Math.round(y.benefits.total),
    Costi: -Math.round(y.costs.total), // negative for visual
    Netto: Math.round(y.net),
  }));

  const verdict = getVerdict(result);

  return (
    <section id="simulator" data-section="simulator" className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-8 py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 reveal">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.25em] text-amber-300 mb-4 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5" />
              Simulator · Business case interattivo
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-3">
              Modifica le leve, <span className="italic text-amber-300">vedi il business case.</span>
            </h2>
            <p className="font-body text-base text-slate-400 max-w-2xl">
              Tutti i numeri in questa pagina si aggiornano in tempo reale. Usa i preset per confrontare scenari,
              o muovi i singoli slider per esplorare soglie critiche.
            </p>
          </div>
        </div>

        {/* Scenario pills */}
        <div className="flex flex-wrap items-center gap-3 mb-10 reveal">
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-slate-500 mr-2">Preset:</span>
          {Object.entries(SCENARIOS).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => applyScenario(key)}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all ${
                activeScenario === key
                  ? scenario.accent === 'amber' ? 'bg-amber-300 text-slate-900'
                  : scenario.accent === 'rose' ? 'bg-rose-400 text-slate-900'
                  : 'bg-teal-400 text-slate-900'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {scenario.label}
            </button>
          ))}
          {activeScenario === 'custom' && (
            <span className="px-5 py-2 rounded-full font-body text-sm font-semibold bg-amber-500/20 text-amber-200 border border-amber-400/30">
              Custom
            </span>
          )}
          <button
            onClick={resetToDefault}
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-slate-100 font-body text-xs font-medium transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT: Sliders */}
          <div className="lg:col-span-5 space-y-6">
            {Object.entries(kpiByCategory).map(([category, keys]) => (
              <div key={category} className="reveal">
                <div className="flex items-baseline gap-3 mb-3">
                  <div className={`font-body text-xs uppercase tracking-[0.2em] font-semibold text-${categoryMeta[category].color}-300`}>
                    {categoryMeta[category].title}
                  </div>
                  <div className="font-body text-xs text-slate-500 italic">{categoryMeta[category].hint}</div>
                </div>
                <div className="space-y-3">
                  {keys.map(k => (
                    <KpiSlider
                      key={k}
                      kpiKey={k}
                      value={kpis[k]}
                      config={KPI_CONFIG[k]}
                      onChange={updateKpi}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Output */}
          <div className="lg:col-span-7 space-y-6">
            {/* Headline KPIs */}
            <div className="grid grid-cols-2 gap-4 reveal">
              <KpiCard
                label="Saldo netto"
                value={formatEURK(result.saldoNetto)}
                tone={result.saldoNetto >= 0 ? 'good' : 'bad'}
                sub={result.saldoNetto >= 0 ? 'Ricavi − costi sull\'orizzonte' : 'Sotto la soglia di sostenibilità'}
                icon={TrendingUp}
              />
              <KpiCard
                label="ROI orizzonte"
                value={`${Math.round(result.roi * 100)}%`}
                tone={result.roi > 0.1 ? 'good' : result.roi > 0 ? 'neutral' : 'bad'}
                sub={`su ${formatEURK(result.totalCosts)} investiti`}
                icon={Target}
              />
              <KpiCard
                label="Break-even cumulato"
                value={result.breakEven ? `Anno ${result.breakEven}` : '>5 anni'}
                tone={result.breakEven && result.breakEven <= 3 ? 'good' : result.breakEven && result.breakEven <= 4 ? 'neutral' : 'bad'}
                sub={result.primoAnnoPositivo ? `Saldo annuo positivo da Anno ${result.primoAnnoPositivo}` : 'Saldo annuo sempre negativo'}
                icon={Activity}
              />
              <KpiCard
                label="Iscritti EOP"
                value={formatINT(result.iscrittiEOP)}
                tone="neutral"
                sub={`${formatINT(result.savedRegime)} clienti salvati/anno a regime`}
                icon={CheckCircle}
              />
            </div>

            {/* Cashflow chart */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 reveal">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 mb-1">Cashflow per anno</div>
                  <div className="font-display text-xl text-slate-100">Benefici vs Costi · Netto</div>
                </div>
                <div className="font-body text-xs text-slate-400">
                  Saldo netto totale: <span className={`font-semibold ${result.totalNet >= 0 ? 'text-amber-300' : 'text-rose-300'}`}>{formatEURK(result.totalNet)}</span>
                </div>
              </div>

              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" style={{ fontSize: 11 }} tickFormatter={(v) => `€${(v/1000).toFixed(0)}K`} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: '#f1f5f9', fontWeight: 600 }}
                      formatter={(v) => formatEUR(Math.abs(v))}
                    />
                    <ReferenceLine y={0} stroke="#475569" strokeWidth={1} />
                    <Bar dataKey="Benefici" fill="#1F77A0" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Costi" fill="#C0392B" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="Netto" radius={[4, 4, 4, 4]}>
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.Netto >= 0 ? '#DB3700' : '#64748b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Benefits breakdown */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 reveal">
              <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 mb-4">Composizione benefici · orizzonte 5 anni</div>
              <BenefitBreakdown years={result.years} />
            </div>

            {/* Verdict */}
            <div className={`p-6 rounded-2xl border reveal ${verdict.borderClass} ${verdict.bgClass}`}>
              <div className="flex items-start gap-4">
                <verdict.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${verdict.iconClass}`} />
                <div>
                  <div className={`font-display text-xl font-semibold mb-1 ${verdict.textClass}`}>{verdict.title}</div>
                  <p className="font-body text-sm text-slate-300 leading-relaxed">{verdict.body}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Subcomponents ----

function KpiCard({ label, value, tone, sub, icon: Icon }) {
  const toneClasses = {
    good: { border: 'border-amber-500/30', bg: 'bg-amber-950/10', text: 'text-amber-300' },
    neutral: { border: 'border-teal-500/30', bg: 'bg-teal-950/10', text: 'text-teal-300' },
    bad: { border: 'border-rose-500/30', bg: 'bg-rose-950/10', text: 'text-rose-300' },
  };
  const t = toneClasses[tone] || toneClasses.neutral;
  return (
    <div className={`p-5 rounded-2xl border ${t.border} ${t.bg}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="font-body text-[10px] uppercase tracking-wider text-slate-400 font-medium">{label}</div>
        <Icon className={`w-4 h-4 ${t.text}`} />
      </div>
      <div className={`font-display text-3xl font-light mb-1 ${t.text} tabular-nums`}>{value}</div>
      <div className="font-body text-xs text-slate-500 leading-tight">{sub}</div>
    </div>
  );
}

function BenefitBreakdown({ years }) {
  const totals = years.reduce(
    (acc, y) => ({
      retention: acc.retention + y.benefits.retention,
      crossSell: acc.crossSell + y.benefits.crossSell,
      cacSaved: acc.cacSaved + y.benefits.cacSaved,
    }),
    { retention: 0, crossSell: 0, cacSaved: 0 }
  );
  const grand = totals.retention + totals.crossSell + totals.cacSaved;

  const items = [
    { label: 'Retention', value: totals.retention, color: 'bg-teal-500', subtitle: 'Margine clienti trattenuti dal churn' },
    { label: 'Cross-sell', value: totals.crossSell, color: 'bg-amber-400', subtitle: 'Uplift take-rate servizi energy' },
    { label: 'CAC evitato', value: totals.cacSaved, color: 'bg-emerald-500', subtitle: 'Riacquisizione risparmiata' },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const pct = grand > 0 ? (item.value / grand) * 100 : 0;
        return (
          <div key={i}>
            <div className="flex justify-between items-baseline mb-1">
              <div>
                <span className="font-body text-sm font-medium text-slate-200">{item.label}</span>
                <span className="font-body text-xs text-slate-500 ml-2 italic">{item.subtitle}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-body text-xs text-slate-500 tabular-nums">{pct.toFixed(0)}%</span>
                <span className="font-display text-base text-slate-100 font-semibold tabular-nums">{formatEURK(item.value)}</span>
              </div>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${item.color} transition-all duration-500`} style={{ width: `${pct}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getVerdict(result) {
  if (result.saldoNetto > 200000 && result.breakEven && result.breakEven <= 3) {
    return {
      title: 'Scenario fortemente sostenibile',
      body: 'Saldo netto ampiamente positivo e break-even entro il triennio. La configurazione attuale giustifica l\'investimento con margine di sicurezza. Candidata per presentazione a steering committee.',
      icon: CheckCircle,
      iconClass: 'text-amber-300',
      borderClass: 'border-amber-500/30',
      bgClass: 'bg-amber-950/10',
      textClass: 'text-amber-200',
    };
  }
  if (result.saldoNetto >= 0) {
    return {
      title: 'Scenario sostenibile, margine stretto',
      body: 'È lo scenario del Business Case ufficiale: saldo netto positivo sull\'orizzonte, con anno 1 in investimento e ritorno annuo positivo dal secondo anno. Richiede esecuzione disciplinata — monitorare adesione e redemption rate nei primi 6 mesi.',
      icon: Target,
      iconClass: 'text-teal-300',
      borderClass: 'border-teal-500/30',
      bgClass: 'bg-teal-950/10',
      textClass: 'text-teal-200',
    };
  }
  return {
    title: 'Scenario sotto soglia — revisione necessaria',
    body: 'Con queste leve il programma non recupera l\'investimento sull\'orizzonte. Verificare se può essere giustificato come investimento strategico (brand, valore dei consensi) oppure alzare iscritti EOP / delta churn / valore per saved.',
    icon: AlertTriangle,
    iconClass: 'text-rose-300',
    borderClass: 'border-rose-500/30',
    bgClass: 'bg-rose-950/10',
    textClass: 'text-rose-200',
  };
}
