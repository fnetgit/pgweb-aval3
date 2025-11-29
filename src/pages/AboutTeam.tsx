import { useNavigate } from "react-router-dom";
import { AboutHeader } from "../components/AboutHeader";
import { ProjectDescription } from "../components/ProjectDescription";
import { TeamGrid } from "../components/TeamGrid";
import { TechnologiesSection } from "../components/TechnologiesSection";
import type { TeamMember } from "../components/TeamMemberCard";

const teamMembers: TeamMember[] = [
  {
    name: "Alan Rodrigues",
    role: "Desenvolvedor Front End",
    photo: "https://avatars.githubusercontent.com/alanrcastro100",
    github: "https://github.com/alanrcastro100",
    linkedin: "https://www.linkedin.com/in/alanrcastro100/",
    email: "alanrcastro100@gmail.com",
    bio: "Apaixonado por desenvolvimento web e novas tecnologias.",
  },
  {
    name: "Fabricio Fontenele",
    role: "Desenvolvedor Frontend",
    photo: "https://avatars.githubusercontent.com/Fabricio-Fontenele",
    github: "https://github.com/Fabricio-Fontenele",
    linkedin: "https://www.linkedin.com/in/fabricio-fontenele/",
    email: "fabriciof.dev@gmail.com",
    bio: "Especializado em criar interfaces modernas e responsivas.",
  },
  {
    name: "Francisco Neto",
    role: "Desenvolvedor Full Stack",
    photo: "https://avatars.githubusercontent.com/fnetgit",
    github: "https://github.com/fnetgit",
    linkedin: "https://www.linkedin.com/in/francisco-alves-ribeiro-neto/",
    email: "netofrancisco.pro@gmail.com",
    bio: "Focado em arquitetura de software e boas práticas.",
  },
  {
    name: "Ruan Pedro",
    role: "Desenvolvedor Full Stack",
    photo: "https://avatars.githubusercontent.com/oAnjophb",
    github: "https://github.com/oAnjophb",
    linkedin: "https://www.linkedin.com/in/ruan-pedro-2b4b9823b/",
    email: "anjosruanp@gmail.com",
    bio: "Entusiasta de UI/UX e design centrado no usuário.",
  },
];

export const AboutTeam = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-(--color-primary) text-white">
      <AboutHeader onBack={() => navigate("/")} />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <ProjectDescription />
        <TeamGrid members={teamMembers} />
        <TechnologiesSection />
      </div>
    </div>
  );
};
