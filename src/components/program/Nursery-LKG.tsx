import Image from 'next/image';
import { FaCheckCircle } from "react-icons/fa";

const ProgramSection = () => {
  const featuresNursery = [
    { text: "Build a strong foundation for academic and personal growth.", color: "text-green-600" },
    { text: "Focus on literacy, social skills, creativity, and independence.", color: "text-blue-600" },
    { text: "Experiential activities to explore and understand the world.", color: "text-orange-600" },
    { text: "3 hours with a 12:1 student-teacher ratio.", color: "text-purple-700" },
  ];

  const featuresLKG = [
    { text: "Develop critical thinking, pre-reading, writing, and math skills.", color: "text-green-600" },
    { text: "Encourages problem-solving, teamwork, and creativity.", color: "text-blue-600" },
    { text: "Prepares children for structured learning while nurturing confidence.", color: "text-orange-600" },
    { text: "4 hours with a 15:1 student-teacher ratio.", color: "text-purple-700" },
  ];

  return (
    <div className="w-full h-auto py-16 px-8 md:px-20 font-sans gap-20 bg-gradient-to-r from-[#fcbbd0] to-yellow-50">
      {/* Nursery Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="w-full h-auto text-[48px] font-normal mb-6 font-[Comic Sans MS] text-left underline-from-font decoration-skip-ink leading-[66.89px]">
            <span style={{ color: "#6ab846" }}>N</span>
            <span style={{ color: "#8d549e" }}>U</span>
            <span style={{ color: "#8d549e" }}>R</span>
            <span style={{ color: "#f06f13" }}>S</span>
            <span style={{ color: "#f06f13" }}>E</span>
            <span style={{ color: "#087278" }}>R</span>
            <span style={{ color: "#087278" }}>Y</span>
          </h2>
          <p className="text-lg font-medium text-pink-700 mt-2">Age Group: 3+ years.</p>
          <ul className="space-y-4 mt-4">
            {featuresNursery.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color}`} />
                <span className={`text-lg ${feature.color}`}>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/program/nursery.svg"
            alt="Illustration of Nursery"
            width={596}
            height={529}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300 "
          />
        </div>
      </div>

      {/* LKG Section */}
      <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/program/lkg.svg"
            alt="Illustration of LKG"
            width={590}
            height={504}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300 "
          />
        </div>
        <div>
          <h2 className="w-full h-auto text-[48px] font-normal mb-6 font-[Comic Sans MS] text-left underline-from-font decoration-skip-ink leading-[66.89px]">
            <span style={{ color: "#ed477c" }}>L</span>
            <span style={{ color: "#e04a2f" }}>K</span>
            <span style={{ color: "#652f8f" }}>G</span>
            <span style={{ color: "#087278" }}>:</span>
          </h2>
          <p className="text-lg font-medium text-pink-700 mt-2">Age Group: 4+ years.</p>
          <ul className="space-y-4 mt-4">
            {featuresLKG.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color}`} />
                <span className={`text-lg ${feature.color}`}>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;
