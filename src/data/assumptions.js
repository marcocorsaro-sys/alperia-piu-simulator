// ============================================================================
// ALPERIA+ — BUSINESS CASE ASSUMPTIONS
// ----------------------------------------------------------------------------
// Questi valori sono il cuore del modello economico. Lo scenario "Base"
// coincide con il Business Case ufficiale Alperia
// (20260f_Alperia_Business_case - final.xlsx):
//   • Addressable 250.267 cresciuto del 5% in 3 anni → 262.780
//   • Iscritti EOP 30% → 78.834
//   • Delta churn 8% / 9% / 10% (Y1/Y2/Y3), churn iniziale 15%
//   • Uplift cross-sell 2,5% · ARPU per cliente €143 (110 × 1,3 forniture)
//   • CAC evitato €50 sui nuovi clienti · beneficio cross-sell €50/cliente
//   • Ricavi 5Y ~1.845K€ · Costi 3Y ~1.062K€ · Saldo netto ~784K€
//     (negativo Y1, positivo da Y2 · break-even cumulato Anno 2)
//
// ⚠️  Modifica SOLO questi valori di default. Il resto del modello (formule,
//     grafici, output) si aggiorna automaticamente.
// ============================================================================

/**
 * DEFAULT (scenario Base) — coincide con il Business Case ufficiale Alperia.
 */
export const DEFAULT_KPIS = {
  // --- BASE ADDRESSABLE ---
  portfolioAddressableBase: 250267, // clienti con consenso + profilazione (fonte Alperia)
  crescitaCB: 0.05,                 // crescita della base addressable in 3 anni (BC)

  // --- ENROLLMENT ---
  iscrittiEOPpct: 0.30,             // % addressable iscritta a fine periodo (EOP)
  adesioneRamp: [0.80, 0.95, 1.00], // ramp di adesione cumulata Y1/Y2/Y3 (fisso, fonte BC)

  // --- RETENTION (delta churn) ---
  churnInizialeY1: 0.15,            // churn iniziale Y1 (a catena negli anni successivi)
  deltaChurnY1: 0.08,               // delta churn Y1; Y2 = +1pp, Y3 = +2pp (pattern BC)

  // --- CROSS-SELLING ---
  upliftCrossSell: 0.025,           // uplift take-rate (Y1 sui nuovi iscritti, Y2/Y3 sui cumulati)

  // --- ECONOMICS PER CLIENTE (fonte: Sintesi Ricavi BC) ---
  arpuAnnuoPerFornitura: 110,       // €/anno margine per fornitura
  puntiFornituraMedi: 1.3,          // forniture medie per cliente → ARPU cliente = 143€
  cacMedio: 50,                     // € CAC evitato per nuovo cliente acquisito
  beneficioCrossSell: 50,           // €/anno margine per cliente con cross-sell

  // --- COSTI PROGRAMMA (fonte: Sintesi Ricavi BC + Recap costi) ---
  costoSetupJakala: 70000,         // € setup Digital Wallet one-shot (Y1)
  costoCanonePiattaforma: 102000,  // € canone/maintenance Jakala annuo
  costoContestY1: 45000,           // € contest instant win anno 1 (primo set-up incluso)
  costoContestRicorrente: 41000,   // € contest instant win dal Y2
  costoRewardPerMembro: 2,         // € costo reward per iscritto cumulato/anno (BC)
  costoOperativoY1: 65000,         // € costi interni (team Alperia + agency) anno 1
  costoOperativoRicorrente: 30000, // € team interno + agency dal Y2
};

/**
 * Scenari preconfigurati — caricabili con un click nel simulator.
 * "Base" è il Business Case ufficiale; gli altri stressano le leve principali.
 */
export const SCENARIOS = {
  conservativo: {
    label: 'Conservativo',
    description: 'Adozione lenta, benefit marginali. Stress test del modello.',
    accent: 'rose',
    overrides: {
      iscrittiEOPpct: 0.20,
      deltaChurnY1: 0.05,
      upliftCrossSell: 0.015,
      cacMedio: 30,
    },
  },
  base: {
    label: 'Base · BC ufficiale',
    description: 'Business Case ufficiale Alperia: iscritti EOP 30%, delta churn 8/9/10%.',
    accent: 'teal',
    overrides: {}, // usa i DEFAULT_KPIS
  },
  ottimistico: {
    label: 'Ottimistico',
    description: 'Esecuzione forte, tier premium ad alta adozione.',
    accent: 'amber',
    overrides: {
      iscrittiEOPpct: 0.40,
      deltaChurnY1: 0.12,
      upliftCrossSell: 0.05,
      beneficioCrossSell: 70,
    },
  },
};

/**
 * Configurazione degli slider — definisce range, step, formatter per ogni KPI.
 * Usato da KpiSlider per generare i controlli dinamicamente.
 */
export const KPI_CONFIG = {
  iscrittiEOPpct: {
    label: 'Iscritti EOP',
    hint: '% di base addressable iscritta a fine periodo',
    min: 0.15, max: 0.50, step: 0.01,
    format: (v) => `${Math.round(v * 100)}%`,
    category: 'adozione',
  },
  deltaChurnY1: {
    label: 'Delta churn Y1',
    hint: 'Riduzione churn anno 1 sui membri (Y2 +1pp, Y3 +2pp)',
    min: 0.03, max: 0.20, step: 0.005,
    format: (v) => `${(v * 100).toFixed(1).replace('.', ',')}%`,
    category: 'retention',
  },
  upliftCrossSell: {
    label: 'Uplift cross-sell',
    hint: 'Incremento take-rate servizi energy-related sugli iscritti',
    min: 0.005, max: 0.10, step: 0.005,
    format: (v) => `${(v * 100).toFixed(1).replace('.', ',')}%`,
    category: 'retention',
  },
  arpuAnnuoPerFornitura: {
    label: 'ARPU annuo €/fornitura',
    hint: 'Margine ricorrente per fornitura attiva (valore fisso da Business Case: 110€)',
    min: 60, max: 250, step: 10,
    format: (v) => `€${v.toLocaleString('it-IT')}`,
    category: 'economics',
    locked: true,
  },
  puntiFornituraMedi: {
    label: 'Forniture medie / cliente',
    hint: 'Punti di fornitura medi per cliente (ARPU cliente = ARPU × forniture)',
    min: 1.0, max: 2.0, step: 0.1,
    format: (v) => `${v.toFixed(1).replace('.', ',')}×`,
    category: 'economics',
  },
  beneficioCrossSell: {
    label: 'Beneficio cross-sell €/cliente',
    hint: 'Margine annuo per cliente con servizio cross-sell attivato',
    min: 20, max: 120, step: 5,
    format: (v) => `€${v}`,
    category: 'economics',
  },
  cacMedio: {
    label: 'CAC evitato €/cliente',
    hint: 'Valore di acquisizione per nuovo cliente entrato col programma',
    min: 20, max: 150, step: 5,
    format: (v) => `€${v}`,
    category: 'economics',
  },
  costoCanonePiattaforma: {
    label: 'Canone Jakala annuo',
    hint: 'SaaS engine, moduli Wallet/Contest/Catalogo, manutenzione',
    min: 60000, max: 160000, step: 2000,
    format: (v) => `€${(v / 1000).toFixed(0)}K`,
    category: 'costi',
  },
  costoRewardPerMembro: {
    label: 'Costo reward €/iscritto/anno',
    hint: 'Budget reward per iscritto cumulato (BC: €2)',
    min: 1, max: 12, step: 1,
    format: (v) => `€${v}`,
    category: 'costi',
  },
};
