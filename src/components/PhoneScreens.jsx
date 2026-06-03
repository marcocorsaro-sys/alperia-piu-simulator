import React from 'react';
import {
  Bell, Sparkles, ChevronRight, ArrowRight, Shield, Zap, Heart, Mountain, Trophy,
  Calendar, MapPin, CheckCircle, Target, Award
} from '../icons/index.jsx';

// ============================================================================
// PHONE SCREENS — le 7 schermate che PhoneFrame può renderizzare.
// ----------------------------------------------------------------------------
// Ogni schermata è un blocco JSX completo, progettato per stare dentro un
// frame 320×680 (con safe-zone per notch in alto e bottom-nav in basso).
//
// Aggiungere nuove schermate: definire qui e aggiornare PhoneFrame navItems
// se si vuole farle apparire nel tab bar.
// ============================================================================
export const screens = {
  home: (
    <div className="h-full bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="px-5 pt-12 pb-4 bg-gradient-to-br from-teal-700 to-teal-900 text-white rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs opacity-80">Alto Adige · Bolzano</div>
          <Bell className="w-4 h-4 opacity-80" />
        </div>
        <div className="text-xs opacity-70 mb-1">Buongiorno,</div>
        <div className="text-xl font-semibold mb-3">Marco Corsaro</div>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Il tuo livello</div>
              <div className="text-2xl font-light flex items-center gap-2 mt-1">
                <Award className="w-5 h-5 text-amber-300" />
                Silver
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider opacity-70">Cliente da</div>
              <div className="text-lg font-medium">3 anni</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/15">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="opacity-80">Verso Gold</span>
              <span className="text-amber-300 font-medium">Aggiungi gas</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 font-medium">In evidenza</div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 mb-4 border border-amber-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-0.5">Concorso d'inverno</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Accendi la tua energia</div>
              <div className="text-xs text-slate-600 leading-tight">Partecipa entro il 15 dicembre e scopri se hai vinto un weekend in Val Pusteria</div>
              <div className="mt-2 flex items-center gap-1 text-amber-700 text-xs font-medium">
                Partecipa ora <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 font-medium">I tuoi vantaggi</div>
        <div className="space-y-2">
          {[
            { icon: Trophy, color: 'teal', label: 'Hockey Bolzano · 2 biglietti', sub: 'Match del 22 novembre' },
            { icon: Mountain, color: 'orange', label: 'Museo Expea', sub: '4 ingressi + ospite' },
            { icon: Zap, color: 'amber', label: 'Easycharge -20%', sub: 'Sconto attivazione' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3">
              <div className={`w-9 h-9 bg-${item.color}-50 rounded-lg flex items-center justify-center`}>
                <item.icon className={`w-4 h-4 text-${item.color}-700`} />
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
      <div className="px-5 pt-12 pb-3 bg-white">
        <div className="text-lg font-semibold">I tuoi vantaggi</div>
        <div className="text-xs text-slate-500 mt-0.5">12 disponibili per il livello Silver</div>
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
          { icon: Mountain, label: 'Museo Expea', sub: '4 ingressi', tier: 'Tutti', color: 'orange' },
          { icon: Zap, label: 'Easycharge', sub: '-20% attivazione', tier: 'Silver+', color: 'amber' },
          { icon: Shield, label: 'Lube Volley', sub: '1 biglietto', tier: 'Gold', color: 'rose', locked: true },
          { icon: Heart, label: 'FC Südtirol', sub: 'Match-day', tier: 'Gold', color: 'red', locked: true },
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
    <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-y-auto">
      <div className="px-5 pt-12 pb-6">
        <div className="text-xs opacity-60 mb-1">Il tuo percorso</div>
        <div className="text-2xl font-light mb-6">Cresci con Alperia</div>

        <div className="space-y-3">
          {[
            { name: 'Base', sub: '1 commodity, da subito', count: '2 vantaggi', active: false, done: true, color: 'slate' },
            { name: 'Silver', sub: '1 commodity, 12+ mesi', count: '4 vantaggi', active: true, done: false, color: 'teal' },
            { name: 'Gold', sub: '2+ commodity, 12+ mesi', count: '6 vantaggi', active: false, done: false, color: 'amber' },
          ].map((t, i) => (
            <div key={i} className={`rounded-2xl p-4 ${t.active ? 'bg-gradient-to-br from-teal-700 to-teal-800 border border-teal-500/30' : t.done ? 'bg-white/5 border border-white/10' : 'bg-white/5 border border-white/10 opacity-60'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className={`w-4 h-4 ${t.active ? 'text-amber-300' : t.done ? 'text-teal-400' : 'text-slate-400'}`} />
                    <div className="text-base font-semibold">{t.name}</div>
                    {t.active && <div className="px-2 py-0.5 bg-amber-300 text-amber-900 text-[9px] uppercase tracking-wider font-bold rounded-full">Attuale</div>}
                    {t.done && <CheckCircle className="w-3.5 h-3.5 text-teal-400" />}
                  </div>
                  <div className="text-[11px] opacity-70">{t.sub}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{t.count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-400/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-amber-200 mb-1">Aggiungi il gas per diventare Gold</div>
              <div className="text-[11px] opacity-80 leading-tight">Sblocchi 2 vantaggi extra: Lube Volley e FC Südtirol match-day</div>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-amber-300 font-medium">
                Scopri offerta gas <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  tierBase: (
    <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-y-auto">
      <div className="px-5 pt-12 pb-6">
        <div className="text-xs opacity-60 mb-1">Il tuo percorso</div>
        <div className="text-2xl font-light mb-6">Benvenuto in Alperia+</div>

        <div className="space-y-3">
          {[
            { name: 'Base', sub: '1 commodity, da subito', count: '2 vantaggi', active: true, done: false, color: 'slate' },
            { name: 'Silver', sub: '1 commodity, 12+ mesi', count: '4 vantaggi', active: false, done: false, color: 'teal' },
            { name: 'Gold', sub: '2+ commodity, 12+ mesi', count: '6 vantaggi', active: false, done: false, color: 'amber' },
          ].map((t, i) => (
            <div key={i} className={`rounded-2xl p-4 ${t.active ? 'bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-500/40' : 'bg-white/5 border border-white/10 opacity-60'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className={`w-4 h-4 ${t.active ? 'text-amber-300' : 'text-slate-400'}`} />
                    <div className="text-base font-semibold">{t.name}</div>
                    {t.active && <div className="px-2 py-0.5 bg-amber-300 text-amber-900 text-[9px] uppercase tracking-wider font-bold rounded-full">Attuale</div>}
                  </div>
                  <div className="text-[11px] opacity-70">{t.sub}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{t.count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-400/20">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-teal-200 mb-1">Tra 9 mesi sei Silver</div>
              <div className="text-[11px] opacity-80 leading-tight">Al compimento del primo anno con Alperia il tuo livello sale automaticamente</div>
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] uppercase tracking-wider opacity-60 mb-2">Subito disponibili</div>
          <div className="flex gap-2">
            <div className="flex-1 p-2 bg-white/5 rounded-lg">
              <Mountain className="w-4 h-4 text-orange-300 mb-1" />
              <div className="text-[10px] font-medium">Museo Expea</div>
              <div className="text-[9px] opacity-60">1 ingresso</div>
            </div>
            <div className="flex-1 p-2 bg-white/5 rounded-lg">
              <Sparkles className="w-4 h-4 text-amber-300 mb-1" />
              <div className="text-[10px] font-medium">Concorso</div>
              <div className="text-[9px] opacity-60">Stagionale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  tierGold: (
    <div className="h-full bg-gradient-to-b from-amber-950 via-slate-900 to-slate-900 text-white overflow-y-auto">
      <div className="px-5 pt-12 pb-6">
        <div className="text-xs opacity-70 mb-1 text-amber-200">Inner circle</div>
        <div className="text-2xl font-light mb-6 text-amber-100">Alperia<span className="text-amber-300">+</span> <span className="italic text-amber-300">Gold</span></div>

        <div className="space-y-3">
          {[
            { name: 'Base', sub: 'Completato', count: '2 vantaggi', active: false, done: true, color: 'slate' },
            { name: 'Silver', sub: 'Completato', count: '4 vantaggi', active: false, done: true, color: 'teal' },
            { name: 'Gold', sub: '2+ commodity · 12+ mesi', count: '6 vantaggi', active: true, done: false, color: 'amber' },
          ].map((t, i) => (
            <div key={i} className={`rounded-2xl p-4 ${t.active ? 'bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-400/40' : 'bg-white/5 border border-white/10 opacity-70'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className={`w-4 h-4 ${t.active ? 'text-amber-100' : 'text-teal-400'}`} />
                    <div className="text-base font-semibold">{t.name}</div>
                    {t.active && <div className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[9px] uppercase tracking-wider font-bold rounded-full">Attuale</div>}
                    {t.done && <CheckCircle className="w-3.5 h-3.5 text-teal-400" />}
                  </div>
                  <div className="text-[11px] opacity-80">{t.sub}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{t.count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/30">
          <div className="flex items-start gap-3">
            <Trophy className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-amber-200 mb-1">Sei al massimo livello</div>
              <div className="text-[11px] opacity-90 leading-tight">4 biglietti Hockey Bolzano, 2 Lube Volley, match-day FC Südtirol, accesso VIP museo Expea, convenzioni esclusive</div>
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-teal-900/40 to-slate-900 border border-teal-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-3 h-3 text-teal-300" />
            <div className="text-[10px] uppercase tracking-wider text-teal-300 font-semibold">Ambassador</div>
          </div>
          <div className="text-[11px] opacity-80 leading-tight">Riceverai inviti a eventi privati Alperia: anniversari, lanci, sostainability day</div>
        </div>
      </div>
    </div>
  ),
  contest: (
    <div className="h-full bg-gradient-to-b from-orange-50 via-amber-50 to-white text-slate-900">
      <div className="px-5 pt-12 pb-3">
        <div className="text-[10px] uppercase tracking-wider text-orange-700 font-semibold mb-1">Concorso stagionale</div>
        <div className="text-xl font-semibold mb-1">Accendi la tua energia invernale</div>
        <div className="text-xs text-slate-600">Vinci un weekend in Val Pusteria per due persone</div>
      </div>

      <div className="mx-5 my-4 aspect-video rounded-2xl bg-gradient-to-br from-blue-700 via-teal-700 to-emerald-700 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-3 left-3 w-20 h-20 rounded-full bg-white/30 blur-2xl"></div>
          <div className="absolute bottom-3 right-3 w-24 h-24 rounded-full bg-amber-300/40 blur-2xl"></div>
        </div>
        <Mountain className="w-16 h-16 text-white/80 relative z-10" />
      </div>

      <div className="px-5 space-y-3">
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

        <button className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-semibold text-sm shadow-lg shadow-orange-500/30">
          Partecipa al concorso
        </button>
      </div>
    </div>
  ),
  profile: (
    <div className="h-full bg-slate-50 text-slate-900 overflow-y-auto">
      <div className="px-5 pt-12 pb-6 bg-white">
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
            <div className="text-lg font-bold text-amber-600">Silver</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Livello</div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2">Le tue forniture</div>
        {[
          { label: 'Energia elettrica', sub: 'Via Roma 12, Bolzano', icon: Zap, color: 'amber' },
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

        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-teal-900 mb-1">Diventa Gold con il gas</div>
              <div className="text-[11px] text-teal-800/80 leading-tight">Aggiungi la fornitura gas e accedi a 2 vantaggi premium aggiuntivi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
