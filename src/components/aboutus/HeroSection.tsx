import React from "react";
import Image from "next/image";
import "../../styles/about-us.css";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] mt-[3px] fade-in visible">
      <Image
        src="/about-us/aboutus.svg"
        alt="About Us Banner"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center top-60 px-4 group">
        <div className="relative w-full max-w-2xl h-4/6 transform group-hover:translate-y-4 transition-transform duration-2000 ease-in-out slide-up visible">
          <Image
            src="/about-us/text-aboutus.svg"
            alt="About Us Text"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
