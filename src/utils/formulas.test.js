// ============================================================================
// ALPERIA+ — BUSINESS CASE TESTS
// ----------------------------------------------------------------------------
// Pin dei numeri ufficiali del Business Case Alperia (202605_Alperia_Business_case.xlsx).
// Se questi test si rompono, il modello non è più allineato al BC consegnato.
// ============================================================================

import { describe, it, expect } from 'vitest';
import { DEFAULT_KPIS } from '../data/assumptions.js';
import {
  calcEnrollment,
  calcSaved,
  calcCrossSell,
  calcModel,
  runBusinessCase,
} from './formulas.js';

const k = DEFAULT_KPIS;
const near = (v, target, tol = 1) => expect(Math.abs(v - target)).toBeLessThanOrEqual(tol);

describe('Enrollment (foglio Enrollment, scenario Jakala)', () => {
  const e = calcEnrollment(k);

  it('iscritti EOP = 30% di 250.267 ≈ 75.080', () => near(e.iscrittiEOP, 75080, 1));

  it('iscritti annuali Y1/Y2/Y3 ≈ 60.064 / 11.262 / 3.754', () => {
    near(e.coorti[0].iscrittiAnno, 60064, 1);
    near(e.coorti[1].iscrittiAnno, 11262, 1);
    near(e.coorti[2].iscrittiAnno, 3754, 1);
  });

  it('iscritti cumulati Y1/Y2/Y3 ≈ 60.064 / 71.326 / 75.080', () => {
    near(e.coorti[0].iscrittiCum, 60064, 1);
    near(e.coorti[1].iscrittiCum, 71326, 1);
    near(e.coorti[2].iscrittiCum, 75080, 1);
  });
});

describe('Siti trattenuti (clienti salvati per anno solare)', () => {
  const e = calcEnrollment(k);
  const s = calcSaved(k, e);

  it('clienti salvati Y1..Y5 ≈ 721 / 861 / 908 / 187 / 47', () => {
    near(s.savedPerSolarYear[0], 720.77, 1);
    near(s.savedPerSolarYear[1], 860.64, 1);
    near(s.savedPerSolarYear[2], 907.79, 1);
    near(s.savedPerSolarYear[3], 187.02, 1);
    near(s.savedPerSolarYear[4], 47.14, 1);
  });

  it('churn finale a catena ≈ 13,8% / 12,6% / 11,3%', () => {
    near(s.churnFinale[0] * 1000, 138, 1);
    near(s.churnFinale[1] * 1000, 125.6, 1);
    near(s.churnFinale[2] * 1000, 113, 1);
  });
});

describe('Cross-selling', () => {
  const e = calcEnrollment(k);
  const cs = calcCrossSell(k, e);

  it('clienti cross-sell cumulati ≈ 3.003 / 3.566 / 3.754', () => {
    near(cs[0].cum, 3003.2, 1);
    near(cs[1].cum, 3566.3, 1);
    near(cs[2].cum, 3754.0, 1);
  });
});

describe('Sintesi economica (Sintesi Ricavi BC)', () => {
  const { years } = calcModel(k);

  it('benefici totali per anno Y1..Y3 ≈ 263K / 313K / 330K', () => {
    near(years[0].benefits.total, 262780, 5);
    near(years[1].benefits.total, 313234, 5);
    near(years[2].benefits.total, 330182, 5);
  });

  it('costi totali per anno Y1..Y3 ≈ 352K / 280K / 286K', () => {
    near(years[0].costs.total, 352096, 5);
    near(years[1].costs.total, 279989, 5);
    near(years[2].costs.total, 285620, 5);
  });

  it('saldo netto per anno: negativo Y1, positivo da Y2', () => {
    expect(years[0].net).toBeLessThan(0);
    near(years[0].net, -89316, 5);
    near(years[1].net, 33245, 5);
    near(years[2].net, 44561, 5);
  });
});

describe('Totali Business Case ufficiale', () => {
  const r = runBusinessCase(k);

  it('ricavi totali ≈ 965K€', () => near(r.totalBenefits, 964736, 10));
  it('costi totali ≈ 918K€', () => near(r.totalCosts, 917705, 10));
  it('saldo netto ≈ 47K€', () => near(r.totalNet, 47031, 10));
  it('primo anno con saldo annuo positivo = Y2', () => expect(r.primoAnnoPositivo).toBe(2));
  it('iscritti EOP ≈ 75.080', () => near(r.iscrittiEOP, 75080, 1));
});
