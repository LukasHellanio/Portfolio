/**
 * Configuração de Tree Shaking para otimização
 * Remove código não utilizado do bundle final
 */

export default {
  // Configurações de tree shaking
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },

  // Configurações de minificação
  minify: {
    // Remover console.log em produção
    drop_console: true,
    drop_debugger: true,

    // Otimizações de código
    pure_funcs: ["console.log", "console.info", "console.debug"],

    // Comprimir código
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ["console.log"],
      passes: 2,
    },
  },

  // Configurações de bundle
  bundle: {
    // Remover comentários
    comments: false,

    // Otimizar imports
    external: [],

    // Configurações de chunk
    chunkFileNames: "assets/[name]-[hash].js",
    entryFileNames: "assets/[name]-[hash].js",
    assetFileNames: "assets/[name]-[hash].[ext]",
  },
};
