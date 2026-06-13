import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// This app runs in two modes:
//   • `vite` (dev)            → a plain React app with HMR for fast iteration.
//   • `vite build` / preview  → a Module Federation remote exposing ./App.
// The federation plugin rewrites the HTML entry and pins an absolute base, both
// of which get in the way of a standard dev server, so we only enable it for the
// production build (mode === "development" is true only for `vite` dev).
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  // Public origin the remote is served from in production. The host loads
  // remoteEntry.js and every chunk/asset relative to this, so it must be the
  // deployed URL. Defaults to the Cloudflare domain; override with PUBLIC_URL
  // (e.g. PUBLIC_URL=http://localhost:8085/ for a local `preview` smoke test).
  const publicUrl = process.env.PUBLIC_URL || 'https://law.eraplanner.com/'

  return {
    server: { port: 8085, cors: true },
    preview: { port: 8085, cors: true },
    // Absolute base lets the host load the remote's assets cross-origin; in dev
    // a relative base keeps the standalone server self-contained.
    base: isDev ? '/' : publicUrl,
    // `#/x` resolves to `src/x`, matching the host app's import alias so copied
    // feature files keep their original import paths.
    resolve: {
      alias: { '#': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    plugins: [
      !isDev &&
        federation({
          name: 'law',
          filename: 'remoteEntry.js',
          exposes: { './App': './src/App.tsx' },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
            // Singleton so host and remote share one RxJS instance — required
            // for the globalThis-pinned lawBus Subjects to work across the
            // boundary.
            rxjs: { singleton: true },
          },
        }),
      react(),
    ],
  }
})
