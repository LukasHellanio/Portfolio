import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Usar esbuild para minificação (mais confiável)
    minify: "esbuild",
    cssCodeSplit: true,
    cssMinify: true,
    // Otimizações de build
    target: "es2015",
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          motion: ["motion/react"],
          emailjs: ["@emailjs/browser"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
    // Otimizar assets
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
  // Otimizações de desenvolvimento
  server: {
    hmr: {
      overlay: false,
    },
  },
  // Otimizações de dependências
  optimizeDeps: {
    include: ["react", "react-dom", "motion/react", "@emailjs/browser"],
    exclude: [
      // Excluir dependências que não precisam ser pré-bundladas
    ],
    force: false, // Não forçar re-bundling desnecessário
  },
  // Resolver problema do useLayoutEffect
  define: {
    global: "globalThis",
  },
});
