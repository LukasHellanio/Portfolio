import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
            active: false,
          },
          {
            name: "addViewBox",
            active: true,
          },
        ],
      },
    }),
  ],
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
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes("react") || id.includes("react-dom")) {
            return "react-vendor";
          }

          // Animation library
          if (id.includes("motion")) {
            return "motion";
          }

          // Email service
          if (id.includes("@emailjs")) {
            return "emailjs";
          }

          // UI Components
          if (id.includes("src/components/ui/")) {
            return "ui-components";
          }

          // Portfolio Components
          if (id.includes("src/components/portfolio/")) {
            return "portfolio-components";
          }

          // Animations
          if (id.includes("src/components/animations/")) {
            return "animations";
          }

          // Sections
          if (id.includes("src/sections/")) {
            return "sections";
          }

          // Node modules
          if (id.includes("node_modules")) {
            return "vendor";
          }
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
});
