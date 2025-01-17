import React from 'react';
import FeatureSection from './FeatureSection';

const Infrastructure = () => (
  <FeatureSection
    className="animate-fade-in"
    bgColor="bg-[#FCDAE5]"
    bgcontentColor = "bg-[#FFF6C8]"
    title="State-of-the-Art Infrastructure"
    titleColor="text-[#EE487C]"
    imageSrc="/why-quantum/student-study.svg"
    imageAlt="Infrastructure"
    checklistItems={[
      {
        title: "Spacious & Fully Furnished Classrooms",
        description: "Designed to foster creativity and engagement, our classrooms are bright, airy, and conducive to learning.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      },
      {
        title: "Fully Equipped Library",
        description: "A rich selection of books for every age group, nurturing a love for reading and knowledge.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      },
      {
        title: "Montessori Lab",
        description: "Featuring 250+ age-appropriate materials, our Montessori lab supports hands-on learning and cognitive growth in early childhood.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      },
      {
        title: "Covered Playground",
        description: "Our safe and spacious outdoor play area encourages physical activity, social interactions, and gross motor skill development.",
        iconBgColor: "bg-[#EE487C]",
        titleColor: "text-[#EE487C]"
      }
    ]}
  />
);

export default Infrastructure;
