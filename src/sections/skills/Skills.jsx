import { useState } from "react";
import { motion } from "motion/react";
import { skillsData } from "../../constants";
import { SkillTab, SkillItem } from "../../components/portfolio";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const tabs = [
    { key: "frontend", label: "Frontend" },
    { key: "mobile", label: "Mobile" },
    { key: "backend", label: "Backend" },
    { key: "devops", label: "DevOps" },
    { key: "tools", label: "Tools" },
  ];

  const currentSkills = skillsData[activeTab] || [];

  return (
    <section id="skills" className="section-spacing c-space">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className=" mb-12">
          <h2 className="text-heading text-white mb-4">My Skills</h2>
        </div>

        <SkillTab
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-1"
        >
          {currentSkills.map((skill, index) => (
            <SkillItem key={skill.id} skill={skill} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>Basic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span>Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-royal rounded-full"></div>
              <span>Expert</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
