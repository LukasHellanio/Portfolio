import { motion } from "motion/react";
import { useState, useEffect } from "react";

const ComingSoon = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 px-8"
    >
      {/* Ícone de construção */}
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-royal/20 to-lavender/20 rounded-full flex items-center justify-center border border-royal/30">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-royal"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </motion.div>

      {/* Texto principal */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
      >
        Projects Coming Soon
      </motion.h3>

      {/* Texto animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex items-center gap-2 text-xl text-neutral-400 mb-8"
      >
        <span>Working on amazing projects</span>
        <motion.span
          className="text-royal font-semibold min-w-[2rem]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {dots}
        </motion.span>
      </motion.div>

      {/* Cards de preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{
              delay: 1.2 + item * 0.1,
              duration: 0.6,
            }}
            className="bg-gradient-to-br from-midnight/50 to-navy/50 rounded-xl border border-white/10 p-6 backdrop-blur-sm"
          >
            <div className="space-y-4">
              {/* Placeholder para imagem */}
              <div className="w-full h-32 bg-gradient-to-br from-neutral-800/50 to-neutral-700/50 rounded-lg flex items-center justify-center">
                <div className="w-12 h-12 bg-neutral-600/50 rounded-lg flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-neutral-500"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21,15 16,10 5,21" />
                  </svg>
                </div>
              </div>

              {/* Placeholder para título */}
              <div className="h-4 bg-neutral-700/50 rounded w-3/4"></div>

              {/* Placeholder para descrição */}
              <div className="space-y-2">
                <div className="h-3 bg-neutral-700/30 rounded w-full"></div>
                <div className="h-3 bg-neutral-700/30 rounded w-5/6"></div>
              </div>

              {/* Placeholder para tags */}
              <div className="flex gap-2">
                <div className="h-6 bg-neutral-700/40 rounded-full w-16"></div>
                <div className="h-6 bg-neutral-700/40 rounded-full w-20"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-neutral-500 mb-4">Interested in seeing my work?</p>
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-royal to-lavender text-white rounded-lg font-semibold hover:from-royal/80 hover:to-lavender/80 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Get in Touch</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoon;
