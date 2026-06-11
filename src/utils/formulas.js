// ============================================================================
// ALPERIA+ — BUSINESS CASE FORMULAS
// ----------------------------------------------------------------------------
// Funzioni pure che prendono l'oggetto kpis (DEFAULT_KPIS o modificato)
// e ritornano il modello economico completo.
//
// Il modello replica fedelmente il Business Case ufficiale Alperia
// (20260f_Alperia_Business_case - final.xlsx, fogli "Enrollment" + "Sintesi Ricavi BC"):
//
//   1. ENROLLMENT a coorti — addressable 250.267 cresciuto del 5% in 3 anni
//      (262.780), iscritti EOP 30% (78.834), distribuiti su 3 anni con ramp di
//      adesione 80% / 95% / 100%.
//   2. SITI TRATTENUTI — modello a coorti con base "iscritti cumulati − salvati
//      già realizzati", delta churn crescente (8% / 9% / 10%) su churn iniziale
//      a catena (15% → 13,8% → 12,56%). Ogni coorte salva per 3 anni.
//   3. CROSS-SELLING — uplift take-rate 2,5% (Y1 sui nuovi iscritti, Y2/Y3 sui
//      cumulati).
//   4. NUOVI CLIENTI (CAC) — sotto-modello: la base cresce del 5% (12.513 nuovi),
//      30% iscrive (3.754), ramp 80/95/100. Genera il beneficio "CAC evitato".
//   5. SINTESI ECONOMICA — ricavi (retention + cross-sell + CAC) su 5 anni;
//      costi modellati sui primi 3 anni.
//
// Testabili: ogni funzione è deterministica, stateless, unitestabile.
// Vedi formulas.test.js per il pin dei numeri ufficiali del BC.
// ============================================================================

// Orizzonti del modello (fonte: struttura Business Case Alperia)
export const COST_YEARS = 3;        // costi modellati sui primi 3 anni
export const BENEFIT_YEARS = 5;     // i benefici maturano fino a 5 anni (code coorti)
export const COHORT_LIFESPAN = 3;   // ogni coorte genera "saved" per 3 anni dall'iscrizione

/**
 * Ramp di adesione cumulata per anno (foglio Enrollment).
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
 * Distribuisce un target di iscritti EOP sui 3 anni secondo la ramp di adesione.
 * Ritorna { iscrittiEOP, coorti: [{ year, adesioneCum, iscrittiAnno, iscrittiCum }] }
 */
function distribuisciIscritti(iscrittiEOP, ramp) {
  let prevCum = 0;
  let cumIscritti = 0;
  const coorti = ramp.map((adesioneCum, i) => {
    const iscrittiAnno = (adesioneCum - prevCum) * iscrittiEOP;
    prevCum = adesioneCum;
    cumIscritti += iscrittiAnno;
    return { year: i + 1, adesioneCum, iscrittiAnno, iscrittiCum: cumIscritti };
  });
  return { iscrittiEOP, coorti };
}

/**
 * 1. ENROLLMENT — iscritti EOP e distribuzione per coorte annuale.
 *
 * Due popolazioni distinte (foglio Enrollment):
 *   • Principale ("Scenario Jakala"): addressable cresciuto del 5% in 3 anni,
 *     30% iscrive. Guida retention + cross-sell.
 *   • Nuovi clienti: la sola crescita del 5% della base (12.513), 30% iscrive
 *     (3.754). Guida il beneficio "CAC evitato".
 *
 * Ritorna { iscrittiEOP, coorti, addressable, nuoviClienti: { iscrittiEOP, coorti } }
 */
export function calcEnrollment(kpis) {
  const ramp = kpis.adesioneRamp ?? ADESIONE_RAMP;

  // Addressable cresciuto del 5% in 3 anni (Cb in tre anni)
  const addressable = kpis.portfolioAddressableBase * (1 + kpis.crescitaCB);
  const iscrittiEOP = addressable * kpis.iscrittiEOPpct;
  const principale = distribuisciIscritti(iscrittiEOP, ramp);

  // Nuovi clienti generati dalla sola crescita della base (5%)
  const nuovaCB = kpis.portfolioAddressableBase * kpis.crescitaCB;
  const iscrittiEOPnuovi = nuovaCB * kpis.iscrittiEOPpct;
  const nuoviClienti = distribuisciIscritti(iscrittiEOPnuovi, ramp);

  return {
    iscrittiEOP,
    coorti: principale.coorti,
    addressable,
    nuoviClienti,
  };
}

/**
 * 2. SITI TRATTENUTI — clienti salvati per anno solare (modello a coorti BC).
 *
 * Churn iniziale a catena: Y1 = churnInizialeY1, Y(n) = churn finale Y(n-1).
 * Churn finale = churn iniziale × (1 − delta).
 *
 * La base di ogni coorte j è "iscritti cumulati[j] − salvati già realizzati negli
 * anni precedenti" (foglio Enrollment, C45 = D30 − D42, C46 = E30 − E42).
 * Ogni coorte salva ogni anno: base[j] × (churnIniziale[j] − churnFinale[j]) e
 * contribuisce per COHORT_LIFESPAN anni a partire dall'anno di iscrizione.
 *
 * Ritorna { savedPerSolarYear: number[BENEFIT_YEARS], savedPerCohort,
 *           churnIniziale, churnFinale, deltaChurn }
 */
export function calcSaved(kpis, enrollment) {
  const deltaChurn = deltaChurnVector(kpis);
  const churnIniziale = [];
  const churnFinale = [];

  for (let i = 0; i < enrollment.coorti.length; i++) {
    churnIniziale[i] = i === 0 ? kpis.churnInizialeY1 : churnFinale[i - 1];
    churnFinale[i] = churnIniziale[i] * (1 - deltaChurn[i]);
  }

  // Tasso di salvataggio annuo per coorte = churnIniziale − churnFinale
  const tassoSaved = churnIniziale.map((ci, i) => ci - churnFinale[i]);

  // Saved annuo per coorte. La base scala progressivamente: cumulati[j] meno i
  // salvati già realizzati negli anni precedenti (runningSaved).
  let runningSaved = 0;
  const savedPerCohort = enrollment.coorti.map((c, j) => {
    const base = c.iscrittiCum - runningSaved;
    const saved = base * tassoSaved[j];
    runningSaved += saved;
    return saved;
  });

  // Aggregazione per anno solare (coorte j attiva negli anni j..j+LIFESPAN-1)
  const savedPerSolarYear = Array.from({ length: BENEFIT_YEARS }, (_, k) => {
    const solarYear = k + 1;
    return savedPerCohort.reduce((acc, saved, j) => {
      const cohortYear = j + 1;
      const active = solarYear >= cohortYear && solarYear < cohortYear + COHORT_LIFESPAN;
      return acc + (active ? saved : 0);
    }, 0);
  });

  return { savedPerSolarYear, savedPerCohort, churnIniziale, churnFinale, deltaChurn };
}

/**
 * 3. CROSS-SELLING — clienti con cross-sell cumulati per anno (solo anni di enrollment).
 * Y1 sui nuovi iscritti dell'anno, Y2/Y3 sui cumulati (foglio Enrollment C54/D54/E54).
 */
export function calcCrossSell(kpis, enrollment) {
  let cum = 0;
  return enrollment.coorti.map((c, i) => {
    const base = i === 0 ? c.iscrittiAnno : c.iscrittiCum;
    const anno = kpis.upliftCrossSell * base;
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

  // ARPU per cliente = ARPU per fornitura × punti di fornitura medi (110 × 1,3 = 143)
  const arpuPerCliente = kpis.arpuAnnuoPerFornitura * kpis.puntiFornituraMedi;

  const years = Array.from({ length: BENEFIT_YEARS }, (_, i) => {
    const year = i + 1;
    const saved = savedPerSolarYear[i];
    const coorte = enrollment.coorti[i];                // undefined oltre l'anno 3
    const nuoviAnno = enrollment.nuoviClienti.coorti[i]; // undefined oltre l'anno 3
    const crossSellCum = crossSell[i] ? crossSell[i].cum : 0;

    // --- BENEFICI ---
    const retention = arpuPerCliente * saved;
    const crossSellValue = kpis.beneficioCrossSell * crossSellCum;
    // CAC evitato sui nuovi clienti acquisiti dalla crescita base (solo anni di enrollment)
    const cacSaved = nuoviAnno ? kpis.cacMedio * nuoviAnno.iscrittiAnno : 0;
    const benefitsTotal = retention + crossSellValue + cacSaved;

    // --- COSTI (solo nei primi COST_YEARS anni) ---
    let costs;
    if (year <= COST_YEARS) {
      const setup = year === 1 ? kpis.costoSetupJakala : 0;
      const platform = kpis.costoCanonePiattaforma;
      const contest = year === 1 ? kpis.costoContestY1 : kpis.costoContestRicorrente;
      const reward = coorte.iscrittiCum * kpis.costoRewardPerMembro;
      const ops = year === 1 ? kpis.costoOperativoY1 : kpis.costoOperativoRicorrente;
      costs = {
        setup, platform, contest, reward, ops,
        total: setup + platform + contest + reward + ops,
      };
    } else {
      costs = { setup: 0, platform: 0, contest: 0, reward: 0, ops: 0, total: 0 };
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

  // "A regime": picco di clienti salvati/anno (anno 3, tutte le coorti attive)
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
