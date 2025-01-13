import React from 'react';
import FeatureSection from './FeatureSection';

const HygieneAndCleanliness = () => (
  <FeatureSection
    className="animate-fade-in"
    bgColor="bg-[#FCDAE5]"
    title="Hygiene & Cleanliness"
    titleColor="text-[#EE487C]"
    imageSrc="/why-quantum/teacher-handwash.svg"
    imageAlt="Hygiene and Cleanliness"
    checklistItems={[
      {
        title: "Child-Friendly Hygiene Practices",
        description: "Clean, accessible hand-washing stations and well-maintained washrooms.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      },
      {
        title: "Focus on Health & Well-being",
        description: "Ensuring a safe and healthy environment for all students.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      }
    ]}
  />
);

export default HygieneAndCleanliness;
