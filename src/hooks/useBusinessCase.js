import { useState, useMemo, useCallback } from 'react';
import { DEFAULT_KPIS, SCENARIOS } from '../data/assumptions.js';
import { runBusinessCase } from '../utils/formulas.js';

/**
 * useBusinessCase — gestisce lo stato dei KPI modificabili e calcola
 * automaticamente il modello di business case ogni volta che cambia un input.
 *
 * @returns {
 *   kpis: stato corrente,
 *   updateKpi: (key, value) => void,
 *   applyScenario: (scenarioKey) => void,
 *   resetToDefault: () => void,
 *   result: output di runBusinessCase (years, npv, roi, breakEven, ...),
 *   activeScenario: nome scenario attualmente applicato (o 'custom')
 * }
 */
export function useBusinessCase() {
  const [kpis, setKpis] = useState(DEFAULT_KPIS);
  const [activeScenario, setActiveScenario] = useState('base');

  const updateKpi = useCallback((key, value) => {
    setKpis(prev => ({ ...prev, [key]: value }));
    setActiveScenario('custom');
  }, []);

  const applyScenario = useCallback((scenarioKey) => {
    const scenario = SCENARIOS[scenarioKey];
    if (!scenario) return;
    setKpis({ ...DEFAULT_KPIS, ...scenario.overrides });
    setActiveScenario(scenarioKey);
  }, []);

  const resetToDefault = useCallback(() => {
    setKpis(DEFAULT_KPIS);
    setActiveScenario('base');
  }, []);

  const result = useMemo(() => runBusinessCase(kpis), [kpis]);

  return { kpis, updateKpi, applyScenario, resetToDefault, result, activeScenario };
}
