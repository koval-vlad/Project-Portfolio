import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { preconnectOrigins } from './src/config/preconnect-origins';

function preconnectPlugin() {
  const links = preconnectOrigins
    .flatMap((origin) => [
      { rel: 'preconnect', href: origin, crossorigin: 'anonymous' },
      { rel: 'dns-prefetch', href: origin },
    ])
    .map(
      (attrs) =>
        '<link ' +
        Object.entries(attrs)
          .map(([k, v]) => (v === true ? k : `${k}="${v}"`))
          .join(' ') +
        '>'
    )
    .join('\n    ');

  return {
    name: 'preconnect-inject',
    transformIndexHtml(html: string) {
      const comment = '<!-- Preconnect / DNS prefetch (from config) -->';
      const inject = comment + '\n    ' + links;
      return html.replace(comment, inject);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preconnectPlugin(), react()],
  // Treat .docx files as static assets so Vite does not try to parse them as JS
  assetsInclude: ['**/*.docx'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
