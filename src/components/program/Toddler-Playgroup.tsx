import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import "../../styles/globals.css";

const ProgramHero = () => {
  const featuresToddler = [
    { text: "Ease toddlers into preschool while strengthening parent-child bonds.", color: "bg-red-100 text-red-800" },
    { text: "Interactive Learning: Focused on child-centered play.", color: "bg-blue-100 text-blue-800" },
    { text: "Enhances physical, social, emotional, and intellectual growth.", color: "bg-orange-100 text-orange-800" },
    { text: "Helps toddlers feel confident and secure with their parents present.", color: "bg-purple-100 text-purple-800" },
    { text: "1.5 hours with 10:1 student-teacher ratio.", color: "bg-green-100 text-green-800" },
  ];

  const featuresPlaygroup = [
    { text: "Age Group: 2+ years.", color: "bg-orange-100 text-orange-800" },
    { text: "Smoothly transition children into independent schooling.", color: "bg-green-100 text-green-800" },
    { text: "Play-based activities fostering literacy, independence, & love for learning.", color: "bg-blue-100 text-blue-800" },
    { text: "Enhances focus, creativity, and sensory skills.", color: "bg-yellow-100 text-yellow-800" },
    { text: "3 hours with a 12:1 student-teacher ratio.", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="w-full py-16 px-8 md:px-20 font-poppins bg-[#d5f3f5]">
      {/* Toddler-parent program */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2
            className="text-left mb-6 text-[36px] md:text-[44px] font-comic font-normal leading-[50px] md:leading-[66.89px] underline-from-font decoration-skip-ink"
            style={{ textUnderlinePosition: "from-font", textDecorationSkipInk: "none" }}
          >
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">Toddler</span>-
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">parent</span>{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">program:</span>
          </h2>
          <ul className="space-y-4">
            {featuresToddler.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center ${feature.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
              >
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color.split(" ")[1]}`} />
                <span className="text-[10px] md:text-base font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/program/toddler-parent.svg"
            alt="Illustration of Toddler-parent program"
            width={674}
            height={507}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Playgroup */}
      <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/program/playground.svg"
            alt="Illustration of Playgroup"
            width={604}
            height={523}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <h2 className="text-left text-[36px] mb-6 md:text-[48px] font-comic font-normal leading-[50px] md:leading-[66.89px] underline-from-font decoration-skip-ink"
            style={{ textUnderlinePosition: "from-font", textDecorationSkipInk: "none" }}
          >
            <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">Playgroup:</span>
          </h2>
          <ul className="space-y-4">
            {featuresPlaygroup.map((feature, index) => (
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

export default ProgramHero;
