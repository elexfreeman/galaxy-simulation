import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const demoPath = './src/demo/';

const _dirname = dirname(fileURLToPath(import.meta.url));

const firstSlide = readFileSync(resolve(_dirname, demoPath, '_firstSlide.html'));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(_dirname, 'src/index.js'),
      name: 'md-components',
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: ['marked'],
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: false,
      inject: {
        data: {
          firstSlide,
        },
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: process.env.DEV_PORT || 3000,
  },
});
