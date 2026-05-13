// middleware.js — Edge Middleware Vercel
// Protegge tutte le pagine del sito con password, eccetto /api/auth (l'endpoint
// che verifica la password stessa) e gli asset statici.
//
// Logica:
//   1. Se cookie `site_auth=ok` presente → pass through (mostra il sito)
//   2. Altrimenti → rendi una pagina HTML con form password
//   3. Il form POSTa a /api/auth che setta il cookie se la password è corretta

export const config = {
  matcher: '/((?!api/auth|assets|favicon|robots|_vercel).*)',
};

const PAGE = (errorMsg = '') => `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Alperia più · Simulator · Jakala — Accesso protetto</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; height: 100%; }
    body {
      background: #0f172a;
      color: #f1f5f9;
      font-family: 'DM Sans', system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      max-width: 420px;
      width: 100%;
      background: rgba(30, 41, 59, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 16px;
      padding: 40px 32px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }
    h1 {
      font-family: 'Fraunces', serif;
      font-weight: 400;
      font-size: 28px;
      margin: 0 0 8px;
      color: #f1f5f9;
    }
    h1 em { font-style: italic; color: #fcd34d; }
    p.subtitle {
      margin: 0 0 24px;
      color: #94a3b8;
      font-size: 14px;
      line-height: 1.5;
    }
    .error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 16px;
    }
    input[type="password"] {
      width: 100%;
      padding: 12px 16px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 8px;
      color: #f1f5f9;
      font-family: inherit;
      font-size: 15px;
      margin-bottom: 16px;
    }
    input[type="password"]:focus {
      outline: none;
      border-color: #fcd34d;
      box-shadow: 0 0 0 3px rgba(252, 211, 77, 0.15);
    }
    button {
      width: 100%;
      padding: 12px;
      background: #fcd34d;
      color: #0f172a;
      border: none;
      border-radius: 8px;
      font-family: inherit;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.15s;
    }
    button:hover { background: #fde68a; }
    .footer {
      margin-top: 24px;
      font-size: 12px;
      color: #64748b;
      text-align: center;
    }
  </style>
</head>
<body>
  <form class="card" method="POST" action="/api/auth">
    <h1>Alperia <em>più</em> · Simulator</h1>
    <p class="subtitle">Tool interno Jakala — accesso protetto da password.</p>
    ${errorMsg ? `<div class="error">${errorMsg}</div>` : ''}
    <input type="password" name="password" placeholder="Password" required autofocus autocomplete="current-password" />
    <button type="submit">Entra</button>
    <div class="footer">Sessione valida 30 giorni dal primo accesso.</div>
  </form>
</body>
</html>`;

export default function middleware(request) {
  const cookie = request.headers.get('cookie') || '';
  if (/(?:^|;\s*)site_auth=ok(?:;|$)/.test(cookie)) {
    return; // autenticato — passa al sito
  }

  // Estrai eventuale messaggio d'errore da query string
  const url = new URL(request.url);
  const errParam = url.searchParams.get('e');
  const errorMsg = errParam === '1' ? 'Password errata, riprova.' : '';

  return new Response(PAGE(errorMsg), {
    status: 401,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
