import React from 'react';
import PhoneFrame from './PhoneFrame.jsx';

export default function ScreenSections() {
  return (
    <>
  {/* SCREEN 01 — HOME */}
  <section className="border-b border-slate-800 bg-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-12 gap-12 items-center reveal">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="flex items-baseline gap-4 mb-6">
            <div className="font-display text-6xl font-light text-teal-300">01</div>
            <div className="font-body text-xs uppercase tracking-[0.25em] text-slate-500">Home</div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight">
            Il punto di partenza, <span className="italic text-amber-300">ogni giorno.</span>
          </h3>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            La home è la prima cosa che il cliente vede aprendo l'app. Una hero card personalizzata che ricorda
            chi è, da quanto tempo è con Alperia, e qual è il prossimo passo del suo percorso.
            Tutto il resto mette in evidenza il concorso stagionale attivo e i vantaggi immediatamente disponibili.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { title: 'Personalizzazione su nome, livello, tenure', desc: 'Il cliente si riconosce entro 2 secondi dall\'apertura' },
              { title: 'Progress bar verso il tier successivo', desc: 'Il reason-to-climb è visibile senza richiedere azioni' },
              { title: 'Concorso stagionale in hero card', desc: 'Un momento di sorpresa ricorrente, non una notifica passiva' },
            ].map((h, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-teal-900/60 border border-teal-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-300"></div>
                </div>
                <div>
                  <div className="font-body text-sm font-semibold text-slate-100 mb-0.5">{h.title}</div>
                  <div className="font-body text-sm text-slate-400 leading-relaxed">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-teal-500/20 bg-teal-950/20">
            <div className="font-body text-[10px] uppercase tracking-wider text-teal-300 font-semibold mb-2">Metriche di riferimento</div>
            <div className="font-body text-sm text-slate-200">MAU su iscritti attivi · tempo medio sulla home · click-through rate sulle hero card · conversione hero-concorso</div>
          </div>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
          <PhoneFrame screenId="home" />
        </div>
      </div>
    </div>
  </section>

  {/* SCREEN 02 — VANTAGGI */}
  <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-12 gap-12 items-center reveal">
        <div className="md:col-span-5 flex justify-center">
          <PhoneFrame screenId="rewards" />
        </div>

        <div className="md:col-span-7">
          <div className="flex items-baseline gap-4 mb-6">
            <div className="font-display text-6xl font-light text-amber-300">02</div>
            <div className="font-body text-xs uppercase tracking-[0.25em] text-slate-500">Vantaggi</div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight">
            Il catalogo <span className="italic text-amber-300">sempre aperto.</span>
          </h3>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            Il cuore tangibile del programma. Il cliente filtra per categoria (Sport, Cultura, Energia, Territorio)
            e trova sempre qualcosa di accessibile dal primo giorno. I vantaggi dei tier superiori sono visibili ma bloccati:
            la lock icon è un nudge intenzionale che crea aspirazione invece che frustrazione.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { title: 'Sconti always-on dal giorno zero', desc: 'La promessa «sei cliente, sei dentro» deve avere riscontro immediato' },
              { title: 'Filtri rapidi per categoria', desc: 'Scopribilità alta anche per utenti occasionali' },
              { title: 'Vantaggi premium in lock-view', desc: 'Driver di upgrade visibile, non abbattuto dall\'ignoranza del tier' },
            ].map((h, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-amber-900/40 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                </div>
                <div>
                  <div className="font-body text-sm font-semibold text-slate-100 mb-0.5">{h.title}</div>
                  <div className="font-body text-sm text-slate-400 leading-relaxed">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-950/20">
            <div className="font-body text-[10px] uppercase tracking-wider text-amber-300 font-semibold mb-2">Metriche di riferimento</div>
            <div className="font-body text-sm text-slate-200">Redemption rate sul catalogo · ripartizione per categoria · conversion lock-view → upgrade tier</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* SCREEN 03 — CONCORSO */}
  <section className="border-b border-slate-800 bg-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-12 gap-12 items-center reveal">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="flex items-baseline gap-4 mb-6">
            <div className="font-display text-6xl font-light text-orange-300">03</div>
            <div className="font-body text-xs uppercase tracking-[0.25em] text-slate-500">Concorso</div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight">
            Quattro momenti <span className="italic text-amber-300">emozionali</span> all'anno.
          </h3>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            Il layer dinamico del programma. Primavera, estate, autunno, inverno: quattro contest instant win che creano
            appuntamento e sfruttano le leve stagionali dell'energia. L'azione richiesta per partecipare è sempre duplice —
            gamificata per il cliente, ma di valore gestionale per Alperia (bolletta digitale, SDD, profilazione).
          </p>

          <div className="space-y-4 mb-8">
            {[
              { title: 'Instant win invece di collection punti', desc: 'Gratificazione immediata, semplicità per il target 55-65y (43% degli switcher)' },
              { title: 'Azioni di partecipazione = comportamenti di valore', desc: 'Ogni concorso converte engagement in KPI operativi misurabili' },
              { title: 'Countdown e finestra temporale', desc: 'L\'urgenza guida l\'apertura dell\'app anche fuori dai Momenti di Verità' },
            ].map((h, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-900/40 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-300"></div>
                </div>
                <div>
                  <div className="font-body text-sm font-semibold text-slate-100 mb-0.5">{h.title}</div>
                  <div className="font-body text-sm text-slate-400 leading-relaxed">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-orange-500/20 bg-orange-950/20">
            <div className="font-body text-[10px] uppercase tracking-wider text-orange-300 font-semibold mb-2">Metriche di riferimento</div>
            <div className="font-body text-sm text-slate-200">Tasso di partecipazione · % nuove attivazioni SDD da contest · nuovi opt-in bolletta digitale nel trimestre</div>
          </div>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
          <PhoneFrame screenId="contest" />
        </div>
      </div>
    </div>
  </section>

  {/* SCREEN 04 — LIVELLO */}
  <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-12 gap-12 items-center reveal">
        <div className="md:col-span-5 flex justify-center">
          <PhoneFrame screenId="tier" />
        </div>

        <div className="md:col-span-7">
          <div className="flex items-baseline gap-4 mb-6">
            <div className="font-display text-6xl font-light text-teal-300">04</div>
            <div className="font-body text-xs uppercase tracking-[0.25em] text-slate-500">Livello</div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight">
            Il percorso <span className="italic text-amber-300">di permanenza.</span>
          </h3>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            La visualizzazione del sistema tier nell'ottica del cliente. Tre livelli, due regole semplici (anzianità + commodity).
            Il cliente vede dove è, dove è arrivato, cosa gli manca per il prossimo step. Il call-to-action in fondo è specifico
            e azionabile — «Aggiungi il gas per diventare Gold» — non un generico «scopri di più».
          </p>

          <div className="space-y-4 mb-8">
            {[
              { title: 'Percorso cronologico chiaro', desc: 'Il tempo di permanenza diventa visibile come asset, non come routine' },
              { title: 'Regole immediate, zero calcoli di punti', desc: 'Allineato al principio «Sei cliente, sei dentro» della meccanica' },
              { title: 'CTA cross-sell personalizzata', desc: 'Il gap del cliente diventa proposta commerciale, non messaggio generico' },
            ].map((h, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-teal-900/60 border border-teal-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-300"></div>
                </div>
                <div>
                  <div className="font-body text-sm font-semibold text-slate-100 mb-0.5">{h.title}</div>
                  <div className="font-body text-sm text-slate-400 leading-relaxed">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-teal-500/20 bg-teal-950/20">
            <div className="font-body text-[10px] uppercase tracking-wider text-teal-300 font-semibold mb-2">Metriche di riferimento</div>
            <div className="font-body text-sm text-slate-200">Tier climb rate · conversione gas su Silver esposti a CTA · % Gold sulla popolazione attiva del programma</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* SCREEN 05 — PROFILO */}
  <section className="border-b border-slate-800 bg-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-12 gap-12 items-center reveal">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="flex items-baseline gap-4 mb-6">
            <div className="font-display text-6xl font-light text-amber-300">05</div>
            <div className="font-body text-xs uppercase tracking-[0.25em] text-slate-500">Profilo</div>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight">
            La relazione <span className="italic text-amber-300">a colpo d'occhio.</span>
          </h3>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            Il dashboard del cliente. Tre numeri sintetici (anni, vantaggi usati, livello) che trasformano la relazione in qualcosa di tangibile.
            Sotto, le forniture attive e il nudge persistente verso Gold. È anche il principale data entry point per arricchire la profilazione,
            elemento chiave per il CRM Alperia nell'ottica Oliver Wyman di contenimento churn.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { title: 'Relazione quantificata in tre numeri', desc: 'Crea senso di investimento reciproco invece che di contratto' },
              { title: 'Forniture aggregate visibili', desc: 'Il cliente Gold percepisce il valore del multi-commodity senza spiegazioni' },
              { title: 'Hub naturale per progressive profiling', desc: 'Ogni interazione è occasione per arricchire il CRM sotto consenso' },
            ].map((h, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-amber-900/40 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                </div>
                <div>
                  <div className="font-body text-sm font-semibold text-slate-100 mb-0.5">{h.title}</div>
                  <div className="font-body text-sm text-slate-400 leading-relaxed">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-950/20">
            <div className="font-body text-[10px] uppercase tracking-wider text-amber-300 font-semibold mb-2">Metriche di riferimento</div>
            <div className="font-body text-sm text-slate-200">% profili completi · consensi marketing attivi · % clienti multi-commodity tra iscritti · dati di profilazione aggiunti per sessione</div>
          </div>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
          <PhoneFrame screenId="profile" />
        </div>
      </div>
    </div>
  </section>

    </>
  );
}
