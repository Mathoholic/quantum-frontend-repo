import React from "react";
import ChildCentricCurriculum from "../../components/why-quantum/ChildCentricCurriculum";
import Kreedo from "../../components/why-quantum/Kreedo";
import Infrastructure from "../../components/why-quantum/Infrastructure";
import SafetyAndSecurity from "../../components/why-quantum/SafetyAndSecurity";
import HygieneAndCleanliness from "../../components/why-quantum/HygieneAndCleanliness";
import SkilledTeachers from "../../components/why-quantum/SkilledTeachers";
import AssessmentApproach from "../../components/why-quantum/AssessmentApproach";
import ParentEngagement from "../../components/why-quantum/ParentEngagement";

const WhyQuantum = () => {
  return (
    <div className="w-full ">
      <ChildCentricCurriculum />
      <Kreedo />
      <Infrastructure />
      <SafetyAndSecurity />
      <HygieneAndCleanliness />
      <SkilledTeachers />
      <ParentEngagement />
      <AssessmentApproach />
    </div>
  );
};

export default WhyQuantum;
