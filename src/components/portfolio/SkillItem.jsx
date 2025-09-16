import { motion } from "motion/react";
import OptimizedImage from "../ui/OptimizedImage";

const SkillItem = ({ skill, index }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case "Basic":
        return "text-red-400";
      case "Intermediary":
        return "text-yellow-400";
      case "Advanced":
        return "text-blue-400";
      case "Expert":
        return "text-royal";
      default:
        return "text-neutral-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-4 bg-gradient-to-r from-midnight/50 to-navy/50 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg">
          <OptimizedImage
            src={skill.icon}
            alt={`${skill.name} logo`}
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-sm font-medium ${getLevelColor(skill.level)}`}
            >
              {skill.level}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillItem;
