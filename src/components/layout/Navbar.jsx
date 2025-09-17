import { useState } from "react";
import { motion } from "motion/react";
import { useNavigation } from "../../hooks/useNavigation";

function Navigation({ onLinkClick }) {
  const { navigateToSection, isNavigating, loadingSection } = useNavigation();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = async (sectionId) => {
    onLinkClick?.();
    await navigateToSection(sectionId);
  };

  return (
    <ul className="nav-ul">
      {navItems.map((item, index) => (
        <motion.li
          key={item.id}
          className="nav-li"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.button
            onClick={() => handleLinkClick(item.id)}
            className="nav-link cursor-pointer border-none bg-transparent p-0 relative"
            whileHover={{
              scale: 1.05,
              color: "#ffffff",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            disabled={isNavigating}
          >
            {item.label}
            {isNavigating && loadingSection === item.id && (
              <span className="absolute -right-6 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-royal"></div>
              </span>
            )}
          </motion.button>
        </motion.li>
      ))}
    </ul>
  );
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (sectionId) => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <motion.button
            onClick={() => handleLinkClick("home")}
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white cursor-pointer border-none bg-transparent p-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lucas
          </motion.button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation onLinkClick={handleLinkClick} />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation onLinkClick={handleLinkClick} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
