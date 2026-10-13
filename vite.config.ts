import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { cpSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'preserve-static-pages-and-assets',
    closeBundle() {
      // Legacy pages and their dynamic asset URLs keep their original paths.
      for (const path of ['assets', 'fonts', 'fonts.css', 'site.css', 'services-data.js', 'service.html', 'legal.html', '404.html']) {
        cpSync(resolve(path), resolve('dist', path), { recursive: true, filter: src => !/\.mp4$|bloom-violet-1335\.png$|bloom-peach-1400\.png$/.test(src) });
      }
    },
  }],
});
