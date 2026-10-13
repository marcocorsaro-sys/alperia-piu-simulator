import React from 'react';
import { Layers, Shield, CheckCircle, ArrowRight, ChevronDown } from '../icons/index.jsx';

/**
 * ArchitetturaTecnica — architettura tecnica di massima per l'IT Alperia.
 * Riporta il documento «Alperia+ — Il percorso di attivazione insieme all'IT
 * Alperia» e il relativo allegato SSO (fonte: specifiche J-Next SSO Jakala).
 * Tono volutamente rassicurante: tre punti di contatto, il resto su Jakala.
 * Framework di massima, da validare in fase di setup.
 */

const PROGRAMMA = [
  ['Tre livelli', '(Base, Silver, Gold), ciascuno con il proprio palinsesto di vantaggi. Il livello dipende solo da forniture attive e anzianità del cliente.'],
  ['Aggiornamento periodico,', 'ad esempio mensile: i livelli si ricalcolano a cadenza fissa, non in tempo reale.'],
  ['Contest Instant Win', 'con accesso uguale per tutti gli iscritti, indipendente dal livello.'],
  ['Accesso senza nuova registrazione:', 'il cliente entra con le credenziali Alperia, da app e da sito (mobile e desktop).'],
];

const JAKALA = [
  'Piattaforma J-Next in SaaS, certificata ISO 27001, privacy by design e by default',
  'Sviluppo del front-end Alperia+ (webview) con il look and feel della vostra app',
  'Integrazione SSO lato J-Next: se il vostro standard è diverso dal nostro, lo sviluppiamo noi',
  'Motore dei livelli, catalogo vantaggi, redemption, contest Instant Win',
  'Gestione di partner e premi (fisici e digitali), senza integrazioni con i vostri sistemi',
  'Manutenzione, monitoraggio, customer care di 2° livello e reportistica KPI',
];

const ALPERIA_NODES = [
  { name: 'Identità Alperia', body: 'login unico, nessuna nuova registrazione', link: '1 · accesso SSO', dir: 'both' },
  { name: 'App e sito Alperia', body: 'mobile e desktop', link: '2 · apertura in webview', dir: 'both' },
  { name: 'Sistemi clienti (CRM)', body: 'stato, forniture attive, consensi', link: '3 · flusso dati periodico', dir: 'right' },
  { name: 'BI Alperia (se richiesto)', body: 'dati del programma per dashboard', link: 'opzionale · export', dir: 'left', optional: true },
];

// Static classes so Tailwind keeps them; rows apply only on desktop (mobile stacks).
const ROW_CLASSES = ['md:row-start-2', 'md:row-start-3', 'md:row-start-4', 'md:row-start-5'];

const RICHIESTE = [
  { n: '1', title: 'Accesso SSO', ask: 'Indicarci il vostro standard di autenticazione e abilitare J-Next come applicazione collegata. Lo sviluppo lato J-Next è nostro.', who: 'IT / gestione identità' },
  { n: '2', title: 'Apertura in webview', ask: "Aprire Alperia+ in webview nell'app e linkarlo dall'Area Clienti web. Indicarci come va incapsulato.", who: 'Team app e sito' },
  { n: '3', title: 'Flusso dati per i livelli', ask: 'Inviarci periodicamente pochi dati per cliente: stato (attivo / non più cliente), forniture attive con data di attivazione, consensi. Formato e cadenza li definiamo insieme.', who: 'IT / CRM' },
  { n: '+', title: 'Opzionale · tracciamento', ask: 'Se volete che il vostro tracciamento in app prosegua nelle pagine del programma: script di tracciamento, impostazioni di cookie banner e consensi da ereditare.', who: 'Team app, digital analytics', optional: true },
  { n: '+', title: 'Opzionale · flussi di ritorno', ask: 'Se vi servono dati del programma (iscritti, livelli, redemption) per le vostre dashboard, li esportiamo noi nel formato che preferite.', who: 'BI / marketing', optional: true },
];

const WEBVIEW = [
  'se la webview si apre a schermo pieno con chiusura (X) o resta dentro il frame dell\'app;',
  'se header e footer restano i vostri, così li togliamo dalle nostre pagine;',
  'se serve un canale di comunicazione fra webview e app nativa (ad esempio per tracciamento o navigazione verso altre sezioni dell\'app);',
  'eventuali personalizzazioni particolari dell\'app di cui tenere conto.',
];

const SSO_CONFRONTO = [
  ['Quando conviene', 'Non avete un IdP che emette JWT, o preferite delegare', 'Avete già un Identity Provider (OIDC / OAuth 2.0)'],
  ['Chi firma il token', 'J-Next, con la propria chiave privata', 'Il vostro IdP, con la vostra chiave privata (RS256)'],
  ['Cosa sviluppa Alperia', "Due chiamate REST dal backend dell'app verso J-Next", 'Un claim aggiuntivo nel JWT e un endpoint JWKS pubblico'],
  ['Credenziali da gestire', 'Certificato mTLS + client id/secret forniti da Jakala', 'Nessuna credenziale Jakala da custodire'],
];

const OPZIONE_1 = [
  ['authServerToken', "il backend Alperia si autentica verso J-Next con mutua autenticazione (certificato mTLS a ogni chiamata) e OAuth 2.0 client credentials. Riceve un token server valido 12 ore."],
  ['stsUserToken', "con quel token (Authorization: Bearer) il backend invia i dati dell'utente autenticato e riceve access token e refresh token per la sessione del cliente."],
  ['Apertura webview', "l'app apre l'URL J-Next del programma passando i due token. Il refresh token mantiene attiva la sessione."],
];

const OPZIONE_2 = [
  ["JWT dal vostro IdP", "l'app chiede al vostro IdP un JWT di accesso per il cliente autenticato, firmato RS256 (chiave asimmetrica), con il kid nell'header."],
  ['Apertura webview', "l'app apre la web app J-Next passando il JWT come query parameter (in alternativa può chiamare le API J-Next con il JWT nell'header Authorization)."],
  ['Verifica J-Next', 'J-Next legge il kid, recupera la chiave pubblica dal vostro endpoint JWKS e verifica firma e scadenza. Se il token è valido, concede l\'accesso.'],
];

const ENDPOINTS = [
  ['authServerToken', 'POST · form-urlencoded', 'auth-api.jnext-euc1-stage-aws.jakala.cloud/core-user/mz/server/token', 'auth-api.jnext-it.jakala.cloud/core-user/mz/server/token'],
  ['stsUserToken', 'POST · JSON', 'sts-api.jnext-euc1-stage-aws.jakala.cloud/core-user/mz/{project}/user/token', 'sts-apis.jnext-it.jakala.cloud/core-user/mz/{project}/user/token'],
];

const JSON_OPZIONE_1 = `{
  "name": "Mario",
  "surname": "Rossi",
  "email": "mario.rossi@email.com",
  "clientId": "<fornito da Jakala>"
}`;

const JSON_OPZIONE_2 = `{
  "header":  { "alg": "RS256", "typ": "JWT", "kid": "<id chiave>" },
  "payload": {
    "iss": "<issuer Alperia>",
    "sub": "<id utente>",
    "exp": 1686681518,
    "iat": 1686663515,
    "jti": "<id univoco del token>",
    "typ": "Bearer",
    "azp": "<client>",
    "scope": "<scope>",
    "clusterExternalId": "<valore concordato>"
  }
}`;

const SICUREZZA = [
  ['Dati minimi:', 'J-Next riceve solo quanto serve per riconoscere il cliente (nome, cognome, email, identificativo concordato). I dati per i livelli arrivano dal flusso periodico.'],
  ['Firma e verifica:', 'token firmati con chiave asimmetrica; J-Next verifica firma e scadenza a ogni accesso.'],
  ['Canale server-to-server protetto', '(opzione 1): mutua autenticazione TLS + OAuth 2.0 client credentials.'],
  ['Sessione:', 'access token a durata limitata, rinnovato con refresh token senza nuovo login.'],
  ['Ambienti separati', 'stage e produzione, con credenziali distinte.'],
];

const PASSI = [
  'Vi condividiamo la documentazione del nostro standard SSO, come riferimento non vincolante.',
  'Voi ci indicate il vostro standard di autenticazione e le preferenze sulla webview.',
  'Definiamo insieme il tracciato del flusso dati: campi, formato, cadenza.',
  'Concordiamo ambienti di test e un collaudo congiunto prima del lancio.',
];

const CHECKLIST = [
  'Quale modalità SSO preferite (1 o 2), oppure il vostro standard se diverso: in quel caso lo integriamo noi',
  "Opzione 1: un referente per il backend dell'app che effettuerà le due chiamate REST",
  'Opzione 2: URL dell\'endpoint JWKS, issuer e un JWT di esempio dall\'ambiente di test',
  "L'identificativo cliente da usare nel token (lo stesso del flusso dati per i livelli)",
  'Utenze di test sull\'ambiente stage per il collaudo congiunto',
];

function Eyebrow({ children }) {
  return <div className="font-body text-xs uppercase tracking-[0.25em] text-teal-300 mb-4">{children}</div>;
}

function Connector({ label, dir, optional }) {
  return (
    <div className="flex flex-col items-center justify-center px-2 py-2 md:py-0 min-w-[10rem]">
      <div className="font-body text-[11px] text-slate-400 mb-1 text-center">{label}</div>
      <div className={`w-full flex items-center text-slate-500 ${optional ? 'opacity-70' : ''}`}>
        {(dir === 'both' || dir === 'left') && <span className="text-xs leading-none">◀</span>}
        <div className={`flex-1 border-t ${optional ? 'border-dashed' : ''} border-slate-600`}></div>
        {(dir === 'both' || dir === 'right') && <span className="text-xs leading-none">▶</span>}
      </div>
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-[12px] leading-relaxed text-slate-300 overflow-x-auto font-mono">
      {children}
    </pre>
  );
}

function SsoOption({ tag, title, intro, steps, children }) {
  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col">
      <div className="font-body text-[10px] uppercase tracking-wider text-amber-300 mb-1">{tag}</div>
      <div className="font-display text-2xl font-light text-slate-100 mb-2">{title}</div>
      <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">{intro}</p>
      <ol className="space-y-3 mb-4">
        {steps.map(([name, desc], i) => (
          <li key={i} className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center justify-center flex-shrink-0">{i + 1}</span>
            <span className="font-body text-sm text-slate-300 leading-relaxed"><span className="text-slate-100 font-medium">{name}</span> — {desc}</span>
          </li>
        ))}
      </ol>
      <details className="group mt-auto rounded-xl border border-slate-800 bg-slate-950/40">
        <summary className="cursor-pointer list-none px-4 py-3 font-body text-xs font-semibold text-slate-300 flex items-center justify-between">
          Dettaglio tecnico
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-4">{children}</div>
      </details>
    </div>
  );
}

export default function ArchitetturaTecnica() {
  return (
    <section id="architettura" data-section="architettura" className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Intro */}
        <div className="reveal max-w-4xl">
          <Eyebrow>Architettura tecnica di massima</Eyebrow>
          <h2 className="font-display text-5xl font-light mb-6">
            Tre punti di contatto. <span className="italic text-amber-300">Il resto è su di noi.</span>
          </h2>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-4">
            Alperia+ gira sulla piattaforma Jakala J-Next: sviluppo, hosting, calcolo dei livelli, catalogo vantaggi e
            contest sono a carico nostro. All'IT Alperia chiediamo tre attività circoscritte: abilitare l'accesso via SSO,
            aprire il programma in webview nell'app e nel sito, inviarci un flusso dati per calcolare i livelli dei clienti.
          </p>
          <p className="font-body text-sm text-slate-400 leading-relaxed">
            È un framework di massima, basato sulla nostra esperienza su programmi energy analoghi. Ogni punto andrà
            validato insieme ai vostri team nella fase di setup: dove avete già standard o soluzioni in uso, ci adattiamo noi.
          </p>
        </div>

        {/* Programma + Jakala */}
        <div className="grid md:grid-cols-2 gap-6 mt-14 reveal">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="font-display text-xl text-slate-100 font-semibold mb-2">Il programma in breve, per l'IT</div>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">
              Alperia+ è un programma <span className="text-slate-100 font-medium">a livelli, non a punti</span>: non serve
              un flusso transazionale continuo, non ci sono saldi da riconciliare.
            </p>
            <ul className="space-y-2.5">
              {PROGRAMMA.map(([b, t], i) => (
                <li key={i} className="flex gap-2 font-body text-sm text-slate-300 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span><span className="text-slate-100 font-medium">{b}</span> {t}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-slate-400 mt-4">I livelli li calcola J-Next. Ad Alperia chiediamo solo i dati di input.</p>
          </div>
          <div className="p-6 rounded-2xl border border-teal-500/30 bg-teal-900/20">
            <div className="font-display text-xl text-slate-100 font-semibold mb-2">Cosa porta Jakala</div>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">
              La stessa piattaforma che gestisce oggi programmi loyalty di altri operatori energy italiani in produzione.
            </p>
            <ul className="space-y-2.5">
              {JAKALA.map((t, i) => (
                <li key={i} className="flex gap-2 font-body text-sm text-slate-300 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Diagramma architettura */}
        <div className="mt-16 reveal">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-teal-300" />
            <div className="font-display text-2xl text-slate-100">I sistemi Alperia restano dove sono</div>
          </div>
          <div className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-y-4 md:gap-x-2">
            <div className="hidden md:block font-body text-[10px] uppercase tracking-wider text-slate-500">Alperia</div>
            <div className="hidden md:block"></div>
            <div className="hidden md:block font-body text-[10px] uppercase tracking-wider text-slate-500">Jakala</div>
            {ALPERIA_NODES.map((n, i) => (
              <React.Fragment key={i}>
                <div
                  className={`p-4 rounded-xl border ${n.optional ? 'border-dashed border-slate-700' : 'border-slate-700'} bg-slate-900/40 md:col-start-1 ${ROW_CLASSES[i]}`}
                >
                  <div className="font-body text-sm font-semibold text-slate-100">{n.name}</div>
                  <div className="font-body text-xs text-slate-400 mt-0.5">{n.body}</div>
                </div>
                <div className={`md:col-start-2 ${ROW_CLASSES[i]}`}>
                  <Connector label={n.link} dir={n.dir} optional={n.optional} />
                </div>
              </React.Fragment>
            ))}
            <div className="md:col-start-3 md:row-start-2 md:row-span-4 p-6 rounded-2xl border-2 border-teal-500/60 bg-teal-900/30 flex flex-col">
              <div className="font-display text-xl text-slate-100 font-semibold mb-4">Piattaforma J-Next</div>
              <ul className="space-y-2 font-body text-sm text-slate-200">
                <li>Front-end Alperia+ (webview)</li>
                <li>Calcolo dei livelli Base, Silver, Gold</li>
                <li>Catalogo vantaggi e redemption</li>
                <li>Contest Instant Win</li>
                <li>Partner e premi</li>
                <li>Manutenzione e reportistica KPI</li>
              </ul>
              <div className="font-body text-xs text-slate-400 mt-auto pt-6">Sviluppo, hosting e gestione a carico di Jakala</div>
            </div>
          </div>
        </div>

        {/* Cosa chiediamo */}
        <div className="mt-16 reveal">
          <div className="font-display text-2xl text-slate-100 mb-2">Cosa chiediamo all'IT Alperia</div>
          <p className="font-body text-sm text-slate-400 mb-6">Tre attività servono per partire. Altre due sono opzionali e dipendono da vostre scelte.</p>
          <div className="rounded-2xl border border-slate-800 overflow-hidden">
            {RICHIESTE.map((r, i) => (
              <div key={i} className={`grid md:grid-cols-12 gap-3 p-5 ${i > 0 ? 'border-t border-slate-800' : ''} ${r.optional ? 'bg-slate-950/40' : 'bg-slate-900/40'}`}>
                <div className="md:col-span-3 flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center flex-shrink-0 ${r.optional ? 'border border-slate-700 text-slate-400' : 'bg-amber-300/15 text-amber-300'}`}>{r.n}</span>
                  <span className={`font-body text-sm font-semibold ${r.optional ? 'text-slate-300' : 'text-slate-100'}`}>{r.title}</span>
                </div>
                <div className="md:col-span-6 font-body text-sm text-slate-300 leading-relaxed">{r.ask}</div>
                <div className="md:col-span-3 font-body text-xs text-slate-500 md:text-right">{r.who}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="font-body text-sm font-semibold text-slate-100 mb-2">Incapsulamento in webview: cosa ci serve sapere</div>
            <p className="font-body text-xs text-slate-400 mb-3">Sono scelte di design più che sviluppi:</p>
            <ul className="space-y-1.5">
              {WEBVIEW.map((t, i) => (
                <li key={i} className="flex gap-2 font-body text-sm text-slate-300"><ArrowRight className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-1" />{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Allegato SSO */}
        <div className="mt-20 reveal">
          <Eyebrow>Allegato tecnico · accesso SSO</Eyebrow>
          <div className="font-display text-3xl font-light text-slate-100 mb-3">
            Due modalità standard, <span className="italic text-amber-300">scegliete voi.</span>
          </div>
          <p className="font-body text-sm text-slate-400 max-w-3xl leading-relaxed mb-8">
            J-Next supporta due modalità SSO, entrambe basate su JWT. Alperia sceglie quella più vicina alla propria
            architettura; lo sviluppo lato J-Next è a carico di Jakala in entrambi i casi. In tutte e due le modalità le
            password dei clienti non passano mai da J-Next: l'autenticazione resta sui sistemi Alperia.
          </p>

          <div className="rounded-2xl border border-slate-800 overflow-x-auto mb-8">
            <table className="w-full min-w-[640px] font-body text-sm">
              <thead>
                <tr className="bg-slate-900/60 text-left">
                  <th className="p-4 w-1/5"></th>
                  <th className="p-4 text-slate-100 font-semibold">Opzione 1 · Token generato da J-Next</th>
                  <th className="p-4 text-slate-100 font-semibold">Opzione 2 · Token del vostro IdP</th>
                </tr>
              </thead>
              <tbody>
                {SSO_CONFRONTO.map(([k, a, b], i) => (
                  <tr key={i} className="border-t border-slate-800">
                    <td className="p-4 text-slate-500 text-xs uppercase tracking-wider">{k}</td>
                    <td className="p-4 text-slate-300">{a}</td>
                    <td className="p-4 text-slate-300">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <SsoOption
              tag="Opzione 1"
              title="Token generato da J-Next"
              intro="Il backend dell'app Alperia, dopo il login del cliente, chiede a J-Next un token per quell'utente e apre la webview con quel token."
              steps={OPZIONE_1}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] font-body text-xs">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="py-2 pr-3">Servizio</th><th className="py-2 pr-3">Stage</th><th className="py-2">Produzione</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ENDPOINTS.map(([s, m, st, pr]) => (
                      <tr key={s} className="border-t border-slate-800 align-top">
                        <td className="py-2 pr-3 text-slate-200">{s}<div className="text-slate-500">{m}</div></td>
                        <td className="py-2 pr-3 font-mono text-[11px] text-slate-400 break-all">{st}</td>
                        <td className="py-2 font-mono text-[11px] text-slate-400 break-all">{pr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-body text-xs text-slate-400 mt-3 leading-relaxed">
                Ogni chiamata porta gli header <code className="text-slate-300">jak-tenant</code> e <code className="text-slate-300">jak-project</code>.
                Tenant, project, client id e secret sono assegnati da Jakala per ciascun ambiente. Dati utente obbligatori: nome,
                cognome, email, più i campi concordati in integrazione (es. codice cliente). La webview si apre su
                <code className="text-slate-300"> /sso?token=[ACCESS_TOKEN]&amp;refreshToken=[REFRESH_TOKEN]</code>.
              </p>
              <CodeBlock>{JSON_OPZIONE_1}</CodeBlock>
              <p className="font-body text-[11px] text-slate-500 mt-3">
                Codici di risposta: 200 ok · 400 richiesta non valida · 401 bearer token non valido · 403 forbidden · 404 not found · 409 conflitto · 500 errore generico.
              </p>
            </SsoOption>

            <SsoOption
              tag="Opzione 2"
              title="Token del vostro Identity Provider"
              intro="Se Alperia ha già un IdP che autentica i clienti di app e sito, J-Next accetta direttamente il JWT che emettete voi. Non serve custodire credenziali Jakala."
              steps={OPZIONE_2}
            >
              <p className="font-body text-xs text-slate-400 leading-relaxed">
                Unico requisito sul contenuto: un claim custom <code className="text-slate-300">clusterExternalId</code>, che consente a
                J-Next di profilare l'utente. Il valore si definisce in integrazione. I claim standard sono quelli di un normale IdP
                OIDC: nella maggior parte dei casi l'intervento si riduce ad aggiungere il claim e registrare J-Next come client.
              </p>
              <CodeBlock>{JSON_OPZIONE_2}</CodeBlock>
            </SsoOption>
          </div>

          <div className="mt-6 p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-teal-300" />
              <div className="font-body text-sm font-semibold text-slate-100">Sicurezza e dati scambiati</div>
            </div>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
              {SICUREZZA.map(([b, t], i) => (
                <li key={i} className="font-body text-sm text-slate-300 leading-relaxed"><span className="text-slate-100 font-medium">{b}</span> {t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Come procediamo */}
        <div className="mt-20 grid md:grid-cols-2 gap-6 reveal">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="font-display text-xl text-slate-100 font-semibold mb-2">Come procediamo</div>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">
              Vi proponiamo di chiudere i dettagli in un breve workshop tecnico all'avvio del setup, con IT Alperia, la vostra
              agenzia app/sito e Jakala.
            </p>
            <ol className="space-y-3">
              {PASSI.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-300/15 text-amber-300 text-xs font-semibold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="font-body text-sm text-slate-300 leading-relaxed">{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="font-display text-xl text-slate-100 font-semibold mb-4">Cosa ci serve da Alperia per partire</div>
            <ul className="space-y-2.5">
              {CHECKLIST.map((t, i) => (
                <li key={i} className="flex gap-2 font-body text-sm text-slate-300 leading-relaxed">
                  <span className="w-4 h-4 mt-0.5 rounded border border-slate-600 flex-shrink-0"></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-xs text-slate-500 mt-4">
              Al kick-off tecnico Jakala fornisce tenant, project e credenziali di stage, e affianca il vostro team fino al collaudo.
            </p>
          </div>
        </div>

        <p className="font-body text-xs text-slate-500 mt-10 max-w-3xl">
          Framework di massima basato sulla documentazione tecnica J-Next e sull'esperienza Jakala su programmi energy
          analoghi. Tutti i punti restano da validare con i team Alperia in fase di setup.
        </p>
      </div>
    </section>
  );
}
