import { useNavigate } from "react-router-dom";
import { AboutHeader } from "../components/AboutHeader";
import { ProjectDescription } from "../components/ProjectDescription";
import { TeamGrid } from "../components/TeamGrid";
import { TechnologiesSection } from "../components/TechnologiesSection";
import { Footer } from "../components/Footer";
import type { TeamMember } from "../components/TeamMemberCard";

const teamMembers: TeamMember[] = [
  {
    name: "Alan Rodrigues",
    role: "Desenvolvedor Front End",
    github: "https://github.com/alanrcastro100",
    bio: "Apaixonado por desenvolvimento web e novas tecnologias.",
  },
  {
    name: "Fabricio Fontenele",
    role: "Desenvolvedor Frontend",
    github: "https://github.com/Fabricio-Fontenele",
    bio: "Especializado em criar interfaces modernas e responsivas.",
  },
  {
    name: "Francisco Neto",
    role: "Desenvolvedor Full Stack",
    github: "https://github.com/fnetgit",
    bio: "Focado em arquitetura de software e boas práticas.",
  },
  {
    name: "Ruan Pedro",
    role: "Desenvolvedor Full Stack",
    github: "https://github.com/oAnjophb",
    bio: "Entusiasta de UI/UX e design centrado no usuário.",
  },
];

export const AboutTeam = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a2c42] text-white">
      <AboutHeader onBack={() => navigate("/")} />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <ProjectDescription />
        <TeamGrid members={teamMembers} />
        <TechnologiesSection />
      </div>
    </div>
  );
};
