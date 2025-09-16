import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Otimizações de build
    minify: "esbuild", // Usar esbuild em vez de terser para evitar problemas
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    // },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          motion: ["motion/react"],
          emailjs: ["@emailjs/browser"],
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
  // Preconnect para origens externas
  optimizeDeps: {
    include: ["react", "react-dom", "motion/react", "@emailjs/browser"],
  },
});
