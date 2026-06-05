import React from 'react';
import { MapPin, Sparkles, Calendar, Gift } from '../icons/index.jsx';

/**
 * ProgramIntro — sezione introduttiva (richiesta cliente).
 * Contestualizza gli obiettivi del programma Loyalty Alperia e il valore della
 * proposta Jakala. Il paragrafo centrale è copy approvato dal cliente: NON modificare.
 */
const INIZIATIVE = [
  { icon: MapPin, label: 'Visita ai punti vendita', sub: 'Incentivare il traffico in store' },
  { icon: Sparkles, label: 'Sponsorizzazioni', sub: 'Valorizzare le opportunità di brand' },
  { icon: Calendar, label: 'Eventi esclusivi', sub: 'Promuovere la partecipazione' },
  { icon: Gift, label: 'Premi fisici', sub: 'Offrire benefici tangibili' },
];

export default function ProgramIntro() {
  return (
    <section id="intro" data-section="intro" className="border-b border-slate-800 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-8 py-24 relative">
        <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4 reveal">
          Il programma · Obiettivi & valore della proposta
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-light mb-10 leading-tight max-w-4xl reveal">
          Una piattaforma dedicata <span className="italic text-amber-300">per fidelizzare,</span> in modo scalabile.
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Copy cliente (verbatim) */}
          <div className="lg:col-span-7 reveal">
            <p className="font-display text-xl md:text-2xl text-slate-200 leading-relaxed font-light">
              Alperia intende avviare una serie di iniziative finalizzate a rafforzare la fidelizzazione dei clienti,
              incentivando la visita ai punti vendita, valorizzando le opportunità derivanti dalle sponsorizzazioni,
              promuovendo la partecipazione a eventi esclusivi e offrendo premi fisici.
            </p>
            <p className="font-body text-base text-slate-400 leading-relaxed mt-6">
              Per gestire queste attività in modo efficace, scalabile e centralizzato, risulta necessario dotarsi di una
              piattaforma dedicata per la gestione del programma e dell'erogazione dei benefici ai clienti.
            </p>
            <p className="font-display italic text-2xl text-teal-200 leading-snug mt-8 pl-5 border-l-2 border-amber-400/60">
              La proposta Jakala nasce per rispondere a questa esigenza.
            </p>
          </div>

          {/* Iniziative */}
          <div className="lg:col-span-5 space-y-3 reveal">
            <div className="font-body text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3">
              Le iniziative da abilitare
            </div>
            {INIZIATIVE.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/40">
                <div className="w-11 h-11 rounded-xl bg-teal-900/40 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <div className="font-body font-semibold text-slate-100">{item.label}</div>
                  <div className="font-body text-xs text-slate-400">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
