import { defineConfig } from 'vite';

export default defineConfig({
  // Other configurations...
  define: {
    'process.env': process.env,
  },
});
