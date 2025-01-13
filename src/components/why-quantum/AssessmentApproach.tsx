import React from 'react';
import FeatureSection from './FeatureSection';

const AssessmentApproach = () => (
  <FeatureSection
    className="animate-fade-in"
    bgColor="bg-[#FEDFB2]"
    title="Assessment Approach"
    titleColor="text-[#E14B30]"
    imageSrc="/why-quantum/teacher-teaching.svg"
    imageAlt="Assessment"
    reverse={true}
    checklistItems={[
      {
        title: "For Learning & Of Learning",
        description: "Assessments are designed to guide your child's progress and identify areas for further development.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      },
      {
        title: "Observation Records",
        description: "Continuous monitoring through observation helps us adjust the learning path according to the child's evolving needs.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      }
    ]}
  />
);

export default AssessmentApproach;
