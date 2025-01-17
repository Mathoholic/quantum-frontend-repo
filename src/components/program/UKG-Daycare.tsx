'use client'

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const UKGDaycareInfo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const featuresUKG = [
    { text: "Age Group: 5+ years.", color: "bg-pink-100 text-pink-800" },
    { text: "Strengthen literacy, numeracy, & communication skills for formal schooling.", color: "bg-green-100 text-green-800" },
    { text: "Encourages logical reasoning, social development, and creativity.", color: "bg-blue-100 text-blue-800" },
    { text: "Connects concepts to real-life through concrete-to-abstract methods.", color: "bg-orange-100 text-orange-800" },
    { text: "4 hours with a 15:1 student-teacher ratio.", color: "bg-blue-100 text-blue-800" },
  ];

  const featuresDaycare = [
    { text: "Extended care for working parents.", color: "bg-pink-100 text-pink-800" },
    { text: "Storytelling, art, sensory play, quiet time.", color: "bg-green-100 text-green-800" },
    { text: "Flexible and structured for overall well-being.", color: "bg-blue-100 text-blue-800" },
    { text: "Small groups, attentive caregivers.", color: "bg-orange-100 text-orange-800" },
    { text: "Encourages independent play and social interaction.", color: "bg-blue-100 text-blue-800" },
  ];

  return (
    <div ref={sectionRef} className={`w-full py-16 px-8 md:px-20 font-poppins bg-[#ffe0b3] ${isVisible ? 'animate-fadeIn' : ''}`}>
      {/* UKG Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className={`animate-slideInLeft ${isVisible ? 'visible' : 'invisible'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-transparent font-comic bg-clip-text">UKG:</span>
          </h2>
          <ul className="space-y-4 mt-6">
            {featuresUKG.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center ${feature.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
                style={{ animation: `fadeIn 1s ease-in-out ${index * 0.2}s` }}
              >
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color.split(" ")[1]}`} />
                <span className="text-base md:text-lg font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`flex justify-center items-center animate-slideInRight ${isVisible ? 'visible' : 'invisible'}`}>
          <Image
            src="/program/ukg.svg"
            alt="Illustration of children engaging in UKG activities"
            width={596}
            height={529}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Daycare Section */}
      <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
        <div className={`flex justify-center items-center animate-slideInLeft ${isVisible ? 'visible' : 'invisible'}`}>
          <Image
            src="/program/daycare.svg"
            alt="Illustration of daycare activities with children and caregivers"
            width={590}
            height={504}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className={`animate-slideInRight ${isVisible ? 'visible' : 'invisible'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text font-comic">Daycare:</span>
          </h2>
          <ul className="space-y-4 mt-6">
            {featuresDaycare.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center ${feature.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
                style={{ animation: `fadeIn 1s ease-in-out ${index * 0.3}s` }}
              >
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color.split(" ")[1]}`} />
                <span className="text-base md:text-lg font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UKGDaycareInfo;
