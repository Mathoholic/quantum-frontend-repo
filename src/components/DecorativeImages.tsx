import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const DecorativeImages: React.FC = () => {
  const rocketRef = useRef<HTMLDivElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rocketRef.current) {
      gsap.fromTo(
        rocketRef.current,
        {
          x: "-200%", // Start further off-screen on the left
          y: "100%", // Start from the bottom
          rotate: -45, // Start with a tilted angle
          opacity: 0, // Start invisible
        },
        {
          x: "0%", // Move to the final position
          y: "0%", // Move to the final position
          rotate: 0, // Rotate to normal
          opacity: 1, // Fade in
          duration: 2, // Duration of the animation
          ease: "power3.out", // Smooth easing
        }
      );
    }

    if (pencilRef.current) {
      gsap.fromTo(
        pencilRef.current,
        {
          x: "200%", // Start further off-screen on the right
          y: "100%", // Start from the bottom
          rotate: 130, // Start with a tilted angle
          opacity: 0, // Start invisible
        },
        {
          x: "0%", // Move to the final position
          y: "0%", // Move to the final position
          rotate: 0, // Rotate to normal
          opacity: 1, // Fade in
          duration: 2, // Duration of the animation
          ease: "power3.out", // Smooth easing
        }
      );
    }
  }, []);

  return (
    <div className="absolute inset-x-0 top-10 sm:top-16 lg:top-20 xl:top-24 2xl:top-28 flex justify-between px-0">
      {/* Rocket with Animation */}
      <div ref={rocketRef} className="flex justify-start opacity-0">
        <Image
          src="/rocket.svg"
          alt="Left Decorative"
          width={192}
          height={192}
          className="w-[60px] sm:w-28 md:w-32 lg:w-40 xl:w-48 2xl:w-[230px]" // Adjusted sizes
        />
      </div>
      {/* Pencil with Animation */}
      <div ref={pencilRef} className="flex justify-end opacity-0">
        <Image
          src="/pencil.svg"
          alt="Right Decorative"
          width={192}
          height={192}
          className="w-[60px] sm:w-28 md:w-32 lg:w-40 xl:w-48 2xl:w-[230px]" // Adjusted sizes
        />
      </div>
    </div>
  );
};

export default DecorativeImages;
