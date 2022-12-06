import {defineConfig} from 'vite';
import {injectHtml, minifyHtml} from 'vite-plugin-html';
import {resolve, dirname} from 'path';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';

import {createVuePlugin} from 'vite-plugin-vue2';

const demoPath = './src/demo/';

const _dirname = dirname(fileURLToPath(import.meta.url));

const firstSlide = readFileSync(resolve(_dirname, demoPath, '_firstSlide.html'));

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/global.scss";`,
        charset: false,
      },
    },
  },
  build: {
    outDir: 'build',
    assetsDir: 'dist',
    publicDir: 'public',
    minify: false,
    rollupOptions: {
      plugins: [
      ],
      external: {},
      output: {
        globals: {},
        sourcemap: true,
        sourcemapExcludeSources: true,

        /**
         * Chunks should not contain dots in filenames to make easy filter logic on production balancer
         */
        chunkFileNames: 'dist/[name]-[hash].js',
        entryFileNames: 'dist/[name]-[hash].js',
        assetFileNames: 'dist/[name]-[hash].[ext]',
        // manualChunks,
      },
    },
  },
  resolve: {
    /**
     * @see https://vitejs.dev/config/#resolve-extensions
     */
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: [
      //{ find: 'vue', replacement: resolve('./node_modules/vue/dist/vue.esm.js') },
      // { find: 'knockout', replacement: resolve('./node_modules/knockout/build/output/knockout-latest.debug.js') },
      { find: '@', replacement: resolve(_dirname, 'src') },
    ],
  },
  plugins: [
    injectHtml({
      data: {
        injectSkeleton: firstSlide
      },
    }),
    createVuePlugin({
      vueTemplateOptions: {
        compilerOptions: {
          whitespace: 'preserve',
        },
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: process.env.DEV_PORT || 3000,
  },
});
