import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@styles': resolve(__dirname, 'src', 'styles'),
    },
  },
});
