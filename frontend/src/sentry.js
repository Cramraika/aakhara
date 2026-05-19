// Sentry SDK init for aakhara frontend (Glitchtip-compatible, CRA build).
// Wired 2026-05-19 per OW-106 Glitchtip activation (project pid created
// 2026-05-19; reconcile output reported In-sync=10).
//
// DSN comes from REACT_APP_SENTRY_DSN at build time (CRA prefix convention).
// Operator sources value from Infisical:
//   main-host:/host-page/AAKHARA_GLITCHTIP_DSN
//
// Imported from src/index.js BEFORE ReactDOM.render so init runs before any
// component code. Exports a safe Sentry handle (no-op when DSN unset).

import * as Sentry from '@sentry/react';

const dsn = process.env.REACT_APP_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || 'production',
    release: process.env.REACT_APP_SENTRY_RELEASE || undefined,
    tracesSampleRate: 0, // Glitchtip ignores traces; keep minimal.
  });
} else if (typeof console !== 'undefined' && console.info) {
  console.info('[sentry] REACT_APP_SENTRY_DSN not set; error reporting disabled.');
}

export default Sentry;
