import React from 'react';
import { Target } from '../icons/index.jsx';

export default function ReferenceCases() {
  return (
    <>
  {/* REFERENCE CASES */}
  <section id="cases" data-section="cases" className="border-b border-slate-800 bg-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4 reveal">Esperienza Jakala nel settore energy</div>
      <h2 className="font-display text-5xl font-light mb-3 leading-tight reveal">
        Cinque programmi loyalty, <span className="italic text-amber-300">un know-how replicabile.</span>
      </h2>
      <p className="font-body text-base text-slate-400 mb-12 max-w-3xl leading-relaxed reveal">
        Jakala gestisce oggi i programmi di fidelizzazione dei principali player energy italiani. La piattaforma, i workflow e il team che proponiamo per
        Alperia sono la stessa infrastruttura — ottimizzata e ripetibile, tarata sulle specificità del vostro mercato e canale.
      </p>

      <div className="grid md:grid-cols-2 gap-5 reveal">
        {[
          {
            client: 'E.ON',
            program: 'Energia Vincente',
            tag: 'Live · giu 2025 — dic 2026',
            cb: '550K clienti',
            challenge: 'Incrementare fedeltà della customer base e incentivare nuove attivazioni commodity.',
            solution: 'Programma loyalty su piattaforma JNext con FE custom. Giftcard come reward principale (>95%). Hub evolutivo: da loyalty a contenitore di contest instant win e cashback.',
            accent: 'teal',
          },
          {
            client: 'Acea',
            program: 'Acea con Te',
            tag: 'Live',
            cb: 'Multi-utility',
            challenge: 'Aumentare awareness di marchio e tasso di ingaggio su prodotti/servizi, oltre a fidelizzazione.',
            solution: 'Collezionamento punti con missioni (profiling, core, engagement, sostenibilità). Punti status per ageing + forniture + mission. Concorso mensile «Emozioni da prima fila». Flash Offer periodiche.',
            accent: 'amber',
          },
          {
            client: 'Enel Energia',
            program: 'EneltiPremia',
            tag: 'Live · tecnologia JNext',
            cb: 'Customer base domestica',
            challenge: 'Incrementare LTV su customer base, attivare prodotti extra-commodity, attrarre prospect su mercato libero.',
            solution: 'Club tri-tier basato su ageing + forniture + acquisti extra. Punti virtuosi, coupon crescenti, concorsi periodici con giocate per tier. Accesso «light» per prospect.',
            accent: 'teal',
          },
          {
            client: 'NeN (Gruppo A2A)',
            program: 'Radici',
            tag: 'Live · mag 2025',
            cb: 'Clienti NeN',
            challenge: 'Coinvolgere clienti con meccaniche interattive (MGM, quiz), incrementare sottoscrizioni luce/gas, premiare ageing.',
            solution: 'Back-end JNext + Front-end custom. Integrazione Zendesk-Salesforce per CC di 2° livello. Dashboard PBI per KPI. Sconti progressivi su anzianità.',
            accent: 'amber',
          },
          {
            client: 'Plenitude',
            program: 'Plenitude Insieme',
            tag: 'Live',
            cb: 'Multi-segmento',
            challenge: 'Rafforzare fidelizzazione e raccontare il riposizionamento brand.',
            solution: 'Livelli basati su punti (benvenuto, mensili, delight, azioni). Vantaggi crescenti con partnership e sconti. Contest mensili + «gioca la tua bolletta» per coinvolgimento continuo.',
            accent: 'teal',
          },
          {
            client: 'Alperia',
            program: 'Alperia più',
            tag: 'In proposta · lancio set 2026',
            cb: '455K retail core',
            challenge: 'Ridurre churn nei Momenti di Verità identificati da Oliver Wyman, aumentare valore percepito oltre il prezzo, valorizzare la nuova app.',
            solution: 'Tier system tenure + commodity-based (Base / Silver / Gold), vantaggi territoriali Alto Adige, 4 contest instant win stagionali, webview SSO nella nuova app.',
            accent: 'amber',
            highlight: true,
          },
        ].map((c, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-7 ${c.highlight ? 'border-amber-300/40 bg-gradient-to-br from-amber-950/20 via-slate-900/60 to-slate-900/40' : 'border-slate-800 bg-slate-900/40'}`}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className={`font-body text-[10px] uppercase tracking-[0.2em] font-semibold mb-1 ${c.accent === 'amber' ? 'text-amber-300' : 'text-teal-300'}`}>
                  {c.client}
                </div>
                <div className="font-display text-2xl text-slate-100 font-light">{c.program}</div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">{c.tag}</div>
                <div className="font-body text-xs text-slate-300 font-medium">{c.cb}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Challenge</div>
              <p className="font-body text-sm text-slate-300 leading-relaxed">{c.challenge}</p>
            </div>

            <div>
              <div className={`font-body text-[10px] uppercase tracking-wider font-semibold mb-1.5 ${c.accent === 'amber' ? 'text-amber-300' : 'text-teal-300'}`}>
                Solution
              </div>
              <p className="font-body text-sm text-slate-300 leading-relaxed">{c.solution}</p>
            </div>

            {c.highlight && (
              <div className="mt-5 pt-4 border-t border-amber-500/20 flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-body text-xs text-amber-200 italic">La nostra proposta per voi</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 reveal">
        <div>
          <div className="font-display text-xl text-slate-100 font-semibold mb-1">Stessa piattaforma, stesso team</div>
          <p className="font-body text-sm text-slate-400 max-w-2xl">
            La piattaforma JNext è la stessa che alimenta Enel, E.ON, NeN e gli altri programmi in produzione.
            L'investimento di Alperia è su un asset consolidato, non su un'infrastruttura da collaudare.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="font-display text-3xl font-light text-amber-300">170+</div>
            <div className="font-body text-xs text-slate-500 uppercase tracking-wider">Team Jakala</div>
          </div>
          <div className="w-px h-12 bg-slate-700"></div>
          <div className="text-right">
            <div className="font-display text-3xl font-light text-teal-300">5</div>
            <div className="font-body text-xs text-slate-500 uppercase tracking-wider">Clienti energy attivi</div>
          </div>
        </div>
      </div>
    </div>
  </section>

    </>
  );
}
