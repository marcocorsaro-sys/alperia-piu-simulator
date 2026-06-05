// ============================================================================
// ALPERIA+ — BUSINESS CASE ASSUMPTIONS
// ----------------------------------------------------------------------------
// Questi valori sono il cuore del modello economico. Lo scenario "Base"
// coincide con il Business Case ufficiale Alperia (202605_Alperia_Business_case.xlsx):
//   • Iscritti EOP 30% addressable → 75.080
//   • Delta churn 8% / 9% / 10% (Y1/Y2/Y3)
//   • Uplift cross-sell 5% costante
//   • Ricavi 3Y ~965K€ · Costi 3Y ~918K€ · Saldo netto ~47K€ (negativo Y1, positivo da Y2)
//
// ⚠️  Modifica SOLO questi valori di default. Il resto del modello (formule,
//     grafici, output) si aggiorna automaticamente.
// ============================================================================

/**
 * DEFAULT (scenario Base) — coincide con il Business Case ufficiale Alperia.
 */
export const DEFAULT_KPIS = {
  // --- BASE ADDRESSABLE ---
  portfolioAddressable: 250267, // clienti con consenso + profilazione (fonte Alperia)

  // --- ENROLLMENT ---
  iscrittiEOPpct: 0.30,         // % addressable iscritta a fine periodo (EOP)
  adesioneRamp: [0.80, 0.95, 1.00], // ramp di adesione cumulata Y1/Y2/Y3 (fisso, fonte BC)

  // --- RETENTION (delta churn) ---
  churnInizialeY1: 0.15,        // churn iniziale Y1 (a catena negli anni successivi)
  deltaChurnY1: 0.08,           // delta churn Y1; Y2 = +1pp, Y3 = +2pp (pattern BC)

  // --- CROSS-SELLING ---
  upliftCrossSell: 0.05,        // uplift take-rate sui nuovi iscritti dell'anno

  // --- ECONOMICS PER CLIENTE (fonte: Sintesi Ricavi BC) ---
  valorePerSaved: 30,           // €/anno margine per cliente salvato dal churn
  arpuAnnuo: 110,               // €/anno margine ricorrente per cliente trattenuto
  cacMedio: 110,                // € CAC evitato per cliente salvato (riacquisizione)
  margineContributivo: 0.25,    // % margine applicato al cross-sell

  // --- COSTI PROGRAMMA (fonte: Sintesi Ricavi BC + Budget In) ---
  costoSetupJakala: 70000,        // € setup Digital Wallet one-shot (Y1)
  costoCanonePiattaforma: 102000, // € canone Jakala annuo
  costoContestY1: 45000,          // € contest instant win anno 1 (primo set-up incluso)
  costoContestRicorrente: 41000,  // € contest instant win dal Y2
  costoRewardPerMembro: 10,       // € costo reward per iscritto/anno
  redemptionRate: 0.15,           // % iscritti che riscatta reward
  costoAttivazione: 0,            // € one-shot per iscritto (incluso nel canone)
  tassoAttivazioneCosto: 0.20,    // % iscritti che genera costo di attivazione
  costoOperativoY1: 45000,        // € team interno + agency anno 1
  costoOperativoRicorrente: 30000,// € team interno + agency dal Y2
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
      upliftCrossSell: 0.03,
      valorePerSaved: 25,
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
      upliftCrossSell: 0.08,
      valorePerSaved: 40,
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
    hint: 'Incremento take-rate servizi energy-related sui nuovi iscritti',
    min: 0.01, max: 0.15, step: 0.005,
    format: (v) => `${(v * 100).toFixed(1).replace('.', ',')}%`,
    category: 'retention',
  },
  valorePerSaved: {
    label: 'Valore €/cliente salvato/anno',
    hint: 'Margine annuo per cliente trattenuto dal churn',
    min: 15, max: 60, step: 5,
    format: (v) => `€${v}`,
    category: 'economics',
  },
  arpuAnnuo: {
    label: 'Margine annuo €/cliente',
    hint: 'Margine ricorrente per cliente trattenuto (BC: 110€)',
    min: 60, max: 300, step: 10,
    format: (v) => `€${v.toLocaleString('it-IT')}`,
    category: 'economics',
  },
  margineContributivo: {
    label: 'Margine contributivo cross-sell',
    hint: '% margine applicato ai clienti con cross-sell',
    min: 0.10, max: 0.40, step: 0.01,
    format: (v) => `${Math.round(v * 100)}%`,
    category: 'economics',
  },
  costoCanonePiattaforma: {
    label: 'Canone Jakala annuo',
    hint: 'SaaS engine, moduli Club/Contest/Catalogo, manutenzione',
    min: 60000, max: 160000, step: 2000,
    format: (v) => `€${(v / 1000).toFixed(0)}K`,
    category: 'costi',
  },
  costoRewardPerMembro: {
    label: 'Costo reward €/membro/anno',
    hint: 'Mix esperienziale + sconti + partner',
    min: 5, max: 30, step: 1,
    format: (v) => `€${v}`,
    category: 'costi',
  },
  redemptionRate: {
    label: 'Redemption rate',
    hint: '% iscritti che riscatta almeno un reward/anno',
    min: 0.05, max: 0.50, step: 0.01,
    format: (v) => `${Math.round(v * 100)}%`,
    category: 'costi',
  },
};
