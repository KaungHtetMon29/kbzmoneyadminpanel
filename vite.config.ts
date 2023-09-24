import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Access environment variables
        dir: `dist/${import.meta.env.VITE_APP_ENV}`,
      },
    },
  },
});
