import React from 'react';

/**
 * KpiSlider — slider riusabile per i KPI del business case.
 * Aggiorna il valore tramite onChange, mostra label + hint + valore formattato.
 */
export default function KpiSlider({ kpiKey, value, config, onChange }) {
  const locked = config.locked;

  return (
    <div className={`p-4 rounded-xl bg-slate-900/50 border ${locked ? 'border-slate-800/70' : 'border-slate-800'}`}>
      <div className="flex justify-between items-baseline mb-1">
        <label htmlFor={`kpi-${kpiKey}`} className="font-body text-sm font-semibold text-slate-200 flex items-center gap-2">
          {config.label}
          {locked && (
            <span className="font-body text-[9px] uppercase tracking-wider text-slate-400 border border-slate-700 rounded-full px-2 py-0.5 normal-case">
              Valore fisso
            </span>
          )}
        </label>
        <span className="font-display text-xl font-semibold text-amber-300 tabular-nums">
          {config.format(value)}
        </span>
      </div>
      <div className="font-body text-xs text-slate-500 mb-3 leading-tight">{config.hint}</div>
      <input
        id={`kpi-${kpiKey}`}
        type="range"
        className="kpi-slider"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        disabled={locked}
        aria-disabled={locked}
        onChange={locked ? undefined : (e) => onChange(kpiKey, parseFloat(e.target.value))}
      />
      <div className="flex justify-between mt-1 font-body text-[10px] text-slate-600 tabular-nums">
        <span>{config.format(config.min)}</span>
        <span>{config.format(config.max)}</span>
      </div>
    </div>
  );
}
