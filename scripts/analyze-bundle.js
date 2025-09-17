#!/usr/bin/env node

/**
 * Script para análise de bundle
 * Executa build e analisa tamanho dos chunks
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import process from "process";

console.log("🔍 Analisando bundle...\n");

try {
  // Executar build
  console.log("📦 Executando build...");
  execSync("npm run build", { stdio: "inherit" });

  // Verificar se dist existe
  const distPath = path.join(process.cwd(), "dist");
  if (!fs.existsSync(distPath)) {
    console.error("❌ Pasta dist não encontrada!");
    process.exit(1);
  }

  // Analisar arquivos JS
  console.log("\n📊 Análise de arquivos JavaScript:");
  const jsFiles = fs
    .readdirSync(distPath)
    .filter((file) => file.endsWith(".js"))
    .map((file) => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      return { file, size: sizeKB };
    })
    .sort((a, b) => parseFloat(b.size) - parseFloat(a.size));

  jsFiles.forEach(({ file, size }) => {
    const emoji =
      parseFloat(size) > 100 ? "🔴" : parseFloat(size) > 50 ? "🟡" : "🟢";
    console.log(`${emoji} ${file}: ${size} KB`);
  });

  // Analisar arquivos CSS
  console.log("\n🎨 Análise de arquivos CSS:");
  const cssFiles = fs
    .readdirSync(distPath)
    .filter((file) => file.endsWith(".css"))
    .map((file) => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      return { file, size: sizeKB };
    })
    .sort((a, b) => parseFloat(b.size) - parseFloat(a.size));

  cssFiles.forEach(({ file, size }) => {
    const emoji =
      parseFloat(size) > 50 ? "🔴" : parseFloat(size) > 20 ? "🟡" : "🟢";
    console.log(`${emoji} ${file}: ${size} KB`);
  });

  // Calcular total
  const totalSize = [...jsFiles, ...cssFiles].reduce(
    (total, file) => total + parseFloat(file.size),
    0
  );

  console.log(`\n📈 Total: ${totalSize.toFixed(2)} KB`);

  // Recomendações
  console.log("\n💡 Recomendações:");
  if (totalSize > 1000) {
    console.log("⚠️  Bundle muito grande! Considere:");
    console.log("   - Lazy loading de componentes");
    console.log("   - Code splitting mais agressivo");
    console.log("   - Remover dependências não utilizadas");
  } else if (totalSize > 500) {
    console.log("✅ Bundle em tamanho razoável");
    console.log("   - Continue otimizando gradualmente");
  } else {
    console.log("🎉 Bundle otimizado!");
  }
} catch (error) {
  console.error("❌ Erro na análise:", error.message);
  process.exit(1);
}
