# Stato rework v0.9 — Handoff

> Documento di memoria della sessione di rework (mail Filippo, team Engagement).
> Serve a riprendere il lavoro senza dipendere dagli allegati caricati in chat
> (l'ambiente è effimero: solo ciò che è committato persiste).
> Branch di sviluppo: `claude/elegant-darwin-hlk9x` · PR: **#1 (draft)**.

## TL;DR
Rework della proposta loyalty Alperia su 3 fronti: (1) Business Case ufficiale,
(2) Budget In, (3) feedback cliente (naming, logo, intro, palette, mockup, consensi).
**Tutte le richieste completate** (BC + Budget In + 7 feedback cliente, logo ufficiale incluso).

---

## 1. Business Case ufficiale (sostituisce il vecchio modello)

Fonte: `202605_Alperia_Business_case.xlsx` (fogli *Enrollment* + *Sintesi Ricavi BC*).
Modello **a coorti**, riprodotto fedelmente in `src/utils/formulas.js` e bloccato
da test in `src/utils/formulas.test.js` (14 test, `npm test`).

**Enrollment**
- Addressable: 250.267 (con consenso + profilazione)
- Iscritti EOP: **30%** → 75.080
- Ramp adesione cumulata: Y1 80% / Y2 95% / Y3 100%
- Iscritti/anno: 60.064 / 11.262 / 3.754 · cumulati: 60.064 / 71.326 / 75.080

**Siti trattenuti (delta churn)**
- Delta churn: **8% / 9% / 10%** (Y1/Y2/Y3) — nel codice leva `deltaChurnY1` con +1pp/anno
- Churn iniziale a catena: Y1 15% → finale = iniziale×(1−delta); Y(n) iniziale = finale Y(n−1)
- Saved per coorte = iscrittiAnno × (churnIniziale − churnFinale), per 3 anni dall'iscrizione
- Saved per anno solare: 721 / 861 / 908 / 187 / 47 (Y1..Y5)

**Cross-selling**: uplift **5%** costante sui nuovi iscritti dell'anno.

**Sintesi economica** (assumption: valore/saved €30, ARPU/margine annuo €110, CAC €110, margine contributivo 25%)
- Ben. Retention[anno] = (30 + 110) × saved[anno]
- Ben. CrossSell[anno] = (110 × 0,25) × clienti_crosssell_cum[anno]  (solo Y1-Y3)
- Ben. CAC[anno] = 110 × saved[anno]
- **Benefici su 5 anni** (code coorti), **costi su 3 anni**

**Costi** (foglio Sintesi Ricavi): Setup €70K (Y1) · Canone €102K/anno · Contest €45K(Y1)→€41K
· Reward = redemption 15% × iscrittiCum × €10/membro · Ops €45K(Y1)→€30K · Attivazione €0.

**Risultati ufficiali (scenario Base):**
| | Y1 | Y2 | Y3 | Y4 | Y5 | Totale |
|---|---|---|---|---|---|---|
| Ricavi | 263K | 313K | 330K | 47K | 12K | **965K** |
| Costi | 352K | 280K | 286K | — | — | **918K** |
| Saldo netto | −89K | +33K | +45K | +47K | +12K | **+47K** |

Break-even cumulato: Anno 4 · saldo annuo positivo da Anno 2 · ROI ~5% sui costi.

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
- `src/utils/formulas.js` (riscritto), `src/utils/formulas.test.js` (nuovo)
- `src/data/assumptions.js` (nuovi default = BC, slider, scenari)
- `src/components/`: `BusinessCaseTable.jsx` (data-driven), `BusinessCaseSim.jsx`,
  `Cover.jsx`, `CostValue.jsx`, `Brand.jsx`, `Hero.jsx`, `StickyNav.jsx`, `Footer.jsx`,
  `ExperienceIntro.jsx`, `PhoneScreens.jsx`, `ReferenceCases.jsx`,
  `ProgramIntro.jsx` (nuovo), `ConsentValue.jsx` (nuovo)
- `tailwind.config.js`, `src/index.css`, `index.html`, `package.json` (script test + vitest)

## 6. Verifica
- `npm test` → 14/14 · `npm run build` → OK (~177KB gzip)
- Preview Vercel: deploy automatico sulla PR (Ready)

## 7. Prossimi passi
- Tutte le richieste del rework sono completate. Resta solo la decisione di Marco se
  passare la PR #1 da **draft a ready-for-review**.
