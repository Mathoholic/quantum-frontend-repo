import React, { useState } from "react";
import TeamMemberModal from "./TeamMemberModal";

interface TeamMember {
  uuid: string;
  memberName: string;
  memberRole: string;
  description: string;
  profilePic?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="group [perspective:1000px] w-64 h-80">
        {/* Card Inner */}
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front Side */}
          <div className="absolute w-full h-full [backface-visibility:hidden] bg-white shadow-lg rounded-lg flex flex-col items-center justify-center p-4">
            <img
              src={member.profilePic || "/placeholder.png"}
              alt={member.memberName}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h3 className="text-lg font-bold">{member.memberName}</h3>
            <p className="text-gray-600">{member.memberRole}</p>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-100 shadow-lg rounded-lg flex flex-col justify-between p-4">
            <p className="line-clamp-10 text-gray-700">{member.description}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-500 font-medium self-end"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TeamMemberModal member={member} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TeamMemberCard;
