import { OrbitingCircles } from "../animations/OrbitingCircles";
import PropTypes from "prop-types";

export function Frameworks() {
  const skills = [
    "github",
    "css3",
    "git",
    "html5",
    "javascript",
    "typescript",
    "nodejs",
    "figma",
    "flutter",
    "react",
    "angular",
    "sqlite",
    "tailwindcss",
    "vitejs",
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);

Icon.propTypes = {
  src: PropTypes.string.isRequired,
};
