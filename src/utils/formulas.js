// ============================================================================
// ALPERIA PIÙ — BUSINESS CASE FORMULAS
// ----------------------------------------------------------------------------
// Funzioni pure che prendono l'oggetto kpis (DEFAULT_KPIS o modificato)
// e ritornano il modello economico completo.
//
// Testabili: ogni funzione è deterministica, stateless, unitestabile.
// ============================================================================

/**
 * Calcola gli iscritti attivi a regime.
 * iscrittiAttivi = addressable × adesione × attivazione
 */
export function calcIscrittiAttivi(kpis) {
  return kpis.portfolioAddressable * kpis.adesione * kpis.attivazione;
}

/**
 * Calcola i clienti salvati/anno a regime.
 * saved = iscrittiAttivi × churnBaseline × riduzioneChurnRel
 */
export function calcSavedPerAnno(kpis) {
  const attivi = calcIscrittiAttivi(kpis);
  return attivi * kpis.churnBaselinePonderato * kpis.riduzioneChurnRel;
}

/**
 * Calcola il modello completo per 3 anni (ramp 0.6/1.0/1.1).
 * Ritorna array di year objects con benefici/costi/netto.
 */
export function calc3YearModel(kpis) {
  const iscrittiRegime = calcIscrittiAttivi(kpis);
  const savedRegime = calcSavedPerAnno(kpis);

  // Ramp curves
  const rampIscritti = [0.6, 1.0, 1.1];  // Anno 1 / 2 / 3
  const rampActivationCost = [0.6, 0.4, 0.1]; // attivazione costs front-loaded
  const setupPerYear = [1, 0, 0];  // setup solo Anno 1

  const years = rampIscritti.map((ramp, i) => {
    const year = i + 1;
    const iscritti = iscrittiRegime * ramp;
    const saved = savedRegime * ramp;

    // --- BENEFITS ---
    // Retention pura: saved × €/saved
    const retentionValue = saved * kpis.valorePerSaved;

    // Cross-sell uplift: attivi × uplift% × ARPU × 0.25 (share margin on services)
    const crossSellValue = iscritti * kpis.upliftCrossSell * kpis.arpuAnnuo * 0.25;

    // CAC saved: saved × CAC medio (evitata riacquisizione)
    const cacSaved = saved * kpis.cacMedio;

    // Data asset value (ipotesi conservativa: €60-110K/anno modellato linearmente con iscritti)
    const dataValue = iscritti / iscrittiRegime * 100000;

    const totalBenefits = retentionValue + crossSellValue + cacSaved + dataValue;

    // --- COSTS ---
    const setupCost = kpis.costoSetupJakala * setupPerYear[i];
    const platformCost = kpis.costoCanonePiattaforma;
    const contestCost = kpis.costoContestAnnuo * (i === 0 ? 1 : 0.9); // anno 1 primo contest più caro
    const rewardCost = kpis.costoRewardPerMembro * iscritti * kpis.redemptionRate;
    const activationCost = kpis.costoAttivazione * iscritti * rampActivationCost[i];
    const opsCost = kpis.costoOperativo * (i === 0 ? 0.75 : 1.0); // anno 1 ops parziale

    const totalCosts = setupCost + platformCost + contestCost + rewardCost + activationCost + opsCost;

    return {
      year,
      iscritti,
      saved,
      benefits: {
        retention: retentionValue,
        crossSell: crossSellValue,
        cacSaved: cacSaved,
        dataAsset: dataValue,
        total: totalBenefits,
      },
      costs: {
        setup: setupCost,
        platform: platformCost,
        contest: contestCost,
        reward: rewardCost,
        activation: activationCost,
        ops: opsCost,
        total: totalCosts,
      },
      net: totalBenefits - totalCosts,
    };
  });

  return years;
}

/**
 * Calcola NPV 3 anni scontato.
 */
export function calcNPV(years, discountRate) {
  return years.reduce((acc, y, i) => acc + y.net / Math.pow(1 + discountRate, i + 1), 0);
}

/**
 * Calcola ROI 3 anni sul totale costi.
 */
export function calcROI(years) {
  const totalNet = years.reduce((acc, y) => acc + y.net, 0);
  const totalCosts = years.reduce((acc, y) => acc + y.costs.total, 0);
  return totalCosts > 0 ? totalNet / totalCosts : 0;
}

/**
 * Trova l'anno di break-even (cashflow cumulato ≥ 0).
 */
export function calcBreakEven(years) {
  let cumulative = 0;
  for (let i = 0; i < years.length; i++) {
    cumulative += years[i].net;
    if (cumulative >= 0) return i + 1;
  }
  return null; // > 3 anni
}

/**
 * Entry point principale — calcola tutto in una chiamata.
 */
export function runBusinessCase(kpis) {
  const years = calc3YearModel(kpis);
  return {
    years,
    iscrittiRegime: calcIscrittiAttivi(kpis),
    savedRegime: calcSavedPerAnno(kpis),
    npv: calcNPV(years, kpis.discountRate),
    roi: calcROI(years),
    breakEven: calcBreakEven(years),
    totalBenefits: years.reduce((acc, y) => acc + y.benefits.total, 0),
    totalCosts: years.reduce((acc, y) => acc + y.costs.total, 0),
    totalNet: years.reduce((acc, y) => acc + y.net, 0),
  };
}

/**
 * Formatter helpers
 */
export const formatEUR = (n) => `€${Math.round(n).toLocaleString('it-IT')}`;
export const formatEURK = (n) => `€${Math.round(n / 1000).toLocaleString('it-IT')}K`;
export const formatPCT = (n, decimals = 1) => `${(n * 100).toFixed(decimals)}%`;
export const formatINT = (n) => Math.round(n).toLocaleString('it-IT');
