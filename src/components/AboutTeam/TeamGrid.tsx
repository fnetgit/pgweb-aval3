import { TeamMemberCard, type TeamMember } from "./TeamMemberCard";

interface TeamGridProps {
  members: TeamMember[];
}

export const TeamGrid = ({ members }: TeamGridProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        Nossa Equipe
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {members.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
};
