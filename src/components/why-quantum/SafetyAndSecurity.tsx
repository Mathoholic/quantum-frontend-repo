import React from 'react';
import FeatureSection from './FeatureSection';

const SafetyAndSecurity = () => (
  <FeatureSection
    bgColor="bg-[#FCDAE5]"
    title="Safety & Security"
    titleColor="text-[#EE487C]"
    imageSrc="/why-quantum/teacher-studying.svg"
    imageAlt="Safety and Security"
    reverse={true}
    checklistItems={[
      {
        title: "CCTV Surveillance",
        description: "Ensuring the highest levels of security.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      },
      {
        title: "Child-Friendly Spaces",
        description: "Designed to prioritise the safety and comfort of every child.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      },
      {
        title: "Safe Hands",
        description: "Well-trained and compassionate staff with a focus on care and protection.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      }
    ]}
  />
);

export default SafetyAndSecurity;
