import { Project, ComingSoon } from "../../components/portfolio";
// import { myProjects } from "../../constants";

const Projects = () => {
  return (
    <section id="projects" className="relative c-space section-spacing">
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />

      {/* Projetos em construção */}
      <ComingSoon />

      {/* Quando tiver projetos, descomente: */}
      {/* {myProjects.map((project) => (
        <Project key={project.id} {...project} />
      ))} */}
    </section>
  );
};

export default Projects;
