import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from "url";
import { copyFileSync, mkdirSync, readdirSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-data-files',
      writeBundle() {
        // Copiar tag-index.json
        mkdirSync('dist/data', { recursive: true });
        copyFileSync('src/data/tag-index.json', 'dist/data/tag-index.json');
        console.log('✅ tag-index.json copiado para dist/data/');
        
        // Copiar imagens otimizadas do carrossel
        mkdirSync('dist/assets/tags-optimized', { recursive: true });
        const tagsDir = 'src/assets/tags-optimized';
        const files = readdirSync(tagsDir);
        
        let count = 0;
        files.forEach(file => {
          if (file.endsWith('.webp')) {
            copyFileSync(
              `${tagsDir}/${file}`,
              `dist/assets/tags-optimized/${file}`
            );
            count++;
          }
        });
        
        console.log(`✅ ${count} imagens otimizadas copiadas para dist/assets/tags-optimized/`);
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