import React from 'react';
import { CheckCircle, AlertTriangle } from '../icons/index.jsx';

export default function Footer() {
  return (
    <>
  {/* FOOTER */}
  <section className="bg-slate-950">
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <div className="font-display text-3xl font-light text-slate-100 mb-2">Together <span className="italic text-amber-300">to get there.</span></div>
          <p className="font-body text-sm text-slate-400 leading-relaxed">
            «Alperia più» è progettato per essere il primo programma di engagement digitale di Alperia.
            Costruito sulla nuova app, integrato con il CRM esistente, dimensionato sui numeri di churn forniti da Oliver Wyman.
            Pronto per essere validato in un Pilot di tre mesi prima del rollout completo.
          </p>
        </div>
        <div>
          <div className="font-body text-xs uppercase tracking-wider text-slate-500 mb-3">I nostri principi di disegno</div>
          <ul className="space-y-2 font-body text-sm text-slate-300">
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" /> Tier semplici, niente accumulo punti — coerente con il target 55-65y</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" /> Webview SSO nell'app, zero attrito di registrazione</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" /> Comunicazione differenziata Alto Adige vs Nazionale</li>
            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" /> Misurazione causale via matched control group</li>
          </ul>
        </div>
        <div>
          <div className="font-body text-xs uppercase tracking-wider text-slate-500 mb-3">Fattori critici di successo</div>
          <ul className="space-y-2 font-body text-sm text-slate-300">
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /> Adesione &lt;25% comporta revisione del business case</li>
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /> Allineamento con il go-live dell'app a settembre 2026</li>
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /> Comparatori da introdurre solo dopo validazione Pilot</li>
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /> Validazione del valore €30/saved con il team Finance Alperia</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="font-body text-xs text-slate-500">
          Jakala per Alperia · Aprile 2026 · Proposta Programma «Alperia più»
        </div>
        <div className="font-body text-xs text-slate-500">
          Fonti dati: analisi del churn Oliver Wyman · portafoglio Alperia 01/03/2026 · benchmark loyalty energy europei
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
