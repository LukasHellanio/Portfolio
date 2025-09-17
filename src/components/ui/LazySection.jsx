import React, { Suspense, lazy } from "react";
import { motion } from "motion/react";

// Componente de loading
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal"></div>
  </div>
);

// Componente de erro
const SectionError = ({ error, retry }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="text-red-500 mb-4">
      <svg
        className="w-16 h-16 mx-auto mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      <p className="text-lg font-medium">Erro ao carregar seção</p>
      <p className="text-sm text-gray-500 mt-1">
        {error?.message || "Erro desconhecido"}
      </p>
    </div>
    <button
      onClick={retry}
      className="px-4 py-2 bg-royal text-white rounded-lg hover:bg-royal/80 transition-colors"
    >
      Tentar novamente
    </button>
  </div>
);

// Componente principal
const LazySection = ({
  children,
  fallback = <SectionLoader />,
  errorFallback = SectionError,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      <Suspense fallback={fallback}>{children}</Suspense>
    </motion.div>
  );
};

export default LazySection;
