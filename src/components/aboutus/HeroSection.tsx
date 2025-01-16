import React from "react";
import Image from "next/image";
import "../../styles/about-us.css";

const HeroSection = () => {
  return (
    <div className="relative lg:h-[85vh] 2xl:h-[70vh] mt-[px] fade-in visible">
      <Image
        src="/about-us/aboutus.svg"
        alt="About Us Banner"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center top-60 lg:pt-[25] 2xl:pt-[150] px-4 group">
        <div className="relative w-full max-w-2xl text-center 2xl:max-w-6xl h-4/6 transform group-hover:translate-y-4 transition-transform duration-2000">
          <h1 className="text-6xl lg:text-[120px] 2xl:text-[200px] font-comic font-bold">
            <span style={{ color: "#d4538f" }}>A</span>
            <span style={{ color: "#6ab846" }}>b</span>
            <span style={{ color: "#f06f13" }}>o</span>
            <span style={{ color: "#f07062" }}>u</span>
            <span style={{ color: "#0000FF" }}>t</span>
            <span style={{ color: "#4B0082" }}> </span>
            <span style={{ color: "#8B00FF" }}>U</span>
            <span style={{ color: "#d4538f" }}>s</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
