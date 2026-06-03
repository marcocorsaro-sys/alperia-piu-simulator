# Context per Claude Code

> ⚠️ **Stato lavori in corso:** è in corso il rework v0.9 (mail team Engagement).
> Leggi **`REWORK_STATUS.md`** per stato, numeri del Business Case ufficiale,
> palette istituzionale Alperia, decisioni prese e TODO aperti (logo PNG + mockup Figma).
> Branch: `claude/elegant-darwin-hlk9x` · PR #1 (draft).

Questo file è un brief per Claude Code che ti aiuta a capire l'origine e l'intento del
progetto. Leggilo prima di iniziare una sessione.

## Cosa è questo progetto

**Alperia più Simulator** è il tool interattivo di supporto alla proposta Jakala per il
programma loyalty di Alperia (energy retail italiano, base 455K clienti retail core, HQ
Alto Adige). Il tool nasce come evoluzione di una presentazione HTML statica — lo scopo
è **spostare il pitch da "documento morto" a "strumento vivo"** che il committente possa
esplorare modificando le assumption.

## Origine

Il progetto è stato avviato da Marco Corsaro (Jakala MD Business Line Activation) in
una chat con Claude, in 8 iterazioni progressive:

1. **v1** — Workbook Excel con business case completo (11 sheet, 353 formule) —
   salvato a parte come `Alperia_Loyalty_Program_Design.xlsx`
2. **v2-v3** — Discussione KPI: €30 margine/saved, 5% riduzione churn relativa
3. **v4** — Presentazione JSX React con mockup app + business case + cost vs value
4. **v5** — Refinement copy con voce Jakala → Management Alperia, citazione Oliver Wyman
5. **v6** — Conversione in HTML standalone con CDN
6. **v7** — HTML completamente offline con React/Tailwind/CSS inline
7. **v8** — Aggiunte: sticky nav + scroll animations + brand identity + tier deep-dive + reference cases
8. **v0.8 (questo progetto)** — Refactor in progetto Vite+React con simulatore interattivo
   e cover page che posiziona il tool come asset della proposta

I file HTML v7 e v8 sono nella cartella di origine come reference — sono funzionanti
e rappresentano l'output finale di tipo "presentazione statica".

## Dati di riferimento (già hardcoded in `assumptions.js`)

- **Portafoglio retail**: 455.328 clienti sui 5 canali core (01/03/2026)
- **Addressable con consenso**: 250.267 (stima basata su % consensi x % profilazione)
- **Churn 12m ponderato**: 15,06% (media pesata sui 5 canali)
- **Switch-out marzo 2026**: 6.036 clienti (fonte Alperia)
- **Scenario Base**: 40% adesione, 55% attivazione, 5% riduzione churn relativa, €30/saved

## Obiettivi user experience

Il tool deve comunicare **tre cose**, in ordine di priorità:

1. **Credibilità dei numeri** — tutti i calcoli sono tracciabili, le formule sono pure,
   le assumption sono esposte e modificabili
2. **Capacità strategica di Jakala** — 5 reference case energy (E.ON, Acea, Enel, NeN,
   Plenitude), palette e typography coerenti, copy in voce consulenziale senior
3. **Differenziazione vs presentazione PPT** — il tool è l'argomento di vendita: può
   essere consegnato al committente come asset, non come documento

## Vincoli da rispettare

- **Lingua italiana** nel copy user-facing (i comment di codice possono essere in inglese)
- **Citare Oliver Wyman** come fonte dati churn (già fatto in Cover + BusinessCaseSim)
- **Voce Jakala → Management** (seconda persona plurale: "vi proponiamo", "la vostra app")
- **Numeri sempre formattati EU**: `€1.200` (punto migliaia), `15,06%` (virgola decimale)
- **Palette**: non introdurre colori fuori palette (vedi tailwind.config.js)
- **Font**: Fraunces (display) + DM Sans (body) — non sostituire

## Cose che NON devi fare senza chiederlo a Marco

- Aggiungere analytics tracking (no Google Analytics, no Mixpanel, niente)
- Modificare i numeri Oliver Wyman o del portafoglio Alperia (sono fonti esterne)
- Introdurre dipendenze pesanti (bundle size obiettivo: <1MB gzipped)
- Rifattorizzare `formulas.js` senza accompagnare con test
- Rimuovere sezioni esistenti senza spiegarmi perché

## Cose che puoi fare liberamente

- Aggiungere nuovi componenti (es. tabella sensitivity, salvataggio scenari)
- Migliorare animazioni, micro-interaction, accessibility
- Aggiungere test (`vitest` consigliato)
- Introdurre TypeScript se serve (attualmente JS/JSX)
- Migliorare performance (memoization, code splitting)
- Fixare bug che trovi

## Comandi utili

```bash
npm run dev       # dev server con HMR
npm run build     # production build
npm run preview   # test del build
```

## Deploy suggerito

Vercel o Netlify. Nessun backend, nessun database, nessun env var.

## Contatto utente

Marco Corsaro — Jakala — preferenza comunicativa: italiano, diretto, numeri prima di
narrativa. Usa Claude Code su Mac Mini M4 come ambiente di sviluppo principale.
