import React, { useEffect } from "react";
import "../../styles/about-us.css";

const ValuesSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in, .slide-up");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center bg-[#EE487C33] w-full py-8 lg:pt-10  px-16 fade-in">
      <div className=" min-w-[393px] lg:max-w-[1600px] lg:mx-auto px-4">
        <h2 className=" text-center font-comic text-[28px] lg:text-[40px] 2xl:text-[54px] font-bold  2xl:px-16 text-pink-400 mb-8">Our Core Values</h2>
        <img
          src="/about-us/Values-with-text.png"
          alt="Value with Text"
          className="w-full h-[250px]  lg:h-[400px] 2xl:h-[600px] object-contain slide-up"
        />
      </div>
    </div>
  );
};

export default ValuesSection;