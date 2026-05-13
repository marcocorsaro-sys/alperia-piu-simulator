// api/auth.js — Edge Function di autenticazione password
// POST /api/auth con form-data `password=...`
//   - Se coincide con process.env.SITE_PASSWORD → setta cookie `site_auth=ok`, redirect a /
//   - Altrimenti → redirect a /?e=1 (mostra messaggio d'errore)

export const config = { runtime: 'edge' };

const COOKIE_NAME = 'site_auth';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 giorni in secondi

export default async function handler(request) {
  if (request.method !== 'POST') {
    return Response.redirect(new URL('/', request.url), 302);
  }

  let password = '';
  const ct = request.headers.get('content-type') || '';

  try {
    if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
      const fd = await request.formData();
      password = fd.get('password') || '';
    } else if (ct.includes('application/json')) {
      const body = await request.json();
      password = body.password || '';
    }
  } catch (_) {
    // password resta '' → redirect a /?e=1
  }

  const expected = process.env.SITE_PASSWORD;

  if (!expected) {
    // env var non configurata — fail-safe: blocca tutto
    return new Response('SITE_PASSWORD non configurata. Setta la env var su Vercel.', {
      status: 500,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  if (password === expected) {
    const setCookie = [
      `${COOKIE_NAME}=ok`,
      `Max-Age=${COOKIE_MAX_AGE}`,
      'Path=/',
      'HttpOnly',
      'Secure',
      'SameSite=Lax',
    ].join('; ');

    return new Response(null, {
      status: 302,
      headers: {
        'location': '/',
        'set-cookie': setCookie,
        'cache-control': 'no-store',
      },
    });
  }

  // password errata
  return Response.redirect(new URL('/?e=1', request.url), 302);
}
