import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@chess-gm/types": path.resolve(__dirname, "../../packages/types/src"),
      "@chess-gm/api-client": path.resolve(
        __dirname,
        "../../packages/api-client/src"
      ),
      "@chess-gm/store": path.resolve(__dirname, "../../packages/store/src"),
      "@chess-gm/utils": path.resolve(__dirname, "../../packages/utils/src"),
      "@chess-gm/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@chess-gm/design-tokens": path.resolve(
        __dirname,
        "../../packages/design-tokens/src"
      ),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@chess-gm/design-tokens";`,
      },
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["bootstrap", "react-paginate"],
        },
      },
    },
  },
});
