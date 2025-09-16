import { Navbar, Footer } from "./components/layout";
import Hero from "./sections/home/Hero";
import About from "./sections/about/About";
import Projects from "./sections/projects/Projects";
import Experiences from "./sections/experiences/Experiences";
import Skills from "./sections/skills/skills";
import Contact from "./sections/contact/Contact";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
