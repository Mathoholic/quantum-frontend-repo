import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const ProgramHero = () => {
  const featuresToddler = [
    { text: "Ease toddlers into preschool while strengthening parent-child bonds.", color: "text-red-500" },
    { text: "Session Duration: 1.5 hours.", color: "text-green-600" },
    { text: "Interactive Learning: Focused on child-centered play.", color: "text-blue-500" },
    { text: "Enhances physical, social, emotional, and intellectual growth.", color: "text-orange-500" },
    { text: "Helps toddlers feel confident and secure with their parents present.", color: "text-purple-500" },
    { text: "Student-teacher ratio of 10:1.", color: "text-red-500" },
  ];

  const featuresPlaygroup = [
    { text: "Age Group: 2+ years.", color: "text-orange-500" },
    { text: "Smoothly transition children into independent schooling.", color: "text-green-600" },
    { text: "Play-based activities fostering literacy, independence, & love for learning.", color: "text-blue-500" },
    { text: "Enhances focus, creativity, and sensory skills.", color: "text-orange-500" },
    { text: "3 hours with a 12:1 student-teacher ratio.", color: "text-green-600" },
  ];

  return (
    <div className="w-full h-auto py-16 px-8 md:px-20 font-comic gap-20 bg-gradient-to-r from-[#d5f3f5] to-purple-50">
      {/* Toddler-parent program */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2
            className="text-left text-[36px] md:text-[48px] font-comic font-normal leading-[50px] md:leading-[66.89px] underline-from-font decoration-skip-ink"
            style={{
              fontFamily: "Comic Sans MS",
              fontSize: "48px",
              fontWeight: 400,
              lineHeight: "66.89px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">Toddler</span>-
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">parent</span>{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">program:</span>
          </h2>
          <ul className="space-y-4 mt-6 font-comic">
            {featuresToddler.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color}`} />
                <span
                  className={`text-base md:text-lg ${feature.color}`}
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "0.02em",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}
                >
                  {feature.text}
                </span>
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
          <h2
            className="text-left text-[36px] md:text-[48px] font-comic font-normal leading-[50px] md:leading-[66.89px] underline-from-font decoration-skip-ink"
            style={{
              fontFamily: "Comic Sans MS",
              fontSize: "48px",
              fontWeight: 400,
              lineHeight: "66.89px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">Playgroup:</span>
          </h2>
          <ul className="space-y-4 mt-6 font-comic">
            {featuresPlaygroup.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color}`} />
                <span
                  className={`text-base md:text-lg ${feature.color}`}
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "0.02em",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
          <p
            className="text-lg font-medium text-pink-700 mt-2"
            style={{
              fontFamily: "Outfit",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "25.2px",
              letterSpacing: "0.02em",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Age Group: 3+ years.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramHero;
