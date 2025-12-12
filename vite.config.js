import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from "url";
import { copyFileSync, mkdirSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-tag-index',
      writeBundle() {
        // Criar pasta dist/data se não existir
        mkdirSync('dist/data', { recursive: true });
        // Copiar arquivo
        copyFileSync('src/data/tag-index.json', 'dist/data/tag-index.json');
        console.log('✅ tag-index.json copiado para dist/data/');
      }
    }
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@src": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@content": path.resolve(__dirname, "src/content"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@data": path.resolve(__dirname, "src/data"),
    },
  },

  server: {
    open: true,
    port: 5174,
    host: true,
    historyApiFallback: true,
  },

  build: {
    manifest: true,
    minify: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "firebase-core": ["firebase/app", "firebase/firestore", "firebase/auth", "firebase/storage"],
          "markdown-bundle": ["markdown-it"]
        }
      }
    }
  }
});