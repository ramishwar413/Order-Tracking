import { defineConfig } from 'vite';
export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      input: '/src/main.jsx', // instead of main.tsx
    },
  },
});

