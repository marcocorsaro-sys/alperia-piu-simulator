// ============================================================================
// ALPERIA+ — BUSINESS CASE FORMULAS
// ----------------------------------------------------------------------------
// Funzioni pure che prendono l'oggetto kpis (DEFAULT_KPIS o modificato)
// e ritornano il modello economico completo.
//
// Il modello replica fedelmente il Business Case ufficiale Alperia
// (202605_Alperia_Business_case.xlsx, fogli "Enrollment" + "Sintesi Ricavi BC"):
//
//   1. ENROLLMENT a coorti — iscritti EOP (30% addressable), distribuiti su 3
//      anni con ramp di adesione 80% / 95% / 100%.
//   2. SITI TRATTENUTI — ogni coorte genera "clienti salvati" per 3 anni, con
//      delta churn crescente (8% / 9% / 10%) su un churn iniziale a catena.
//   3. CROSS-SELLING — uplift take-rate sui nuovi iscritti dell'anno.
//   4. SINTESI ECONOMICA — ricavi (retention + cross-sell + CAC evitato) su un
//      orizzonte di 5 anni; costi modellati sui primi 3 anni.
//
// Testabili: ogni funzione è deterministica, stateless, unitestabile.
// Vedi formulas.test.js per il pin dei numeri ufficiali del BC.
// ============================================================================

// Orizzonti del modello (fonte: struttura Business Case Alperia)
export const COST_YEARS = 3;        // costi modellati sui primi 3 anni
export const BENEFIT_YEARS = 5;     // i benefici maturano fino a 5 anni (code coorti)
export const COHORT_LIFESPAN = 3;   // ogni coorte genera "saved" per 3 anni dall'iscrizione

/**
 * Ramp di adesione cumulata per anno (foglio Enrollment, B13:E13).
 * Y1 80% → Y2 95% → Y3 100% degli iscritti EOP target.
 */
const ADESIONE_RAMP = [0.80, 0.95, 1.00];

/**
 * Costruisce il vettore delta-churn dei 3 anni a partire dalla leva Y1.
 * Il BC usa un incremento di +1 punto percentuale all'anno (8% → 9% → 10%).
 */
function deltaChurnVector(kpis) {
  const y1 = kpis.deltaChurnY1;
  return [y1, y1 + 0.01, y1 + 0.02];
}

/**
 * 1. ENROLLMENT — iscritti EOP e distribuzione per coorte annuale.
 * Ritorna { iscrittiEOP, coorti: [{ year, adesioneCum, iscrittiAnno, iscrittiCum }] }
 */
export function calcEnrollment(kpis) {
  const iscrittiEOP = kpis.portfolioAddressable * kpis.iscrittiEOPpct;
  const ramp = kpis.adesioneRamp ?? ADESIONE_RAMP;

  let prevCum = 0;
  let cumIscritti = 0;
  const coorti = ramp.map((adesioneCum, i) => {
    const iscrittiAnno = (adesioneCum - prevCum) * iscrittiEOP;
    prevCum = adesioneCum;
    cumIscritti += iscrittiAnno;
    return {
      year: i + 1,
      adesioneCum,
      iscrittiAnno,
      iscrittiCum: cumIscritti,
    };
  });

  return { iscrittiEOP, coorti };
}

/**
 * 2. SITI TRATTENUTI — clienti salvati per anno solare.
 *
 * Churn iniziale a catena: Y1 = churnInizialeY1, Y(n) = churn finale Y(n-1).
 * Churn finale = churn iniziale × (1 − delta).
 * Ogni coorte j salva ogni anno: iscrittiAnno[j] × (churnIniziale[j] − churnFinale[j])
 * e contribuisce per COHORT_LIFESPAN anni a partire dall'anno di iscrizione.
 *
 * Ritorna { savedPerSolarYear: number[BENEFIT_YEARS], churnIniziale, churnFinale, deltaChurn }
 */
export function calcSaved(kpis, enrollment) {
  const deltaChurn = deltaChurnVector(kpis);
  const churnIniziale = [];
  const churnFinale = [];

  for (let i = 0; i < enrollment.coorti.length; i++) {
    churnIniziale[i] = i === 0 ? kpis.churnInizialeY1 : churnFinale[i - 1];
    churnFinale[i] = churnIniziale[i] * (1 - deltaChurn[i]);
  }

  // Saved annuo generato da ciascuna coorte (costante per tutta la sua vita)
  const savedPerCohort = enrollment.coorti.map(
    (c, j) => c.iscrittiAnno * (churnIniziale[j] - churnFinale[j])
  );

  // Aggregazione per anno solare (coorte j attiva negli anni j..j+LIFESPAN-1)
  const savedPerSolarYear = Array.from({ length: BENEFIT_YEARS }, (_, k) => {
    const solarYear = k + 1;
    return savedPerCohort.reduce((acc, saved, j) => {
      const cohortYear = j + 1;
      const active = solarYear >= cohortYear && solarYear < cohortYear + COHORT_LIFESPAN;
      return acc + (active ? saved : 0);
    }, 0);
  });

  return { savedPerSolarYear, churnIniziale, churnFinale, deltaChurn };
}

/**
 * 3. CROSS-SELLING — clienti con cross-sell cumulati per anno (solo anni di enrollment).
 */
export function calcCrossSell(kpis, enrollment) {
  let cum = 0;
  return enrollment.coorti.map((c) => {
    const anno = kpis.upliftCrossSell * c.iscrittiAnno;
    cum += anno;
    return { year: c.year, anno, cum };
  });
}

/**
 * 4. Modello completo su BENEFIT_YEARS anni.
 * Ritorna un array di year objects con benefici / costi / netto.
 */
export function calcModel(kpis) {
  const enrollment = calcEnrollment(kpis);
  const { savedPerSolarYear } = calcSaved(kpis, enrollment);
  const crossSell = calcCrossSell(kpis, enrollment);

  // Valore annuo per cliente trattenuto: margine "saved" + margine ARPU
  const valoreRetentionUnit = kpis.valorePerSaved + kpis.arpuAnnuo;
  const valoreCrossSellUnit = kpis.arpuAnnuo * kpis.margineContributivo;

  const years = Array.from({ length: BENEFIT_YEARS }, (_, i) => {
    const year = i + 1;
    const saved = savedPerSolarYear[i];
    const coorte = enrollment.coorti[i]; // undefined oltre l'anno 3
    const crossSellCum = crossSell[i] ? crossSell[i].cum : 0;

    // --- BENEFICI ---
    const retention = valoreRetentionUnit * saved;
    const crossSellValue = valoreCrossSellUnit * crossSellCum;
    const cacSaved = kpis.cacMedio * saved;
    const benefitsTotal = retention + crossSellValue + cacSaved;

    // --- COSTI (solo nei primi COST_YEARS anni) ---
    let costs;
    if (year <= COST_YEARS) {
      const setup = year === 1 ? kpis.costoSetupJakala : 0;
      const platform = kpis.costoCanonePiattaforma;
      const contest = year === 1 ? kpis.costoContestY1 : kpis.costoContestRicorrente;
      const reward = kpis.redemptionRate * coorte.iscrittiCum * kpis.costoRewardPerMembro;
      const ops = year === 1 ? kpis.costoOperativoY1 : kpis.costoOperativoRicorrente;
      const activation = kpis.tassoAttivazioneCosto * coorte.iscrittiAnno * kpis.costoAttivazione;
      costs = {
        setup, platform, contest, reward, ops, activation,
        total: setup + platform + contest + reward + ops + activation,
      };
    } else {
      costs = { setup: 0, platform: 0, contest: 0, reward: 0, ops: 0, activation: 0, total: 0 };
    }

    return {
      year,
      iscrittiCum: coorte ? coorte.iscrittiCum : null,
      iscrittiAnno: coorte ? coorte.iscrittiAnno : 0,
      saved,
      crossSellCum,
      benefits: {
        retention,
        crossSell: crossSellValue,
        cacSaved,
        total: benefitsTotal,
      },
      costs,
      net: benefitsTotal - costs.total,
    };
  });

  return { years, enrollment, savedPerSolarYear, crossSell };
}

/**
 * ROI sull'orizzonte: saldo netto totale / costi totali.
 */
export function calcROI(years) {
  const totalNet = years.reduce((acc, y) => acc + y.net, 0);
  const totalCosts = years.reduce((acc, y) => acc + y.costs.total, 0);
  return totalCosts > 0 ? totalNet / totalCosts : 0;
}

/**
 * Anno di break-even sul cashflow cumulato (saldo cumulato ≥ 0).
 */
export function calcBreakEven(years) {
  let cumulative = 0;
  for (let i = 0; i < years.length; i++) {
    cumulative += years[i].net;
    if (cumulative >= 0) return years[i].year;
  }
  return null;
}

/**
 * Primo anno con saldo netto annuo positivo.
 */
export function calcPrimoAnnoPositivo(years) {
  const y = years.find((yr) => yr.net >= 0);
  return y ? y.year : null;
}

/**
 * Entry point principale — calcola tutto in una chiamata.
 */
export function runBusinessCase(kpis) {
  const { years, enrollment, savedPerSolarYear, crossSell } = calcModel(kpis);

  const totalBenefits = years.reduce((acc, y) => acc + y.benefits.total, 0);
  const totalCosts = years.reduce((acc, y) => acc + y.costs.total, 0);
  const totalNet = totalBenefits - totalCosts;

  // "A regime": picco di clienti salvati/anno (anno 3, ultima coorte inclusa)
  const savedRegime = Math.max(...savedPerSolarYear);

  return {
    years,
    enrollment,
    crossSell,
    iscrittiEOP: enrollment.iscrittiEOP,
    iscrittiRegime: enrollment.iscrittiEOP, // alias retrocompatibile (Cover/Sim)
    savedRegime,
    savedTotal: savedPerSolarYear.reduce((a, b) => a + b, 0),
    roi: calcROI(years),
    breakEven: calcBreakEven(years),
    primoAnnoPositivo: calcPrimoAnnoPositivo(years),
    totalBenefits,
    totalCosts,
    totalNet,
    saldoNetto: totalNet,
  };
}

/**
 * Formatter helpers (formato EU: punto migliaia, virgola decimale).
 */
export const formatEUR = (n) => `€${Math.round(n).toLocaleString('it-IT')}`;
export const formatEURK = (n) => {
  const k = Math.round(n / 1000);
  return `${k < 0 ? '−' : ''}€${Math.abs(k).toLocaleString('it-IT')}K`;
};
export const formatPCT = (n, decimals = 1) =>
  `${(n * 100).toFixed(decimals).replace('.', ',')}%`;
export const formatINT = (n) => Math.round(n).toLocaleString('it-IT');
