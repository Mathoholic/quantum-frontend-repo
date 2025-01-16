import React from 'react';
import FeatureSection from './FeatureSection';

const SkilledTeachers = () => (
  <FeatureSection
    className="animate-slide-in"
    bgColor="bg-[#FEDFB2]"
    bgcontentColor = "bg-[#FFF6C8]"
    title="Highly Skilled, Approachable Teachers"
    titleColor="text-[#111111]"
    imageSrc="/why-quantum/teacher-thinking.svg"
    imageAlt="Skilled Teachers"
    checklistItems={[
      {
        title: "Expert Faculty",
        description: "Our teachers are not only highly trained but also passionate, experienced, and dedicated to your child's growth.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      },
      {
        title: "Teacher-Child Ratio",
        description: "1:15 along with support staff - ensuring individual attention and support.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      },
      {
        title: "Approachability",
        description: "Our teachers foster open communication with parents, creating a collaborative environment for each child's development.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      }
    ]}
    initialReverse={true} 
  />
);

export default SkilledTeachers;
