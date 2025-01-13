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
    <div className="bg-[#EE487C33] w-full py-8 px-16 fade-in">
      <div className="max-w-full px-4">
        <img
          src="/about-us/Values-with-text.png"
          alt="Value with Text"
          className="w-full h-auto object-contain slide-up"
        />
      </div>
    </div>
  );
};

export default ValuesSection;