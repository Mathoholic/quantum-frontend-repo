'use client'

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EarlyEducationSection = () => {
  const plusImageRef = useRef(null);
  const textContentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      plusImageRef.current,
      { x: "-100vw", rotation: 0 },
      {
        x: 0,
        rotation: 360,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: plusImageRef.current,
          start: "top bottom",
        },
      }
    );

    gsap.fromTo(
      textContentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 80%",
        },
        stagger: 0.3,
      }
    );

    gsap.fromTo(
      videoRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="bg-[#fcd4df] py-16 relative">
      <div
        ref={plusImageRef}
        className="absolute top-[-70px] right-20 m-4"
      >
        <Image src="/plus.svg" alt="Top Right Image" width={100} height={100} />
      </div>
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left Column: Text Content */}
          <div ref={textContentRef} className="text-center lg:text-left">
            <h3 className="text-pink-600 text-sm font-semibold uppercase">Play based learning</h3>
            <h1 className="text-4xl font-bold font-comic text-black mt-4">
              Early education is not a luxury, but a necessity!
            </h1>
            <p className="text-gray-700 text-lg mt-6 font-outfit leading-relaxed custom-paragraph">
              A child’s brain development is phenomenal during the early years — over 
              75% development happens during 0-6 years, where they absorb everything
              around them just like sponges. We believe in a strong foundation in the
              early years, and providing a rich structured environment makes a huge
              difference in their lives.
            </p>
            <p className="text-gray-700 text-lg mt-6 leading-relaxed custom-paragraph">
              At Quantum Kids, learning is a joyful, hands-on experience where PLAY is
              not only encouraged but integrated as a powerful tool for discovery and
              development. Through a rich blend of exploration, collaboration, and
              independence, we create a dynamic atmosphere that supports every child’s
              unique journey, fostering a love for learning that lasts a lifetime.
            </p>
          </div>

          {/* Right Column: Diagram */}
          <div className="flex justify-center items-center">
            <div ref={videoRef} className="relative w-full h-full">
              <video
                src="/flow-pink.mp4"
                className="w-full h-full"
                autoPlay
                loop
                muted
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyEducationSection;
