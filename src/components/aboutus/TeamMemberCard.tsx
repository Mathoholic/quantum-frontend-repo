import React, { useState, useEffect } from "react";
import TeamMemberModal from "./TeamMemberModal";
import "../../styles/about-us.css";

interface TeamMember {
  uuid: string;
  memberName: string;
  memberRole: string;
  description: string;
  profilePic?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  onOpenModal: (member: TeamMember) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onOpenModal }) => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in, .slide-up");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fade-in" key={member.uuid}>
      <div className="group [perspective:1000px] w-64 h-80 lg:w-72 lg:h-88 xl:w-72 xl:h-88 2xl:h-[500] 2xl:w-[350] mx-4 my-4">
        {/* Card Inner */}
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front Side */}
          <div className="absolute w-full h-full [backface-visibility:hidden] bg-white shadow-lg rounded-lg flex flex-col items-center justify-center p-4">
            <img
              src={member.profilePic || "/placeholder.png"}
              alt={member.memberName}
              className="w-full h-full object-contain mb-4 rounded-lg lg:h-[230px] lg:rounded-lg xl:h-[230px] xl:rounded-lg 2xl:h-[300px] 2xl:rounded-lg"
            />
            <h3 className="text-lg text-center lg:text-xl 2xl:text-3xl font-bold">{member.memberName}</h3>
            <p className="text-gray-600 text-center lg:text-lg 2xl:text-xl">{member.memberRole}</p>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-100 shadow-lg rounded-lg flex flex-col justify-between p-4">
            <p className="line-clamp-10 text-gray-700">{member.description}</p>
            <button
              onClick={() => onOpenModal(member)}
              className="text-blue-500 font-medium self-end"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;