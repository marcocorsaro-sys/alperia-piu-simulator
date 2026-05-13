// ============================================================================
// ALPERIA PIÙ — BUSINESS CASE ASSUMPTIONS
// ----------------------------------------------------------------------------
// Questi valori sono il cuore del modello economico. Derivano dall'analisi
// del churn Oliver Wyman, dal portafoglio Alperia al 01/03/2026 e dai
// benchmark loyalty energy europei.
//
// ⚠️  Modifica SOLO questi valori di default. Il resto del modello (formule,
//     grafici, output) si aggiorna automaticamente.
// ============================================================================

/**
 * DEFAULT (scenario Base) — valori di partenza dello simulator.
 * Corrispondono allo scenario "Base" del workbook Excel consegnato.
 */
export const DEFAULT_KPIS = {
  // --- ADESIONE & ATTIVAZIONE ---
  adesione: 0.40,              // % addressable che si iscrive
  attivazione: 0.55,           // % iscritti che completa almeno 1 azione
  riduzioneChurnRel: 0.05,     // riduzione relativa del churn sui membri attivi
  upliftCrossSell: 0.05,       // % di incremento take-rate servizi energy-related

  // --- ECONOMICS PER CLIENTE ---
  valorePerSaved: 30,          // €/anno di margine per cliente salvato dal churn
  arpuAnnuo: 1200,             // €/anno ricavo medio per cliente
  margineContributivo: 0.12,   // % margine retail energy IT
  vitaMediaMesi: 36,           // mesi di permanenza media cliente baseline
  cacMedio: 110,               // € CAC medio pesato per riacquisizione
  discountRate: 0.06,          // tasso di sconto annuo per NPV

  // --- COSTI PROGRAMMA ---
  costoSetupJakala: 70000,     // € setup piattaforma one-shot
  costoCanonePiattaforma: 110000, // € canone Jakala annuo
  costoContestAnnuo: 45000,    // € contest instant win annui (1×15K + 3×10K)
  costoRewardPerMembro: 18,    // € costo catalogo per iscritto attivo/anno
  redemptionRate: 0.35,        // % attivi che riscatta reward
  costoAttivazione: 3,         // € one-shot per iscritto (comunicazioni)
  costoOperativo: 120000,      // € team interno + agency annuo

  // --- BASE ADDRESSABLE ---
  portfolioAddressable: 250267, // clienti con consenso + profilazione
  churnBaselinePonderato: 0.1506, // churn 12m POR ponderato fonte OW
};

/**
 * Scenari preconfigurati — caricabili con un click nel simulator.
 */
export const SCENARIOS = {
  conservativo: {
    label: 'Conservativo',
    description: 'Adozione lenta, benefit marginali. Stress test del modello.',
    accent: 'rose',
    overrides: {
      adesione: 0.25,
      attivazione: 0.40,
      riduzioneChurnRel: 0.03,
      upliftCrossSell: 0.02,
      valorePerSaved: 25,
    },
  },
  base: {
    label: 'Base',
    description: 'Scenario realistico, coerente con benchmark energy EU.',
    accent: 'teal',
    overrides: {}, // usa i DEFAULT_KPIS
  },
  ottimistico: {
    label: 'Ottimistico',
    description: 'Esecuzione forte, tier premium ad alta adozione.',
    accent: 'amber',
    overrides: {
      adesione: 0.55,
      attivazione: 0.70,
      riduzioneChurnRel: 0.08,
      upliftCrossSell: 0.09,
      valorePerSaved: 40,
    },
  },
};

/**
 * Configurazione degli slider — definisce range, step, formatter per ogni KPI.
 * Usato da KpiSlider per generare i controlli dinamicamente.
 */
export const KPI_CONFIG = {
  adesione: {
    label: 'Tasso di adesione',
    hint: '% di base addressable che si iscrive al programma',
    min: 0.05, max: 0.75, step: 0.01,
    format: (v) => `${(v * 100).toFixed(0)}%`,
    category: 'adozione',
  },
  attivazione: {
    label: 'Tasso di attivazione',
    hint: '% di iscritti con almeno 1 azione valida',
    min: 0.20, max: 0.90, step: 0.01,
    format: (v) => `${(v * 100).toFixed(0)}%`,
    category: 'adozione',
  },
  riduzioneChurnRel: {
    label: 'Riduzione churn relativa',
    hint: 'Riduzione % del churn sui membri attivi (es. 5% = da 15% a 14,3%)',
    min: 0.02, max: 0.30, step: 0.005,
    format: (v) => `${(v * 100).toFixed(1)}%`,
    category: 'retention',
  },
  upliftCrossSell: {
    label: 'Uplift cross-sell',
    hint: 'Incremento take-rate Easycharge, FV, wallbox',
    min: 0.01, max: 0.15, step: 0.005,
    format: (v) => `${(v * 100).toFixed(1)}%`,
    category: 'retention',
  },
  valorePerSaved: {
    label: 'Valore €/cliente salvato/anno',
    hint: 'Margine 1 anno per cliente trattenuto (conferma con Finance)',
    min: 15, max: 150, step: 5,
    format: (v) => `€${v}`,
    category: 'economics',
  },
  arpuAnnuo: {
    label: 'ARPU annuo',
    hint: 'Ricavo medio per cliente (dual fuel)',
    min: 800, max: 2500, step: 50,
    format: (v) => `€${v.toLocaleString('it-IT')}`,
    category: 'economics',
  },
  costoRewardPerMembro: {
    label: 'Costo reward €/membro/anno',
    hint: 'Mix esperienziale + sconti + partner',
    min: 5, max: 50, step: 1,
    format: (v) => `€${v}`,
    category: 'costi',
  },
  costoCanonePiattaforma: {
    label: 'Canone Jakala annuo',
    hint: 'SaaS engine, moduli Club/Contest/Catalogo, manutenzione',
    min: 60000, max: 200000, step: 5000,
    format: (v) => `€${(v / 1000).toFixed(0)}K`,
    category: 'costi',
  },
};
