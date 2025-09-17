import React from "react";
import { Navbar, Footer } from "./components/layout";
import Hero from "./sections/home/Hero";
import About from "./sections/about/About";
import LazySection from "./components/ui/LazySection";
import FontLoader from "./components/ui/FontLoader";

// Lazy loading para componentes pesados
const Projects = React.lazy(() => import("./sections/projects/Projects"));
const Experiences = React.lazy(() =>
  import("./sections/experiences/Experiences")
);
const Skills = React.lazy(() => import("./sections/skills/Skills"));
const Contact = React.lazy(() => import("./sections/contact/Contact"));

const App = () => {
  return (
    <FontLoader>
      <div className="container mx-auto max-w-7xl">
        <Navbar />
        <Hero />
        <About />

        {/* Lazy loading para componentes pesados */}
        <LazySection>
          <Projects />
        </LazySection>

        <LazySection>
          <Experiences />
        </LazySection>

        <LazySection>
          <Skills />
        </LazySection>

        <LazySection>
          <Contact />
        </LazySection>

        <Footer />
      </div>
    </FontLoader>
  );
};

export default App;
