import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: './',
  plugins: [react({ jsxRuntime: "automatic" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
    force: true,
  },
  server: {
    hmr: { overlay: false },
    watch: { usePolling: false },
    fs: { strict: false },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
  },
  esbuild: {
    target: "esnext",
    format: "esm",
  },
});
