import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

const SkillTab = ({ tabs, activeTab, onTabChange }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mb-8">
      {/* Desktop: flex-wrap */}
      <div className="hidden sm:flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-royal to-lavender text-white shadow-lg"
                : "bg-white/10 text-neutral-400 hover:bg-white/20 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Mobile: horizontal scroll with arrows */}
      <div className="sm:hidden relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <motion.button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-midnight/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-midnight transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <motion.button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-midnight/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-midnight transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        )}

        {/* Scrollable tabs container */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-royal to-lavender text-white shadow-lg"
                  : "bg-white/10 text-neutral-400 hover:bg-white/20 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillTab;
