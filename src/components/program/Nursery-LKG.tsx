import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import "@/styles/globals.css";

const ProgramSection: React.FC = () => {
  const featuresNursery = [
    { text: "Build a strong foundation for academic and personal growth.", color: "bg-green-100 text-green-800" },
    { text: "Focus on literacy, social skills, creativity, and independence.", color: "bg-blue-100 text-blue-800" },
    { text: "Experiential activities to explore and understand the world.", color: "bg-orange-100 text-orange-800" },
    { text: "3 hours with a 12:1 student-teacher ratio.", color: "bg-purple-100 text-purple-800" },
  ];

  const featuresLKG = [
    { text: "Develop critical thinking, pre-reading, writing, and math skills.", color: "bg-green-100 text-green-800" },
    { text: "Encourages problem-solving, teamwork, and creativity.", color: "bg-blue-100 text-blue-800" },
    { text: "Prepares children for structured learning while nurturing confidence.", color: "bg-orange-100 text-orange-800" },
    { text: "4 hours with a 15:1 student-teacher ratio.", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="w-full py-16 px-8 md:px-20 font-poppins bg-gradient-to-r from-[#fcbbd0] to-yellow-50">
      {/* Nursery Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">Nursery</span>
          </h2>
          <p className="text-pink-700 mt-2">Age Group: 3+ years.</p>
          <ul className="space-y-4 mt-4">
            {featuresNursery.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center ${feature.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
              >
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color.split(" ")[1]}`} />
                <span className="text-sm md:text-base font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/program/nursery.svg"
            alt="Illustration of children engaging in nursery activities"
            width={596}
            height={529}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* LKG Section */}
      <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/program/lkg.svg"
            alt="Illustration of children participating in LKG activities"
            width={590}
            height={504}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">LKG:</span>
          </h2>
          <p className="text-pink-700 mt-2">Age Group: 4+ years.</p>
          <ul className="space-y-4 mt-4">
            {featuresLKG.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center ${feature.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
              >
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color.split(" ")[1]}`} />
                <span className="text-sm md:text-base font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;
