import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base so assets resolve correctly on GitHub Pages at /tutor-dashboard/
export default defineConfig({
  base: '/tutor-dashboard/',
  plugins: [react()],
});
