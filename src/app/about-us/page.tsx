"use client";
import React from "react";
import TeamCarousel from "@/components/aboutus/aboutus";
import HeroSection from "@/components/aboutus/HeroSection";
import MissionVisionSection from "@/components/aboutus/MissionVisionSection";
import ValuesSection from "@/components/aboutus/ValuesSection";

const AboutUs = () => {
  return (
    <div className="w-full relative overflow-x-hidden">
      <HeroSection />
      <MissionVisionSection />
      <ValuesSection />
      <div className="w-full  bg-gray-200">
        <TeamCarousel />
      </div>

      {/* Values section */}
     
    </div>
  );
};

export default AboutUs;