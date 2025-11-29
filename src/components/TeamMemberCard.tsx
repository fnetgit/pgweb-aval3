import { Github, Linkedin, Mail } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  github: string;
  linkedin?: string;
  email?: string;
  bio: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
      <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl sm:text-4xl font-bold">
        {member.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-center mb-1">
        {member.name}
      </h3>
      <p className="text-[var(--color-accent-cyan)] text-sm text-center mb-3">{member.role}</p>
      <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed">
        {member.bio}
      </p>

      <div className="flex items-center justify-center gap-3">
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        )}
      </div>
    </div>
  );
};
