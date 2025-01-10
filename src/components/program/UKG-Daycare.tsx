import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const UKGDaycareInfo: React.FC = () => {
  const featuresUKG = [
    { text: "Age Group: 5+ years.", color: "text-pink-600" },
    { text: "Strengthen literacy, numeracy, & communication skills for formal schooling.", color: "text-green-600" },
    { text: "Encourages logical reasoning, social development, and creativity.", color: "text-blue-600" },
    { text: "Connects concepts to real-life through concrete-to-abstract methods.", color: "text-orange-600" },
    { text: "4 hours with a 15:1 student-teacher ratio.", color: "text-blue-600" },
  ];

  const featuresDaycare = [
    { text: "Extended care for working parents.", color: "text-pink-600" },
    { text: "Storytelling, art, sensory play, quiet time.", color: "text-green-600" },
    { text: "Flexible and structured for overall well-being.", color: "text-blue-600" },
    { text: "Small groups, attentive caregivers.", color: "text-orange-600" },
    { text: "Encourages independent play and social interaction.", color: "text-blue-600" },
  ];

  return (
    <div className="w-full py-16 px-8 md:px-20 font-sans bg-gradient-to-r from-orange-50 to-yellow-50">
      {/* UKG Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">UKG</span>
          </h2>
          <ul className="space-y-4 mt-6">
            {featuresUKG.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color}`} />
                <span className={`text-base md:text-lg ${feature.color}`}>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/program/ukg.svg"
            alt="Children playing on a slide"
            width={596}
            height={529}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Daycare Section */}
      <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/program/daycare.svg"
            alt="Children and caregiver in daycare"
            width={590}
            height={504}
            className="rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">Daycare</span>
          </h2>
          <ul className="space-y-4 mt-6">
            {featuresDaycare.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className={`w-6 h-6 mr-3 ${feature.color}`} />
                <span className={`text-base md:text-lg ${feature.color}`}>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UKGDaycareInfo;
