import React from 'react';
import {
  Bell, Sparkles, ChevronRight, ArrowRight, Shield, Zap, Heart, Mountain, Trophy,
  Calendar, MapPin, CheckCircle, Target, Award
} from '../icons/index.jsx';

// ============================================================================
// PHONE SCREENS — le schermate del programma «Alperia+» renderizzate da PhoneFrame.
// ----------------------------------------------------------------------------
// Design allineato alla nuova App / Area Clienti Alperia (ref. Figma cliente):
//   • tema CHIARO, sfondo bianco/slate-50, card arrotondate con bordo leggero
//   • header con wordmark «alperia» (lowercase) + icona notifiche
//   • Blu primario (#006593) per header e accenti · Arancione (#DB3700) per le CTA
//   • bottom-nav nello stile Area Clienti (vedi PhoneFrame)
// Le famiglie Tailwind sono rimappate sui colori istituzionali Alperia
// (teal→Blu, amber/orange→Arancione) — vedi tailwind.config.js.
//
// Ogni schermata sta in un frame 320×680 (safe-zone notch + bottom-nav).
// ============================================================================

/** Wordmark Alperia per l'header delle schermate (placeholder del logo ufficiale). */
function Wordmark({ tone = 'blu' }) {
  return (
    <span className={`font-display text-[15px] font-semibold tracking-tight ${tone === 'white' ? 'text-white' : 'text-teal-700'}`}>
      alperia
    </span>
  );
}

/** Header bianco standard Area Clienti: wordmark + titolo sezione + campanella. */
function AppHeader({ title }) {
  return (
    <div className="px-5 pt-11 pb-3 bg-white border-b border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <Wordmark />
        <Bell className="w-4 h-4 text-slate-400" />
      </div>
      {title && <div className="text-lg font-semibold text-slate-900">{title}</div>}
    </div>
  );
}

export const screens = {
  home: (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto">
      {/* Hero header blu (Panoramica) */}
      <div className="px-5 pt-11 pb-5 bg-gradient-to-br from-teal-700 to-teal-800 text-white rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <Wordmark tone="white" />
          <Bell className="w-4 h-4 opacity-80" />
        </div>
        <div className="text-xs opacity-80 mb-0.5">Buongiorno,</div>
        <div className="text-xl font-semibold mb-4">Marco Corsaro</div>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/15">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Programma Alperia+</div>
              <div className="text-2xl font-light flex items-center gap-2 mt-1">
                <Award className="w-5 h-5 text-white" />
                Livello Silver
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider opacity-70">Energy Point</div>
              <div className="text-lg font-semibold">1.240</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/15">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="opacity-80">Verso Gold</span>
              <span className="font-medium">Aggiungi gas</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 font-medium">In evidenza</div>
        <div className="bg-orange-50 rounded-2xl p-4 mb-5 border border-orange-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider text-orange-700 font-semibold mb-0.5">Concorso d'inverno</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Accendi la tua energia</div>
              <div className="text-xs text-slate-600 leading-tight">Partecipa entro il 15 dicembre e scopri se hai vinto un weekend in Val Pusteria</div>
              <div className="mt-2 flex items-center gap-1 text-orange-700 text-xs font-semibold">
                Partecipa ora <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 font-medium">I tuoi vantaggi</div>
        <div className="space-y-2">
          {[
            { icon: Trophy, label: 'Hockey Bolzano · 2 biglietti', sub: 'Match del 22 novembre' },
            { icon: Mountain, label: 'Museo Expea', sub: '4 ingressi + ospite' },
            { icon: Zap, label: 'Easycharge -20%', sub: 'Sconto attivazione' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center">
                <item.icon className="w-4 h-4 text-teal-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 truncate">{item.label}</div>
                <div className="text-[11px] text-slate-500 truncate">{item.sub}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  rewards: (
    <div className="h-full bg-slate-50 text-slate-900">
      <AppHeader title="I tuoi vantaggi" />
      <div className="px-5 py-3 bg-white border-b border-slate-100">
        <div className="text-xs text-slate-500">12 disponibili per il livello Silver</div>
      </div>
      <div className="px-5 py-4 flex gap-2 overflow-x-auto bg-white border-b border-slate-100">
        {['Tutti', 'Sport', 'Cultura', 'Energia', 'Territorio'].map((tag, i) => (
          <div key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${i === 0 ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
            {tag}
          </div>
        ))}
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {[
          { icon: Trophy, label: 'Hockey Bolzano', sub: '2 biglietti', tier: 'Silver+', color: 'teal' },
          { icon: Mountain, label: 'Museo Expea', sub: '4 ingressi', tier: 'Tutti', color: 'teal' },
          { icon: Zap, label: 'Easycharge', sub: '-20% attivazione', tier: 'Silver+', color: 'orange' },
          { icon: Shield, label: 'Lube Volley', sub: '1 biglietto', tier: 'Gold', color: 'teal', locked: true },
          { icon: Heart, label: 'FC Südtirol', sub: 'Match-day', tier: 'Gold', color: 'orange', locked: true },
          { icon: MapPin, label: 'Convenzioni AA', sub: 'Esercenti partner', tier: 'Silver+', color: 'emerald' },
        ].map((r, i) => (
          <div key={i} className={`bg-white rounded-2xl p-3 border border-slate-100 ${r.locked ? 'opacity-50' : ''}`}>
            <div className={`w-9 h-9 bg-${r.color}-50 rounded-lg flex items-center justify-center mb-2`}>
              <r.icon className={`w-4 h-4 text-${r.color}-700`} />
            </div>
            <div className="text-xs font-semibold text-slate-900 leading-tight mb-0.5">{r.label}</div>
            <div className="text-[10px] text-slate-500 mb-2">{r.sub}</div>
            <div className={`text-[9px] uppercase tracking-wider font-medium ${r.locked ? 'text-slate-400' : 'text-teal-700'}`}>
              {r.locked ? `🔒 ${r.tier}` : r.tier}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  tier: (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto">
      <AppHeader title="Il mio livello" />
      <div className="px-5 py-4">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-teal-700 to-teal-800 text-white mb-4">
          <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">Livello attuale</div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light flex items-center gap-2"><Award className="w-5 h-5" /> Silver</div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider opacity-70">Cliente da</div>
              <div className="text-base font-semibold">3 anni</div>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {[
            { name: 'Base', sub: '1 commodity, da subito', count: '2 vantaggi', active: false, done: true },
            { name: 'Silver', sub: '1 commodity, 12+ mesi', count: '4 vantaggi', active: true, done: false },
            { name: 'Gold', sub: '2+ commodity, 12+ mesi', count: '6 vantaggi', active: false, done: false },
          ].map((t, i) => (
            <div key={i} className={`rounded-2xl p-4 border ${t.active ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-100'} ${!t.active && !t.done ? 'opacity-70' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className={`w-4 h-4 ${t.active ? 'text-teal-700' : t.done ? 'text-teal-600' : 'text-slate-400'}`} />
                    <div className="text-base font-semibold text-slate-900">{t.name}</div>
                    {t.active && <div className="px-2 py-0.5 bg-teal-700 text-white text-[9px] uppercase tracking-wider font-bold rounded-full">Attuale</div>}
                    {t.done && <CheckCircle className="w-3.5 h-3.5 text-teal-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500">{t.sub}</div>
                </div>
                <div className="text-sm font-medium text-slate-700">{t.count}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-slate-900 mb-1">Aggiungi il gas per diventare Gold</div>
              <div className="text-[11px] text-slate-600 leading-tight">Sblocchi 2 vantaggi extra: Lube Volley e FC Südtirol match-day</div>
            </div>
          </div>
          <button className="mt-3 w-full py-2.5 bg-orange-600 text-white rounded-xl font-semibold text-xs">Scopri l'offerta gas</button>
        </div>
      </div>
    </div>
  ),
  tierBase: (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto">
      <AppHeader title="Benvenuto in Alperia+" />
      <div className="px-5 py-4">
        <div className="space-y-2.5">
          {[
            { name: 'Base', sub: '1 commodity, da subito', count: '2 vantaggi', active: true },
            { name: 'Silver', sub: '1 commodity, 12+ mesi', count: '4 vantaggi', active: false },
            { name: 'Gold', sub: '2+ commodity, 12+ mesi', count: '6 vantaggi', active: false },
          ].map((t, i) => (
            <div key={i} className={`rounded-2xl p-4 border ${t.active ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-100 opacity-70'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className={`w-4 h-4 ${t.active ? 'text-teal-700' : 'text-slate-400'}`} />
                    <div className="text-base font-semibold text-slate-900">{t.name}</div>
                    {t.active && <div className="px-2 py-0.5 bg-teal-700 text-white text-[9px] uppercase tracking-wider font-bold rounded-full">Attuale</div>}
                  </div>
                  <div className="text-[11px] text-slate-500">{t.sub}</div>
                </div>
                <div className="text-sm font-medium text-slate-700">{t.count}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-teal-50 border border-teal-100">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-slate-900 mb-1">Tra 9 mesi sei Silver</div>
              <div className="text-[11px] text-slate-600 leading-tight">Al compimento del primo anno con Alperia il tuo livello sale automaticamente</div>
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-2xl bg-white border border-slate-100">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-medium">Subito disponibili</div>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-slate-50 rounded-xl">
              <Mountain className="w-4 h-4 text-teal-700 mb-1" />
              <div className="text-[11px] font-medium text-slate-900">Museo Expea</div>
              <div className="text-[10px] text-slate-500">1 ingresso</div>
            </div>
            <div className="flex-1 p-3 bg-slate-50 rounded-xl">
              <Sparkles className="w-4 h-4 text-orange-600 mb-1" />
              <div className="text-[11px] font-medium text-slate-900">Concorso</div>
              <div className="text-[10px] text-slate-500">Stagionale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  tierGold: (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto">
      <AppHeader title="Alperia+ Gold" />
      <div className="px-5 py-4">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-teal-700 to-teal-900 text-white mb-4">
          <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">Inner circle</div>
          <div className="text-2xl font-light flex items-center gap-2"><Trophy className="w-5 h-5" /> Gold</div>
          <div className="text-[11px] opacity-80 mt-1">Sei al massimo livello del programma</div>
        </div>

        <div className="space-y-2.5">
          {[
            { name: 'Base', sub: 'Completato', count: '2 vantaggi', done: true },
            { name: 'Silver', sub: 'Completato', count: '4 vantaggi', done: true },
            { name: 'Gold', sub: '2+ commodity · 12+ mesi', count: '6 vantaggi', active: true },
          ].map((t, i) => (
            <div key={i} className={`rounded-2xl p-4 border ${t.active ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-100'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className={`w-4 h-4 ${t.active ? 'text-teal-700' : 'text-teal-600'}`} />
                    <div className="text-base font-semibold text-slate-900">{t.name}</div>
                    {t.active && <div className="px-2 py-0.5 bg-teal-700 text-white text-[9px] uppercase tracking-wider font-bold rounded-full">Attuale</div>}
                    {t.done && <CheckCircle className="w-3.5 h-3.5 text-teal-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500">{t.sub}</div>
                </div>
                <div className="text-sm font-medium text-slate-700">{t.count}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <div className="flex items-start gap-3">
            <Trophy className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-slate-900 mb-1">Tutti i vantaggi sbloccati</div>
              <div className="text-[11px] text-slate-600 leading-tight">4 biglietti Hockey Bolzano, 2 Lube Volley, match-day FC Südtirol, accesso VIP museo Expea, convenzioni esclusive</div>
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-2xl bg-teal-50 border border-teal-100">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-3 h-3 text-teal-700" />
            <div className="text-[10px] uppercase tracking-wider text-teal-700 font-semibold">Ambassador</div>
          </div>
          <div className="text-[11px] text-slate-600 leading-tight">Riceverai inviti a eventi privati Alperia: anniversari, lanci, sustainability day</div>
        </div>
      </div>
    </div>
  ),
  contest: (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto">
      <AppHeader title="Concorso stagionale" />
      <div className="px-5 pt-4">
        <div className="text-xl font-semibold mb-1">Accendi la tua energia invernale</div>
        <div className="text-xs text-slate-600">Vinci un weekend in Val Pusteria per due persone</div>
      </div>

      <div className="mx-5 my-4 aspect-video rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-3 left-3 w-20 h-20 rounded-full bg-white/30 blur-2xl"></div>
          <div className="absolute bottom-3 right-3 w-24 h-24 rounded-full bg-orange-400/40 blur-2xl"></div>
        </div>
        <Mountain className="w-16 h-16 text-white/80 relative z-10" />
      </div>

      <div className="px-5 space-y-3 pb-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2">Come partecipi</div>
          <div className="space-y-2">
            {['Imposta la bolletta digitale', 'Attiva l\'addebito SDD', 'Tocca "Partecipa" qui sotto'].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</div>
                <div className="text-xs text-slate-700">{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Tempo rimasto</div>
            <Calendar className="w-3 h-3 text-slate-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{n: '12', l: 'giorni'}, {n: '04', l: 'ore'}, {n: '37', l: 'min'}].map((t, i) => (
              <div key={i} className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="text-xl font-bold text-slate-900">{t.n}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-500">{t.l}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-3.5 bg-orange-600 text-white rounded-2xl font-semibold text-sm shadow-lg shadow-orange-600/20">
          Partecipa al concorso
        </button>
      </div>
    </div>
  ),
  profile: (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto">
      <div className="px-5 pt-11 pb-5 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <Wordmark />
          <Bell className="w-4 h-4 text-slate-400" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center text-lg font-semibold">MC</div>
          <div className="flex-1">
            <div className="text-base font-semibold">Marco Corsaro</div>
            <div className="text-xs text-slate-500">Cliente Alperia da settembre 2023</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="text-lg font-bold text-teal-700">3</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Anni</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="text-lg font-bold text-teal-700">7</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Vantaggi usati</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="text-lg font-bold text-orange-600">Silver</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Livello</div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2">Le tue forniture</div>
        {[
          { label: 'Energia elettrica', sub: 'Via Roma 12, Bolzano', icon: Zap, color: 'orange' },
          { label: 'Easycharge wallbox', sub: 'Attivata 8 mesi fa', icon: Shield, color: 'emerald' },
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3">
            <div className={`w-9 h-9 bg-${f.color}-50 rounded-lg flex items-center justify-center`}>
              <f.icon className={`w-4 h-4 text-${f.color}-700`} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{f.label}</div>
              <div className="text-[11px] text-slate-500">{f.sub}</div>
            </div>
          </div>
        ))}

        <div className="mt-4 p-4 rounded-2xl bg-teal-50 border border-teal-100">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-slate-900 mb-1">Consensi e privacy</div>
              <div className="text-[11px] text-slate-600 leading-tight">Gestisci i consensi marketing per ricevere iniziative e vantaggi dedicati</div>
            </div>
          </div>
        </div>

        <div className="mt-2 p-4 rounded-2xl bg-orange-50 border border-orange-100">
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-slate-900 mb-1">Diventa Gold con il gas</div>
              <div className="text-[11px] text-slate-600 leading-tight">Aggiungi la fornitura gas e accedi a 2 vantaggi premium aggiuntivi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
