import React from "react";

interface TeamMember {
  profilePic?: string;
  memberName: string;
  memberRole: string;
  description: string;
}


interface TeamMemberModalProps {
  member: TeamMember;
  onClose: () => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50" key={member.memberName}>
      <div className="bg-white rounded-lg shadow-lg  w-11/12 md:w-1/2 lg:w-1/2 p-4 overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-center w-full 2xl:text-2xl">{member.memberRole}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className="flex justify-around items-center">
          <img
            src={member.profilePic || "/placeholder.png"}
            alt={member.memberName}
            className=" 2xl:h-25 rounded-xl mr-4 lg:h-[300px] lg:w-[300px] w-24 h-24 object-cover"
            width="196"
            height="196"
          />
          <div>
            <h3 className="text-lg 2xl:text-4xl font-bold">{member.memberName}</h3>
            <p className="text-gray-600 text-lg 2xl:text-2xl">{member.memberRole}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">{member.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
