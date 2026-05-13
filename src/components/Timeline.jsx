import React from 'react';

export default function Timeline() {
  return (
    <>
  {/* TIMELINE */}
  <section id="timeline" data-section="timeline" className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4">Timeline</div>
      <h2 className="font-display text-5xl font-light mb-3">Da qui a settembre 2027.</h2>
      <p className="font-body text-base text-slate-400 mb-12 max-w-3xl leading-relaxed">
        Diciotto mesi, quattro fasi, tre gate di validazione. La timeline è ancorata al lancio della nuova app Alperia di settembre 2026,
        che funge da veicolo di onboarding al programma per il bacino di clienti consenzienti.
      </p>

      <div className="relative">
        <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-teal-500/40 via-amber-400/40 to-teal-500/40 hidden md:block"></div>
        <div className="grid md:grid-cols-4 gap-6 reveal">
          {[
            { phase: 'F1', title: 'Foundation', period: 'Apr–Ago 2026', desc: 'Setup piattaforma Jakala, design del catalogo benefit, onboarding partner territoriali, integrazioni con CRM Alperia, Brevo e nuova app.', color: 'teal', dot: 'bg-teal-400' },
            { phase: 'F2', title: 'Pilot', period: 'Set–Dic 2026', desc: 'Lancio del programma in concomitanza con la nuova app. Perimetro Diretta Alto Adige + Web. Prime redemption Hockey Bolzano e museo Expea. Setup matched control group.', color: 'amber', dot: 'bg-amber-400' },
            { phase: 'F3', title: 'Rollout', period: 'Gen–Giu 2027', desc: 'Estensione a Diretta Nazionale, Web full e Agenzie Top-Tier. Misurazione del delta churn iscritti vs control group. Refresh business case.', color: 'amber', dot: 'bg-amber-400' },
            { phase: 'F4', title: 'Scale', period: 'Lug–Set 2027+', desc: 'Inclusione del canale Comparatori con regole anti-churn dedicate. Personalizzazione next-best-reward via ML. Programma Ambassador per advocacy avanzata.', color: 'teal', dot: 'bg-teal-400' },
          ].map((f, i) => (
            <div key={i} className="relative">
              <div className={`hidden md:block w-4 h-4 rounded-full ${f.dot} border-4 border-slate-900 absolute top-10 left-1/2 -translate-x-1/2 z-10`}></div>
              <div className="pt-20 md:pt-24">
                <div className="font-body text-[10px] uppercase tracking-wider text-slate-500 mb-1">{f.phase}</div>
                <div className="font-display text-2xl font-light text-slate-100 mb-1">{f.title}</div>
                <div className={`font-body text-xs font-semibold mb-3 text-${f.color}-300`}>{f.period}</div>
                <div className="font-body text-xs text-slate-400 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

    </>
  );
}
