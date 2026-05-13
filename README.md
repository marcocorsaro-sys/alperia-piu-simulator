# Alperia più · Simulator

> **Non una proposta. Uno strumento.**
>
> Proposal tool interattivo per il programma loyalty di Alperia. Sviluppato da Jakala su
> commessa Alperia, aprile 2026. Basato sui numeri di churn forniti da Oliver Wyman e
> sul portafoglio retail Alperia al 1 marzo 2026.

---

## Quick start

```bash
npm install
npm run dev      # dev server su http://localhost:5173
npm run build    # build production in dist/
npm run preview  # preview del build su http://localhost:4173
```

Nessun backend, nessuna env var. Apri `npm run dev` e sei operativo.

---

## Filosofia del progetto

Questo progetto nasce come evoluzione di una **presentazione HTML statica** verso uno
**strumento decisionale vivo**. La differenza vale il costo della proposta:

- **Un PDF** è un documento morto: se vuoi cambiare un parametro, rifai le slide.
- **Un simulatore** è un asset: il committente può modificare le assumption, vedere il
  business case reagire in tempo reale, salvare scenari, confrontarli.

Per questo:
- Tutti i **numeri del business case sono in `src/utils/formulas.js`** (funzioni pure).
- Le **assumptions di partenza sono in `src/data/assumptions.js`** (KPI + scenari).
- Il **simulatore è in `src/components/BusinessCaseSim.jsx`** con 8 slider interattivi.
- La **cover page (`Cover.jsx`)** posiziona il tool stesso come differenziatore della proposta.

---

## Architettura

```
alperia-piu-simulator/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                      # React entry
    ├── App.jsx                       # Orchestrazione sezioni
    ├── index.css                     # Tailwind + animations
    ├── data/
    │   └── assumptions.js            # DEFAULT_KPIS, SCENARIOS, KPI_CONFIG
    ├── utils/
    │   └── formulas.js               # runBusinessCase(), NPV, ROI, break-even
    ├── hooks/
    │   ├── useBusinessCase.js        # state reattivo + calcoli
    │   ├── useScrollReveal.js        # IntersectionObserver con fallback
    │   └── useActiveSection.js       # tracking sezione attiva per nav
    ├── icons/
    │   └── index.jsx                 # 26 icone Lucide inline (SVG)
    └── components/
        ├── Cover.jsx                 # Copertina con NPV live
        ├── StickyNav.jsx             # Nav fissa con active section
        ├── Hero.jsx                  # "Alperia più" + 3 KPI
        ├── Brand.jsx                 # Logo lockup + palette + voice
        ├── ExperienceIntro.jsx       # "Cinque momenti, cinque leve"
        ├── ScreenSections.jsx        # 5 sezioni demo (01-05)
        ├── PhoneFrame.jsx            # Frame mobile riusabile
        ├── PhoneScreens.jsx          # 7 schermate dell'app
        ├── TierSystem.jsx            # 3 deep-dive (Base/Silver/Gold)
        ├── BusinessCaseSim.jsx       # ⭐ Simulator con slider + chart
        ├── KpiSlider.jsx             # Slider riusabile
        ├── BusinessCaseTable.jsx     # P&L 3Y statica (reference)
        ├── CostValue.jsx             # Architettura economica
        ├── ReferenceCases.jsx        # E.ON, Acea, Enel, NeN, Plenitude
        ├── Timeline.jsx              # Roadmap 18 mesi
        └── Footer.jsx                # Principi disegno + fattori di successo
```

---

## Come modificare il business case

### Modificare un KPI di default

Apri `src/data/assumptions.js` e modifica `DEFAULT_KPIS`:

```js
export const DEFAULT_KPIS = {
  adesione: 0.40,              // ← cambia qui
  riduzioneChurnRel: 0.05,     // ← o qui
  valorePerSaved: 30,          // ← o qui
  // ...
};
```

Tutti i calcoli del simulator e la copertina si aggiornano automaticamente.

### Aggiungere un nuovo scenario

Nello stesso file, aggiungi un nuovo entry a `SCENARIOS`:

```js
export const SCENARIOS = {
  // ...
  realistico_pessimista: {
    label: 'Realistico pessimista',
    description: 'Adesione flat, churn difficile da intaccare',
    accent: 'rose',
    overrides: {
      adesione: 0.30,
      riduzioneChurnRel: 0.04,
    },
  },
};
```

Apparirà automaticamente come pill cliccabile nel simulator.

### Aggiungere un nuovo slider

In `KPI_CONFIG` di `assumptions.js`:

```js
export const KPI_CONFIG = {
  // ...
  nuovoKpi: {
    label: 'Mio nuovo KPI',
    hint: 'Descrizione breve per l\'utente',
    min: 0,
    max: 100,
    step: 1,
    format: (v) => `${v}%`,
    category: 'adozione',  // o 'retention', 'economics', 'costi'
  },
};
```

Lo slider apparirà automaticamente nella sezione del simulatore. Ricordati di
referenziarlo nelle formule (`src/utils/formulas.js`) se deve influenzare i calcoli.

### Modificare le formule di calcolo

`src/utils/formulas.js` contiene tutte le funzioni pure del business case. Sono
deterministiche e unit-testabili. Modifica `calc3YearModel()` per cambiare:

- Ramp curve (attualmente `[0.6, 1.0, 1.1]` per benefici/costi anno 1/2/3)
- Calcolo del valore cross-sell (attualmente `attivi × uplift × ARPU × 0.25`)
- Calcolo dell'asset dato (attualmente lineare sugli iscritti)

---

## Design system

**Palette** (`tailwind.config.js`):
- Midnight `#020617` — base dark
- Dolomite Teal `#2EB5BC` — primario, territorio
- Alpine Gold `#E8B842` — accento, valore
- Warm White `#F7F4EE` — sfondi chiari
- Signal Coral `#E97062` — alert, urgenza

**Typography** (Google Fonts):
- **Fraunces** — display, editoriale (headline, numeri grandi)
- **DM Sans** — body, neutro (copy, UI elements)

**Animations** (`src/index.css`):
- `.reveal` + `.is-visible` — scroll-driven fade-up via IntersectionObserver
- `.float-slow` — oscillazione verticale per elementi decorativi
- `.pulse-soft` — pulsazione opacity per valori live
- `.kpi-slider` — thumb custom gold con halo hover

---

## Note per Claude Code

Il progetto è pensato per essere iterato in Claude Code. Alcuni suggerimenti:

1. **Non toccare `formulas.js` senza test**. Le funzioni sono pure; aggiungi test prima
   di rifattorizzare (`vitest` non è ancora installato — `npm i -D vitest` per attivarlo).

2. **I componenti sono intenzionalmente verbosi** (JSX ricco inline). Non rifattorizzare
   in astrazioni premature — i deliverable di pitch cambiano spesso e l'astrazione costa.

3. **Le icone sono SVG inline** in `src/icons/index.jsx`. Per aggiungerne nuove, pesca
   da https://lucide.dev e wrappa con `iconBase()`.

4. **Tailwind safelist** in `tailwind.config.js` contiene i colori dinamici
   (es. `bg-${color}-500`). Se aggiungi nuovi colori dinamici, aggiornalo o non verranno
   inclusi nel build.

5. **La sezione `BusinessCaseTable.jsx` ha numeri hardcoded** (`€325K`, `€550K` etc.)
   riflettendo lo scenario Base. Non si aggiornano col simulator — è una reference fissa.
   Se vuoi farli reattivi, connetti il componente a `useBusinessCase()` e rimuovi gli
   hardcoded.

---

## Roadmap possibile

Cose utili da aggiungere, in ordine di priorità:

- [ ] **Export PDF** del business case correntemente configurato (es. tramite html2pdf.js)
- [ ] **Salvataggio scenari custom** in localStorage, con nome e timestamp
- [ ] **Condivisione scenario via URL** (query params con i KPI correnti)
- [ ] **Confronto side-by-side** di 2+ scenari
- [ ] **Sensitivity analysis automatica**: tabella tornado su ogni KPI
- [ ] **Test automatici** per le formule (`vitest`)
- [ ] **Italiano/Inglese** toggle per presentazioni internazionali
- [ ] **Stampa** con media query (@print) per versione PDF-friendly
- [ ] **Dark/light mode** (attualmente solo dark)

---

## Deploy

Il progetto è un'app statica. Si può deployare ovunque: Vercel, Netlify, Cloudflare Pages,
GitHub Pages, o un semplice nginx.

```bash
npm run build
# dist/ contiene l'app production-ready
```

Per Vercel:

```bash
vercel --prod
```

---

## Fonti dati

- **Churn cumulativo per canale**: analisi Oliver Wyman, marzo 2026
- **Portafoglio retail**: Alperia, snapshot 01/03/2026 (527.434 clienti totali,
  455.328 sui 5 canali core)
- **Benchmark loyalty energy**: esperienza Jakala su E.ON Energia Vincente, Acea con Te,
  Enel EneltiPremia, NeN Radici, Plenitude Insieme
- **Economics e costi**: KPI gestionali Alperia + benchmark Jakala per costo piattaforma/reward

---

## Versione

`v0.8.0` — versione iniziale del simulator, baseline equivalente alla **v8 della
presentazione statica** consegnata separatamente come HTML singolo.

---

## License

Proprietary. Jakala per Alperia, aprile 2026. Non distribuire senza autorizzazione.
