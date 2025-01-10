'use client';

import React, { useState, useEffect } from "react";

const letters = [
  { id: 1, letter: "Q", fullForm: "Qurious", color: "#e84165" }, // Violet
  { id: 2, letter: "U", fullForm: "Unique", color: "#7ba82d" }, // Indigo
  { id: 3, letter: "A", fullForm: "Aware", color: "#ffcc00" }, // Dark Blue
  { id: 4, letter: "N", fullForm: "Nurtured", color: "#293796" }, // Dark Green
  { id: 5, letter: "T", fullForm: "Thoughtful", color: "#ed5d28" }, // Dark Yellow
  { id: 6, letter: "U", fullForm: "Uplifted", color: "#FF8C00" }, // Dark Orange
  { id: 7, letter: "M", fullForm: "Mindful", color: "#652f8f" }, // Dark Red
];

const QuantumHover: React.FC = () => {
  const [hoveredLetterId, setHoveredLetterId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (hoveredLetterId === null) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % letters.length);
      }, 2000); // Change every 2 seconds
      return () => clearInterval(interval);
    }
  }, [hoveredLetterId]);

  return (
    <div id="quantum-hover" className="flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-[#d5f3f5]">
      {/* Grid Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4 md:gap-0 w-full max-w-screen-lg">
        {letters.map((item, index) => (
          <div
            key={item.id}
            className={`relative flex items-center justify-center border-[3px] font-roboto font-bold text-white transition-all duration-300 ${
              hoveredLetterId === item.id || (hoveredLetterId === null && currentIndex === index)
                ? "bg-white"
                : "hover:bg-white"
            }`}
            style={{
              width: "100%",
              paddingBottom: "100%", // Maintain square aspect ratio
              fontSize: "calc(10px + 5vw)", // Responsive font size
              backgroundColor:
                hoveredLetterId === item.id || (hoveredLetterId === null && currentIndex === index)
                  ? item.color
                  : "#ffffff", // Adjusted background color
              borderColor: item.color, // Use dark border color if available
            }}
            onMouseEnter={() => setHoveredLetterId(item.id)}
            onMouseLeave={() => setHoveredLetterId(null)}
          >
            <span
              className="absolute inset-0 flex items-center justify-center"
              style={{
                WebkitTextStroke: `3px ${item.color}`, // Adjusted text stroke
                color: "white",
                padding: "5px", // Adjusted padding
                fontSize: "calc(60px + 4vw)", // Ensure text fits inside the box
              }}
            >
              {item.letter[0]} {/* Display the full letter */}
            </span>
          </div>
        ))}
      </div>

      {/* Full Form Display */}
      <div className="mt-8">
        {(hoveredLetterId || hoveredLetterId === null) && (
          <div
            className="font-comic font-bold text-center transition-all duration-300"
            style={{
              fontSize: "calc(20px + 10vw)", // Responsive font size
              lineHeight: "calc(30px + 15vw)", // Responsive line height
              color: letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.color,
            }}
          >
            {letters.find((l) => l.id === (hoveredLetterId || letters[currentIndex].id))?.fullForm}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumHover;
