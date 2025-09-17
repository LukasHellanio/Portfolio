import { useState, useCallback } from "react";

// Hook para navegação inteligente com loading
export const useNavigation = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [loadingSection, setLoadingSection] = useState(null);

  const navigateToSection = useCallback(async (sectionId) => {
    setIsNavigating(true);
    setLoadingSection(sectionId);

    try {
      // Aguarda um frame para garantir que o DOM foi atualizado
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const element = document.getElementById(sectionId);

      if (element) {
        // Se a seção já existe, navega imediatamente
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // Se não existe, aguarda até aparecer (máximo 3 segundos)
        const maxWait = 3000;
        const startTime = Date.now();

        while (!element && Date.now() - startTime < maxWait) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            break;
          }
        }
      }
    } catch (error) {
      console.error("Erro na navegação:", error);
    } finally {
      // Aguarda um pouco para mostrar o loading
      setTimeout(() => {
        setIsNavigating(false);
        setLoadingSection(null);
      }, 300);
    }
  }, []);

  return {
    navigateToSection,
    isNavigating,
    loadingSection,
  };
};
