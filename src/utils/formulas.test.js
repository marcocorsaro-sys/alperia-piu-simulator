// ============================================================================
// ALPERIA+ — BUSINESS CASE TESTS
// ----------------------------------------------------------------------------
// Pin dei numeri ufficiali del Business Case Alperia
// (20260f_Alperia_Business_case - final.xlsx).
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

  it('addressable cresciuto del 5% ≈ 262.780', () => near(e.addressable, 262780.35, 1));

  it('iscritti EOP = 30% di 262.780 ≈ 78.834', () => near(e.iscrittiEOP, 78834, 1));

  it('iscritti annuali Y1/Y2/Y3 ≈ 63.067 / 11.825 / 3.942', () => {
    near(e.coorti[0].iscrittiAnno, 63067, 1);
    near(e.coorti[1].iscrittiAnno, 11825, 1);
    near(e.coorti[2].iscrittiAnno, 3942, 1);
  });

  it('iscritti cumulati Y1/Y2/Y3 ≈ 63.067 / 74.892 / 78.834', () => {
    near(e.coorti[0].iscrittiCum, 63067, 1);
    near(e.coorti[1].iscrittiCum, 74892, 1);
    near(e.coorti[2].iscrittiCum, 78834, 1);
  });

  it('nuovi clienti (crescita 5%) EOP ≈ 3.754, per anno ≈ 3.003 / 563 / 188', () => {
    near(e.nuoviClienti.iscrittiEOP, 3754, 1);
    near(e.nuoviClienti.coorti[0].iscrittiAnno, 3003, 1);
    near(e.nuoviClienti.coorti[1].iscrittiAnno, 563, 1);
    near(e.nuoviClienti.coorti[2].iscrittiAnno, 188, 1);
  });
});

describe('Siti trattenuti (clienti salvati per anno solare)', () => {
  const e = calcEnrollment(k);
  const s = calcSaved(k, e);

  it('clienti salvati Y1..Y5 ≈ 757 / 1.678 / 2.647 / 1.890 / 969', () => {
    near(s.savedPerSolarYear[0], 756.81, 1);
    near(s.savedPerSolarYear[1], 1677.57, 1);
    near(s.savedPerSolarYear[2], 2646.50, 1);
    near(s.savedPerSolarYear[3], 1889.70, 1);
    near(s.savedPerSolarYear[4], 968.93, 1);
  });

  it('churn finale a catena ≈ 13,8% / 12,56% / 11,30%', () => {
    near(s.churnFinale[0] * 1000, 138, 1);
    near(s.churnFinale[1] * 1000, 125.58, 1);
    near(s.churnFinale[2] * 1000, 113.02, 1);
  });
});

describe('Cross-selling', () => {
  const e = calcEnrollment(k);
  const cs = calcCrossSell(k, e);

  it('clienti cross-sell cumulati ≈ 1.577 / 3.449 / 5.420', () => {
    near(cs[0].cum, 1576.68, 1);
    near(cs[1].cum, 3448.99, 1);
    near(cs[2].cum, 5419.84, 1);
  });
});

describe('Sintesi economica (Sintesi Ricavi BC)', () => {
  const { years } = calcModel(k);

  it('benefici totali per anno Y1..Y5 ≈ 337K / 440K / 659K / 270K / 139K', () => {
    near(years[0].benefits.total, 337217.76, 5);
    near(years[1].benefits.total, 440497.36, 5);
    near(years[2].benefits.total, 658827.21, 5);
    near(years[3].benefits.total, 270226.50, 5);
    near(years[4].benefits.total, 138557.24, 5);
  });

  it('costi totali per anno Y1..Y3 ≈ 388K / 323K / 331K', () => {
    near(years[0].costs.total, 388134.57, 5);
    near(years[1].costs.total, 322784.80, 5);
    near(years[2].costs.total, 330668.21, 5);
  });

  it('saldo netto per anno: negativo Y1, positivo da Y2', () => {
    expect(years[0].net).toBeLessThan(0);
    near(years[0].net, -50916.80, 5);
    near(years[1].net, 117712.56, 5);
    near(years[2].net, 328158.99, 5);
  });
});

describe('Totali Business Case ufficiale', () => {
  const r = runBusinessCase(k);

  it('ricavi totali ≈ 1.845K€', () => near(r.totalBenefits, 1845326.07, 10));
  it('costi totali ≈ 1.042K€', () => near(r.totalCosts, 1041587.58, 10));
  it('saldo netto ≈ 804K€', () => near(r.totalNet, 803738.50, 10));
  it('primo anno con saldo annuo positivo = Y2', () => expect(r.primoAnnoPositivo).toBe(2));
  it('break-even cumulato = Anno 2', () => expect(r.breakEven).toBe(2));
  it('iscritti EOP ≈ 78.834', () => near(r.iscrittiEOP, 78834, 1));
});
