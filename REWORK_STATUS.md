# Stato rework v1.0 — Handoff

> Documento di memoria della sessione di rework (mail Filippo, team Engagement).
> Serve a riprendere il lavoro senza dipendere dagli allegati caricati in chat
> (l'ambiente è effimero: solo ciò che è committato persiste).
> Branch corrente: `claude/practical-ritchie-yj84h6`.

## TL;DR
v1.0: integrato il **Business Case definitivo** (`20260f_Alperia_Business case - final.xlsx`)
e il **Recap costi** (`Alperia_2026_Proposta Loyalty_Recap costi.xlsx`). Sostituisce il
modello v0.9. Engine + test riallineati ai numeri ufficiali finali; nuova sezione
`RecapCosti.jsx` con la vista d'offerta dei costi (Anno 1).
v0.9 (precedente): naming Alperia+, logo ufficiale, palette istituzionale, mockup Area
Clienti, intro programma, valore consensi — **tutte completate** (vedi §4).

---

## 1. Business Case definitivo (v1.0 — sostituisce il modello v0.9)

Fonte: `20260f_Alperia_Business case - final.xlsx` (fogli *Enrollment* + *Sintesi Ricavi BC*).
Modello **a coorti**, riprodotto fedelmente in `src/utils/formulas.js` e bloccato
da test in `src/utils/formulas.test.js` (17 test, `npm test`).

**Enrollment**
- Addressable: 250.267 → **cresciuto del 5% in 3 anni = 262.780** (leva `crescitaCB`)
- Iscritti EOP: **30%** → 78.834
- Ramp adesione cumulata: Y1 80% / Y2 95% / Y3 100%
- Iscritti/anno: 63.067 / 11.825 / 3.942 · cumulati: 63.067 / 74.892 / 78.834
- **Nuovi clienti (sotto-modello CAC)**: la sola crescita 5% (12.513) × 30% = 3.754,
  ramp 80/95/100 → 3.003 / 563 / 188. Guida il beneficio "CAC evitato".

**Siti trattenuti (delta churn) — modello a coorti**
- Delta churn: **8% / 9% / 10%** (Y1/Y2/Y3) — leva `deltaChurnY1` con +1pp/anno
- Churn iniziale a catena: Y1 15% → 13,8% → 12,56%; finale = iniziale×(1−delta)
- Base coorte = iscritti_cum − salvati già realizzati (Enrollment C45=D30−D42, C46=E30−E42)
- Saved per anno solare: **757 / 1.678 / 2.647 / 1.890 / 969** (Y1..Y5)

**Cross-selling**: uplift **2,5%** (Y1 sui nuovi iscritti, Y2/Y3 sui cumulati).
Cum: 1.577 / 3.449 / 5.420.

**Sintesi economica** (ARPU/fornitura €110 × 1,3 forniture = **ARPU cliente €143**; CAC €50; beneficio cross-sell €50/cliente)
- Ben. Retention[anno] = 143 × saved[anno]  (5 anni)
- Ben. CrossSell[anno] = 50 × clienti_crosssell_cum[anno]  (solo Y1-Y3)
- Ben. CAC[anno] = 50 × nuovi_clienti_anno[anno]  (solo Y1-Y3)
- **Benefici su 5 anni** (code coorti), **costi su 3 anni**

**Costi** (foglio Sintesi Ricavi): Setup €70K (Y1) · Canone €102K/anno · Contest €45K(Y1)→€41K
· Reward = **iscrittiCum × €2/iscritto** · Costi interni €65K/anno.

**Risultati ufficiali (scenario Base):**
| | Y1 | Y2 | Y3 | Y4 | Y5 | Totale |
|---|---|---|---|---|---|---|
| Ricavi | 337K | 440K | 659K | 270K | 139K | **1.845K** |
| Costi | 408K | 358K | 366K | — | — | **1.132K** |
| Saldo netto | −71K | +83K | +293K | +270K | +139K | **+714K** |

Break-even cumulato: **Anno 2** · saldo annuo positivo da Anno 2 · ROI **~63%** sui costi.

Decisione presa con Marco: **simulatore resta interattivo**, BC ufficiale come scenario **Base**.

---

## 2. Budget In (quotazione, IVA esclusa)

Fonte: Word `ALPERIA_PERIMETRO_BDG_ALLOCATION.docx` + 3 Excel Budget In.
| Voce | Setup | Canone/Maint. annuo | Note |
|---|---|---|---|
| Digital Wallet (loyalty 3 tier) | €70.000 | €110.000 | include licenza J-Next (~€12K) |
| Contest Instant Win | €30.000 (1° contest) | €40.000 / contest agg. | racc. **4/anno** (trimestrale) |
| Creatività (SBAM) | €20.000 | — | **opzionale** |

Tier J-Next (dal Word): **base** (1 commodity attiva) · **silver** (1 commodity + 12 mesi aging)
· **gold/top** (2 commodity + 12 mesi). Piattaforma ISO 27001, privacy by design/default.

> Nota: il BC modella canone a **€102K** (Budget In quota €110K) e contest a €45K/€41K
> (Budget In quota 1°=€30K + €40K/agg.). Discrepanze volute/di sintesi — i numeri
> dell'artifact seguono il **Business Case** per coerenza con i test.

### Recap costi (vista d'offerta — `RecapCosti.jsx`)
Fonte: `Alperia_2026_Proposta Loyalty_Recap costi.xlsx` (foglio *Sintesi costi*, Anno 1, IVA escl.).
| Voce | Importo |
|---|---|
| Setup Digital Wallet (one-shot) | €70.000 |
| Maintenance piattaforma (12 mesi) | €102.000 |
| Creatività Digital Wallet (opzionale) | €20.000 |
| Set-up & supporto on-going Instant Win | €45.000 |
| Scouting premi & declinazioni creative IW | €25.000 |
| Reward catalogo on top (€10/membro × 15% redemption) | €90.000 |
| **Totale Anno 1** | **€352.000** |

> Differenza voluta col P&L del BC: il BC modella reward a €2/iscritto cumulato e non isola
> creatività/scouting/reward catalogo come voci d'offerta. La sezione `RecapCosti` è la **vista
> d'offerta** da condividere col cliente; il P&L resta la base economica del simulatore.

---

## 3. Palette istituzionale Alperia

Fonte: `[Alperia] Palette Colori (1).pdf`. Core (contrasto AA ≥ 4,5:1):
- **Primario · Blu** `#006593` (AA 6,39)
- **Secondario · Turchese** `#1D7990` (AA 5,01)
- **Accento/CTA · Arancione** `#DB3700` (AA 4,60)
- Statuses: Errore (rosso) · Avviso (ocra) · Successo (verde) · scala di grigi

Implementazione in `tailwind.config.js`: scale 50→950 derivate dai core (ancoraggio @600),
e **famiglie Tailwind rimappate** per re-skinnare senza toccare ogni classe:
`teal→Blu` · `cyan→Turchese` · `amber/orange→Arancione` · `emerald→Successo` · `rose/red→Errore` · `yellow→Avviso`.
Canvas scuro (slate/near-black) tenuto come layer neutro/grayscale.

---

## 4. Feedback cliente — stato

1. ✅ **Naming "Alperia+"** ovunque; il "logo" depotenziato a wordmark testuale (`Brand.jsx`)
   con nota che il logo definitivo è deliverable creativo SBAM.
2. ✅ **Logo Alperia in alto** — SVG ufficiale (`src/assets/alperia-logo.svg`, wordmark
   #00547A) integrato in `Cover.jsx` + `StickyNav.jsx` (variante bianca via filtro CSS
   su sfondo scuro) e nelle schermate app (`PhoneScreens.jsx`, nativo su header bianchi).
3. ✅ **Sezione introduttiva** `src/components/ProgramIntro.jsx` — testo obiettivi cliente **verbatim** (non modificare).
4. ✅ **Palette istituzionale** + note accessibilità (vedi §3 + sezione palette in `Brand.jsx`).
5. ✅ **Mockup app** ridisegnati nello stile **Area Clienti Alperia** (ref. PNG Figma del cliente):
   `src/components/PhoneScreens.jsx` ora tema chiaro, header con wordmark `alperia`,
   blu primario per header/accenti, arancione per le CTA, concetto "Energy Point",
   schermate tier convertite da dark a light. Bottom-nav in `PhoneFrame.jsx`.
   Figma ref: https://www.figma.com/board/ZGWxckY2JioZwGPY951PpL/Area-privata-%7C-Condivisione
6. ✅ **Valore consensi privacy** `src/components/ConsentValue.jsx`.

---

## 5. File toccati / creati
- **v1.0 (BC definitivo):** `src/utils/formulas.js` + `formulas.test.js` (17 test) riallineati;
  `src/data/assumptions.js` (default = BC finale, nuove leve, scenari); `RecapCosti.jsx` (nuovo);
  copy/numeri aggiornati in `BusinessCaseTable.jsx`, `BusinessCaseSim.jsx`, `CostValue.jsx`,
  `Hero.jsx`, `Cover.jsx`; `App.jsx` (wiring RecapCosti).
- **v0.9:** `src/components/`: `Brand.jsx`, `StickyNav.jsx`, `Footer.jsx`, `ExperienceIntro.jsx`,
  `PhoneScreens.jsx`, `ReferenceCases.jsx`, `ProgramIntro.jsx`, `ConsentValue.jsx`;
  `tailwind.config.js`, `src/index.css`, `index.html`, `package.json` (script test + vitest)

## 6. Verifica
- `npm test` → 17/17 · `npm run build` → OK (~178KB gzip)
- Preview Vercel: deploy automatico sulla PR

## 7. Prossimi passi
- Sezione economica riallineata al BC definitivo. Pronto per la restituzione al cliente.
- Resta la decisione di Marco se passare la PR da **draft a ready-for-review**.
