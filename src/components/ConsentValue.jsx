import React from 'react';
import { Shield, Bell, Sparkles, TrendingUp } from '../icons/index.jsx';

/**
 * ConsentValue — sezione che evidenzia il valore aggiunto della raccolta dei
 * consensi privacy (richiesta cliente). Il programma non genera solo retention:
 * costruisce un asset di base dati consensata che abilita marketing, promozione
 * prodotti e comunicazione di iniziative dedicate.
 */
const LEVE = [
  {
    icon: Bell,
    title: 'Comunicazione diretta',
    body: 'Una base consensata permette di raggiungere i clienti con comunicazioni rilevanti su iniziative, eventi e novità — senza dipendere da media a pagamento.',
  },
  {
    icon: Sparkles,
    title: 'Promozione di prodotti',
    body: 'I consensi marketing abilitano campagne mirate sui servizi energy-related (Easycharge, fotovoltaico, wallbox) verso i segmenti più ricettivi.',
  },
  {
    icon: TrendingUp,
    title: 'Attività di marketing future',
    body: 'Profilazione e consensi alimentano cluster, personalizzazione e misurazione: ogni iniziativa successiva parte da una base più ricca e attivabile.',
  },
];

export default function ConsentValue() {
  return (
    <section id="consensi" data-section="consensi" className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-8 py-24 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              L'asset dei consensi
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
              Oltre la retention: <span className="italic text-amber-300">una base consensata</span> che lavora nel tempo.
            </h2>
            <p className="font-body text-base text-slate-300 leading-relaxed mb-6">
              Ogni iscrizione al programma è anche un'occasione per raccogliere — in modo trasparente e conforme —
              i consensi privacy. È il valore aggiunto meno visibile ma più strategico: trasforma «Alperia+» da
              programma di loyalty a <span className="text-slate-100 font-medium">motore di relazione</span>.
            </p>
            <p className="font-body text-sm text-slate-400 leading-relaxed">
              La piattaforma adotta privacy by design e by default (GDPR, ISO 27001): si raccoglie solo ciò che serve,
              con basi dati isolate per cliente. Il consenso resta del cliente — ma, una volta dato, abilita
              comunicazione, promozione e iniziative dedicate per gli anni a venire.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4 reveal">
            {LEVE.map((leva, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-teal-900/40 border border-teal-500/20 flex items-center justify-center mb-4">
                  <leva.icon className="w-5 h-5 text-teal-300" />
                </div>
                <div className="font-display text-lg text-slate-100 font-semibold mb-2">{leva.title}</div>
                <p className="font-body text-sm text-slate-400 leading-relaxed">{leva.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
